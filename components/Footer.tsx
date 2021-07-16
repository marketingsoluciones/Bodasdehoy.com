import Link from "next/link";
import { FC, ReactNode } from "react";
import {
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  YoutubeIcon,
} from "./icons";

type Item = {
  title: string;
  route: string;
};

const Footer: FC = () => {
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
    <div className="bg-base w-full pb-8">
      <div className="max-w-screen-lg mx-auto inset-x-0">
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
                <Link key={idx} href={item.route}>
                  <li
                    className="text-xs text-gray-300 cursor-pointer hover:text-primary transition"
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
                <Link key={idx} href={item.route}>
                  <li
                    className="text-xs text-gray-300 cursor-pointer hover:text-primary transition"
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

export default Footer;

interface propsIcon {
  icon: ReactNode;
}

export const Icon: FC<propsIcon> = ({ icon }) => {
  return (
    <button className="border-primary border rounded-full w-12 h-12 text-primary flex items-center justify-center hover:text-white hover:bg-primary transition ">
      {icon}
    </button>
  );
};

interface propsTitle {
  title: string;
}
const Title: FC<propsTitle> = ({ title }) => {
  return <h3 className="uppercase text-gray-300 tracking-widest">{title}</h3>;
};
