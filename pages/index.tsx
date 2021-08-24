import { FC, ReactNode } from "react";
import Slider from "react-slick";
import AdsApp from "../components/Home/AdsApp";
import CountriesListing from "../components/Home/CountriesListing";
import FeaturedCompanies from "../components/Home/FeaturedCompanies";
import Magazine from "../components/Home/Magazine";
import PlaceDiscovery from "../components/Home/PlaceDiscovery";
import PodcastList from "../components/Home/PodcastList";
import RecommendCategories from "../components/Home/RecommendCategories";
import {
  CommunityIcon,
  DownloadFileIcon,
  GuestAppIcon,
  Inspiration,
  Isologo,
  SearchIcon,
} from "../components/icons";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { api } from "../api";

interface propsHome {
  business : object[]
}
const Home: FC <propsHome> = ({business}) => {
  console.log(business)
  return (
    <section className="w-full">
      <div className="xl:max-w-screen-lg pt-10 sm:pt-28 mx-auto inset-x-0 grid grid-col-2 relative banner w-full ">
        <Welcome />
      </div>
      <PlaceDiscovery />
      <div className="bg-white flex flex-col gap-24 w-full">
        <FeaturedCompanies business={business} />
        <ButtonProviders />
        <RecommendCategories />
        <Magazine />
        <AdsApp />
        {/*<PodcastList />
        <CountriesListing /> */}
      </div> 
      <style jsx>
        {`
          .banner {
            background-image: url("/photo-principal.png");
            background-size: 46%;
            background-position: right top;
            background-repeat: no-repeat;
          }

          @media (max-width: 600px) {
            .banner {
              background-position: right bottom;
              background-size: 60%;
            }
          }

          .banner::after {
            content: "";
            background: linear-gradient(
              0deg,
              #f2f2f2 0%,
              rgba(255, 255, 255, 0) 90%
            );
            width: 100%;
            height: 50%;
            position: absolute;
            bottom: 0;
          }
        `}
      </style>
    </section>
  );
};

export default Home;

export const Welcome: FC = (props) => {
  return (
    <>
    <div className="relative w-full h-max flex flex-col flex-wrap gap-6 z-10 px-5 sm:px-0 pb-36 pb-0">
      <h1 className="principal text-2xl sm:text-4xl w-full text-tertiary relative subpixel-antialiased font-bold w-full">
        <span className="relative text-3xl font-light">
          Encuentra tod<b className="hidden">o</b>
          <Isologo className="mt-1 absolute bottom-2 -right-5" />
        </span>
        <br /> para una boda inolvidable
      </h1>
      <p className="hidden md:block w-1/2 sm:w-full text-tertiary text-sm">
        Miles de proveedores de bodas en un sólo lugar.
      </p>
      <Searcher />
      <Features />
    </div>
    </>
  );
};

const Searcher: FC = () => {
  return (
    <div className="relative w-full md:w-1/2">
      <input
        placeholder="catering, hoteles, fincas, vestidos"
        className="px-6 py-4 md:py-5 w-full rounded-full focus:ring focus:outline-none transition"
      />
      <button className="bg-primary w-14 md:w-16 h-full rounded-full absolute top-0 right-0 flex items-center justify-center">
        <SearchIcon className="text-white w-7 h-7" />
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
    { title: "Comunidad para novias", icon: <CommunityIcon className="w-8 h-8" /> },
    { title: "Gestor de invitados", icon: <GuestAppIcon className="w-8 h-8" /> },
    { title: "Recursos descargables", icon: <DownloadFileIcon className="w-8 h-8" /> },
    { title: "Inspiración", icon: <Inspiration className="w-8 h-8" /> },
  ];

  interface propsFeature {
    item: ItemList;
  }
  const Feature: FC<propsFeature> = ({ item }) => {
    return (
      <div className="flex items-center gap-3 py-2 pl-2">
        <button className="p-3 bg-white shadow rounded-full bg-white grid place-items-center transform transition duration-800 hover:scale-125 hover:-rotate-12 focus:outline-none">
          {item.icon}
        </button>
        <h2 className="text-tertiary w-32 text-sm md:text-lg leading-6 font-semibold cursor-pointer hover:text-primary transition duration-800">
          {item.title}
        </h2>
      </div>
    );
  };
  
  const settings = {
    autoplay: true,
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 2,
    rows: 2,
    slidesToScroll:1,
    className: "overflow-visible",
    responsive : [
      
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesPerRow: 1,
        }
      },
      
    ]
    
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden  gap-12">
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
    </button >
  )
}


export async function getServerSideProps() {
  try {
    const params = {
      _limit : 4
    }
    const {data} = await api.business(params)
    return { props: {business : data}}
  } catch (error) {
    console.log(error)
    return {
      props: {},
    }
  }
}