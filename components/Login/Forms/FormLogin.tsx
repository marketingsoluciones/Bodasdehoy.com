import { Formik, Form, ErrorMessage } from "formik";
import { FC, useContext, useState } from "react";
import { api } from "../../../api";
import { AuthContext } from "../../../context/AuthContext";
import { setCookie } from "../../../utils/Cookies";
import { EmailIcon, PasswordIcon } from "../../Icons";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { InputField, ButtonComponent } from "../../Inputs";

type MyFormValues = {
  identifier: string;
  password: any;
  wrong: any;
};

const FormLogin: FC = () => {
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const initialValues: MyFormValues = {
    identifier: "",
    password: "",
    wrong: "",
  };

  const handleSubmit = async (values: MyFormValues, actions: any) => {
    try {
      console.log(actions);
      actions.setErrors({ wrong: "Correo o contraseña invalidad. Favor intentar de nuevo" });
      const res: any = await signInWithEmailAndPassword(
        getAuth(),
        values.identifier,
        values.password
      );

      console.log(res);
      // const user: any = {
      //   jwt: res?.user?.accessToken,
      // };
      // setCookie({ nombre: "Auth", valor: user.jwt, dias: 1 });
      // router.push("/");
      // setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className=" text-gray-200 flex flex-col gap-4 py-4 w-3/4">
        <span className="w-full relative ">
          <InputField name="identifier" placeholder="email" type="email" />
          <EmailIcon className="absolute w-4 h-4 inset-y-0 left-4 m-auto" />
        </span>

        <span className="w-full relative ">
          <InputField
            name="password"
            placeholder="contraseña"
            type="password"
          />
          <PasswordIcon className="absolute inset-y-0 left-4 m-auto w-4 h-4" />
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
