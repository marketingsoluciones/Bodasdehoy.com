import { FC, ReactNode, useContext, useEffect, useState } from "react";
import { ButtonClose } from "../components/Inputs";
import router from "next/router";
import { Login, Register } from '../components/Login/Forms';
import { AuthContext } from "../context/AuthContext";

// Tipos de datos personalizados
type Forms = {
  login?: ReactNode;
  register?: ReactNode;
  ForgetPassword?: ReactNode;
};

const PageLogin: FC = () => {
  const { user } = useContext(AuthContext);
  const [stage, setStage] = useState<keyof typeof Stages>("login");


  
  const Stages: Forms = {
    login: <Login setStage={setStage} />,
    register: <Register setStage={setStage} />,
  };
  
  const keyDown: any = (event: KeyboardEvent) => {
    const keyName: string = event.key;
    keyName?.toLowerCase() === "escape" && router.push("/");
  };
  
  useEffect(() => {
    user?.uid && !user.city && setStage("register");
  }, [user]);
  
  useEffect(() => {
    document?.addEventListener("keydown", keyDown);
  }, []);
  

  return (
    <>
      <div className="w-screen fixed h-screen top-0 left-0 md:grid z-30 grid-cols-5">
        <div className="bg-white w-full h-full col-span-3 relative flex items-center justify-center">
          <ButtonClose onClick={() => router.push("/")} />
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
