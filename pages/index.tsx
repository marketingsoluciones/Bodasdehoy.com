import { FC, ReactComponentElement, ReactNode } from "react";
import FeaturedCompanies from "../components/Home/FeaturedCompanies";
import PlaceDiscovery from "../components/Home/PlaceDiscovery";
import {
  CommunityIcon,
  DownloadFileIcon,
  GuestAppIcon,
  Inspiration,
  Isologo,
  SearchIcon,
} from "../components/icons";

const Home: FC = () => {
  return (
    <section>
      <div className="xl:max-w-screen-lg 2xl:max-w-screen-lg pt-28 mx-auto inset-x-0 grid grid-col-2 relative banner">
        <Welcome />
      </div>
      <PlaceDiscovery />
      <div className="bg-white">
        <FeaturedCompanies />
      </div>
      <style jsx>
        {`
          .banner {
            background-image: url("/photo-principal.png");
            background-size: 46%;
            background-position: right top;
            background-repeat: no-repeat;
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
    <div className="relative w-max h-max flex flex-col gap-6 z-10">
      <h1 className="text-4xl text-tertiary relative subpixel-antialiased font-bold">
        <span className="relative font-light">
          Encuentra todo
          <Isologo className="mt-1 ml-0.25 absolute bottom-3 right-0" />
        </span>
        <br /> para una boda inolvidable
      </h1>
      <p className="text-tertiary text-sm">
        Miles de proveedores de bodas en un sólo lugar.
      </p>
      <Searcher />
      <Features />
    </div>
  );
};

const Searcher: FC = () => {
  return (
    <div className="relative w-full">
      <input
        placeholder="catering, hoteles, fincas, vestidos"
        className="px-6 py-5 w-full rounded-full focus:ring focus:outline-none transition"
      />
      <button className="bg-primary w-16 h-full rounded-full absolute top-0 right-0 flex items-center justify-center">
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
    { title: "Comunidad para novias", icon: <CommunityIcon /> },
    { title: "Gestor de invitados", icon: <GuestAppIcon /> },
    { title: "Recursos descargables", icon: <DownloadFileIcon /> },
    { title: "Inspiración", icon: <Inspiration /> },
  ];

  interface propsFeature {
    item: ItemList;
  }
  const Feature: FC<propsFeature> = ({ item }) => {
    return (
      <div className="flex items-center gap-3">
        <button className="w-16 h-16 shadow rounded-full bg-white grid place-items-center transform transition duration-800 hover:scale-125 hover:-rotate-12 focus:outline-none">
          {item.icon}
        </button>
        <h2 className="text-tertiary w-32 text-lg leading-6 font-semibold cursor-pointer hover:text-primary transition duration-800">
          {item.title}
        </h2>
      </div>
    );
  };
  return (
    <div className="grid grid-cols-2 gap-y-6 gap-x-16 pt-4">
      {List.map((item, idx) => (
        <Feature key={idx} item={item} />
      ))}
    </div>
  );
};
