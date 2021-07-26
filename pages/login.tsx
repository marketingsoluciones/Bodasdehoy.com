import { FC, ReactNode, useEffect, useState } from "react";
import ButtonClose from "../components/ButtonClose";
import router from "next/router";
import { Login, Register } from "../components/Login/Forms";


// Tipos de datos personalizados
type Forms = {
    login? : ReactNode
    register? : ReactNode
    ForgetPassword? : ReactNode
}


const PageLogin: FC = () => {
  const [stage, setStage] = useState <keyof typeof Stages>("login")
  
  const Stages : Forms = {
    login : <Login setStage={setStage} />,
    register : <Register />
}


  useEffect(() => {
    document?.addEventListener("keydown", keyDown);
  }, []);


  const keyDown: any = (event: KeyboardEvent) => {
    const keyName: string = event.key;
    keyName?.toLowerCase() === "escape" && router.push("/");
  };


  return (
    <>
      <div className="w-screen fixed h-screen top-0 left-0 grid z-20 grid-cols-5">
        <div className="bg-white col-span-3 relative flex items-center justify-center w-full ">
          <ButtonClose onClick={() => router.push("/")} />
          <div className="flex flex-col items-center gap-4 w-2/3">
              {Stages[stage]}
          </div>
        </div>
        <div className="banner w-full h-full col-span-2" />
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

