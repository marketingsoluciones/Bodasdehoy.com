import { Formik, Form } from "formik";
import { FC, useContext, Children, memo, Dispatch, SetStateAction } from "react";
import { DatePicker, InputField, SelectField } from "../../../Inputs";
import {EmailIcon,EmailIcon as PasswordIcon,EmailIcon as UserForm,} from "../../../Icons";
import {createUserWithEmailAndPassword,updateProfile,UserCredential,} from "@firebase/auth";
import * as yup from "yup";
import { UserMax } from "../../../../context/AuthContext";
import {AuthContextProvider,LoadingContextProvider,} from "../../../../context";
import router from "next/router";
import { ValidationSchemaRegister } from "./ValidationRegister";
import { GraphQL, fetchApi, queries } from "../../../../utils/Fetching";
import SelectFieldCoutries from "../../../Inputs/SelectFieldCoutries";
import { auth } from "../../../../firebase";
import { setCookie } from '../../../../utils/Cookies';
import InputCity from "../../../Inputs/InputCity";

// Interfaces para el InitialValues del formulario de registro
interface userInitialValuesPartial {
  city: string;
  country: string;
  weddingDate: Date;
  phoneNumber: string;
  role: string;
  uid: string;
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
  uid: string;
}
interface businessInitialValuesPartial {
  fullName: string;
  phoneNumber: string;
  role: string
}
interface businessInitialValuesTotal {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string
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
  setStageRegister: Dispatch<SetStateAction<number>>
  stageRegister : number
}

const FormRegister: FC<propsFormRegister> = ({ whoYouAre, setStageRegister, stageRegister }) => {
  const { setUser, user } = AuthContextProvider();
  const { setLoading } = LoadingContextProvider();

  //Initial values de cada form
  const userInitialValuesPartial: userInitialValuesPartial = {
    //Envio a la api
    city: "",
    country: "",
    weddingDate: new Date(),
    phoneNumber: "",
    role: whoYouAre || "",
    uid: "",
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
    role: whoYouAre || "",
    uid: "",
  };

  const businessInitialValuesPartial: businessInitialValuesPartial = {
    // Envio a firebase
    fullName: "",
    //Envio a la api
    phoneNumber: "",
    role: whoYouAre || "",
  };

  const businessInitialValuesTotal: businessInitialValuesTotal = {
    // Envio a firebase
    fullName: "",
    email: "",
    password: "",
    //Envio a la api
    phoneNumber: "",
    role: whoYouAre || "",
  };

  // Funcion a ejecutar para el submit del formulario
  const handleSubmit = async (values: any, actions: any) => {
    try {
      setLoading(true);
      let UserFirebase: Partial<UserMax> = user ?? {};
     

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
      const moreInfo = await fetchApi({query : queries.createUser, variables: {
        ...values,
        phoneNumber: JSON.stringify(values.phoneNumber),
      }});

      // Almacenar en contexto USER con toda la info
      setUser({ ...UserFirebase, ...moreInfo });

      // Almacenar token en localStorage
      setCookie({nombre: "token-bodas", valor: UserFirebase.accessToken, dias: 1})

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
        <Form className="w-full text-gray-200 md:grid md:grid-cols-2 md:gap-6 space-y-5 md:space-y-0 flex flex-col">
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
<div className="flex items-center w-fit col-span-2 gap-6 mx-auto inset-x-0 ">
          <button
            type={"button"}
            disabled={stageRegister === 0}
            onClick={() => setStageRegister(old => old -1)}
            className=" col-span-2 bg-gray-400  rounded-full px-10 py-2 text-white font-medium mx-auto inset-x-0 hover:bg-tertiary transition"
          >
            Atras
          </button>
          <button
            type={"submit"}
            className=" col-span-2 bg-primary rounded-full px-10 py-2 text-white font-medium mx-auto inset-x-0 hover:bg-tertiary transition"
          >
            Registrar
          </button>

</div>
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
      <div className="w-full col-span-2">
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
      </div>

        <div className="w-full relative ">
          <InputField
            name="email"
            placeholder="jhondoe@gmail.com"
            type="email"
            autoComplete="off"
            icon={
              <EmailIcon className="absolute w-4 h-4 inset-y-0 left-4 m-auto  text-gray-500" />
            }
            label={"Correo electronico"}
          />
        </div>

        <div className="w-full relative ">
          <InputField
            name="password"
            type="password"
            autoComplete="off"
            icon={
              <PasswordIcon className="absolute inset-y-0 left-4 m-auto w-4 h-4 text-gray-500" />
            }
            label={"Contraseña"}
          />
        </div>

        <div className="w-full relative ">
          <SelectFieldCoutries name="country" label={"País"} />
        </div>

        <div className="w-full relative ">
          <InputCity 
          name={"city"}
          label={"Ciudad"}
          type="text"
          />
          
        </div>

        <div className="w-full relative ">
          <DatePicker name={"weddingDate"} label={"Fecha de la boda"} />
        </div>

        <div className="w-full relative ">
          <InputField
            name="phoneNumber"
            type="number"
            autoComplete="off"
            label={"Número de telefono"}
          />
        </div>
    </>
  );
};

const UserDataAPI: FC<propsForm> = () => {
  return (
    <>
      <div className="w-full relative ">
        <InputField
          name="fullName"
          label="Nombre y apellidos"
          type="text"
          autoComplete="off"
        />
        <UserForm className="absolute w-4 h-4 inset-y-0 left-4 m-auto" />
      </div>

        <div className="w-full relative ">
          <InputField
            name="city"
            label="Vives en"
            type="text"
            autoComplete="off"
          />
        </div>

        <div className="w-full relative ">
          <SelectFieldCoutries name="country" label={"Pais"} />
        </div>

        <div className="w-full relative ">
          <DatePicker label={"Fecha de la boda"} name={"weddingDate"} />
        </div>

        <div className="w-full relative ">
          <InputField
            name="phoneNumber"
            label="Número de telefono"
            type="number"
            autoComplete="off"
          />
        </div>
    </>
  );
};

const BusinessWithEmailAndPassword: FC<propsForm> = () => {
  return (
    <>
      <div className="w-full relative ">
        <InputField
          name="fullName"
          label="Nombre y apellidos"
          type="text"
          autoComplete="off"
          icon={true}
        />
        <UserForm className="absolute w-4 h-4 inset-y-0 left-4 m-auto" />
      </div>

        <div className="w-full relative ">
          <InputField
            name="email"
            label="Correo electronico"
            type="email"
            autoComplete="off"
            icon={<EmailIcon className="absolute w-4 h-4 inset-y-0 m-auto left-4 text-gray-500" />}
          />
          
        </div>

        <div className="w-full relative ">
          <InputField
            name="password"
            label="Contraseña"
            type="password"
            autoComplete="off"
            icon={<PasswordIcon className="absolute inset-y-0 left-4 m-auto w-4 h-4 text-gray-500" />}
          />
          
        </div>

        <div className="w-full relative ">
          <InputField
            name="phoneNumber"
            label="Número de telefono"
            type="number"
            autoComplete="off"
          />
        </div>
    </>
  );
};

const BusinessDataAPI: FC<propsForm> = () => {
  return (
    <>
        <div className="w-full relative ">
          <InputField
            name="fullName"
            label="Nombre y apellidos"
            type="text"
            autoComplete="off"
          />
          <UserForm className="absolute w-4 h-4 inset-y-0 left-4 m-auto" />
        </div>

        <div className="w-full relative ">
          <InputField
            name="phoneNumber"
            label="Número de telefono"
            type="number"
            autoComplete="off"
          />
        </div>
    </>
  );
};
