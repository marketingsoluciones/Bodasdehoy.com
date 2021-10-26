import { FC, forwardRef, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  BurgerIcon,
  CompanyIcon,
  LogoFullColor,
  SearchIcon,
  UserIcon,
} from "../Icons";
import { useHover } from "../../hooks";
import router from "next/router";
import { getCookie } from "../../utils/Cookies";
import { Sidebar } from "./";
import { MultiMenu } from "./MultiMenu";
import { NoviaMenu } from "./MultiMenu/NoviaMenu";

interface propsNavigation {}

export const Navigation: FC<propsNavigation> = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Sidebar
        set={(act: boolean) => setShowSidebar(act)}
        state={showSidebar}
      />
      <header className="max-w-screen-lg mx-auto inset-x-0 mt-3 absolute ">
        <MultiMenu>
          <NoviaMenu />
        </MultiMenu>
        <div className="bg-white rounded-full py-3 md:py-5 md:px-10 z-30 px-5 md:px-0 mx-auto inset-x-0 h-full flex items-center relative justify-between">
          <span
            className="md:hidden "
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <BurgerIcon className="w-7 h-7 text-primary" />
          </span>
          <Link href={"/"}>
            <span className="relative cursor-pointer hover:opacity-95 transform hover:-translate-x-1 transition duration-700 ">
              <LogoFullColor className="h-auto w-40" />
            </span>
          </Link>
          <Navbar />
          <Icons />
        </div>
      </header>
    </>
  );
};

interface propsNavbar {}

const Navbar: FC<propsNavbar> = () => {
  type Item = {
    title: string;
    route: string;
  };

  const List: Item[] = [
    { title: "Mi boda", route: "https://app.bodasdehoy.com" },
    { title: "Novia", route: "/" },
    { title: "Novio", route: "/" },
    { title: "Proveedores", route: "/" },
    { title: "Lugares para bodas", route: "/" },
  ];

  interface propsItem {
    item: Item;
  }
  const ItemList: FC<propsItem> = ({ item }) => {
    const [hoverRef, isHovered] = useHover();
    return (
      <Link href={item.route} passHref>
        <li ref={hoverRef} className="cursor-pointer relative tracking-widest hover:text-tertiary transition">
          {item.title}
          <svg
            className={`h-0.5 w-full bg-primary transform transition absolute ${
              isHovered ? "scale-100" : "scale-0"
            } `}
          />
        </li>
      </Link>
    );
  };

  return (
    <nav className="hidden lg:block">
      <ul className="flex lg:gap-6 xl:gap-6 uppercase text-sm font-medi um text-gray-200">
        {List.map((item, idx) => (
          <ItemList key={idx} item={item} />
        ))}
      </ul>
    </nav>
  );
};

export const Icons = () => {
  const HandleClickUser = () => {
    if (!getCookie("Auth")) {
      router.push("/login");
    }
  };
  return (
    <>
      <div className="flex items-center">
        <span className="hidden md:block px-3 cursor-pointer">
          <SearchIcon className="icon transition transform hover:-rotate-6 hover:scale-110 text-gray-200" />
        </span>
        <span
          className="md:px-3 border-gray-100 py-1 md:border-l md:border-r cursor-pointer"
          onClick={HandleClickUser}
        >
          <UserIcon className="icon transition transform hover:-rotate-6 hover:scale-110" />
        </span>
        <span className="hidden md:block pl-3 cursor-pointer transition transform hover:-rotate-6 hover:scale-110">
          <CompanyIcon className="icon" />
        </span>
      </div>
    </>
  );
};
