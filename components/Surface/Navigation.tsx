import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import {
  ArrowIcon,
  BurgerIcon,
  CompanyIcon,
  LogoFullColor,
  SearchIcon,
  UserIcon,
  CarIcon
} from "../Icons";
import router from "next/router";
import { Sidebar } from "./";
import { MultiMenu } from "./MultiMenu";
import { NoviaMenu } from "./MultiMenu/NoviaMenu";
import { useHover } from "../../hooks/useHover";
import { autenticacion } from "../../utils/Authentication";
import { LoadingContextProvider, AuthContextProvider } from "../../context";

const initialSelected = {
  ["Lugares para bodas"]: false,
  ["Mi boda"]: false,
  ["Novio"]: false,
  ["Novia"]: false,
  ["Proveedores"]: false,
};

export const Navigation: FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selected, setSelect] = useState<any>(initialSelected);
  const [state, setState] = useState<any>("");

  type DicCategories = {
    Novia: ReactNode;
  };
  const categories: DicCategories = {
    Novia: <NoviaMenu />,
  };

  useEffect(() => {
    const select = Object.entries(selected).find((el) => el[1] === true)?.[0];
    setState(select);
  }, [selected]);
  
  return (
    <>
      <Sidebar
        set={(act: boolean) => setShowSidebar(act)}
        state={showSidebar}
      />
      <header className="container max-w-screen-lg w-full px-3 sm:px-0 mx-auto inset-x-0 mt-3 absolute ">
        {
          // @ts-ignore
          state && <MultiMenu>{categories[state]}</MultiMenu>
        }

        <div className="bg-white rounded-full h-16 py-3 md:px-10 z-30 px-5 md:px-0 mx-auto inset-x-0  flex items-center relative justify-between container">
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
          <Navbar setSelect={(a) => setSelect(a)} selected={selected} />
          <Icons />
        </div>
      </header>
    </>
  );
};

interface propsNavbar {
  setSelect: Dispatch<SetStateAction<any>>;
  selected: any;
}

const Navbar: FC<propsNavbar> = ({ setSelect, selected }) => {
  

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
    setRef: Dispatch<SetStateAction<any>>;
  }

  const ItemList: FC<propsItem> = ({ item, setRef }) => {
    const [isHovered, setHovered] = useState<boolean>(false);
    const onMouseHandler = (value: boolean): void => {
      setHovered(value);
      setRef(value);
    };

    return (
      <div
        onMouseOver={() => onMouseHandler(true)}
        onMouseOut={() => onMouseHandler(false)}
      >
        <Link href={item.route} passHref>
          <li className="cursor-pointer relative tracking-widest hover:text-tertiary transition text-gray-500">
            {item.title}
            <svg
              className={`h-0.5 w-full bg-primary transform transition absolute ${
                isHovered ? "scale-100" : "scale-0"
              } `}
            />
          </li>
        </Link>
      </div>
    );
  };

  return (
    <>
      <nav className="hidden lg:block">
        <ul className="flex lg:gap-6 xl:gap-6 uppercase text-sm font-medi um text-gray-200">
          {List.map((item, idx) => (
            <ItemList
              key={idx}
              item={item}
              setRef={(a) =>
                selected[item.title] !== a &&
                setSelect((obj: any) => ({ ...obj, [item.title]: a }))
              }
            />
          ))}
        </ul>
      </nav>
    </>
  );
};

export const Icons = () => {
  const { user } = AuthContextProvider();
  const [hoverRef, isHovered] = useHover();
  const HandleClickUser = () => {
    !localStorage.getItem("auth")
      ? router.push("/login")
      : router.push("/perfil");
  };
  return (
    <>
      <div className="flex items-center relative">
        <span className="hidden md:block px-3 cursor-pointer text-gray-500">
          <SearchIcon className="icon transition transform hover:-rotate-6 hover:scale-110 " />
        </span>
        {!user ? (
          <>
            <span
              className="md:px-3 border-gray-100 py-1 md:border-l md:border-r cursor-pointer text-gray-500"
            >
              
              <span onClick={HandleClickUser}>
                <UserIcon className="icon transition transform hover:-rotate-6 hover:scale-110" />
              </span>
            </span>
            <span
              className="hidden md:block pl-3 cursor-pointer transition transform hover:-rotate-6 hover:scale-110"
              onClick={() => router.push("empresas/crear-empresa")}
            >
              <CompanyIcon className="icon text-gray-200" />
            </span>
          </>
        ) : (
          <span  className=" border-gray-100 border-l cursor-pointer text-gray-500 pl-3 flex items-center gap-1"
          ref={hoverRef}>
            <img src={user.photoURL?? undefined} className="w-10 h-10 border border-primary rounded-full" />
            <ProfileMenu state={isHovered} />
            <ArrowIcon className="w-4 h-4 rotate-90 transform" />
          </span>
        )}
      </div>
    </>
  );
};

const ProfileMenu = ({ state }: { state: boolean }) => {
  const { setUser } = AuthContextProvider();
  const {setLoading} = LoadingContextProvider()
  const options = [
    {
      title: "Cerrar Sesión",
      route: "/cerrar-sesion",
      icon: <CarIcon className="w-6 h-6" />,
      function: async () => {
        setLoading(true)
        setUser(await autenticacion.SignOut());
        localStorage.removeItem("auth");
        await router.push("/");
        setLoading(false)

      },
    },
    {
      title: "Empresas",
      route: "/empresas",
      icon: <CarIcon className="w-6 h-6" />,
    },
  ];
  return (
    <ul
      className={`w-40 rounded-xl h-max bg-white shadow-md absolute bottom-0 left-0 inset-y-full overflow-hidden ${
        state ? "" : "hidden"
      }`}
    >
      {options.map((item, idx) => {
        if (item?.function) {
          return (
            <li
              key={idx}
              onClick={item.function}
              className="flex items-center gap-2 text-gray-500 px-4 py-3 text-sm hover:bg-gray-100 transition cursor-pointer"
            >
              {item.icon} {item.title}
            </li>
          );
        } else {
          return (
            <Link key={idx} href={item.route}>
              <li className="flex items-center gap-2 text-gray-500 px-4 py-3 text-sm hover:bg-gray-100 transition cursor-pointer">
                {item.icon} {item.title}{" "}
              </li>
            </Link>
          );
        }
      })}
    </ul>
  );
};
