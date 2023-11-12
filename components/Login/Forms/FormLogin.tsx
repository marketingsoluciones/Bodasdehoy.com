import { Formik, Form, ErrorMessage } from "formik";
import { FC, useContext, useState } from "react";
import { EmailIcon, EmailIcon as PasswordIcon, Eye, EyeSlash, LockClosed } from "../../Icons";
import { PhoneAuthProvider, RecaptchaVerifier, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { InputField, ButtonComponent } from "../../Inputs";
import * as yup from "yup";
import { GraphQL, fetchApi, queries } from '../../../utils/Fetching';
import { useToast } from '../../../hooks/useToast';
import { AuthContextProvider, LoadingContextProvider } from "../../../context";
import { auth } from "../../../firebase";
import { phoneUtil, useAuthentication } from '../../../utils/Authentication';
import Desarrillo from '../../../pages/Desarrollo/index'

type MyFormValues = {
  identifier: string;
  password: any;
  wrong: any;
};

const FormLogin: FC<any> = ({ setStage }) => {
  const [passwordView, setPasswordView] = useState(false)
  const { signIn, isPhoneValid, } = useAuthentication();
  const { setLoading } = LoadingContextProvider()
  const { geoInfo } = AuthContextProvider()
  const [activeLogin, setActiveLogin] = useState({ state: false, type: "" })
  const toast = useToast()
  const [verificationId, setVerificationId] = useState("")
  const [values, setValues] = useState<MyFormValues | null>()
  const initialValues: MyFormValues = {
    identifier: "",
    password: "",
    wrong: "",
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
    password: yup.string().test("Unico", `Código inválido`, async (value: any) => {
      //const name = document.activeElement?.getAttribute("name")
      if (activeLogin.state
        //  && name !== "password"
      ) {
        if (activeLogin.type !== "password" && value?.length === 6) {
          console.log(222555, value)
          console.log(values && { ...values, password: value })
          const resp = await signIn("phone", values && { ...values, password: value }, verificationId)
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

  const errorsCode: any = {
    "auth/wrong-password": "Correo o contraseña invalida",
    "auth/too-many-requests":
      "Demasiados intentos fallidos. Intenta de nuevo más tarde",
  };

  const handleSubmit = async (values: MyFormValues, actions: any) => {
    try {
      console.log(values)
      console.log(values.identifier.includes("@"))
      if (!activeLogin.state) {
        setActiveLogin({ state: true, type: values.identifier.includes("@") ? "password" : "text" })
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

      signIn("credentials", values)
    } catch (error: any) {
      setLoading(false)
      console.error(JSON.stringify(error));
      toast("error", JSON.stringify(errorsCode[error.code]))
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema ?? {}} onSubmit={handleSubmit}>
      <Form className=" text-gray-200 flex flex-col gap-2 py-3 w-full *md:w-3/4 ">
        {!activeLogin.state
          ? <span className="w-full relative mt-2 mb-6">
            <InputField
              label={"Número de teléfono o correo electrónico"}
              name="identifier"
              autoComplete="off"
              // placeholder="ingrese correo electrónico"
              //icon={<EmailIcon className="absolute w-4 h-4 inset-y-0 left-4 m-auto text-gray-500" />}
              type="text"
            />

          </span>
          : <span className="w-full relative mt-2 mb-6">
            <InputField
              name="password"
              type={!passwordView ? "password" : "text"}
              autoComplete="off"
              //icon={<LockClosed className="absolute w-4 h-4 inset-y-0 left-4 m-auto  text-gray-500" />}
              label={activeLogin.type === "password" ? `Contraseña: ${values?.identifier}` : `Código enviado a ${values?.identifier}`}
            />
            <div onClick={() => { setPasswordView(!passwordView) }} className="absolute cursor-pointer inset-y-0 top-5 right-4 m-auto w-4 h-4 text-gray-500" >
              {activeLogin.type === "password" && <div onClick={() => { setPasswordView(!passwordView) }} className="absolute cursor-pointer inset-y-0 w-4 h-4 text-gray-500" >
                {!passwordView ? <Eye /> : <EyeSlash />}
              </div>}
            </div>
          </span>}
        <span className="text-sm text-red">
          {/* <ErrorMessage name="wrong" /> */}
        </span>
        {/*  <span 
          className="text-sm text-primary w-full text-left hover:text-gray-300 transition cursor-pointer"
          >
          Olvidé mi contraseña
        </span> */}

        <div onClick={() => setStage("resetPassword")} className="text-sm text-primary w-full text-left hover:text-gray-300 transition cursor-pointer">
          Olvidé mi contraseña
        </div>
        <ButtonComponent
          id='sign-in-button'
          // onClick={() => { }}
          type="submit"
          tabIndex={0}
        >
          {!activeLogin.state ? "Siguiente" : "Iniciar sección"}
        </ButtonComponent>


      </Form>
    </Formik>
  );
};

export default FormLogin;
