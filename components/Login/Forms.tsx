import { FC, useEffect, useState } from "react";
import { LogoFullColor } from "../Icons";
import { BusinessAccess, Providers, RegisterQuestion, ResetPassword } from "./Components";
import FormLogin from "./Forms/FormLogin";
import FormResetPassword from "./Forms/FormResetPassword";
import { FirstStep, SecondStep } from "./Forms/Register/Steps";
import PageLogin from "../../pages/login"
import { AuthContextProvider } from "../../context";

interface propsLogin {
  fStageRegister?: any
  setStage: CallableFunction;
  stageRegister?: any
  setStageRegister?: any
  whoYouAre: string
  setWhoYouAre?: any
  validProvider?: any
  setValidProvider?: any
}

export const Login: FC<propsLogin> = ({ setStage, whoYouAre, setWhoYouAre, validProvider, setValidProvider }) => {
  useEffect(() => {
    setWhoYouAre("")
  }, [])


  return (
    <>
      <div className="h-full">
        <div className="flex flex-col items-center justify-center w-full">
          <LogoFullColor className="w-auto h-10" />
        </div>
        <h2 className={`font-light text-tertiary flex items-center text-md `}>
          Accede a tu cuenta
        </h2>
        <Providers setStage={setStage} whoYouAre={whoYouAre} validProvider={validProvider} setValidProvider={setValidProvider} />
        <h2 className={`font-light w-full text-tertiary text-center text-md `}>
          ó
        </h2>
        <FormLogin setStage={setStage} />
        <RegisterQuestion onClick={() => setStage("register")} />
        {/* <BusinessAccess /> */} {/* componente que no esta terminado */}
      </div>
    </>
  );
};

export const Register: FC<propsLogin> = ({ setStage, fStageRegister, stageRegister, setStageRegister, whoYouAre, setWhoYouAre, validProvider, setValidProvider }) => {
  const { linkMedia, preregister } = AuthContextProvider()

  useEffect(() => {
    setWhoYouAre(fStageRegister == 1 ? "empresa" : "")
  }, [])

  return (
    <>
      {(() => {
        switch (stageRegister) {
          case 0:
            return <FirstStep setStageRegister={setStageRegister} value={setWhoYouAre} validProvider={validProvider} />
            break;
          case 1:
            return <SecondStep setStageRegister={setStageRegister} stageRegister={stageRegister} whoYouAre={whoYouAre} setStage={setStage} validProvider={validProvider} setValidProvider={setValidProvider} />
            break;
          default:
            return <PageLogin />
            break;
        }
      })()}

      {(!linkMedia && !preregister) && <h2 className={`font-light text-tertiary flex gap-2 items-center text-sm `}      >
        ¿Dispones de una cuenta?
        <span
          className="text-sm text-primary font-semibold cursor-pointer hover:text-tertiary transition"
          onClick={() => {
            setStageRegister(0)
            setStage("login")
          }}
        >
          Inicia Sesión
        </span>
      </h2>}
    </>
  );
};

export const ResetPass: FC<propsLogin> = ({ setStage }) => {
  return (
    <>
      <div className="flex flex-col gap-2 items-center justify-center w-full">
        <LogoFullColor className="w-auto h-10" />
      </div>
      <FormResetPassword setStage={setStage} />
      <h2
        className={`font-light text-tertiary flex gap-2 items-center text-sm `}
      >
        ¿Dispones de una cuenta?
        <span
          className="text-sm text-primary font-semibold cursor-pointer hover:text-tertiary transition"
          onClick={() => setStage("login")}
        >
          Inicia Sesión
        </span>
      </h2>
      {/* <BusinessAccess /> */} {/* componente que no esta terminado */}
    </>
  );
};