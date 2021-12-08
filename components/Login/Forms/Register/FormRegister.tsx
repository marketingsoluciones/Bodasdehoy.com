import { Formik, Form } from "formik";
import { FC, useContext, Children, memo } from "react";
import { DatePicker, InputField, SelectField } from "../../../Inputs";
import { EmailIcon, PasswordIcon, UserForm } from "../../../Icons";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  UserCredential,
} from "@firebase/auth";
import * as yup from "yup";
import { AuthContext } from "../../../../context/AuthContext";
import { UserMax } from "../../../../context/AuthContext";
import router from "next/router";
import Loading from "../../../Loading";
import { ValidationSchemaRegister } from "./ValidationRegister";
import { GraphQL } from "../../../../utils/Fetching";
import { LoadingContext } from "../../../../context/LoadingContext";

// Interfaces para el InitialValues del formulario de registro
interface userInitialValuesPartial {
  city: string;
  country: string;
  weddingDate: Date;
  phoneNumber: string;
  role: string;
  uid: String;
  typeRole: String;
}

interface userInitialValuesTotal extends userInitialValuesPartial {
  fullName: string;
  email: string;
  password: string;
  city: string;
  country: string;
  weddingDate: Date;
  phoneNumber: string;
  role: string;
  uid: String;
  typeRole: string;
}

interface businessInitialValuesPartial {
  fullName: string;
  phoneNumber: string;
}
interface businessInitialValuesTotal {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

// Set de mensajes de error
yup.setLocale({
  mixed: {
    required: "Campo requerido",
  },
});

/*
  ### Componente FormRegister(Formik) ###
  @params whoYouAre : tipo de perfil seleccionado
*/
interface propsFormRegister {
  whoYouAre: string;
}
const FormRegister: FC<propsFormRegister> = ({ whoYouAre }) => {
  const { setUser, user } = useContext(AuthContext);
  const { setLoading } = useContext(LoadingContext);

  //Initial values de cada form
  const userInitialValuesPartial: userInitialValuesPartial = {
    //Envio a la api
    city: "",
    country: "",
    weddingDate: new Date(),
    phoneNumber: "",
    role: whoYouAre || "",
    uid: "",
    typeRole: whoYouAre || "",
  };

  const userInitialValuesTotal: userInitialValuesTotal = {
    // Envio a firebase
    fullName: "",
    email: "",
    password: "",
    //Envio a la api
    city: "",
    country: "",
    weddingDate: new Date(),
    phoneNumber: "",
    role: "clientes",
    uid: "",
    typeRole: whoYouAre || "",
  };

  const businessInitialValuesPartial: businessInitialValuesPartial = {
    // Envio a firebase
    fullName: "",
    //Envio a la api
    phoneNumber: "",
  };

  const businessInitialValuesTotal: businessInitialValuesTotal = {
    // Envio a firebase
    fullName: "",
    email: "",
    password: "",
    //Envio a la api
    phoneNumber: "",
  };

  // Funcion a ejecutar para el submit del formulario
  const handleSubmit = async (values: any, actions: any) => {
    try {
      setLoading(true);
      let UserFirebase: Partial<UserMax> = user ?? {};
      const auth = getAuth();

      // Si es registro completo
      if (!user?.uid) {
        // Autenticacion con firebase
        const res: UserCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        UserFirebase = res.user;
        // Almacenamiento en values del UID de firebase
        values.uid = res.user.uid;
      } else {
        // Si existe usuario firebase pero faltan datos de ciudad, etc.
        values.uid = user?.uid;
      }

      // Actualizar displayName
      auth?.onAuthStateChanged((usuario: any): void => {
        if (usuario) {
          updateProfile(usuario, { displayName: values.fullName });
        }
      });

      // Crear usuario en MongoDB
      const moreInfo = await GraphQL.createUser({
        ...values,
        phoneNumber: JSON.stringify(values.phoneNumber),
      });

      // Almacenar en contexto USER con toda la info
      setUser({ ...UserFirebase, ...moreInfo });

      // Almacenar token en localStorage
      localStorage.setItem(
        "auth",
        UserFirebase?.accessToken ?? "Error al acceder al token"
      );

      //Redirigir al home
      await router.push("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <FormikStepper handleSubmit={handleSubmit}>
        <Form className="w-full text-gray-200 flex flex-col gap-8 py-4 w-full">
          {(() => {
            if (whoYouAre.toLowerCase() !== "empresa") {
              if (!user?.uid) {
                return (
                  <UserWithEmailAndPassword
                    initialValues={userInitialValuesTotal}
                    validationSchema={
                      ValidationSchemaRegister.userValidationTotal
                    }
                  />
                );
              } else {
                return (
                  <UserDataAPI
                    initialValues={userInitialValuesPartial}
                    validationSchema={
                      ValidationSchemaRegister.userValidationPartial
                    }
                  />
                );
              }
            } else {
              if (!user?.uid) {
                return (
                  <BusinessWithEmailAndPassword
                    initialValues={businessInitialValuesTotal}
                    validationSchema={
                      ValidationSchemaRegister.businessValidationTotal
                    }
                  />
                );
              } else {
                return (
                  <BusinessDataAPI
                    initialValues={businessInitialValuesPartial}
                    validationSchema={
                      ValidationSchemaRegister.businessValidationPartial
                    }
                  />
                );
              }
            }
          })()}

          <button
            type={"submit"}
            className="bg-primary rounded-full px-10 py-2 text-white font-medium w-max mx-auto inset-x-0 hover:bg-tertiary transition"
          >
            Registrar
          </button>
        </Form>
      </FormikStepper>
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

interface propsForm {
  initialValues: any;
  validationSchema: any;
}
const UserWithEmailAndPassword: FC<propsForm> = () => {
  return (
    <>
      <span className="w-full relative ">
        <InputField
          name="fullName"
          placeholder="Jhon Doe"
          type="text"
          autoComplete="off"
          icon={
            <UserForm className="absolute w-4 h-4 inset-y-0 left-4 m-auto" />
          }
          label={"Nombre y apellidos"}
        />
      </span>

      <div className="grid grid-cols-2 gap-8">
        <span className="w-full relative ">
          <InputField
            name="email"
            placeholder="jhondoe@gmail.com"
            type="email"
            autoComplete="off"
            icon={
              <EmailIcon className="absolute inset-y-0 left-4 m-auto w-4 h-4 text-gray-500" />
            }
            label={"Correo electronico"}
          />
        </span>

        <span className="w-full relative ">
          <InputField
            name="password"
            placeholder=""
            type="password"
            autoComplete="off"
            icon={
              <PasswordIcon className="absolute inset-y-0 left-4 m-auto w-4 h-4 text-gray-500" />
            }
            label={"Contraseña"}
          />
        </span>

        <span className="w-full relative ">
          <SelectField name="country" placeholder={"Pais"} label={"País"} />
        </span>

        <span className="w-full relative ">
          <InputField
            name="city"
            placeholder="Vives en"
            type="text"
            autoComplete="off"
            label={"Ciudad"}
          />
        </span>

        <span className="w-full relative ">
          <DatePicker name={"weddingDate"} label={"Fecha de la boda"} />
        </span>

        <span className="w-full relative ">
          <InputField
            name="phoneNumber"
            placeholder=""
            type="number"
            autoComplete="off"
            label={"Número de telefono"}
          />
        </span>
      </div>
    </>
  );
};

const UserDataAPI: FC<propsForm> = () => {
  return (
    <>
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
    </>
  );
};

const BusinessWithEmailAndPassword: FC<propsForm> = () => {
  return (
    <>
      <span className="w-full relative ">
        <InputField
          name="fullName"
          placeholder="Nombre y apellidos"
          type="text"
          autoComplete="off"
          icon={true}
        />
        <UserForm className="absolute w-4 h-4 inset-y-0 left-4 m-auto" />
      </span>

      <div className="grid grid-cols-2 gap-8">
        <span className="w-full relative ">
          <InputField
            name="email"
            placeholder="Email"
            type="email"
            autoComplete="off"
            icon={true}
          />
          <EmailIcon className="absolute inset-y-0 left-4 m-auto w-4 h-4 text-gray-500" />
        </span>

        <span className="w-full relative ">
          <InputField
            name="password"
            placeholder="Contraseña"
            type="password"
            autoComplete="off"
            icon={true}
          />
          <PasswordIcon className="absolute inset-y-0 left-4 m-auto w-4 h-4 text-gray-500" />
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
    </>
  );
};

const BusinessDataAPI: FC<propsForm> = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-8">
        <span className="w-full relative ">
          <InputField
            name="fullName"
            placeholder="Nombre y apellidos"
            type="text"
            autoComplete="off"
          />
          <UserForm className="absolute w-4 h-4 inset-y-0 left-4 m-auto" />
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
    </>
  );
};
