import { FC } from "react";
import { connectSearchBox, Hits, InstantSearch } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite"
import { connectWithQuery, Hit } from "../Surface/Navigation";
import { BurgerIcon, CloseIcon, LogoFullColor, SearchIcon } from "../Icons";
import { useState } from "react";
import { SidebarContextProvider } from "../../context";
import Link from "next/link"



export const NavbarMobile = () => {
  const { showSidebar, setShowSidebar } = SidebarContextProvider();
  const [showSearcher, setShowSearcher] = useState<boolean>(false);

  const MySearch: FC<any> = ({
    currentRefinement,
    refine,
    setSearch,
    isSearch,
  }) => {
    return (
      <div className="w-full mx-auto inset-x-0 bg-white h-14 -mt-2 rounded-full flex items-center relative">

        <input
          autoFocus
          type="input"
          value={currentRefinement}
          onChange={(e) => refine(e.currentTarget.value)}
          className="w-full border-none bg-none w-full h-full rounded-full pl-8 focus:outline-none text-sm text-gray-700"
          placeholder="Buscar en bodasdehoy.com"
        />
        <button onClick={() => setShowSearcher(!showSearcher)} className="w-5 h-5  absolute right-5 ">
          <CloseIcon className="w-full h-full" />
        </button>
      </div>
    );
  };

  const ConnectMySearchBox = connectSearchBox(MySearch);
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
    <div className=" md:hidden mx-auto *inset-x-0 w-full px-5 sm:hidden* relative pt-5 *mb-10 flex items-center justify-between  ">
      {!showSearcher ? (
        <>
          <button className="p-2" onClick={() => setShowSidebar(true)}>
            <BurgerIcon />
          </button>
          <Link
            href={"/"}
            passHref
          >
            <LogoFullColor className="h-auto w-48" />
          </Link>
          <button
            className="p-2"
            onClick={() => setShowSearcher(!showSearcher)}
          >
            <SearchIcon />
          </button>
        </>
      ) : (
        <InstantSearch indexName="bodasdehoy" searchClient={conditionalQuery}>
          <ConnectMySearchBox setSearch={setShowSearcher} isSearch={showSearcher} />
          {/* <SearchBox searchAsYouType={false} /> */}
          <div className="absolute -bottom-0 left-0 w-[80%] mx-auto inset-x-0 bg-white shadow translate-y-full max-h-60 overflow-auto no-scrollbar  rounded-b-3xl z-40">
            <Hits hitComponent={Hit} />
          </div>
        </InstantSearch>
      )}
    </div>
  );
};
