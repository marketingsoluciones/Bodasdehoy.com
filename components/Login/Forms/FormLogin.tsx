import { Field, Formik, Form } from "formik";
import router from "next/router";
import { FC, useContext } from "react";
import { api } from "../../../api";
import { AuthContext } from "../../../context/AuthContext";
import { setCookie } from "../../../utils/Cookies";
import { EmailIcon, PasswordIcon } from "../../icons";
import { getAuth, signInWithEmailAndPassword, updateProfile} from 'firebase/auth'
type MyFormValues = {
    identifier : string
    password : any
}

const FormLogin : FC <{}> = () => {
    const {setUser} = useContext(AuthContext)
  const initialValues : MyFormValues = {
      identifier : "",
      password : ""
  }
  

  return (
    <Formik 
        initialValues={initialValues}
        onSubmit={ async (values, action) => {
            try {
               const res : any = await signInWithEmailAndPassword(getAuth(), values.identifier, values.password);
               const user = {
                   jwt : res?.user?.Aa,
                   user : {
                       uid : res?.user?.uid,
                       username : res?.user?.displayName,
                       email: res?.user?.email,
                       emailVerified: res?.user?.emailVerified,
                       creationTime: res?.user?.metadata?.a,
                       lastSignInTime : res?.user?.lastSignInTime,
                       phoneNumber: res?.user?.phoneNumber,
                       photoURL: res?.user?.photoURL
                   }
               }
               //setCookie({nombre:"Auth", valor:jwt, dias:1})
               //router.push("/")
               //setUser(user)
            } catch (error) {
                console.error(error)
            }
        }}
        >
            <Form className=" text-gray-200 flex flex-col gap-4 py-4 w-3/4">
                <span className="w-full relative ">
                    <Field id="identifier" name="identifier" placeholder="email" type="email" className={`bg-base pr-3 pl-12 py-2 rounded-lg w-full focus:outline-none focus:ring`} />
                    <EmailIcon className="absolute w-4 h-4 inset-y-0 left-4 m-auto" />
                </span>

                <span className="w-full relative ">
                    <Field id="password" name="password" placeholder="contraseña" type="password" className={`bg-base pr-3 pl-12 py-2 rounded-lg w-full focus:outline-none focus:ring`} />
                    <PasswordIcon className="absolute inset-y-0 left-4 m-auto w-4 h-4" />
                </span>

                <span className="text-sm text-primary w-full text-left hover:text-gray-300 transition cursor-pointer">Olvidé mi contraseña</span>

                <button type="submit" className="bg-primary rounded-full px-10 py-2 text-white font-medium w-max mx-auto inset-x-0 hover:bg-tertiary transition">Iniciar sesión</button>
            </Form>
    </Formik>
  );
};

export default FormLogin;
