import { Dispatch, FC, MouseEventHandler, ReactNode, SetStateAction, useEffect, useState, } from "react";
import Link from "next/link";
import { ArrowIcon, CloseIcon, CompanyIcon, Eventos, LogoFullColor, Posts, SearchIcon, UserIcon, WeddingPage, } from "../Icons";
import { MultiMenu } from "./MultiMenu";
import { NoviaMenu } from "./MultiMenu/NoviaMenu";
import { useAuthentication } from '../../utils/Authentication';
import { LoadingContextProvider, AuthContextProvider } from "../../context";
import { cloneElement } from "react";
import { StarRating } from "../Icons/index";
import { CSSTransition } from "react-transition-group";
import { useRouter } from "next/router";
import NovioMenu from "./MultiMenu/NovioMenu";
import OrganizadorBoda from "./MultiMenu/OrganizadorBoda";
import Proveedores from "./MultiMenu/Proveedores";
import LugaresParaBodas from "./MultiMenu/LugaresParaBodas";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits, Highlight, createConnector, connectSearchBox, } from "react-instantsearch-dom";
import { createURL } from "../../utils/UrlImage";
import { capitalize } from "../../utils/Capitalize";
import Cookies from "js-cookie";
import { AlertDesarrollo } from "../modals/AlertDesarrollo";
import ClickAwayListener from "react-click-away-listener";

interface propsNavigation {
  modal: any
  setModal: any
}


export const Navigation: FC<propsNavigation> = () => {
  const [state, setState] = useState<any>("");
  const [isSearch, setSearch] = useState(false);
  const [modal, setModal] = useState(false)
  const { setLoading } = LoadingContextProvider();
  const router = useRouter();

  useEffect(() => {
    setSearch(false);
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
      {modal ? (
        <AlertDesarrollo alertDev={modal} setAlertDev={setModal} />
      ) : null}
      <header className="container max-w-screen-lg 2xl:max-w-screen-xl w-full px-3 sm:px-0 mx-auto inset-x-0 mt-3 absolute hidden sm:block ">
        <div className="bg-white rounded-full h-16 py-3 md:px-10 z-30 px-5 md:px-0 mx-auto inset-x-0  flex items-center  justify-between container relative">
          {isSearch && (
            <SearchNavigation setSearch={setSearch} isSearch={isSearch} />
          )}

          {!isSearch && (
            <>
              <Link href={"/"} passHref>
                <span className="relative cursor-pointer hover:opacity-95 transform hover:-translate-x-1 transition duration-700 ">
                  <LogoFullColor className="h-auto w-40" />
                </span>
              </Link>
              <Navbar />
              <Icons handleClickSearch={() => setSearch(!isSearch)} modal={modal} setModal={setModal} />
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
      title: "organiza tu boda",
      route: process.env.NEXT_PUBLIC_EVENTSAPP ?? "",
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
          <a>
            <li className="uppercase h-10 flex items-center justify-center cursor-pointer relative  hover:text-tertiary transition text-gray-500  ">
              {title}
              {/* <svg
                className={`h-0.5 w-full bg-primary transform transition absolute ${isHovered ? "scale-100" : "scale-0"
                  } `}
              /> */}
            </li>
          </a>
        </Link>
      </>
    );
  };

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

interface propsIcons {
  handleClickSearch?: MouseEventHandler;
  modal: any
  setModal: any

}

export const Icons: FC<propsIcons> = ({ handleClickSearch, modal, setModal }) => {
  const { user } = AuthContextProvider();
  const [isHovered, setHovered] = useState<boolean>(false);
  const router = useRouter();
  const HandleClickUser = () => {
    !Cookies.get("sessionBodas") ? router.push(`/login?d=${router.asPath.slice(1, router.asPath.length)}`) : router.push("/");
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
              onClick={() => router.push("/info-empresa")}
            >
              <CompanyIcon className="icon text-gray-500" />
            </span>
          </>
        ) : (
          <>
            {/* <Notification onClick={() => { alert("aqui") }} valir={true} value={9} /> */}
            <div
              className="border-gray-100 border-l text-gray-500 pl-3 flex items-center gap-1 z-40"
              onMouseOver={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
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
                {/* <div className="bg-red-500 w-[50px] h-[50px] absolute"></div> */}
                <ProfileMenu setHovered={setHovered} modal={modal} setModal={setModal} />
              </CSSTransition>
            </div>
          </>
        )}
      </div>
    </>
  );
};

interface Option {
  title: string;
  icon: any;
  route?: any;
  onClick?: MouseEventHandler;
  sizeIcon?: keyof typeof sizesIcon;
  target?: string;
  state?: any
  modal?: any
  setModal?: any
  rol?: any
  user?: any
}


const ProfileMenu: FC<any> = ({ setHovered, modal, setModal }) => {
  const { user } = AuthContextProvider();
  const { setLoading } = LoadingContextProvider();
  const { _signOut } = useAuthentication()
  /* const [hoverRef, isHovered] = useHover() */
  const router = useRouter()

  const options: Option[] = [
    {
      title: "Mi perfil",
      route: "/configuracion",
      icon: <UserIcon />,
      rol: "compartido"

    },
    {
      title: "Mis empresas",
      route: user?.role?.includes("empresa") ? `${process.env.NEXT_PUBLIC_CMS}/?d=viewBusines` : "/info-empresa",
      icon: <CompanyIcon />,
      target: "_blank",
      rol: "empresa"

    },
    {
      title: "Notificaciones",
      route: null /* "/configuracion" */,
      icon: <StarRating />,
      state: true,
      rol: "compartido"
    },
    {
      title: "Wedding page",
      route: null /* "/configuracion" */,
      icon: <WeddingPage />,
      state: true,
      rol: "novios"
    },
    {
      title: "My pages",
      route: null /* "/configuracion" */,
      icon: <WeddingPage />,
      state: true,
      rol: "empresa"
    },
    {
      title: "Mis post",
      route: `${process.env.NEXT_PUBLIC_CMS}`,
      icon: <Posts />,
      state: true,
      rol: "compartido"
    },
    {
      title: "Mis eventos",
      route: `${process.env.NEXT_PUBLIC_EVENTSAPP}`,
      icon: <Eventos />,
      state: true,
      rol: "novios"
    },
    {
      title: "Cerrar Sesion",
      icon: <UserIcon />,
      onClick: async () => {
        setHovered(false)
        setLoading(true);
        _signOut()
        setLoading(false);
      },
      rol: "compartido"
    },
  ];

  return (
    <>
      <div
        className={`w-80 p-3 h-20 rounded-xl h-max bg-white shadow-md absolute bottom-0 right-0 inset-y-full overflow-hidden z-50 
    }`}
      >
        <div className="w-full border-b border-gray-100 pb-2">
          <p className="text-gray-500 font-extralight uppercase tracking-wider	text-xs text-center  cursor-default">
            {user?.role && user?.role?.length > 0 && user?.role[0]}
          </p>
          <h3 className="text-primary font-medium w-full text-center cursor-default ">
            {user?.displayName}
          </h3>
        </div>
        <ul className="grid grid-cols-2 gap-2 text-xs place-items-left p-2 ">
          {options.map((item: Option, idx) => (
            <ListItemProfile key={idx} {...item} modal={modal} setModal={setModal} user={user} />
          ))}
        </ul>
      </div>
    </>
  );
};


const sizesIcon: { xs: string; sm: string } = {
  xs: "w-3 h-3",
  sm: "w-5 h-5",
};

const ListItemProfile: FC<Option> = ({
  title,
  icon,
  sizeIcon = "sm",
  route,
  target = "",
  onClick,
  modal,
  setModal,
  rol,
  user
}) => {
 /* Validacion de opciones  visibles en el menu desplegable en el navbar dependiendo del tipo de usuario  */
  return (
    <>
      {(() => {
        if (user?.role.includes("empresa")) {
          if (rol === "empresa") {
            if (route) {
              return (
                <>
                  <Link href={route} passHref>
                    <a target={target}>
                      <li className="flex text-gray-500 gap-2 hover:bg-color-base transition cursor-pointer rounded-lg py-1 px-2 items-center justify-start">
                        {cloneElement(icon, { className: sizesIcon[sizeIcon] })}
                        {title}
                      </li>
                    </a>
                  </Link>
                </>
              )
            } else if (route === null) {
              return (
                <li onClick={() => setModal(!modal)} className="flex text-gray-500 gap-2 hover:bg-color-base transition cursor-pointer rounded-lg py-1 px-2 items-center justify-start">
                  {cloneElement(icon, { className: sizesIcon[sizeIcon] })}
                  {title}
                </li>
              )
            }
          } else if (rol === "compartido") {
            if (onClick) {
              return (
                <li
                  onClick={onClick}
                  className="flex text-gray-500 gap-2 hover:bg-color-base transition cursor-pointer rounded-lg py-1 px-2 items-center justify-start"
                >
                  {cloneElement(icon, { className: sizesIcon[sizeIcon] })}
                  {title}
                </li>
              );
            } else if (route) {
              return (
                <>
                  <Link href={route} passHref>
                    <a target={target}>
                      <li className="flex text-gray-500 gap-2 hover:bg-color-base transition cursor-pointer rounded-lg py-1 px-2 items-center justify-start">
                        {cloneElement(icon, { className: sizesIcon[sizeIcon] })}
                        {title}
                      </li>
                    </a>
                  </Link>
                </>
              )
            }
            else if (route === null) {
              return (
                <li onClick={() => setModal(!modal)} className="flex text-gray-500 gap-2 hover:bg-color-base transition cursor-pointer rounded-lg py-1 px-2 items-center justify-start">
                  {cloneElement(icon, { className: sizesIcon[sizeIcon] })}
                  {title}
                </li>
              )
            }
          }
        } else if (user?.role.includes('novio') || user?.role.includes('novia')) {
          if (rol === "compartido") {
            if (onClick) {
              return (
                <li
                  onClick={onClick}
                  className="flex text-gray-500 gap-2 hover:bg-color-base transition cursor-pointer rounded-lg py-1 px-2 items-center justify-start"
                >
                  {cloneElement(icon, { className: sizesIcon[sizeIcon] })}
                  {title}
                </li>
              );
            } else if (route) {
              return (
                <>
                  <Link href={route} passHref>
                    <a target={target}>
                      <li className="flex text-gray-500 gap-2 hover:bg-color-base transition cursor-pointer rounded-lg py-1 px-2 items-center justify-start">
                        {cloneElement(icon, { className: sizesIcon[sizeIcon] })}
                        {title}
                      </li>
                    </a>
                  </Link>
                </>
              )
            }
            else if (route === null) {
              return (
                <li onClick={() => setModal(!modal)} className="flex text-gray-500 gap-2 hover:bg-color-base transition cursor-pointer rounded-lg py-1 px-2 items-center justify-start">
                  {cloneElement(icon, { className: sizesIcon[sizeIcon] })}
                  {title}
                </li>
              )
            }
          } else if (rol === "novios") {
            if (route) {
              return (
                <>
                  <Link href={route} passHref>
                    <a target={target}>
                      <li className="flex text-gray-500 gap-2 hover:bg-color-base transition cursor-pointer rounded-lg py-1 px-2 items-center justify-start">
                        {cloneElement(icon, { className: sizesIcon[sizeIcon] })}
                        {title}
                      </li>
                    </a>
                  </Link>
                </>
              )
            } else if (route === null) {
              return (
                <li onClick={() => setModal(!modal)} className="flex text-gray-500 gap-2 hover:bg-color-base transition cursor-pointer rounded-lg py-1 px-2 items-center justify-start">
                  {cloneElement(icon, { className: sizesIcon[sizeIcon] })}
                  {title}
                </li>
              )
            }

          }
        }
      })()}
    </>
  );
};

export const connectWithQuery = createConnector({
  displayName: "WidgetWithQuery",
  getProvidedProps(props, searchState) {
    // Since the `attributeForMyQuery` searchState entry isn't
    // necessarily defined, we need to default its value.
    const currentRefinement = searchState.attributeForMyQuery || "";

    // Connect the underlying component with the `currentRefinement`
    return { currentRefinement };
  },
  refine(props, searchState, nextRefinement) {
    // When the underlying component calls its `refine` prop,
    // we update the searchState with the provided refinement.
    return {
      // `searchState` represents the search state of *all* widgets. We need to extend it
      // instead of replacing it, otherwise other widgets will lose their respective state.
      ...searchState,
      attributeForMyQuery: nextRefinement,
    };
  },
  getSearchParameters(searchParameters, props, searchState) {
    // When the `attributeForMyQuery` state entry changes, we update the query
    return searchParameters.setQuery(searchState.attributeForMyQuery || "");
  },
  cleanUp(props, searchState) {
    // When the widget is unmounted, we omit the entry `attributeForMyQuery`
    // from the `searchState`, then on the next request the query will
    // be empty
    const { attributeForMyQuery, ...nextSearchState } = searchState;

    return nextSearchState;
  },
});

const MySearchBox: FC<any> = ({
  currentRefinement,
  refine,
  setSearch,
  isSearch,
}) => {
  return (
    <>
      <input
        autoFocus
        className="w-full h-full focus:outline-none z-30"
        placeholder="Buscar en bodasdehoy.com"
        type="input"
        value={currentRefinement}
        onChange={(e) => refine(e.currentTarget.value)}
      />
      <button
        className="p-1 bg-color-base rounded-full z-30"
        onClick={() => {
          refine("");
          setSearch(!isSearch);
        }}
      >
        <CloseIcon className="w-5 h-5 text-gray-500" />
      </button>
    </>
  );
};

export const ConnectedSearchBox = connectSearchBox(MySearchBox);

type typeInside = {
  color: string;
  title: string;
  slug: string;
};
type types = {
  business: typeInside;
  categorypost: typeInside;
  categorybusiness: typeInside;
  subcategorybusiness: typeInside;
  subcategorypost: typeInside;
  post: typeInside;
};

const colors: types = {
  business: {
    color: "bg-primary",
    title: "Empresa",
    slug: "/empresa/",
  },
  categorybusiness: {
    color: "bg-tertiary",
    title: "Categoria de empresas",
    slug: "/categoria/",
  },
  subcategorybusiness: {
    color: "bg-green-500",
    title: "Subcategoria de empresas",
    slug: "/categoria/",
  },
  categorypost: {
    color: "bg-blue-500",
    title: "Categoria de articulos",
    slug: "/magazine/categoria/",
  },
  subcategorypost: {
    color: "bg-orange-500",
    title: "Subcategoria de articulos",
    slug: "/magazine/categoria/",
  },
  post: {
    color: "bg-yellow-500",
    title: "Articulo",
    slug: "/magazine/",
  },
};

interface hit {
  title: string;
  image: string;
  slug: string;
  content: string;
  type: keyof typeof colors;
}
export const Hit = ({ hit }: { hit: hit }) => {
  return (
    <Link passHref href={`${colors[hit.type].slug}${hit.slug}`}>
      <div className="gap-3 flex py-3 px-5 hover:bg-color-base transition-all cursor-pointer items-center">
        <img
          alt={hit?.title}
          src={
            hit.image ? createURL(hit?.image ?? "") : "/placeholder/image.png"
          }
          className={"w-14 h-14 rounded-lg object-cover object-center"}
        />
        <div className="col-span-3">
          <h3 className="text-xs md:text-sm font-semibold text-gray-500">
            {hit?.title && capitalize(hit?.title)}
          </h3>
          <span
            className={`${colors[hit?.type]?.color
              } text-xs text-white px-2 rounded`}
          >
            {colors[hit?.type]?.title}
          </span>
        </div>
        <div className="col-span-4">
          {/* <Markup className="text-xs" content={hit?.content?.slice(0,150)} noHtml/> */}
        </div>
      </div>
    </Link>
  );
};



export const SearchNavigation: FC<any> = ({ setSearch, isSearch }) => {


  const conditionalQuery = {
    search(requests: any) {
      if (
        requests.every(({ params }: any) => !params.query) ||
        requests.every(({ params }: any) => !params.query.trim())
      ) {
        // Here we have to do something else
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            processingTimeMS: 0,
          })),
        });
      }
      const searchClient = algoliasearch(
        "4YG7QHCVEA",
        "920a6487923dbae05fb89b1be0955e74"
      );
      return searchClient.search(requests);
    },
  };

  return (
    <ClickAwayListener onClickAway={() => isSearch && setSearch(false)}>


      <div className="flex items-center w-full justify-between ">
        <InstantSearch
          indexName="bodasdehoy"
          searchClient={conditionalQuery}
        >
          <ConnectedSearchBox
            searchAsYouType={false}
            setSearch={setSearch}
            isSearch={isSearch}
          />
          {/* <SearchBox searchAsYouType={false} /> */}
          <div className="absolute -bottom-0 left-0 w-[95%] mx-auto inset-x-0 bg-white shadow translate-y-full max-h-60 overflow-auto no-scrollbar rounded-b-3xl">
            <Hits hitComponent={Hit} />
          </div>
        </InstantSearch>
      </div>
    </ClickAwayListener>
  );
};
