import Link from "next/link";
import { FC, MouseEventHandler, ReactNode } from "react";
import {
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  YoutubeIcon,
} from "../Icons";

type Item = {
  title: string;
  route: string;
};

export const Footer: FC = () => {
  const ListInformacion: Item[] = [
    { title: "Tarifas y condiciones generales", route: "/" },
    { title: "Condiciones proveedores", route: "/" },
    { title: "Condiciones generales", route: "/" },
    { title: "Privacidad", route: "/" },
    { title: "FAQ", route: "/" },
    { title: "Contacto", route: "/" },
  ];

  const ListEmpresa: Item[] = [
    { title: "Añadir mi empresa", route: "/" },
    { title: "Herramienta para promocionar tus servicios", route: "/" },
  ];

  return (
    <div className="hidden md:block bg-color-base w-full pb-8 pt-10 container mx-auto inset-x-0 max-w-screen-lg 2xl:max-w-screen-xl">
      <div className="max-w-screen-lg 2xl:max-w-screen-2xl mx-auto inset-x-0">
        <div className="border-b border-primary pt-10 pb-8">
          <img src="/logo.webp" alt={"Logo bodasdehoy.com"} className="h-7 object-contain object-center" />
        </div>
        <div className="grid grid-cols-3 gap-6 pt-6 pb-8">
          <div className="flex gap-4">
            <Icon icon={<FacebookIcon />} />
            <Icon icon={<InstagramIcon />} />
            <Icon icon={<PinterestIcon />} />
            <Icon icon={<YoutubeIcon />} />
          </div>
          <div className="w-full">
            <Title title={"Información"} />
            <ul className="flex flex-col gap-1 pt-4 w-full">
              {ListInformacion.map((item, idx) => (
                <Link key={idx} href={item.route} passHref>
                  <li
                    className="text-xs text-gray-700 cursor-pointer hover:text-primary transition"
                  >
                    {item.title}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div className="w-full">
            <Title title={"Añade tu empresa"} />
            <ul className="flex flex-col gap-1 pt-4 w-full">
              {ListEmpresa.map((item, idx) => (
                <Link key={idx} href={item.route} passHref>
                  <li
                    className="text-xs text-gray-700 cursor-pointer hover:text-primary transition"
                  >
                    {item.title}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};


const sizes = {
  small : "w-8 h-8",
  normal : "w-12 h-12"
}

interface propsIcon {
  icon: ReactNode
  onClick?: MouseEventHandler
  size?: keyof typeof sizes
}


export const Icon: FC<propsIcon> = ({ icon, onClick, size = "normal" }) => {
  
  return (
    <button onClick={onClick} className={`border-primary border rounded-full ${sizes[size]} text-primary flex items-center justify-center hover:text-white hover:bg-primary transition  `}>
      {icon}
    </button>
  );
};

interface propsTitle {
  title: string;
}
const Title: FC<propsTitle> = ({ title }) => {
  return <h3 className="uppercase text-gray-700 tracking-widest">{title}</h3>;
};
