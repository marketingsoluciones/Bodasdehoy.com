import { FC, MouseEventHandler, useContext } from "react";
import { GoogleProvider, FacebookProvider, auth, AppleProvidor } from "../../firebase";
import { AppleIcon, FacebookIcon2, GoogleIcon } from "../Icons";
import { useToast } from "../../hooks/useToast";
import { LoadingContextProvider } from "../../context";
import { useAuthentication } from "../../utils/Authentication";
import { ButtonProvider } from "./Forms/ButtonProvider";


interface propsRegisterQuestion {
  onClick: MouseEventHandler;
}

interface propsResetPassword {
  onClick: MouseEventHandler;
}


export const RegisterQuestion: FC<propsRegisterQuestion> = ({ onClick }) => {
  return (
    <h2 className={`font-light text-tertiary flex gap-2 items-center text-sm `}>
      ¿No dispones de una cuenta?
      <span
        className="text-primary font-semibold cursor-pointer hover:text-tertiary transition"
        onClick={onClick}
      >
        Regístrate
      </span>
    </h2>
  );
};

export const ResetPassword: FC<propsResetPassword> = ({ onClick }) => {
  return (

    <span
      className="text-sm text-primary w-full text-left font-semibold cursor-pointer hover:text-tertiary transition"
      onClick={onClick}
    >
      Olvidé mi contraseña
    </span>

  );
};

interface propsProviders {
  setStage: any
  whoYouAre: string
}
export const Providers: FC<propsProviders> = ({ setStage, whoYouAre }) => {

  return (
    <>
      <div className={`text-center flex flex-col gap-2 w-full items-center `}>
        <div className="">
          <ButtonProvider provider="Google" handle={GoogleProvider()} setStage={setStage} whoYouAre={whoYouAre} icon={<GoogleIcon className="ml-[15px] w-[20px] h-[20px] text-gray-500" />} />
          <ButtonProvider provider="Facebook" handle={FacebookProvider} setStage={setStage} whoYouAre={whoYouAre} icon={<FacebookIcon2 className="ml-[15px] w-[20px] h-[20px] text-gray-500" />} />
          {/* <ButtonProvider provider="Apple" handle={AppleProvidor()} icon={<AppleIcon className="ml-[15px] w-[20px] h-[20px] text-gray-500" />} /> */}
        </div>
      </div>
      <style jsx>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,600;1,400;1,600&display=swap');
        `}
      </style>
    </>
  );
};

export const BusinessAccess: FC = () => {
  return (
    <div className="w-full text-center h-max text-gray-500">
      <p>¿Eres profesional?</p>
      <h3 className="text-primary font-medium cursor-pointer hover:text-tertiary transition">
        Acceso para empresas
      </h3>
    </div>
  );
};
