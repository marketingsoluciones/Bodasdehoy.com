import {
  Dispatch,
  FC,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import {
  ArrowIcon,
  BurgerIcon,
  CloseIcon,
  CompanyIcon,
  LogoFullColor,
  SearchIcon,
  UserIcon,
} from "../Icons";
import { Sidebar } from "./";
import { MultiMenu } from "./MultiMenu";
import { NoviaMenu } from "./MultiMenu/NoviaMenu";
import { useHover } from "../../hooks/useHover";
import { autenticacion } from "../../utils/Authentication";
import { LoadingContextProvider, AuthContextProvider } from "../../context";
import { cloneElement } from "react";
import { HeartIconFill, StarRating } from "../Icons/index";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useRouter } from "next/router";
import { ButtonClose } from "../Inputs";
import { deleteCookie, getCookie } from "../../utils/Cookies";
import { useToast } from "../../hooks/useToast";
import NovioMenu from "./MultiMenu/NovioMenu";
import OrganizadorBoda from "./MultiMenu/OrganizadorBoda";
import Proveedores from "./MultiMenu/Proveedores";
import LugaresParaBodas from "./MultiMenu/LugaresParaBodas";

const initialSelected = {
  ["Lugares para bodas"]: false,
  ["Mi boda"]: false,
  ["Novio"]: false,
  ["Novia"]: false,
  ["Proveedores"]: false,
};

export const Navigation: FC = () => {
  const [state, setState] = useState<any>("");
  const [isSearch, setSearch] = useState(false);
  const { setLoading } = LoadingContextProvider();
  const router = useRouter();

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, [router]);

  type DicCategories = {
    Novia: ReactNode;
  };

  return (
    <>
      <header className="container max-w-screen-lg 2xl:max-w-screen-xl w-full px-3 sm:px-0 mx-auto inset-x-0 mt-3 absolute hidden sm:block ">
        <div className="bg-white rounded-full h-16 py-3 md:px-10 z-30 px-5 md:px-0 mx-auto inset-x-0  flex items-center relative justify-between container relative">
          {isSearch && (
            <span className="flex items-center w-full justify-between">
              <input
                autoFocus
                className="w-full h-full focus:outline-none"
                placeholder="Buscar en bodasdehoy.com"
              />
              <button
                className="p-1 bg-color-base rounded-full"
                onClick={() => setSearch(!isSearch)}
              >
                <CloseIcon className="w-5 h-5 text-gray-500" />
              </button>
            </span>
          )}

          {!isSearch && (
            <>
              <Link href={"/"} passHref>
                <span className="relative cursor-pointer hover:opacity-95 transform hover:-translate-x-1 transition duration-700 ">
                  <LogoFullColor className="h-auto w-40" />
                </span>
              </Link>
              <Navbar />
              <Icons handleClickSearch={() => setSearch(!isSearch)} />
            </>
          )}
        </div>
      </header>
    </>
  );
};

const Navbar: FC = () => {
  const [selected, setSelect] = useState<number | null>(null);

  type Item = {
    title: string;
    titleInside?: string;
    route: string;
    component?: ReactNode;
  };

  const List: Item[] = [
    {
      title: "Mi boda",
      route: "https://app.bodasdehoy.com",
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

  const ItemList: FC<Item> = ({ title, route }) => {
    const [isHovered, setHovered] = useState<boolean>(false);
    return (
      <>
        <Link href={route} passHref>
          <li className="uppercase h-16 flex items-center justify-center cursor-pointer relative tracking-widest hover:text-tertiary transition text-gray-500">
            {title}
            <svg
              className={`h-0.5 w-full bg-primary transform transition absolute ${
                isHovered ? "scale-100" : "scale-0"
              } `}
            />
          </li>
        </Link>
      </>
    );
  };

  return (
    <>
      <nav className="hidden lg:block">
        <ul className="flex lg:gap-6 xl:gap-6 text-sm font-medi um text-gray-200">
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

interface propsIcons {
  handleClickSearch?: MouseEventHandler;
}

export const Icons: FC<propsIcons> = ({ handleClickSearch }) => {
  const { user } = AuthContextProvider();
  const [hoverRef, isHovered] = useHover();
  const router = useRouter();
  const HandleClickUser = () => {
    !getCookie("token-bodas") ? router.push("/login") : router.push("/perfil");
  };
  return (
    <>
      <div className="flex items-center relative">
        <button className="hidden md:block px-3 cursor-pointer text-gray-500 focus:outline-none ">
          <SearchIcon
            onClick={handleClickSearch}
            className="icon transition transform hover:-rotate-6 hover:scale-110 "
          />
        </button>
        {!user ? (
          <>
            <span className="md:px-3 border-gray-100 py-1 md:border-l md:border-r cursor-pointer text-gray-500">
              <span onClick={HandleClickUser}>
                <UserIcon className="icon transition transform hover:-rotate-6 hover:scale-110" />
              </span>
            </span>
            <span
              className="hidden md:block pl-3 cursor-pointer transition transform hover:-rotate-6 hover:scale-110"
              onClick={() => router.push("empresa/crear-empresa")}
            >
              <CompanyIcon className="icon text-gray-500" />
            </span>
          </>
        ) : (
          <div
            className=" border-gray-100 border-l text-gray-500 pl-3 flex items-center gap-1 z-40"
            ref={hoverRef}
          >
            <img
              alt={user?.displayName ?? "nombre"}
              src={user.photoURL ?? "/placeholder/user.png"}
              className="w-10 h-10 border border-primary rounded-full cursor-pointer"
            />
            <ArrowIcon className="w-4 h-4 rotate-90 transform cursor-pointer" />
            <CSSTransition
              in={isHovered}
              unmountOnExit
              mountOnEnter
              timeout={300}
              classNames={"fade"}
            >
              <ProfileMenu />
            </CSSTransition>
          </div>
        )}
      </div>
    </>
  );
};

const ProfileMenu = () => {
  const { setUser, user } = AuthContextProvider();
  const { setLoading } = LoadingContextProvider();
  const router = useRouter();
  const toast = useToast();

  const options: Option[] = [
    {
      title: "Mi perfil",
      route: "/configuracion",
      icon: <UserIcon />,
    },
    {
      title: "Notificaciones",
      route: "/empresa",
      icon: <HeartIconFill />,
    },
    {
      title: "Favoritos",
      route: "/",
      icon: <StarRating />,
    },
    {
      title: "Cerrar Sesion",
      icon: <UserIcon />,
      onClick: async () => {
        setLoading(true);
        await autenticacion.SignOut();
        setUser(null);
        deleteCookie("token-bodas");
        //localStorage.removeItem("auth");
        await router.push("/");
        toast("success", "Gracias por visitarnos, te esperamos luego 😀");
        setLoading(false);
      },
    },
  ];
  return (
    <>
      <div
        className={`w-80 p-3 h-20 rounded-xl h-max bg-white shadow-md absolute bottom-0 right-0 inset-y-full overflow-hidden z-50 
    }`}
      >
        <div className="w-full border-b border-gray-100 pb-2">
          <p className="text-gray-500 font-extralight uppercase tracking-wider	text-xs text-center ">
            {user?.role && user?.role?.length > 0 && user?.role[0]}
          </p>
          <h3 className="text-primary font-medium w-full text-center">
            {user?.displayName}
          </h3>
        </div>
        <ul className="grid grid-cols-2 gap-2 text-xs place-items-center p-2 ">
          {options.map((item: Option, idx) => (
            <ListItemProfile key={idx} {...item} />
          ))}
        </ul>
      </div>
    </>
  );
};

interface Option {
  title: string;
  icon: any;
  route?: string;
  onClick?: MouseEventHandler;
  sizeIcon?: keyof typeof sizesIcon;
}

const sizesIcon: { xs: string; sm: string } = {
  xs: "w-3 h-3",
  sm: "w-5 h-5",
};

const ListItemProfile: FC<Option> = ({
  title,
  icon,
  sizeIcon = "sm",
  route,
  onClick,
}) => {
  return (
    <>
      {(() => {
        if (route) {
          return (
            <Link href={route}>
              <li className="flex text-gray-500 gap-2 hover:bg-color-base transition cursor-pointer rounded-lg py-1 px-2 items-center justify-start">
                {cloneElement(icon, { className: sizesIcon[sizeIcon] })}
                {title}
              </li>
            </Link>
          );
        } else if (onClick) {
          return (
            <li
              onClick={onClick}
              className="flex text-gray-500 gap-2 hover:bg-color-base transition cursor-pointer rounded-lg py-1 px-2 items-center justify-start"
            >
              {cloneElement(icon, { className: sizesIcon[sizeIcon] })}
              {title}
            </li>
          );
        }
      })()}
    </>
  );
};
