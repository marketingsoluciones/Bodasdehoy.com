import { FC, ReactNode, useEffect, useState } from "react";
import OrganizadorBoda from "./MultiMenu/OrganizadorBoda";
import { NoviaMenu } from "./MultiMenu/NoviaMenu";
import NovioMenu from "./MultiMenu/NovioMenu";
import Proveedores from "./MultiMenu/Proveedores";
import LugaresParaBodas from "./MultiMenu/LugaresParaBodas";
import Link from "next/link";
import { MultiMenu } from "./MultiMenu";
import Cookies from "js-cookie";
import { AuthContextProvider } from "../../context";

type Item = {
  title: string;
  titleInside?: string;
  route: string;
  component?: ReactNode;
};



export const Navbar: FC = () => {
  const [selected, setSelect] = useState<number | null>(null);
  const { user } = AuthContextProvider()
  const cookieContent = JSON.parse(Cookies.get("guestbodas") ?? "{}")
  const path = cookieContent?.eventCreated || user?.uid
    ? window.origin.includes("://test.") ? process.env.NEXT_PUBLIC_EVENTSAPP?.replace("//", "//test") ?? "" : process.env.NEXT_PUBLIC_EVENTSAPP ?? ""
    : "/welcome-app/"

  const List: Item[] = [
    {
      title: "organiza tu boda",
      route: path,
      titleInside: "Mi organizador de bodas",
      component: <OrganizadorBoda />,
    },
    { title: "Novia", route: "/categoria/novias", component: <NoviaMenu /> },
    { title: "Novio", route: "/categoria/novios", component: <NovioMenu /> },
    {
      title: "Proveedores",
      route: "/categoria/proveedores",
      component: <Proveedores />,
    },
    {
      title: "Lugares para bodas",
      route: "/categoria/lugares-para-bodas",
      component: <LugaresParaBodas />,
    },
  ];
  return (
    <nav className="flex flex-1 justify-center">
      <ul className="inline-flex sm:flex sm:flex-1 sm:justify-center  text-sm font-medium text-gray-200 z-50  space-x-[2%] sm:space-x-[2.5%] lg:space-x-[3.5%]">
        {List.map((item, idx) => (
          <div
            key={idx}
            onMouseOver={() => setSelect(idx)}
            onMouseLeave={() => setSelect(null)}
            className="justify-center">
            <ItemList {...item} />
            {idx === selected &&
              <div className="hidden lg:block">
                <MultiMenu title={List[selected].titleInside ?? List[selected].title}>
                  {List[selected]?.component}
                </MultiMenu>
              </div>
            }
          </div>
        ))}
      </ul>
    </nav>
  );
};

const ItemList: FC<Item> = ({ title, route: asd }) => {
  const [route, setRoute] = useState("")
  useEffect(() => {
    setRoute(asd)
  }, [asd])

  return (
    <Link href={route} passHref>
      <a>
        <li className="uppercase h-10 flex items-center justify-center text-center text-[11px] sm:text-[14px] lg:text-[15px] cursor-pointer relative  hover:text-tertiary transition text-gray-500 leading-none">
          {title}
        </li>
      </a>
    </Link>
  );
};