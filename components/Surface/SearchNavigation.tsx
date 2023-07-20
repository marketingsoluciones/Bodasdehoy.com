import algoliasearch from "algoliasearch/lite";
import ClickAwayListener from "react-click-away-listener";
import { Hits, InstantSearch } from "react-instantsearch-dom";
import { ConnectedSearchBox } from "./Navigation";
import { FC } from "react";
import Link from "next/link";
import { createURL } from "../../utils/UrlImage";
import { capitalize } from "../../utils/Capitalize";

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

interface hit {
  title: string;
  image: string;
  slug: string;
  content: string;
  type: keyof typeof colors;
}

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