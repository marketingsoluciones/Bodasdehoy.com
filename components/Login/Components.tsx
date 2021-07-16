import { Field } from "formik";
import { FC, MouseEventHandler, ReactNode } from "react";
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
  return (
    <div className={`text-center flex flex-col gap-2 w-full items-center `}>
      <h1 className="text-primary">Accede con</h1>
      <div className="gap-4 flex items-center">
        <Icon icon={<FacebookIcon />} />
        <Icon icon={<FacebookIcon />} />
        <Icon icon={<FacebookIcon />} />
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

interface propsInputField {
    id : string
    name: string
    placeholder : string
    type : string
    icon?: ReactNode
}
export const InputField : FC <propsInputField> = ({id, name, placeholder, type, icon}) => {
  return (
    <span className="w-full relative ">
      <Field
        id="email"
        name="email"
        placeholder="Email"
        type="email"
        className={`bg-base pr-3 pl-12 py-2 rounded-lg w-full focus:outline-none focus:ring`}
      />
     {icon}
    </span>
  );
};

