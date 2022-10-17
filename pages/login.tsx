import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { ButtonClose } from "../components/Inputs";
import router, { useRouter } from "next/router";
import { Login, Register, ResetPass } from '../components/Login/Forms';
import { AuthContextProvider } from "../context";
import { firebaseClient } from "../firebase"
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// Tipos de datos personalizados
type Forms = {
  login?: ReactNode;
  register?: ReactNode;
  resetPassword?: ReactNode;
  ForgetPassword?: ReactNode;
};

const PageLogin: FC = () => {
  try {
    const appCheck = initializeAppCheck(firebaseClient, {
      provider: new ReCaptchaV3Provider('6LekwcchAAAAANJHB3yv2ZOx6v8PHu2DkF-ku3J8'),

      // Optional argument. If true, the SDK automatically refreshes App Check
      // tokens as needed.
      isTokenAutoRefreshEnabled: true
    });
    console.log(234567, appCheck)
  } catch (error) {
    console.log(error)
  }
  const r = useRouter()
  const { redirect, setRedirect } = AuthContextProvider();
  useEffect(() => {
    if (r?.query?.d === "app") {
      setRedirect(process.env.NEXT_PUBLIC_EVENTSAPP ?? "")
    }
  }, [r, setRedirect]);

  const { user, userTemp, setUserTemp } = AuthContextProvider();
  const [stage, setStage] = useState<keyof typeof Stages>("login");

  const Stages: Forms = {
    login: <Login setStage={setStage} />,
    register: <Register setStage={setStage} />,
    resetPassword: <ResetPass setStage={setStage} />
  };

  const keyDown: any = useCallback((event: KeyboardEvent) => {
    const keyName: string = event.key;
    if (keyName?.toLowerCase() === "escape") {
      setTimeout(() => {
        router.push(!redirect ? "/" : redirect)
      }, 100);
    }
  }, [redirect])

  //al desmontar componente
  useEffect(() => {
    return () => {
      setUserTemp(null)
    }
  }, [setUserTemp]);

  // al entrar a login
  useEffect(() => {
    if (stage == "login") {
      setUserTemp(null)
    }
  }, [stage, setUserTemp]);

  useEffect(() => {
    user?.uid && !user.city && setStage("register");
  }, [user]);

  //monta el formulario para crear cuenta logeando con proveedor
  useEffect(() => {
    userTemp?.uid && setStage("register");
  }, [userTemp]);

  useEffect(() => {
    if (r.query) {
      document?.addEventListener("keydown", keyDown);
    }
  }, [r.query, keyDown]);

  return (
    <>
      <div className="w-screen fixed h-full top-0 left-0 md:grid z-30 grid-cols-5">
        <div className="bg-white w-full h-full col-span-3 relative flex items-center justify-center">
          <ButtonClose onClick={() => {
            setTimeout(() => {
              router.push(!redirect ? "/" : redirect)
            }, 100);
          }} />
          <div className="flex flex-col items-center gap-4 w-full px-10 md:px-0 sm:w-3/4 md:w-2/3">
            {Stages[stage]}
          </div>
        </div>
        <div className="hidden md:block banner w-full h-full col-span-2 " />
      </div>
      <style jsx>
        {`
          .banner {
            background-image: url("/banner-login.webp");
            background-size: cover;
            background-position: top;
          }
        `}
      </style>
    </>
  );
};

export default PageLogin;
