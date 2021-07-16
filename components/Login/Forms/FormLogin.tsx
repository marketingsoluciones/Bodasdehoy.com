import { useFormik, Field, Formik, Form } from "formik";
import { FC } from "react";
import { EmailIcon, PasswordIcon } from "../../icons";

type MyFormValues = {
    email : string
    password : any
}

const FormLogin : FC <{}> = () => {
  const initialValues : MyFormValues = {
      email : "",
      password : ""
  }

  return (
    <Formik 
        initialValues={initialValues}
        onSubmit={(values, action) => {

            alert(JSON.stringify(values))

        }}
        >
            <Form className=" text-gray-200 flex flex-col gap-4 py-4 w-3/4">
                <span className="w-full relative ">
                    <Field id="email" name="email" placeholder="email" type="email" className={`bg-base pr-3 pl-12 py-2 rounded-lg w-full focus:outline-none focus:ring`} />
                    <EmailIcon className="absolute w-4 h-4 inset-y-0 left-4 m-auto" />
                </span>

                <span className="w-full relative ">
                    <Field id="password" name="password" placeholder="contraseña" type="password" className={`bg-base pr-3 pl-12 py-2 rounded-lg w-full focus:outline-none focus:ring`} />
                    <PasswordIcon className="absolute inset-y-0 left-4 m-auto w-4 h-4" />
                </span>

                <span className="text-sm text-primary w-full text-left hover:text-gray-300 transition cursor-pointer">Olvidé mi contraseña</span>

                <button className="bg-primary rounded-full px-10 py-2 text-white font-medium w-max mx-auto inset-x-0 hover:bg-tertiary transition">Iniciar sesión</button>
            </Form>
    </Formik>
  );
};

export default FormLogin;
