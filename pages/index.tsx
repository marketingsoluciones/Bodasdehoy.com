import { FC, ReactNode, memo } from 'react';

const Slider : any = dynamic(() : any => import('react-slick'))

import Image from "next/image";
import dynamic from 'next/dynamic';
import { fetchApi, queries } from '../utils/Fetching';
import { business, fetchCategory, Post } from '../interfaces';
import { AdsApp, FeaturedCompanies, Magazine, PlaceDiscovery, PodcastList } from '../components/Home';
import RecommendCategories from '../components/Home/RecommendCategories';
import { CommunityIcon, DownloadFileIcon, GuestAppIcon, InspirationIcon, Isologo, SearchIcon } from '../components/Icons';

interface propsHome {
  business: business[];
  categoriesBusiness : fetchCategory[]
  post : Post[]
  categoriesPost : fetchCategory[]
}


const Home: FC<propsHome> = (props) => {
  return (
    <section className="w-full">
      <div className="sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg banner pt-6 md:pt-24 mx-auto inset-x-0 grid grid-col-2 relative w-full">
        <Welcome />
      </div>

      <PlaceDiscovery data={props?.categoriesBusiness} />
      
      <div className=" bg-white flex flex-col gap-24 w-full pb-20">
        <FeaturedCompanies business={props?.business} />
        <ButtonProviders />
        <RecommendCategories data={props?.categoriesBusiness} />
        <Magazine posts={props?.post} categories={props?.categoriesPost} />
        <AdsApp />
        <PodcastList />
        {/* <DynamicCountriesListing /> */}
      </div>
      
    </section>
  );
};

export default Home;

export const Welcome: FC = (props) => {
  return (
    <>
      <div className="before:absolute before:w-full before:h-1/6 md:before:h-1/2 before:bg-gradient-to-t before:from-color-base before:to-transparent before:via-color-base before:z-10 before:bottom-16 md:before:bottom-20 before:left-0 relative grid md:grid-cols-2 px-5 sm:px-0 pb-16 pb-0 relative">
        <div className="flex flex-col gap-5 z-10 md:relative">
          <h1 className="text-2xl md:text-4xl text-tertiary relative subpixel-antialiased font-bold w-full flex flex-col gap-2">
            <span className="relative w-max h-max  font-light">
              Encuentra tod<b className="hidden">o</b>
              <Isologo className="mt-1 isologo absolute bottom-2 -right-4 md:-right-6" />
            </span>
            <span className="relative ">para una boda inolvidable</span>
          </h1>
          <p className="hidden md:block w-1/2 sm:w-full text-tertiary text-sm">
            Miles de proveedores de bodas en un sólo lugar.
          </p>
          <Searcher
            autoFocus={true}
            placeholder="catering, hoteles, fincas, vestidos"
          />
          <div className='md:static'>
            <Features />
          </div>
        </div>

        <div className="  md:w-full w-1/2 md:relative absolute -bottom-18 md:bottom-0 right-0 md:-mt-20 relative z-5 ">
          <Image
            src={"/photo-principal.webp"}
            alt='Bodas de hoy'
            layout={"responsive"}
            height={80}
            width={50}
            objectFit="contain"
            objectPosition="top"
          />
        </div>
      </div>
      {/* <style jsx>
        {`
          .image-principal::before{
            content: "''";
            position: absolute
          }
        `}
      </style> */}
    </>
  );
};

interface propsSearcher {
  autoFocus?: boolean;
  placeholder: string;
}

export const Searcher: FC<propsSearcher> = (props) => {
  return (
    <div className="relative w-full">
      <input
        className="px-6 h-14 py-1 md:py-3 w-full rounded-full text-gray-200 text-sm md:text-base focus:outline-none transition shadow-lg"
        {...props}
      />
      <button className="bg-primary w-14  h-full rounded-full absolute top-0 right-0 flex items-center justify-center transform hover:scale-110 transition hover:-rotate-12">
        <SearchIcon className="text-white w-6 h-6" />
      </button>
    </div>
  );
};

export const Features: FC = () => {
  type ItemList = {
    title: string;
    icon: ReactNode;
  };

  const List: ItemList[] = [
    {
      title: "Comunidad para novias",
      icon: <CommunityIcon className="w-8 h-8" />,
    },
    {
      title: "Recursos descargables",
      icon: <DownloadFileIcon className="w-8 h-8" />,
    },
    {
      title: "Gestor de invitados",
      icon: <GuestAppIcon className="w-8 h-8" />,
    },
    { title: "Inspiración", icon: <InspirationIcon className="w-8 h-8" /> },
  ];

  interface propsFeature {
    item: ItemList;
  }
  const Feature: FC<propsFeature> = memo(({ item }) => {
    return (
      <div className="flex items-center gap-3 py-3 pl-2 w-full ">
        <button className="p-4 bg-white shadow rounded-full bg-white grid place-items-center transform transition duration-800 hover:scale-110 hover:-rotate-12 focus:outline-none">
          {item.icon}
        </button>
        <h2 className="text-tertiary w-32 text-sm md:text-lg leading-6 font-semibold cursor-pointer hover:text-primary transition duration-800">
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

  return (
    <div className=" grid grid-cols-1 overflow-visible z-0">
      <Slider {...settings}>
        {List.map((item, idx) => (
          <Feature key={idx} item={item} />
        ))}
      </Slider>
    </div>
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
    console.time("getHome")
    const data = await fetchApi(queries.getHome)
    console.timeEnd("getHome")
    return { props: data ?? {} };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
}

