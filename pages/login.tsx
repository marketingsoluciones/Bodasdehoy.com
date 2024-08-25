import { FC, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { ButtonClose } from "../components/Inputs";
import router, { useRouter } from "next/router";
import { Login, Register, ResetPass } from '../components/Login/Forms';
import { AuthContextProvider } from "../context";
import { firebaseClient } from "../firebase"
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { ArrowLeft } from "../components/Icons";
import { User } from "../interfaces/FirebaseInterface";
import { useActivity } from "../hooks/useActivity";

// Tipos de datos personalizados
type Forms = {
  login?: ReactNode;
  register?: ReactNode;
  resetPassword?: ReactNode;
  ForgetPassword?: ReactNode;
};

const PageLogin: FC = () => {
  const { linkMedia, preregister } = AuthContextProvider()
  const [updateActivity, updateActivityLink] = useActivity()

  try {
    const appCheck = initializeAppCheck(firebaseClient, {
      provider: new ReCaptchaV3Provider('6LekwcchAAAAANJHB3yv2ZOx6v8PHu2DkF-ku3J8'),

      // Optional argument. If true, the SDK automatically refreshes App Check
      // tokens as needed.
      isTokenAutoRefreshEnabled: true
    });
  } catch (error) {
    console.log(error)
  }
  const r = useRouter()
  const { redirect, setRedirect } = AuthContextProvider();
  const { user, userTemp, setUserTemp } = AuthContextProvider();
  const [stage, setStage] = useState<keyof typeof Stages>("login");
  const [fStageRegister, setFStageRegister] = useState(0)
  const [stageRegister, setStageRegister] = useState(0)
  const [whoYouAre, setWhoYouAre] = useState<string>("");
  const [validProvider, setValidProvider] = useState<User | null>(null);
  const intervalRef: any = useRef();

  useEffect(() => {
    return () => {
      if (intervalRef) {
        clearInterval(intervalRef.current);
      }
    }
  }, []);

  const getInterval = (lasTime?: any) => {
    const progressInterval = setInterval(() => {
      updateActivityLink("timeStep1Step2")
    }, 5000);
    return progressInterval;
  };

  useEffect(() => {
    if (linkMedia) {
      intervalRef.current = getInterval();
    }
  }, [linkMedia]);

  useEffect(() => {
    if (preregister) {
      setStageRegister(1)
    }
  }, [preregister])

  useEffect(() => {
    if (r?.query?.q === "register") {
      setStage("register")
    }
    /////// REDIRECIONES ///////
    if (r?.query?.d === "app") {
      setRedirect(window.origin.includes("://test.") ? process.env.NEXT_PUBLIC_EVENTSAPP?.replace("//", "//test") ?? "" : process.env.NEXT_PUBLIC_EVENTSAPP ?? "")
    }
    if (r?.query?.d === "info-empresa") {
      setRedirect(`/${r?.query?.d}` ?? "")
      if (r?.query?.f === "register") {
        setStage("register")
        setFStageRegister(1)
      }
    }
    if (r?.query?.d === "cms") {
      setRedirect(window.origin.includes("://test.") ? process.env.NEXT_PUBLIC_CMS?.replace("//", "//test") ?? "" : process.env.NEXT_PUBLIC_CMS ?? "")
    }
    if (r?.query?.d !== "app" && r?.query?.d !== "info-empresa" && r?.query?.d !== "cms" && r?.query?.d !== "") {
      setRedirect(`/${r?.query?.d}` ?? "")
    }
    ///////////////////////////    
  }, [r, setRedirect]);



  const Stages: Forms = {
    login: <Login setStage={setStage} whoYouAre={whoYouAre} setWhoYouAre={setWhoYouAre} validProvider={validProvider} setValidProvider={setValidProvider} />,
    register: <Register setStage={setStage} stageRegister={stageRegister} setStageRegister={setStageRegister} whoYouAre={whoYouAre} setWhoYouAre={setWhoYouAre} validProvider={validProvider} setValidProvider={setValidProvider} />,
    resetPassword: <ResetPass setStage={setStage} whoYouAre={whoYouAre} />
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

  // useEffect(() => {
  //   user?.uid && !user.city && setStage("register");
  // }, [user]);

  // //monta el formulario para crear cuenta logeando con proveedor
  // useEffect(() => {
  //   userTemp?.uid && setStage("register");
  // }, [userTemp]);

  useEffect(() => {
    if (r.query) {
      document?.addEventListener("keydown", keyDown);
    }
  }, [r.query, keyDown]);

  const handleClose = () => {
    setTimeout(() => {
      router.push(!redirect ? "/" : redirect)
    }, 100);
  }

  return (
    <>
      <div className="w-screen fixed h-full top-0 left-0 md:grid z-30 grid-cols-5 ">
        {((!linkMedia || stageRegister !== 0) && !preregister) && <ArrowLeft className="absolute w-6 h-6 z-[10] text-gray-500 cursor-pointer translate-x-5 translate-y-5" onClick={() => {
          if (stage === "resetPassword") {
            setStage("login")
            return
          }
          if (stageRegister > 0) {
            updateActivityLink("backStep1")
            setStageRegister(stageRegister - 1)
            return
          }
          handleClose()
        }} />}
        <div className="bg-white w-full h-full col-span-3 relative flex items-center justify-center  ">
          {(!linkMedia && !preregister) && <ButtonClose onClick={handleClose} />}
          <div className="flex flex-col items-center gap-4 w-full px-10 md:px-0 sm:w-3/4 md:w-2/3  ">
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
