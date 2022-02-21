import Link from "next/link";
import router from "next/router";
import { FC, MouseEventHandler } from "react";
import { UserIcon } from "../../Icons";

const Opciones = [
  "Impresiones a tu escaparate",
  "Solicitudes recibidas",
  "Click en ver telefono",
  "Click en ver sitio web",
];


export const Menu: FC<{ onClick: CallableFunction, state: number }> = ({ onClick, state }) => {
  return (
    <ul className="col-span-1 h-full p-3 pt-7 overflow-hidden w-full text-tertiary">
      {Opciones?.map((item, idx) => (
        <li
        className={`${state === idx ? "bg-white rounded-xl" : "bg-color-base  -mt-4"}  rounded-xl transition-all  py-6 text-center text-sm`}
          key={idx}
          onClick={() => onClick(idx)}
        >
          <button className=" rounded-lg p-6 flex flex-col items-center justify-center w-full">
            <UserIcon />
            {item}
            </button>
        </li>
      ))}
    </ul>
  );
};
