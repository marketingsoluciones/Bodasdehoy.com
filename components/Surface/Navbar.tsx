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
  const {user } = AuthContextProvider()
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
    <>
      <nav className="hidden lg:block">
        <ul className="flex md:gap-3 lg:gap-4 xl:gap-4 text-sm font-medium text-gray-200 z-50">
          {List.map((item, idx) => (
            <div
              key={idx}
              onMouseOver={() => setSelect(idx)}
              onMouseLeave={() => setSelect(null)}
            >
              <ItemList {...item} />
              {(() => {
                if (idx === selected) {
                  return (
                    <MultiMenu
                      title={List[selected].titleInside ?? List[selected].title}
                    >
                      {List[selected]?.component}
                    </MultiMenu>
                  );
                }
              })()}
            </div>
          ))}
        </ul>
      </nav>
    </>
  );
};

const ItemList: FC<Item> = ({ title, route: asd }) => {
  const [route, setRoute] = useState("")
  useEffect(() => {
    setRoute(asd)
  }, [asd])

  return (
    <>
      <Link href={route} passHref>
        <a>
          <li className="uppercase h-10 flex items-center justify-center cursor-pointer relative  hover:text-tertiary transition text-gray-500  ">
            {title}
          </li>
        </a>
      </Link>
    </>
  );
};