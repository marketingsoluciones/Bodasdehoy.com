import { Formik, Form, ErrorMessage } from "formik";
import { FC, useContext, useState } from "react";
import { api } from "../../../api";
import { AuthContext } from "../../../context/AuthContext";
import { setCookie } from "../../../utils/Cookies";
import { EmailIcon, PasswordIcon } from "../../Icons";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { InputField, ButtonComponent } from "../../Inputs";
import * as yup from "yup";
import router from "next/router";
import { GraphQL } from '../../../utils/Fetching';

type MyFormValues = {
  identifier: string;
  password: any;
  wrong: any;
};

const FormLogin: FC = () => {
  const { setUser, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const initialValues: MyFormValues = {
    identifier: "",
    password: "",
    wrong: "",
  };

  const validationSchema = yup.object().shape({});

  const errorsCode: any = {
    "auth/wrong-password": "Correo o contraseña invalida",
    "auth/too-many-requests":
      "Demasiados intentos fallidos. Intenta de nuevo más tarde",
  };
  const handleSubmit = async (values: MyFormValues, actions: any) => {
    try {
      const res = await signInWithEmailAndPassword(
        getAuth(),
        values.identifier,
        values.password
      );
      if(res.user){
        const moreInfo = await GraphQL.getUser(res.user.uid)
        setUser({...res.user, ...moreInfo});
      }
      localStorage.setItem('auth', (await res?.user?.getIdTokenResult())?.token)
      await router.push("/");
    } catch (error: any) {
      actions.setErrors({ wrong: errorsCode[error.code] });
      console.error(JSON.stringify(error));
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className=" text-gray-200 flex flex-col gap-4 py-4 w-3/4">
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
          color={"primary"}
          type="submit"
          className="mx-auto inset-x-0 px-20"
        >
          Iniciar sesión
        </ButtonComponent>
      </Form>
    </Formik>
  );
};

export default FormLogin;
