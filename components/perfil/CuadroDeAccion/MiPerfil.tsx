import { updateEmail, updatePassword, updateProfile, getAuth, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { Form, Formik, useFormikContext, FormikValues } from "formik";
import { useEffect, useState } from "react";
import { AuthContextProvider } from "../../../context";
import { auth, } from "../../../firebase";
import { BlockConfiguration } from "../../../pages/configuracion";
import { ButtonComponent, InputField } from "../../Inputs";
import { useToast } from '../../../hooks/useToast';
import Link from "next/link";
import * as yup from "yup"
import { Eye, EyeSlash } from "../../Icons";
import Cookies from "js-cookie";
import { parseJwt } from "../../../utils/Authentication";

export const MiPerfil = () => {
  const { user } = AuthContextProvider();
  const [path, setPath] = useState("")

  useEffect(() => {
    setPath(window.origin.includes("://test.") ? process.env.NEXT_PUBLIC_EVENTSAPP?.replace("//", "//test") ?? "" : process.env.NEXT_PUBLIC_EVENTSAPP ?? "")
  }, [])


  return (
    <div className="flex flex-col w-full gap-6 container ">
      <div className={`${user?.role?.includes("empresa") ? "hidden" : "ml-auto hidden md:block"}`}>
        <Link href={path} passHref>
          <button
            className="bg-white text-primary border border-primary px-4 py-2 text-sm rounded-xl w-fit"
            type="button"
          >
            Gestor de eventos
          </button>
        </Link>
      </div>
      {/* <Formik initialValues={{ email: user?.email }} onSubmit={() => { }}> */}
      <div className="w-full">
        <DatosAcceso />
      </div>
      {/*  </Formik> */}
    </div>
  );
};

const DatosAcceso = () => {
  const { user, setUser } = AuthContextProvider();
  const [canChangeDisplayName, setCanChangeDisplayName] = useState(false);
  const [canChangePassword, setCanChangePassword] = useState(false);
  const [passwordView, setPasswordView] = useState(false)
  const toast = useToast();
  const auth = getAuth();
  const initialValues = {
    email: user?.email,
    displayName: user?.displayName,
    currentPassword: "",
    password: ""
  }

  const validationSchema = yup.object().shape({
    displayName: yup.string().required("El nombre no puede estar en blanco"),
    password: yup.string().test("Unico", `Debe contener mas de 5 caractéres`, (value: any) => {
      const name = document.activeElement?.getAttribute("name")
      if (canChangePassword) {
        if (name !== "password") {
          return value?.length > 5
        } else {
          return true
        }
      }
      else {
        return true
      }
    })
  })


  const handleEditDisplayName = async (values: any, errors: any) => {
    try {
      if (!errors?.displayName) {
        setCanChangeDisplayName(!canChangeDisplayName);
        if (auth?.currentUser && values.displayName !== initialValues.displayName) {
          await updateProfile(auth?.currentUser, {
            displayName: values.displayName
          });
          setUser(old => ({ ...old, displayName: values.displayName }))
          toast("success", "Nombre actualizado con exito")
        }
      }
    } catch (error) {
      toast("warning", "Error al actualizar el nombre")
    }
  }

  const handleChangePassword = async (values: any, errors: any, setValues: any, setErrors: any) => {
    if (auth?.currentUser && canChangePassword && !errors?.password && values?.currentPassword) {
      try {
        await updatePassword(auth?.currentUser, values.password);
        const idToken = await getAuth().currentUser?.getIdToken(true)
        const dateExpire = new Date(parseJwt(idToken ?? "").exp * 1000)
        Cookies.set("idTokenV0.1.0", idToken ?? "", { domain: process.env.NEXT_PUBLIC_DOMINIO ?? "", expires: dateExpire })
        setCanChangePassword(false)
        setPasswordView(false)
        setValues({ ...values, currentPassword: "", password: "" })
        setTimeout(() => {
          setErrors({ password: "Contraseña actualizada con éxito" })
        }, 50);
        toast("success", "Contraseña actualizada con éxito")
      } catch (error) {
        console.log(123123, error)
      /*   if (error?.code === "auth/wrong-password") {
          toast("error", "Contraseña actual inválida")
        } else { */
          toast("error", "Error al cambiar la contraseña, intente nuevamente")
       /*  } */
      }
    }
  };

  return (
    <div className="flex flex-col w-full gap-6 container ">
      <Formik initialValues={initialValues} onSubmit={() => { }} validationSchema={validationSchema ?? {}}>

        {({ values, errors, setValues, setErrors }) => {
          return (
            <BlockConfiguration title={"Datos de acceso"}>
              <Form className="w-full flex flex-col gap-4">
                <div className="">
                  <InputField
                    id="email"
                    disabled
                    label={"Correo electronico"}
                    name={"email"}
                    type={"text"}
                  />
                </div>
                <div className="grid grid-cols-12 items-end gap-2">
                  <div className="col-span-10">
                    <InputField
                      id="displayName"
                      disabled={!canChangeDisplayName}
                      label={"Nombre visible"}
                      name="displayName"
                      type={"text"}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      canChangeDisplayName ? handleEditDisplayName(values, errors) : setCanChangeDisplayName(!canChangeDisplayName)
                      const element = document.getElementById("displayName")
                      setTimeout(() => {
                        element?.focus()
                      }, 50);
                      if (canChangePassword) {
                        setCanChangePassword(false)
                        setValues({ ...values, currentPassword: "", password: "" })
                      }
                    }}
                    //disabled={canChangePassword}
                    className={`${canChangeDisplayName ? "bg-green-400" : "bg-primary"} w-28 h-10 text-white text-xs rounded-lg col-span-2 justify-self-center`}>
                    {canChangeDisplayName ? "Guardar" : "Editar"}
                  </button>
                </div>
                <div className="grid grid-cols-12 items-end gap-2">
                  <div className=" col-span-10 flex md:flex-row flex-col w-full items-center md:space-x-2">
                    <div className="w-full relative ">
                      <InputField
                        id="currentPassword"
                        disabled={!canChangePassword}
                        label={"Contraseña Actual"}
                        name={"currentPassword"}
                        type={passwordView ? "password" : "text"}
                        placeholder={"**********"}
                      />
                      <div onClick={() => { setPasswordView(!passwordView) }} className="absolute cursor-pointer inset-y-0 right-4 m-auto w-4 h-4 text-gray-500 translate-y-2.5" >
                        {passwordView ? <EyeSlash /> : <Eye />}
                      </div>
                    </div>
                    <div className="w-full relative ">
                      <InputField
                        id="password"
                        disabled={!canChangePassword}
                        label={"Nuevo Contraseña"}
                        name={"password"}
                        type={passwordView ? "password" : "text"}
                        placeholder={"**********"}
                      />
                      <div onClick={() => { setPasswordView(!passwordView) }} className="absolute cursor-pointer inset-y-0 right-4 m-auto w-4 h-4 text-gray-500 translate-y-2.5" >
                        {passwordView ? <EyeSlash /> : <Eye />}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      canChangePassword ? handleChangePassword(values, errors, setValues, setErrors) : setCanChangePassword(!canChangePassword)
                      const element = document.getElementById("currentPassword")
                      setTimeout(() => {
                        element?.focus()
                      }, 50);
                      if (canChangeDisplayName) {
                        setCanChangeDisplayName(false)
                        setValues({ ...values, displayName: initialValues.displayName })
                      }
                    }}
                    //disabled={canChangeDisplayName}
                    className={`${canChangePassword ? "bg-green-400" : "bg-primary"} w-28 sm:w-28 h-10 text-white text-xs rounded-lg col-span-2 justify-self-center`}>
                    {canChangePassword ? "Actualizar" : "Editar"}
                  </button>
                </div>
              </Form>
            </BlockConfiguration>
          )
        }}
      </Formik>
    </div>
  );
  /* const { user, setUser } = AuthContextProvider();
  const { setFieldValue, values } =
    useFormikContext<{ email: string; password: string, displayName: string }>();
  const [canEditEmail, setCanEditEmail] = useState(false);
  const [canEditPassword, setCanEditPassword] = useState(false);
  const [canDisplayName, setCanDisplayName] = useState(false);
  const toast = useToast();
  const auth = getAuth();


  useEffect(() => {
    setFieldValue("email", user?.email);
    setFieldValue("displayName", user?.displayName);
  }, [user]);



  const handleEditEmail = async () => {
    if (canEditEmail && auth.currentUser) {
      if (values.email !== "") {
        try {
          await updateEmail(auth?.currentUser, values?.email);
          setCanEditEmail(!canEditEmail);
          toast("success", "Email actualizado con exito")
        } catch (error) {
          toast("error", "Error al actualizar email")
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
        toast("success", "Contraseña actualizada con exito")
        setFieldValue("password", "")
      } catch (error) {
        toast("error", "Error al actualizar la contraseña")
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
        setUser(old => ({ ...old, displayName: values.displayName }))
        toast("success", "Nombre actualizado con exito")
      } catch (error) {
        toast("success", "Error al actualizar el nombre")
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
  ); */
};
