import Link from "next/link";
import { FC, MouseEventHandler, ReactNode, useEffect, useState } from "react";
import { FacebookIcon, InstagramIcon, PinterestIcon, YoutubeIcon, } from "../Icons";
import { AuthContextProvider } from '../../context';

type Item = {
  title: string;
  route: string;
};

export const Footer: FC = () => {
  const { user } = AuthContextProvider()
  const [redirect, setRedirect] = useState("")
  const lowerCase = user?.role?.map((item: string) => item.toLowerCase())

  const ListInformacion: Item[] = [
    { title: "Tarifas y condiciones generales", route: "/tarifas-y-condiciones-generales" },
    { title: "Condiciones proveedores", route: "/condiciones-proveedores" },
    { title: "Privacidad", route: "/privacidad" },
    { title: "Cookies", route: "/cookies" },
  ];

  const ListEmpresa: Item[] = [

    { title: "Añadir mi empresa", route: redirect },
    { title: "Herramienta para promocionar tus servicios", route: "/magazine/categoria/actualidad/marketing-para-empresas-de-bodas" },
  ];

  const socialIcons = [
    { icon: <FacebookIcon />, link: "https://www.facebook.com/bodasdehoycom" },
    { icon: <InstagramIcon />, link: "https://www.instagram.com/bodasdehoycom/" },
    { icon: <PinterestIcon />, link: "https://www.pinterest.es/bodasdehoycom/" },
    /*  { icon: <YoutubeIcon />, link: "https://www.youtube.com/bodasdehoy" }, */
  ]

  useEffect(() => {
    if (lowerCase?.includes("empresa")) {
      setRedirect("https://cms.bodasdehoy.com/?d=business")
    } else {
      setRedirect("/info-empresa")
    }
  }, [user])

  return (
    <div className="hidden md:block bg-color-base w-full pb-8 pt-10 container mx-auto inset-x-0 max-w-screen-lg 2xl:max-w-screen-xl w-full">
      <div className="max-w-screen-lg 2xl:max-w-screen-2xl mx-auto inset-x-0">
        <div className="border-b border-primary pt-10 pb-8   ">
          <Link href={"/"} passHref>
            <img src="/logo.webp" alt={"Logo bodasdehoy.com"} className="h-7 cursor-pointer object-contain object-center hover:opacity-95 transform hover:-translate-x-1 transition duration-700" />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-6 pt-6 pb-8">
          <div className="flex gap-4">
            {socialIcons.map((item, idx) => (
              <a key={idx} href={item.link} target="_blank" rel={"noreferrer"} ><Icon icon={item.icon} /></a>
            ))}
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
    </div >
  );
};

const sizes = {
  small: "w-8 h-8",
  normal: "w-12 h-12"
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
