import { FC, ReactNode, useState } from "react";
import OrganizadorBoda from "./MultiMenu/OrganizadorBoda";
import { NoviaMenu } from "./MultiMenu/NoviaMenu";
import NovioMenu from "./MultiMenu/NovioMenu";
import Proveedores from "./MultiMenu/Proveedores";
import LugaresParaBodas from "./MultiMenu/LugaresParaBodas";
import Link from "next/link";
import { MultiMenu } from "./MultiMenu";

type Item = {
  title: string;
  titleInside?: string;
  route: string;
  component?: ReactNode;
};

const List: Item[] = [
  {
    title: "organiza tu boda",
    route: "/welcome-app",
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

export const Navbar: FC = () => {
  const [selected, setSelect] = useState<number | null>(null);

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

const ItemList: FC<Item> = ({ title, route }) => {
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