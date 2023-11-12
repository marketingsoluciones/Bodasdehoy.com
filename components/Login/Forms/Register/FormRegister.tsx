import { Formik, Form } from "formik";
import { FC, Children, memo, Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
import { DatePicker, InputField } from "../../../Inputs";
import { EmailIcon, UserForm, Eye, EyeSlash, LockClosed, PhoneMobile, } from "../../../Icons";
import { createUserWithEmailAndPassword, updateProfile, UserCredential, getAuth, RecaptchaVerifier, PhoneAuthProvider, signInWithCredential } from "@firebase/auth";
import * as yup from "yup";
import { UserMax } from "../../../../context/AuthContext";
import { AuthContextProvider, LoadingContextProvider, } from "../../../../context";
import { fetchApi, queries } from "../../../../utils/Fetching";
import { phoneUtil, useAuthentication } from '../../../../utils/Authentication';
import { useToast } from '../../../../hooks/useToast';
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/router";

interface initialValues {
  uid?: string
  identifier: string
  fullName: string;
  password: string;
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
  const { setUser, user, setUserTemp, userTemp, redirect, geoInfo } = AuthContextProvider();
  const { setLoading } = LoadingContextProvider();
  const { getSessionCookie, isPhoneValid } = useAuthentication();
  const toast = useToast()
  const [activeSaveRegister, setActiveSaveRegister] = useState({ state: false, type: "" })
  const [passwordView, setPasswordView] = useState(true)
  const [verificationId, setVerificationId] = useState("")
  const [values, setValues] = useState<initialValues | null>()

  const initialValues: initialValues = {
    identifier: "",
    fullName: "",
    password: "",
    role: whoYouAre
  };

  const validationSchema = yup.object().shape({
    identifier: yup.string().required("Campo requerido").test("Unico", "Número inválido", (value) => {
      const name = document.activeElement?.getAttribute("name")
      if (name !== "identifier" && !value?.includes("@")) {
        return isPhoneValid(value ?? "")
      } else {
        return true
      }
    }).test("Unico", "Correo inválido", async (value) => {
      const name = document.activeElement?.getAttribute("name")
      if (name !== "identifier" && value?.includes("@")) {
        console.log(value)
        const result = await fetchApi({
          query: queries.getEmailValid,
          variables: { email: value },
        })
        console.log(result)
        return result?.valid
      } else {
        return true
      }
    }),
    //fullName: yup.string().required("Campo requerido"),
    password: yup.string().test("Unico", `Debe contener ${activeSaveRegister.type === "password" ? "entre 8 y 10" : "6"} caractéres`, (value: any) => {
      const name = document.activeElement?.getAttribute("name")
      if (activeSaveRegister.state && name !== "password") {
        return value?.length > (activeSaveRegister.type == "password" ? 7 : 5) && value?.length < (activeSaveRegister.type == "password" ? 11 : 7)
      } else {
        return true
      }
    }).test("Unico", `Código inválido`, async (value: any) => {
      //const name = document.activeElement?.getAttribute("name")
      if (activeSaveRegister.state
        //  && name !== "password"
      ) {
        if (activeSaveRegister.type !== "password" && value?.length === 6) {
          console.log(value)
          console.log(values && { ...values, password: value })
          const resp = await nextSave(values && { ...values, password: value })
          console.log(222555, resp)
          return resp
        } else {
          console.log("aqui")
          return true
        }
      } else {
        return true
      }
    })
  })

  useEffect(() => {
    console.log(activeSaveRegister)
  }, [activeSaveRegister])

  const nextSave = async (values: any) => {
    let UserFirebase: Partial<UserMax> = user ?? {};
    console.log(98888, values)
    try {
      if (!values?.identifier.includes("@")) {
        console.log(verificationId)
        const authCredential = PhoneAuthProvider.credential(verificationId, values?.password ?? "");
        console.log(55544411, "authCredential", authCredential)
        const userCredential = await signInWithCredential(getAuth(), authCredential);
        console.log(55544422, 'verify: ', userCredential);
        UserFirebase = userCredential.user;
      }
      //setLoading(true);
      if (values?.identifier.includes("@")) {
        console.log("correo")
        const userCredential: UserCredential = await createUserWithEmailAndPassword(
          getAuth(),
          values?.identifier,
          values?.password
        );
        console.log(123555, userCredential)
        UserFirebase = userCredential.user;
      }

      console.log("UserFirebase", UserFirebase)
      values.uid = UserFirebase.uid;
    } catch (error: any) {
      console.log(error?.message);
      if (error instanceof FirebaseError) {
        //toast("error", "Ups... este correo ya esta registrado")
      } else {
        toast("error", "Ups... algo a salido mal")
      }
      return false
      setLoading(false);
    }



    // Actualizar displayName
    getAuth()?.onAuthStateChanged(async (usuario: any) => {
      if (usuario) {
        updateProfile(usuario, { displayName: values?.fullName });
        // Almacenar token en localStorage
        const resp = await getSessionCookie((await usuario?.getIdTokenResult())?.token)
        console.log(30007, resp)
      }
    });

    // Crear usuario en MongoDB
    fetchApi({
      query: queries.createUser, variables: {
        ...values,
      }
    }).then(async (moreInfo: any) => {
      console.log(888877, moreInfo)
      // Almacenar en contexto USER con toda la info 
      setUser({ ...UserFirebase, ...moreInfo });

      /////// REDIRECIONES ///////
      if (router?.query?.end) {
        await router.push(`${router?.query?.end}`)
        toast("success", `Inicio sesión con exito`)
      } else {
        if (router?.query?.d == "info-empresa" && moreInfo.role.includes("empresa")) {
          const path = window.origin.includes("://test.") ? process.env.NEXT_PUBLIC_CMS?.replace("//", "//test") : process.env.NEXT_PUBLIC_CMS
          await router.push(path ?? "")
          toast("success", `Cuenta de empresa creada con exito`)
        }
        if (router?.query?.d == "info-empresa" && !moreInfo.role.includes("empresa")) {
          await router.push("/info-empresa")
          toast("warning", `Inicio sesión con una cuenta que no es de empresa`)
        }
        if (router?.query?.d !== "info-empresa") {
          await router.push(redirect ? redirect : "/")
          toast("success", `Cuenta creada con exito`)
        }
      }
      ///////////////////////////
    })


    //toast("success", "Registro realizado con exito")
    return true
  }

  // Funcion a ejecutar para el submit del formulario 

  const handleSubmit = async (values: any) => {
    try {
      console.log(100004, "values", values, !values.identifier.includes("@"))
      if (!activeSaveRegister.state) {
        setActiveSaveRegister({ state: true, type: values.identifier.includes("@") ? "password" : "text" })

        if (!values.identifier.includes("@")) {
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
          console.log("applicationVerifier", applicationVerifier)
          const provider = new PhoneAuthProvider(getAuth());

          provider.verifyPhoneNumber(values.identifier, applicationVerifier)
            .then((verificationId) => {
              // Código de verificación enviado con éxito
              // Guarda verificationId para su uso posterior al verificar el código
              setVerificationId(verificationId)
              console.log('Código de verificación enviado:', verificationId);
            })
            .catch((error) => {
              // Manejo de errores
              console.error('Error al enviar el código de verificación:', error);
            });
        }
        setValues(values)
        return
      }
      if (values.identifier.includes("@")) {
        console.log("hago guardar", values)
        nextSave(values)
      }

    } catch (error) {
      console.log(error);
      if (error instanceof FirebaseError) {
        toast("error", "Ups... este correo ya esta registrado")
      } else {
        toast("error", "Ups... algo a salido mal")
      }
      setLoading(false);
    }
  };



  return (
    <>
      <Formik
        initialValues={initialValues ?? {}}
        validationSchema={validationSchema ?? {}}
        onSubmit={handleSubmit}
      >
        <Form className="w-full md:w-[350px] text-gray-200 *md:grid *md:grid-cols-2 md:gap-6 space-y-5 md:space-y-0 flex flex-col">
          <div className="h-[136px]">
            {!activeSaveRegister.state
              ? <>
                <div className="col-span-2 mb-4">
                  <InputField
                    name="identifier"
                    type="text"
                    autoComplete="off"
                    label={"Número de teléfono o correo electrónico"}
                  />
                </div>
                <div className="col-span-2">
                  <InputField
                    name="fullName"
                    type="text"
                    autoComplete="off"
                    label={"Nombre y Apellido"}
                  />
                </div>
              </>
              : <div className="w-full relative mt-6">
                <InputField
                  name="password"
                  type={activeSaveRegister.type === "password" ? passwordView ? "password" : "text" : "text"}
                  autoComplete="off"
                  label={activeSaveRegister.type === "password" ? "Contraseña" : `Código enviado al ${values?.identifier}`}
                />
                {activeSaveRegister.type === "password" && <div onClick={() => { setPasswordView(!passwordView) }} className="absolute cursor-pointer inset-y-0 top-5 right-4 m-auto w-4 h-4 text-gray-500" >
                  {!passwordView ? <Eye /> : <EyeSlash />}
                </div>}
              </div>
            }
          </div>
          <div className="flex items-center w-fit col-span-2 gap-6 mx-auto inset-x-0 ">
            <button
              id="sign-in-button"
              type="submit"
              className=" col-span-2 bg-primary rounded-full px-10 py-2 text-white font-medium mx-auto inset-x-0 md:hover:bg-tertiary transition"
            >
              {!activeSaveRegister.state ? "Registrar" : "guardar"}
            </button>
          </div>
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






