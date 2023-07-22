import { FC, MouseEventHandler, ReactNode, useEffect, useState, } from "react";
import Link from "next/link";
import { ArrowIcon, CloseIcon, CompanyIcon, LogoFullColor, SearchIcon, UserIcon, } from "../Icons";
import { LoadingContextProvider, AuthContextProvider } from "../../context";
import { useRouter } from "next/router";
import { createConnector, connectSearchBox, } from "react-instantsearch-dom";
import { AlertDesarrollo } from "../modals/AlertDesarrollo";
import { SearchNavigation } from "./SearchNavigation";
import { ProfileMenu } from "./MultiMenu/ProfileMenu";
import { Navbar } from "./Navbar";

interface propsNavigation {
  modal: any
  setModal: any
}

export const Navigation: FC<propsNavigation> = () => {
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

interface propsIcons {
  handleClickSearch?: MouseEventHandler;
  modal: any
  setModal: any
}

export const Icons: FC<propsIcons> = ({ handleClickSearch, modal, setModal }) => {
  const { user } = AuthContextProvider();
  const [isHovered, setHovered] = useState<boolean>(false);
  const router = useRouter();
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
            <div
              className="md:px-3 border-gray-100 py-1 md:border-l md:border-r cursor-pointer text-gray-500 flex"
              onMouseOver={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}>
              <span >
                <UserIcon className="icon transition transform hover:-rotate-6 hover:scale-110" />
              </span>
              <ArrowIcon className="w-4 h-4 rotate-90 transform cursor-pointer" />
              <ProfileMenu isHovered={isHovered} setHovered={setHovered} modal={modal} setModal={setModal} />
            </div>
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
              <ProfileMenu isHovered={isHovered} setHovered={setHovered} modal={modal} setModal={setModal} />
            </div>
          </>
        )}
      </div>
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

