import { Field } from "formik";
import { FC, MouseEventHandler, ReactNode } from "react";
import { api } from "../../api";
import {firebaseInstance, GoogleProvider} from "../../firebase";
import { Icon } from "../Footer";
import { FacebookIcon } from "../icons";

export const Logo: FC = () => {
  return (
    <img
      src="/logo.webp"
      alt={"Logo bodasdehoy.com"}
      className={`w-72 object-contain`}
    />
  );
};

interface propsRegisterQuestion {
  onClick: MouseEventHandler;
}
export const RegisterQuestion: FC<propsRegisterQuestion> = ({ onClick }) => {
  return (
    <h2 className={`font-light text-tertiary flex gap-2 items-center `}>
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

export const Providers: FC = () => {

  const handleClickGoogle = async () => {
    try {
      const auth = firebaseInstance.auth().signInWithPopup(GoogleProvider())
      console.log(auth)
      
    } catch (error) {
      
    }

  }
  return (
    <div className={`text-center flex flex-col gap-2 w-full items-center `}>
      <h1 className="text-primary">Accede con</h1>
      <div className="gap-4 flex items-center">
        <Icon icon={<FacebookIcon />} onClick={handleClickGoogle} />
      </div>
    </div>
  );
};

export const BusinessAccess: FC = () => {
  return (
    <div className="w-full text-center h-max">
      <p className="text-gray-200">¿Eres profesional?</p>
      <h3 className="text-primary font-medium cursor-pointer hover:text-tertiary transition">
        Acceso para empresas
      </h3>
    </div>
  );
};



