import { FC, useState } from "react";
import { BusinessAccess, Logo, Providers, RegisterQuestion } from "./Components";
import FormLogin from "./Forms/FormLogin";
import { FirstStep, SecondStep } from "./Forms/FormRegister";


interface propsLogin {
  setStage : CallableFunction
}
export const Login : FC <propsLogin> = ({setStage}) => {
  return (
    <>
      <Logo />
      <RegisterQuestion onClick={() => setStage("register")}/>
      <Providers />
      <FormLogin />
      <BusinessAccess />
    </>
  );
};

export const Register : FC <{}> = () => {
  const [whoYouAre, setWhoYouAre] = useState<string>("")
  return (
      <>
      {whoYouAre == "" ? (
          <FirstStep value={setWhoYouAre} />
      ) : <SecondStep /> }
    </>
  );
};
