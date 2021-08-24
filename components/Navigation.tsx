import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../public/logo.webp";
import { CompanyIcon, SearchIcon, UserIcon } from "./icons";
import useHover from "../hooks/useHover";
import router from "next/router";
import { getCookie } from "../utils/Cookies";


interface propsNavigation {

}

const Navigation: FC<propsNavigation> = () => {
  return (
    <>
      <header className="hidden md:block w-full nuevo sm:max-w-screen-sm md:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl mx-auto inset-x-0 bg-white relative h-20 md:h-20 z-20 ">
        <div className="px-5 md:px-0 mx-auto inset-x-0 h-full flex items-center relative z-10 justify-between">
          <Image
            src={Logo}
            alt={"Logo bodasdehoy.com"}
            width={190}
            objectFit={"contain"}
          />
          <Navbar />
          <Icons />
        </div>
      </header>
      <style jsx>
        {`
          @media (max-width: 1000px) {
              .nuevo {
                background-color: white
              }
          }

            .nuevo::before {
                content: "";
                background-image: url("/navbar.svg");
                background-size: contain;
                background-repeat: no-repeat;
                position: absolute;
                width: 70px;
                height: 100%;
                z-index: 0;
                top: 0;
                left: 0;
                transform: translate(-50px);
              }

              .nuevo::after {
                content: "";
                background-image: url("/navbar_1.svg");
                background-size: contain;
                background-repeat: no-repeat;
                position: absolute;
                width: 70px;
                height: 100%;
                z-index: 0;
                top: 0;
                right: 0;
                transform: translate(100%) ;
                
              }
        `}
      </style>
    </>
  );
};

export default Navigation;

const Navbar = () => {
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
      const [hoverRef, isHovered] = useHover()
    return (
      <Link href={item.route}>
        <li ref={hoverRef} className="cursor-pointer relative">{item.title}
        <svg className={`h-0.5 w-full bg-primary transform transition absolute ${isHovered ? "scale-100" : "scale-0"}`}/>
            </li>
      </Link>
    );
  };

  return (
    <nav className="hidden lg:block">
      <ul className="flex lg:gap-8 xl:gap-12 uppercase text-sm font-medium text-gray-200">
        {List.map((item, idx) => (
          <ItemList key={idx} item={item} />
        ))}
      </ul>
    </nav>
  );
};

export const Icons = () => {

  const HandleClickUser = () => {
    if(!getCookie("Auth")) {
      router.push("/login")
    }
    
  }
  return (
    <>
      <div className="flex items-center">
        <span className="hidden md:block px-3 cursor-pointer">
          <SearchIcon className="icon transition transform hover:scale-105 text-gray-200" />
        </span>
        <span className="px-3 md:border-gray-100 md:border-l border-r cursor-pointer" onClick={HandleClickUser}>
          <UserIcon className="icon transition transform hover:scale-105" />
        </span>
        <span className="px-3 cursor-pointer transition transform hover:scale-105">
          <CompanyIcon className="icon" />
        </span>
      </div>
    </>
  );
};
