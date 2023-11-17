import { Formik, Form } from "formik";
import { FC, Children, memo, Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
import { DatePicker, InputField } from "../../../Inputs";
import { EmailIcon, UserForm, Eye, EyeSlash, LockClosed, PhoneMobile, } from "../../../Icons";
import { createUserWithEmailAndPassword, updateProfile, UserCredential, getAuth, RecaptchaVerifier, PhoneAuthProvider, signInWithCredential, updatePhoneNumber, updateEmail } from "@firebase/auth";
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
  const { setUser, user, setUserTemp, userTemp, redirect, geoInfo } = AuthContextProvider();
  const { setLoading } = LoadingContextProvider();
  const { getSessionCookie, isPhoneValid } = useAuthentication();
  const toast = useToast()
  const [activeSaveRegister, setActiveSaveRegister] = useState({ state: true, type: "" })
  const [passwordView, setPasswordView] = useState(true)
  const [verificationId, setVerificationId] = useState("")
  const [values, setValues] = useState<initialValues | null>()

  const initialValues: initialValues = {
    identifier: "",
    fullName: "",
    password: "",
    phoneNumber: `+${phoneUtil.getCountryCodeForRegion(geoInfo.ipcountry)}`,
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
    password: yup.string().required("Campo requerido").test("Unico", `Debe contener entre 8 y 12 caractéres`, (value: any) => {
      const name = document.activeElement?.getAttribute("name")
      if (name !== "password") {
        return value?.length > 7 && value?.length < 11
      } else {
        return true
      }
    }),
    phoneNumber: yup.string().test("Unico", `Campo requerido`, (value: any) => {
      const name = document.activeElement?.getAttribute("name")
      if (value.length < 4) {
        return false
      } else {
        return true
      }
    }).test("Unico", `Número inválido`, (value: any) => {
      const name = document.activeElement?.getAttribute("name")
      if (name !== "phoneNumber" && value.length > 3) {
        console.log(1001, value)
        return isPhoneValid(value)
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
    try {
      /*Aquí para regsitrase con número de teléfono*/
      if (!values?.identifier.includes("@")) {
        console.log(verificationId)
        const authCredential = PhoneAuthProvider.credential(verificationId, values?.password ?? "");
        console.log(55544411, "authCredential", authCredential)
        const userCredential = await signInWithCredential(getAuth(), authCredential);
        console.log(55544422, 'verify: ', userCredential);
        UserFirebase = userCredential.user;

        await updatePhoneNumber(userCredential.user, values.phoneNumber)
      }
      /*Aquí para regsitrase con correo electrónico*/
      if (values?.identifier.includes("@")) {
        console.log("correo")
        const userCredential: UserCredential = await createUserWithEmailAndPassword(
          getAuth(),
          values?.identifier,
          values?.password
        );
        // aqui updatePhoneNumber    
        console.log(123555, userCredential)
        UserFirebase = userCredential.user;
      }

      console.log("UserFirebase", UserFirebase)
      values.uid = UserFirebase.uid;
    } catch (error: any) {
      console.log(error?.message);
      if (error instanceof FirebaseError) {
        toast("error", "Ups... este correo ya esta registrado")
      } else {
        toast("error", "Ups... algo a salido mal")
      }
      return false
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
        router.push(`${router?.query?.end}`)
        toast("success", `Inicio sesión con exito`)
      } else {
        if (router?.query?.d == "info-empresa" && moreInfo.role.includes("empresa")) {
          const path = window.origin.includes("://test.") ? process.env.NEXT_PUBLIC_CMS?.replace("//", "//test") : process.env.NEXT_PUBLIC_CMS
          router.push(path ?? "")
          toast("success", `Cuenta de empresa creada con exito`)
        }
        if (router?.query?.d == "info-empresa" && !moreInfo.role.includes("empresa")) {
          router.push("/info-empresa")
          toast("warning", `Inicio sesión con una cuenta que no es de empresa`)
        }
        if (router?.query?.d !== "info-empresa") {
          router.push(redirect ? redirect : "/")
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
        /*Aquí para regsitrase con número de teléfono*/
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
      /*Aquí para regsitrase con correo electrónico*/
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
        <Form className="w-full md:w-[350px] text-gray-200 *md:grid *md:grid-cols-2 gap-4 md:gap-5 md:space-y-0 flex flex-col">
          <div className="col-span-2">
            <InputField
              name="fullName"
              type="text"
              autoComplete="off"
              label={"Nombre y Apellido"}
              icon={<UserForm className="absolute w-4 h-4 inset-y-0 left-4 m-auto  text-gray-500" />}
            />
          </div>
          <div className="col-span-2">
            <InputField
              name="identifier"
              type="text"
              autoComplete="off"
              label={"Correo electrónico"}
              icon={<EmailIcon className="absolute w-4 h-4 inset-y-0 left-4 m-auto text-gray-500" />}
            />
          </div>
          <div className="w-full relative">
            <InputField
              name="password"
              type={passwordView ? "password" : "text"}
              autoComplete="off"
              label="Contraseña"
              icon={<LockClosed className="absolute w-4 h-4 inset-y-0 left-4 m-auto  text-gray-500" />} />
            <div onClick={() => { setPasswordView(!passwordView) }} className="absolute cursor-pointer inset-y-0 top-5 right-4 m-auto w-4 h-4 text-gray-500" >
              {!passwordView ? <Eye /> : <EyeSlash />}
            </div>
          </div>
          <span className="w-full relative ">
            <InputField
              name="phoneNumber"
              type="text"
              autoComplete="off"
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
              Registrar
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






