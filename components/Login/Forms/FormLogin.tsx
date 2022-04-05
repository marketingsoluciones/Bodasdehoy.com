import { Formik, Form, ErrorMessage } from "formik";
import { FC, useContext, useState } from "react";
import { EmailIcon, EmailIcon as PasswordIcon } from "../../Icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { InputField, ButtonComponent } from "../../Inputs";
import * as yup from "yup";
import router from "next/router";
import { GraphQL, fetchApi, queries } from '../../../utils/Fetching';
import { useToast } from '../../../hooks/useToast';
import { AuthContextProvider, LoadingContextProvider } from "../../../context";
import { auth } from "../../../firebase";
import { setCookie } from "../../../utils/Cookies";
import { useAuthentication } from '../../../utils/Authentication';

type MyFormValues = {
  identifier: string;
  password: any;
  wrong: any;
};

const FormLogin: FC = () => {
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
      <Form className=" text-gray-200 flex flex-col gap-4 py-4 w-full md:w-3/4">
        <span className="w-full relative ">
          <InputField label={"Correo electronico"} name="identifier" placeholder="jhondoe@gmail.com" type="email" icon={<EmailIcon className="absolute w-4 h-4 inset-y-0 left-4 m-auto text-gray-500" />} />
          
        </span>

        <span className="w-full relative ">
          <InputField
            name="password"
            placeholder="******"
            type="password"
            icon={<PasswordIcon className="absolute inset-y-0 left-4 m-auto w-4 h-4 text-gray-500" />}
            label={"Contraseña"}
          />
        </span>
        <span className="text-sm text-red">
          <ErrorMessage name="wrong" />
        </span>
        <span className="text-sm text-primary w-full text-left hover:text-gray-300 transition cursor-pointer">
          Olvidé mi contraseña
        </span>

        <ButtonComponent
          onClick={() => {}}
          type="submit"
        >
          Iniciar sesión
        </ButtonComponent>
      </Form>
    </Formik>
  );
};

export default FormLogin;
