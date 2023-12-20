import { Formik, Form, ErrorMessage } from "formik";
import { FC, useContext, useState } from "react";
import { EmailIcon, EmailIcon as PasswordIcon, Eye, EyeSlash, LockClosed } from "../../Icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { InputField, ButtonComponent } from "../../Inputs";
import * as yup from "yup";
import { GraphQL, fetchApi, queries } from '../../../utils/Fetching';
import { useToast } from '../../../hooks/useToast';
import { AuthContextProvider, LoadingContextProvider } from "../../../context";
import { auth } from "../../../firebase";
import { useAuthentication } from '../../../utils/Authentication';
import Desarrillo from '../../../pages/Desarrollo/index'

type MyFormValues = {
  identifier: string;
  password: any;
  wrong: any;
};

const FormLogin: FC<any> = ({ setStage }) => {
  const [passwordView, setPasswordView] = useState(false)
  const { signIn } = useAuthentication();
  const { setLoading } = LoadingContextProvider()
  const toast = useToast()
  const initialValues: MyFormValues = {
    identifier: "",
    password: "",
    wrong: "",
  };

  const errorsCode: any = {
    "auth/wrong-password": "Correo o contraseña invalida",
    "auth/too-many-requests":
      "Demasiados intentos fallidos. Intenta de nuevo más tarde",
  };

  const handleSubmit = async (values: MyFormValues, actions: any) => {
    try {
      signIn("credentials", values)
    } catch (error: any) {
      setLoading(false)
      console.error(JSON.stringify(error));
      toast("error", JSON.stringify(errorsCode[error.code]))
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className=" text-gray-200 flex flex-col gap-2 py-3 w-full *md:w-3/4 ">
        <span className="w-full relative ">
          <InputField
            label={"Correo electronico"}
            name="identifier"
            // placeholder="ingrese correo electrónico"
            icon={<EmailIcon className="absolute w-4 h-4 inset-y-0 left-4 m-auto text-gray-500" />}
            type="email"
          />

        </span>

        <span className="w-full relative ">
          <InputField
            name="password"
            type={!passwordView ? "password" : "text"}
            autoComplete="off"
            icon={<LockClosed className="absolute w-4 h-4 inset-y-0 left-4 m-auto  text-gray-500" />}
            label={"Contraseña"}
          />
          <div onClick={() => { setPasswordView(!passwordView) }} className="absolute cursor-pointer inset-y-0 top-5 right-4 m-auto w-4 h-4 text-gray-500" >
            {!passwordView ? <Eye /> : <EyeSlash />}
          </div>
        </span>
        <span className="text-sm text-red">
          <ErrorMessage name="wrong" />
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
          onClick={() => { }}
          type="submit"
          tabIndex={0}
        >
          Iniciar sesión
        </ButtonComponent>
      </Form>
    </Formik>
  );
};

export default FormLogin;