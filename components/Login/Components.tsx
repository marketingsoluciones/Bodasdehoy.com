import { FC, MouseEventHandler, useContext } from "react";
import { GoogleProvider, FacebookProvider, auth } from "../../firebase";
import { Icon } from "../Surface/Footer";
import { AppleIcon, FacebookIcon, GoogleIcon } from "../Icons";
import { signInWithPopup, UserCredential } from "firebase/auth";
import router from "next/router";
import { GraphQL, fetchApi, queries } from "../../utils/Fetching";
import { useToast } from "../../hooks/useToast";
import { AuthContextProvider, LoadingContextProvider } from "../../context";
import { setCookie } from "../../utils/Cookies";
import { api } from "../../api";
import { useAuthentication } from "../../utils/Authentication";
import Script from 'next/script'


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


export const Providers: FC<any> = ({ setStage }) => {


  const { signIn } = useAuthentication();
  const toast = useToast();
  const { setLoading } = LoadingContextProvider();

  const handleClick = async (provider: any) => {
    try {
      signIn("provider", provider);
    } catch (error) {
      setLoading(false);
      toast("error", JSON.stringify(error));
      console.log("este es un error en el onClick de los listProviders", error);
    }
  };

  /* const ListProviders = [
    {
      icon: <FacebookIcon className="w-5 h-5" />,
      function: () => handleClick(FacebookProvider),
    },
    {
      icon: <GoogleIcon className="w-5 h-5" />,
      function: () => handleClick(GoogleProvider()),
    },
    {
      icon: <AppleIcon className="w-5 h-5" />,
      function: () => alert("Aun por configurar"),
    },
  ]; */

  return (
    <>
      <div className={`text-center flex flex-col  w-full items-center `}>
        <h1 className="text-primary">O INICIA SESIÓN CON</h1>
        {/* <div className="gap-4 flex items-center">
        {ListProviders.map((item, idx) => (
          <Icon key={idx} icon={item.icon} onClick={item.function} />
        ))}
      </div> */}
        <div className="gap-4 flex flex-col items-center  ">
          {/* <span className="h-10 w-10 bgColorFc  flex items-center justify-center rounded  ">
            <button onClick={() => handleClick(FacebookProvider)} className="facebookBtn" />
          </span> */}

          <div id="fb-root"></div>
          <Script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v15.0&appId=425820955983251&autoLogAppEvents=1" nonce="74ygxeMN"></Script>

          <div className="fb-login-button  w-44 " data-width="" data-size="medium" data-button-type="login_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false"></div>

          <span className="  w-48  flex items-center justify-center rounded ">
            <button onClick={() => handleClick(GoogleProvider())} className="">
              <img src="googlebtnpn.png" alt="" className="        " />
            </button>
          </span>

          <span className=" w-48  flex items-center justify-center raunded ">
            <button onClick={() => alert("AUN POR CONFIGURAR")} className="">
              <img src="applebtnpng.png" alt="" />
            </button>
          </span>
        </div>
      </div>
      {/* <style jsx>
        {`
          .googleBtn {
            //background-image: url("/googlenew.svg");
            width: 50%;
            height: 50%;
            opacity: 1;
            background-repeat: no-repeat;
            }
          .facebookBtn {
            background-image: url("/facebook-logo-white.svg");
            width: 17px;
            height: 18px;
            opacity: 1;
            background-repeat: no-repeat;
            psition: absolute;
          }
          .bgColorFc{
            background-color:#1877F2
            
          }
          .AppleBtn {
            background-image: url("/apple-logo-black.svg");
            width: 15px;
            height: 19px;
            opacity: 1;
            background-repeat: no-repeat;
            psition: absolute;
          }
        `}
      </style> */}
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
