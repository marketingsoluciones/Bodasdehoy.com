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
import ClickAwayListener from "react-click-away-listener";

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
      <header className="flex w-full mt-3 absolute justify-center">
        <div className="bg-white max-w-screen-lg 2xl:max-w-screen-xl w-full h-16 rounded-full py-3 z-30 mx-[2%] px-[2%] flex items-center relative">
          {isSearch
            ? <SearchNavigation setSearch={setSearch} isSearch={isSearch} />
            : <>
              <span className="relative cursor-pointer hover:opacity-95 transform hover:-translate-x-1 transition duration-700 mr-[3%] hidden lg:block">
                <Link href={"/"} passHref>
                  <LogoFullColor className="h-auto w-40" />
                </Link>
              </span>
              <Navbar />
              <Icons handleClickSearch={() => setSearch(!isSearch)} modal={modal} setModal={setModal} />
            </>
          }
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
    <div className="flex items-center relative ml-[1%]">
      <button className="hidden md:block px-3 cursor-pointer text-gray-500 focus:outline-none ">
        <SearchIcon
          onClick={handleClickSearch}
          className="icon transition transform hover:-rotate-6 hover:scale-110 "
        />
      </button>
      <ClickAwayListener onClickAway={() => { setHovered(false) }}>
        <div onClick={() => setHovered(!isHovered)}
          className="border-gray-100 border-l text-gray-500 flex items-center z-40">
          {!user
            ? <span >
              <UserIcon className="icon w-8 h-8 text-gray-400 transition transform hover:-rotate-6 hover:scale-110" />
            </span>
            : <img
              alt={user?.displayName ?? "nombre"}
              src={user?.photoURL ?? "/placeholder/user.png"}
              className="w-9 h-9 border border-primary rounded-full cursor-pointer"
            />
          }
          <ArrowIcon className="w-4 h-4 rotate-90 transform cursor-pointer hidden sm:block" />
          <ProfileMenu isHovered={isHovered} setHovered={setHovered} modal={modal} setModal={setModal} />
        </div>
      </ClickAwayListener>
    </div>
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

