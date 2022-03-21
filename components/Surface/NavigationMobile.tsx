import React, { ReactNode, useState, cloneElement } from "react";
import {
  BurgerIcon,
  CompanyIcon,
  CrossIcon,
  HomeIcon,
  LightBulb,
  MessageIcon,
  PlusCircle,
  UserIcon,
} from "../Icons";
import Image from "next/image";
import Logo from "../../public/logo.webp";
import { Icons } from "./Navigation";
import { Sidebar } from "./";
import { AuthContextProvider, ChatContextProvider } from "../../context";
import Link from "next/link";
import { useToast } from '../../hooks/useToast';

export const NavigationMobile = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { user } = AuthContextProvider();
  const {setShow, show} = ChatContextProvider()
  const toast = useToast()
  interface button {
    icon: any;
    route: string;
  }
  const buttons: button[] = [
    { icon: <HomeIcon className="w-9 h-9" />, route: "/" },
    {
      icon: <LightBulb className="w-10 h-10" />,
      route: "https://app.bodasdehoy.com",
    },
    {
      icon: <PlusCircle className="w-10 h-10 text-gray-800" />,
      route: user?.role && user?.role?.length > 0 && user?.role[0] === "empresa" ? "/empresa/crear-empresa" : "/categoria/lugares-para-bodas",
    },
  ];
  return (
    <>
      <div className="bg-white fixed bottom-0 z-50 w-full px-6 py-4 sm:hidden flex items-center justify-between gap-1 text-gray-400">
        {buttons.map((item, idx) => (
          <Link key={idx} href={item.route} passHref>
            <button>{cloneElement(item.icon)}</button>
          </Link>
        ))}

        <button onClick={() => {
          if(user){
            setShow(!show)
          } else {
            toast("warning", "Debes iniciar sesión para ver tus chats")
          }
        }}>
          <MessageIcon className="w-8 h-8" />
        </button>

        {!user ? (
            <Link href={"/login"} passHref>
            <button>
            <UserIcon className="w-8 h-8" />
        </button>
            </Link>
        ) : (
          <Link href={"/configuracion"} passHref>
            <button>
              <img
                alt={user?.displayName ?? "nombre"}
                src={user.photoURL ?? "/placeholder/user.png"}
                className="w-10 h-10 border border-primary rounded-full cursor-pointer"
              />
            </button>
          </Link>
        )}
      </div>
    </>
  );
};
