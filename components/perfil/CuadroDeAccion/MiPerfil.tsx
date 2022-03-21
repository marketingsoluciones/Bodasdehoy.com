import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { Form, Formik, useFormikContext, FormikValues } from "formik";
import { useEffect, useState } from "react";
import { AuthContextProvider } from "../../../context";
import { auth } from "../../../firebase";
import { BlockConfiguration } from "../../../pages/configuracion";
import { EditIcon, IconExclamacion } from "../../Icons";
import { ButtonComponent, InputField } from "../../Inputs";

export const MiPerfil = () => {
  const { user } = AuthContextProvider();
  const initialValues = {
    Usuario: "" + -+6,
  };
  const handleSubmit = () => {
    console.log({ handleSubmit });
  };

  return (
    <div className="flex flex-col w-full gap-6 container px-5 md:px-0 pt-10 md:pt-0">
      <div className="ml-auto hidden md:block">
        <button
          className="bg-white text-primary border border-primary px-4 py-2 text-sm rounded-xl w-fit"
          type="button"
        >
          Gestor de eventos
        </button>
      </div>
      <Formik initialValues={{ email: user?.email }} onSubmit={() => {}}>
        <DatosAcceso />
      </Formik>

    </div>
  );
};

const DatosAcceso = () => {
  const { user, setUser } = AuthContextProvider();
  const { setFieldValue, values } =
    useFormikContext<{ email: string; password: string, displayName : string }>();
  const [canEditEmail, setCanEditEmail] = useState(false);
  const [canEditPassword, setCanEditPassword] = useState(false);
  const [canDisplayName, setCanDisplayName] = useState(false);

  useEffect(() => {
    setFieldValue("email", user?.email);
    setFieldValue("displayName", user?.displayName);
  }, [user]);

  const handleEditEmail = async () => {
    if (canEditEmail && auth.currentUser) {
      if(values.email !== ""){
        try {
          await updateEmail(auth?.currentUser, values?.email);
          setCanEditEmail(!canEditEmail);
        } catch (error) {
          console.log(error);
        }
      }
    } else if (!canEditEmail) {
      setCanEditEmail(!canEditEmail);
    }
  };

  const handleEditPassword = async () => {
    if (canEditPassword && auth.currentUser) {
      try {
        await updatePassword(auth.currentUser, values.password);
        setCanEditPassword(!canEditPassword);
      } catch (error) {
        console.log(error);
      }
    } else if (!canEditPassword) {
      setCanEditPassword(!canEditPassword);
    }
  };

  const handleEditDisplayName = async () => {
    if (canDisplayName && auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: values.displayName
        });
        setCanDisplayName(!canDisplayName);
        setUser(old => ({...old, displayName: values.displayName}))
      } catch (error) {
        console.log(error);
      }
    } else if (!canDisplayName) {
      setCanDisplayName(!canDisplayName);
    }
  }

  return (
    <BlockConfiguration title={"Datos de acceso"}>
      <Form className="w-full flex flex-col gap-4">
      <div className="w-full grid  flex items-center gap-2 relative">
          <InputField
            disabled={!canDisplayName}
            label={"Nombre visible"}
            name={"displayName"}
            type={"text"}
          />
          <button
            onClick={handleEditDisplayName}
            className="absolute bg-primary px-2 py-1 text-white text-xs rounded-lg w-fit right-2 top-1/2"
          >
            {canDisplayName ? "Guardar" : "Editar"}
          </button>
        </div>
        <div className="w-full grid flex items-center gap-2 relative">
          <InputField
            disabled={!canEditEmail}
            label={"Correo electronico"}
            name={"email"}
            type={"text"}
          />
          <button
            onClick={handleEditEmail}
            className="absolute bg-primary px-2 py-1 text-white text-xs rounded-lg w-fit right-2 top-1/2"
          >
            {canEditEmail ? "Guardar" : "Editar"}
          </button>
        </div>
        <div className="w-full grid  flex items-center gap-2 relative">
          <InputField
            disabled={!canEditPassword}
            label={"Cambiar Contraseña"}
            name={"password"}
            placeholder={"**********"}
            type={"text"}
          />
          <button
            onClick={handleEditPassword}
            className="absolute bg-primary px-2 py-1 text-white text-xs rounded-lg w-fit right-2 top-1/2"
          >
            {canEditPassword ? "Guardar" : "Editar"}
          </button>
        </div>
        
      </Form>
    </BlockConfiguration>
  );
};
