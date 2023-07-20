const Slider: any = dynamic((): any => import("react-slick"));
import { FC, ReactNode, memo, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { fetchApi, queries } from "../utils/Fetching";
import { business, fetchCategory, Post } from "../interfaces";
import { AdsApp, CountriesListing, FeaturedCompanies, Magazine, PlaceDiscovery, PodcastList, } from "../components/Home";
import RecommendCategories from "../components/Home/RecommendCategories";
import { BurgerIcon, CommunityIcon, DownloadFileIcon, GuestAppIcon, InspirationIcon, Isologo, LogoFullColor, SearchIcon } from "../components/Icons";
import { connectWithQuery } from "../components/Surface/Navigation";
import { connectSearchBox, Hits, InstantSearch } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";
import { CloseIcon } from '../components/Icons/index';
import Link from "next/link";
import { AuthContextProvider } from '../context'
import ClickAwayListener from "react-click-away-listener";
import { Hit } from "../components/Surface/SearchNavigation";

interface propsHome {
  business: business[];
  categoriesBusiness: fetchCategory[];
  post: Post[];
  categoriesPost: fetchCategory[];
}

const Home: FC<propsHome> = (props) => {
  return (
    <section className="w-full">
      <div className="sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg banner  md:pt-24 mx-auto inset-x-0 grid grid-col-2 relative w-full">
        {/* buscar error en features */}
        <Welcome />
      </div>
      <PlaceDiscovery data={props?.categoriesBusiness} />
      <div className="bg-white flex flex-col  w-full pb-20">
        <FeaturedCompanies business={props?.business} />
        <ButtonProviders />
        <RecommendCategories data={props?.categoriesBusiness} />
        <Magazine posts={props?.post} categories={props?.categoriesPost} />
        <AdsApp />
        {/* <PodcastList /> */}
        <CountriesListing />
      </div>
    </section>
  );
};

export default Home;

export const Welcome: FC = (props) => {
  const { user } = AuthContextProvider()

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
    <>
      <div className="before:absolute before:w-full before:h-1/6 md:before:h-1/2 before:bg-gradient-to-t before:from-color-base before:to-transparent before:via-color-base before:z-10 before:bottom-0 md:before:bottom-20 before:left-0 relative grid md:grid-cols-2 px-5 sm:px-0 pb-20 relative">
        <div className="flex flex-col gap-5 z-10 md:relative">
          <h1 className="text-2xl md:text-4xl text-tertiary relative subpixel-antialiased font-bold w-full flex flex-col gap-2">
            <span className="relative w-max h-max  font-light">
              Encuentra tod<b className="hidden">o</b>
              <Isologo className="mt-1  absolute md:bottom-2 bottom-1.5 -right-6 md:-right-6" />
            </span>
            <span className="relative ">para una boda inolvidable</span>
          </h1>
          <p className="hidden md:block w-1/2 sm:w-full text-tertiary text-sm">
            Miles de proveedores de bodas en un sólo lugar.
          </p>
          <div className="w-full relative z-40">
            <InstantSearch
              indexName="bodasdehoy"
              searchClient={conditionalQuery}
            >
              <ConnectedSearchBox placeholder="catering, hoteles, fincas, vestidos" />
              <div className="absolute -bottom-0 left-0 w-[90%] mx-auto inset-x-0 bg-white shadow translate-y-full max-h-60 overflow-auto no-scrollbar rounded-b-3xl">
                <Hits hitComponent={Hit} />
              </div>
            </InstantSearch>
          </div>
          <div className="md:static">
            {/* reemplazar slider por otro componente para quitar error Did not expect server HTML to contain a <div> in <div> */}
            <Features />
          </div>
        </div>
        <div className={`w-1/2 z-5 absolute right-0  ${user ? "-bottom-16" : "-bottom-16"} md:w-full md:relative md:-bottom-18 md:bottom-0 md:right-0 md:-mt-20`}>
          <Image
            src={"/photo-principal.webp"}
            alt="Bodas de hoy"
            layout={"responsive"}
            height={80}
            width={50}
            objectFit="contain"
            objectPosition="top"
          />
        </div>
      </div>
    </>
  );
};

export const Searcher: FC<any> = ({
  currentRefinement,
  refine,
}) => {
  const [input, setInput] = useState("")
  return (
    <ClickAwayListener onClickAway={() => [refine(""), setInput("")]}>
      <div className="relative w-full">
        <div className="flex items-center relative">
          <input
            placeholder="catering, hoteles, fincas, vestidos"
            type="input"
            value={currentRefinement}
            onChange={(e) => [refine(e.currentTarget.value), setInput(e.target.value)]}
            className="px-6 h-14 py-1 md:py-3 w-full rounded-full text-gray-500 text-sm md:text-base focus:outline-none transition shadow-lg "
          />
          <button onClick={() => [refine(""), setInput("")]} className={`${input != "" ? "block" : "hidden"} p-1 bg-color-base rounded-full z-30 right-16 absolute`}>
            <CloseIcon className="w-5 h-5 text-gray-500 " />
          </button>
        </div>
        <span className="bg-primary w-14  h-full rounded-full absolute top-0 right-0 flex items-center justify-center">
          <SearchIcon className="text-white w-6 h-6" />
        </span>
      </div>
    </ClickAwayListener>
  );
};

const ConnectedSearchBox = connectWithQuery(Searcher);

export const Features: FC = () => {
  type ItemList = {
    title: string;
    icon: ReactNode;
    route: string;
  };

  const Proximamente: ItemList[] = [
    {
      title: "Comunidad para novias",
      icon: <CommunityIcon className="w-8 h-8" />,
      route: "/"
    },
  ]

  const List: ItemList[] = [
    {
      title: "Recursos descargables",
      icon: <DownloadFileIcon className="w-8 h-8" />,
      route: "https://bodasdehoy.com/gestor-de-presupuesto-de-tu-boda/"
    },
    {
      title: "Organizador de boda",
      icon: <GuestAppIcon className="w-8 h-8" />,
      route: process.env.NEXT_PUBLIC_EVENTSAPP ?? ""
    },
    {
      title: "Inspiración",
      icon: <InspirationIcon className="w-8 h-8" />,
      route: "/magazine"
    },
  ];

  interface propsFeature {
    item: ItemList;
  }
  const Feature: FC<propsFeature> = memo(({ item }) => {
    return (
      <div className="flex items-center gap-3 py-3 pl-2 w-full static ">
        <span className="p-4 bg-white shadow rounded-full bg-white grid place-items-center transform transition duration-800 hover:scale-110 hover:-rotate-12 focus:outline-none z-20">
          {item.icon}
        </span>
        <h2 className="text-tertiary w-32 text-sm md:text-lg leading-6 font-semibold  hover:text-primary transition duration-800">
          {item.title}
        </h2>
      </div>
    );
  });

  const settings = {
    autoplay: true,
    infinite: true,
    speed: 200,
    slidesToShow: 2,
    rows: 2,
    arrows: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesPerRow: 1,
          fade: true,
        },
      },
    ],
  };
  const style = {
    tamañoTexto: {
      fontSize: '0.5rem',
      color: '#fff',
      padding: '5px',
      borderRadius: '10px',
    },
  }

  return (
    <>
      <div className=" grid grid-cols-1 overflow-visible z-0">
        <Slider {...settings}>
          <div className="">
            <span style={style.tamañoTexto} className="absolute z-30 bg-tertiary top-14 left-7 opacity-90">
              proximamente
            </span>
            <span className="">
              {Proximamente.map((item, idx) => (
                <Feature key={idx} item={item} />
              ))}
            </span>
          </div>

          {List.map((item, idx) => (
            <Link
              href={item.route}
              key={idx}
            >
              <a >
                <Feature item={item} />
              </a>
            </Link>
          ))}
        </Slider>
      </div>
    </>
  );
};

const ButtonProviders = () => {
  return (
    <button className="md:hidden rounded-full w-max -mt-20 px-6 py-2 mx-auto inset-x-0 bg-primary text-white text-sm border border-primary hover:bg-white hover:text-primary focus:outline-none">
      Ver más proveedores
    </button>
  );
};

export async function getServerSideProps() {
  try {
    //console.time("getHome");
    const data = await fetchApi({
      query: queries.getHome,
      variables: { development: "bodasdehoy" }
    });
    //console.timeEnd("getHome");
    return { props: data ?? {} };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
}
