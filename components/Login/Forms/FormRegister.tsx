import { Formik, Form } from "formik";
import { FC, MouseEventHandler, useContext, useState } from "react";
import { DatePicker, InputField, SelectField } from "../../Inputs";
import { EmailIcon, LogoFullColor, PasswordIcon, UserForm } from "../../Icons";
import { Providers } from "../Components";
import { Usuario } from "../../../classes/User";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  UserCredential,
} from "@firebase/auth";
import * as yup from "yup";
import { AuthContext } from "../../../context/AuthContext";
import { UserMax } from '../../../context/AuthContext'

type TypeOption = {
  title: string;
  icon: string;
};

interface propsFirstStep {
  value: FunctionStringCallback;
}
export const FirstStep: FC<propsFirstStep> = ({ value }) => {
  const [select, setSelect] = useState<string>("");
  console.log(
    new Usuario({ nombre: "fasf", email: "fasf", contraseña: "fasf" })
  );
  const List: TypeOption[] = [
    { title: "Novia", icon: "/FormRegister/icon-women.webp" },
    { title: "Novio", icon: "/FormRegister/icon-men.webp" },
    { title: "Otro", icon: "/FormRegister/icon-heart.webp" },
    { title: "Empresa", icon: "/FormRegister/icon-business.webp" },
  ];
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h2 className="text-2xl text-primary ">¿Quien eres?</h2>
      <div className="grid grid-cols-4 gap-28">
        {List.map((item, idx) => (
          <Option
            key={idx}
            title={item?.title}
            icon={item?.icon}
            onClick={() => setSelect(item?.title)}
            color={item.title === select}
          />
        ))}
      </div>
      <button
        className={` rounded-full px-10 py-2 text-white font-medium w-max mx-auto inset-x-0 ${
          select === ""
            ? "bg-gray-200"
            : "bg-primary hover:bg-tertiary transition"
        }`}
        onClick={() => value(select)}
        disabled={select === ""}
      >
        Siguiente
      </button>
    </div>
  );
};

interface propsOption {
  icon: string;
  title: string;
  onClick: MouseEventHandler;
  color: boolean;
}
const Option: FC<propsOption> = ({ icon, title, onClick, color = false }) => {
  return (
    <>
      <div
        className={`flex flex-col items-center justify-center gap-2 ${
          color ? "selected" : "option"
        }`}
      >
        <div
          onClick={onClick}
          className="w-24 h-24 rounded-full shadow bg-color-base grid place-items-center overflow-hidden p-1 "
        >
          <img src={icon} alt={title} className="object-contain" />
        </div>
        <h2 className="text-gray-200 text-lg text-light">{title}</h2>
      </div>
      <style jsx>
        {`
          .selected {
            transform: scale(1.05);
            transition: 0.5s;
          }
          .option {
            filter: saturate(0);
            transition: 0.5s;
          }

          .option:hover {
            filter: saturate(1);
            transition: 0.5s;
            cursor: pointer;
            transform: scale(1.05);
          }
        `}
      </style>
    </>
  );
};

interface propsSecondStep {
  whoYouAre: string;
}
export const SecondStep: FC<propsSecondStep> = (props) => {
  return (
    <div className="gap-4 flex flex-col justify-center items-center">
      <LogoFullColor />
      <Providers {...props} />
      <FormRegister {...props} />
    </div>
  );
};

type MyFormValues = {
  fullName: string;
  email: string;
  password: string;
  city: string;
  country: string;
  weddingDate: Date;
  phoneNumber: string;
  role: string;
  uid: String;
};

yup.setLocale({
  mixed: {
    required: "Campo requerido",
  },
});

const validationSchema = yup.object().shape({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
  city: yup.string().required(),
  country: yup.string().required(),
  weddingDate: yup.date().required(),
  phoneNumber: yup.number().required(),
});

interface propsFormRegister {
  whoYouAre: string;
}
const FormRegister: FC<propsFormRegister> = ({ whoYouAre }) => {
  const { setUser, user } = useContext(AuthContext);
  const initialValues: MyFormValues = {
    // Envio a firebase
    fullName: "",
    email: "",
    password: "",
    //Envio a la api
    city: "",
    country: "",
    weddingDate: new Date(),
    phoneNumber: "",
    role: whoYouAre || "",
    uid: "",
  };

  const handleSubmit = async (values: MyFormValues, actions: any) => {
    try {
      actions.setSubmitting(true);
      // Autenticacion con firebase
      const auth = getAuth();
      const res : UserCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user : UserMax = res.user
      updateProfile(res.user, { displayName: values.fullName });
      setUser(user)
      // Almacenamiento en values del UID de firebase
      values.uid = res.user.uid;
      // // Request a API Graphql
      // const params = {
      //   query: `mutation crearUsuario ($uid : ID, $city: String, $country : String, $weddingDate : String, $phoneNumber : String, $role : [String]) {
      //         createUser(uid: $uid, city : $city, country : $country, weddingDate : $weddingDate, phoneNumber : $phoneNumber, role: $role){
      //               city
      //               country
      //               weddingDate
      //               phoneNumber
      //               role
      //             }
      //           }
      //         `,
      //   variables: {
      //     ...values,
      //     phoneNumber: JSON.stringify(values.phoneNumber),
      //   },
      // };
      // const { data } = await api.graphql(params);
      // const moreInfo = data.data.createUser;
      // //Almacenar en contexto USER
      // setUser({...res.user, moreInfo});
      // //Crear cookie del jwt
      // document.cookie =
      //   "auth" +
      //   "=" +
      //   ((await res.user.getIdTokenResult()).token || "") +
      //   "; path=/";
      // //Redirigir al home
      // router.push("/");
      actions.setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className="w-full text-gray-200 flex flex-col gap-8 py-4">
          <span className="w-full relative ">
            <InputField
              name="fullName"
              placeholder="Nombre y apellidos"
              type="text"
              autoComplete="off"
            />
            <UserForm className="absolute w-4 h-4 inset-y-0 left-4 m-auto" />
          </span>

          <div className="grid grid-cols-2 gap-8">
            {!user.uid && (
              <>
            <span className="w-full relative ">
              <InputField
                name="email"
                placeholder="Email"
                type="email"
                autoComplete="off"
              />
              <EmailIcon className="absolute inset-y-0 left-4 m-auto w-4 h-4" />
            </span>

            <span className="w-full relative ">
              <InputField
                name="password"
                placeholder="Contraseña"
                type="password"
                autoComplete="off"
              />
              <PasswordIcon className="absolute inset-y-0 left-4 m-auto w-4 h-4" />
            </span>
             </>
            )}

            <span className="w-full relative ">
              <InputField
                name="city"
                placeholder="Vives en"
                type="text"
                autoComplete="off"
              />
            </span>

            <span className="w-full relative ">
              <SelectField name="country" placeholder={"Pais"} />
            </span>

            <span className="w-full relative ">
              <DatePicker name={"weddingDate"} />
            </span>

            <span className="w-full relative ">
              <InputField
                name="phoneNumber"
                placeholder="Número de telefono"
                type="number"
                autoComplete="off"
              />
            </span>
          </div>

          <button
            type={"submit"}
            className="bg-primary rounded-full px-10 py-2 text-white font-medium w-max mx-auto inset-x-0 hover:bg-tertiary transition"
          >
            Registrar
          </button>
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
