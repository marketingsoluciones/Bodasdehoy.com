import crypto from 'crypto'
import { publicKey } from './../../../../publicKey.js'
import { Formik, Form } from "formik";
import { FC, Children, memo, Dispatch, SetStateAction, useState, useEffect } from "react";
import { InputField } from "../../../Inputs";
import { EmailIcon, UserForm, Eye, EyeSlash, LockClosed, PhoneMobile, } from "../../../Icons";
import { createUserWithEmailAndPassword, updateProfile, UserCredential, getAuth, RecaptchaVerifier, PhoneAuthProvider, signInWithCredential, updatePhoneNumber, signInWithCustomToken } from "@firebase/auth";
import * as yup from "yup";
import { AuthContextProvider, LoadingContextProvider, } from "../../../../context";
import { fetchApi, fetchApiEventos, queries } from "../../../../utils/Fetching";
import { parseJwt, phoneUtil, useAuthentication } from '../../../../utils/Authentication';
import { useToast } from '../../../../hooks/useToast';
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/router";
import { redirections } from "./redirections";
import Cookies from "js-cookie";
import { useActivity } from '../../../../hooks/useActivity';

interface initialValues {
  uid?: string
  identifier: string
  fullName: string;
  password: string;
  phoneNumber: string
  role: string
}

// Set de mensajes de error
yup.setLocale({
  mixed: {
    required: "Campo requerido",
  },
});

interface propsFormRegister {
  whoYouAre: string;
  setStageRegister: Dispatch<SetStateAction<number>>
  stageRegister: number
}

const FormRegister: FC<propsFormRegister> = ({ whoYouAre, setStageRegister, stageRegister }) => {
  const router = useRouter()
  const { setUser, user, setUserTemp, userTemp, redirect, geoInfo, linkMedia, storage_id, link_id, preregister } = AuthContextProvider();
  const { setLoading } = LoadingContextProvider();
  const { getSessionCookie, isPhoneValid } = useAuthentication();
  const toast = useToast()
  const [activeSaveRegister, setActiveSaveRegister] = useState({ state: true, type: "" })
  const [passwordView, setPasswordView] = useState(true)
  const [verificationId, setVerificationId] = useState("")
  const [values, setValues] = useState<initialValues | null>()
  const [phoneNumber, setPhoneNumber] = useState<string | null>()
  const [updateActivity, updateActivityLink] = useActivity()

  const initialValues: initialValues = {
    identifier: preregister?.email ?? "",
    fullName: preregister?.name ?? "",
    password: "",
    phoneNumber: preregister?.phoneNumber ?? `+${phoneUtil?.getCountryCodeForRegion(geoInfo?.ipcountry)}`,
    role: preregister?.role[0] ?? whoYouAre
  };
  const validationSchema = yup.object().shape({
    identifier: yup.string().required("Campo requerido").test("Unico", "Correo inválido", (value) => {
      const name = document.activeElement?.getAttribute("name")
      if (name !== "identifier" && !value?.includes("@")) {
        return isPhoneValid(value ?? "")
      } else {
        return true
      }
    }).test("Unico", "Correo inválido", async (value) => {
      const name = document.activeElement?.getAttribute("name")
      if (name !== "identifier" && value?.includes("@")) {
        const result = await fetchApi({
          query: queries.getEmailValid,
          variables: { email: value },
        })
        return result?.valid
      } else {
        return true
      }
    }),
    fullName: yup.string().required("Campo requerido"),
    password: !linkMedia
      ? yup.string().required("Campo requerido").test("Unico", `Debe contener mas de 5 carácteres`, (value: any) => {
        const name = document.activeElement?.getAttribute("name")
        if (name !== "password") {
          return value?.length > 5
        } else {
          return true
        }
      })
      : yup.string(),
    phoneNumber: yup.string().test("Unico", `Campo requerido`, (value: any) => {
      const name = document.activeElement?.getAttribute("name")
      if (value?.length < 4) {
        return false
      } else {
        return true
      }
    }).test("Unico", `Número inválido`, (value: any) => {
      const name = document.activeElement?.getAttribute("name")
      if (name !== "phoneNumber" && value?.length > 3) {
        return isPhoneValid(value)
      } else {
        return true
      }
    })
  })

  const nextSave = async (values: any) => {
    let UserFirebase: any = user ?? {};
    try {
      /*Aquí para regsitrase con número de teléfono*/
      if (!values?.identifier.includes("@")) {
        const authCredential = PhoneAuthProvider.credential(verificationId, values?.password ?? "");
        const userCredential = await signInWithCredential(getAuth(), authCredential);
        UserFirebase = userCredential.user;

        await updatePhoneNumber(userCredential.user, values.phoneNumber)
      }
      /*Aquí para regsitrase con correo electrónico*/
      if (values?.identifier.includes("@")) {
        const userCredential: UserCredential = await createUserWithEmailAndPassword(
          getAuth(),
          values?.identifier,
          values?.password
        );
        // aqui updatePhoneNumber    
        UserFirebase = userCredential.user;
      }

      values.uid = UserFirebase.uid;
    } catch (error: any) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          try {
            // const data = values?.password
            // const encryptedData = crypto.publicEncrypt(
            //   {
            //     key: publicKey,
            //     padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            //     oaepHash: 'sha256',
            //   },
            //   Buffer.from(data)
            // );
            // console.log(550016, encryptedData)
            const result = await fetchApi({
              query: queries.createUserWithPassword,
              variables: { email: values.identifier, password: values?.password },
            })
            if (result === "apiBodas/email-already-in-use") {
              console.log(550012, error.code)
              toast("error", "Ups... este correo ya está registrado1")
              return false
            }
            const asd = await signInWithCustomToken(getAuth(), result)
            UserFirebase = asd.user

            values.uid = UserFirebase.uid
          } catch (error) {
            console.log(55001, error)
            return false
          }
        }

      } else {
        toast("error", "Ups... algo a salido mal")
        return false
      }
    }

    // Actualizar displayName
    if (UserFirebase) {
      updateProfile(UserFirebase, { displayName: values?.fullName })
        .then(async () => {
          const idToken = await getAuth().currentUser?.getIdToken(true)
          const dateExpire = new Date(parseJwt(idToken ?? "").exp * 1000)
          Cookies.set("idTokenV0.1.0", idToken ?? "", { domain: process.env.NEXT_PUBLIC_DOMINIO ?? "", expires: dateExpire })
          await getSessionCookie(idToken)
          // Crear usuario en MongoDB
          fetchApi({
            query: queries.createUser,
            variables: {
              role: values.role, uid: values.uid, email: UserFirebase?.email
            }
          }).then(async (moreInfo: any) => {
            setUser({ ...UserFirebase, ...moreInfo });
            updateActivity("registered")
            updateActivityLink("registered")
            redirections({ router, moreInfo, redirect: `${redirect}/?link=${link_id}`, toast })
          })
        })
        .catch((error): any => {
          console.log(45111, error)
        })
    }

    //toast("success", "Registro realizado con exito")
    return true
  }

  // Funcion a ejecutar para el submit del formulario 

  const handleSubmit = async (values: any) => {
    console.log("000000000000")
    try {
      if (!activeSaveRegister.state) {
        setActiveSaveRegister({ state: true, type: values.identifier.includes("@") ? "password" : "text" })
        /*Aquí para regsitrase con número de teléfono*/
        if (!values.identifier.includes("@")) {
          console.log("111111111111")
          if (values.identifier[0] === "0") {
            values.identifier = `+${phoneUtil.getCountryCodeForRegion(geoInfo.ipcountry)}${values.identifier.slice(1, values.identifier.length)}`
          }
          getAuth().languageCode = 'es';
          const applicationVerifier = new RecaptchaVerifier(
            'sign-in-button',
            {
              size: 'invisible',
            },
            getAuth(),
          );
          const provider = new PhoneAuthProvider(getAuth());

          provider.verifyPhoneNumber(values.identifier, applicationVerifier)
            .then((verificationId) => {
              // Código de verificación enviado con éxito
              // Guarda verificationId para su uso posterior al verificar el código
              setVerificationId(verificationId)
            })
            .catch((error) => {
              // Manejo de errores
              console.error('Error al enviar el código de verificación:', error);
            });
        }
        setValues(values)
        return
      }
      /*Aquí para regsitrase con correo electrónico*/
      if (values.identifier.includes("@")) {
        console.log("222222222222222")
        nextSave(values)
      }

    } catch (error) {
      console.log(error);
      if (error instanceof FirebaseError) {
        toast("error", "Ups... este correo ya está registrado")
      } else {
        toast("error", "Ups... algo a salido mal")
      }
      setLoading(false);
    }
  };

  const handleSumitMedia = async (values: initialValues, actions: any) => {
    try {
      if (storage_id && link_id) {
        updateActivityLink("clikNextStep3")
        handleSubmit(values)
        fetchApiEventos({
          query: queries.updateActivityLink,
          variables: {
            args: {
              link_id,
              storage_id,
              activity: "preregistered",
              name: values?.fullName,
              role: values?.role,
              email: values?.identifier,
              phoneNumber: values.phoneNumber,
              navigator: navigator?.userAgentData?.platform,
              mobile: (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
            }
          }
        }).catch((error: any) => console.log(90000, error))
      }
      setPhoneNumber(values?.phoneNumber)
    } catch (error) {
      console.log(45111, error)
    }
  }

  return (
    <>
      <Formik
        initialValues={initialValues ?? {}}
        validationSchema={validationSchema ?? {}}
        onSubmit={!linkMedia ? handleSubmit : handleSumitMedia}
      >
        <Form className="w-full md:w-[350px] text-gray-200 *md:grid *md:grid-cols-2 gap-4 md:gap-5 md:space-y-0 flex flex-col">
          <div className="col-span-2">
            <InputField
              name="fullName"
              type="text"
              autoComplete="off"
              label={"Nombre y Apellido"}
              onFocus={() => { updateActivityLink("focusFullNameStep2") }}
              onBlur={(e: Event) => {
                const inputElement = e.target as HTMLInputElement;
                inputElement?.value && updateActivityLink("fullNameStep2", inputElement?.value)
              }}
              icon={<UserForm className="absolute w-4 h-4 inset-y-0 left-4 m-auto  text-gray-500" />}
            />
          </div>
          <div className="col-span-2">
            <InputField
              name="identifier"
              type="text"
              autoComplete="off"
              label={"Correo electrónico"}
              onFocus={() => { updateActivityLink("focusEmailStep2") }}
              onBlur={(e: Event) => {
                const inputElement = e.target as HTMLInputElement;
                inputElement?.value && updateActivityLink("emailStep2", inputElement?.value)
              }}
              icon={<EmailIcon className="absolute w-4 h-4 inset-y-0 left-4 m-auto text-gray-500" />}
            />
          </div>
          {!linkMedia && <div className="w-full relative">
            <InputField
              name="password"
              type={passwordView ? "password" : "text"}
              autoComplete="off"
              label="Contraseña"
              autoFocus={!!preregister}
              icon={<LockClosed className="absolute w-4 h-4 inset-y-0 left-4 m-auto  text-gray-500" />} />
            <div onClick={() => { setPasswordView(!passwordView) }} className="absolute cursor-pointer inset-y-0 top-5 right-4 m-auto w-4 h-4 text-gray-500" >
              {!passwordView ? <Eye /> : <EyeSlash />}
            </div>
          </div>}
          <span className="w-full relative ">
            <InputField
              name="phoneNumber"
              type="text"
              autoComplete="off"
              onFocus={() => { updateActivityLink("focusPhoneNumberStep2") }}
              onBlur={(e: Event) => {
                const inputElement = e.target as HTMLInputElement;
                inputElement?.value && updateActivityLink("phoneNumberStep2", inputElement?.value)
              }}
              icon={<PhoneMobile className="absolute w-4 h-4 inset-y-0 left-4 m-auto  text-gray-500" />}
              label={"Número de telefono"}
            />
          </span>
          <div className="flex items-center w-fit col-span-2 gap-6 mx-auto pt-3 ">
            <button
              id="sign-in-button"
              type="submit"
              className="col-span-2 bg-primary rounded-full px-10 py-2 text-white font-medium mx-auto inset-x-0 md:hover:bg-tertiary transition"
            >
              {linkMedia != null ? !phoneNumber ? "siguiente" : "Reenviar Link" : !phoneNumber ? "Registrar" : "Reenviar Link"}
            </button>
          </div>
          {linkMedia != null && <div className='text-gray-900 w-full h-40'>
            {phoneNumber &&
              <>
                <p className='w-full text-center text-sm'>
                  En hora buena, te hemos enviado un mensaje por whatsapp al número {phoneNumber}; haz click en link de confirmación para continuar con el registro.
                </p>
              </>
            }
          </div>}
        </Form>
      </Formik>
      <style jsx>
        {`
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        `}
      </style>
    </>
  );
};

export default FormRegister;



interface propsFormikStepper {
  handleSubmit: any;
}
export const FormikStepper: FC<propsFormikStepper> = memo(
  ({ handleSubmit, children }) => {
    const childrenArray = Children.toArray(children) as React.ReactElement[];
    const currentChildren = childrenArray[0]?.props.children[0];
    return (
      <Formik
        initialValues={currentChildren?.props?.initialValues ?? {}}
        validationSchema={currentChildren?.props?.validationSchema ?? {}}
        onSubmit={handleSubmit}
      >
        {children}
      </Formik>
    );
  }
);






