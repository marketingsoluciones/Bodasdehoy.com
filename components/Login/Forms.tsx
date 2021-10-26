import { FC, useState } from "react";
import { LogoFullColor } from "../Icons";
import { BusinessAccess, Providers, RegisterQuestion } from "./Components";
import FormLogin from "./Forms/FormLogin";
import { FirstStep, SecondStep } from "./Forms/FormRegister";

interface propsLogin {
  setStage: CallableFunction;
}
export const Login: FC<propsLogin> = ({ setStage }) => {
  return (
    <>
      <div className="flex flex-col gap-2 items-center justify-center">
        <LogoFullColor className="w-auto h-10" />
        <RegisterQuestion onClick={() => setStage("register")} />
      </div>
      <Providers />
      <FormLogin />
      <BusinessAccess />
    </>
  );
};

export const Register: FC<{}> = () => {
  const [whoYouAre, setWhoYouAre] = useState<string>("");
  return (
    <>{whoYouAre == "" ? <FirstStep value={setWhoYouAre} /> : <SecondStep />}</>
  );
};
