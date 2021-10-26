import React, { FC } from "react";
import Slider from "react-slick";
import { CurrencyIcon, GuestsIcon, NearTheSeaIcon } from "../Icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  autoplay: true,
  dots: true,
  infinite: true,
  slidesToShow: 3,
  rows: 1,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesPerRow: 1,
        rows: 1,
      },
    },
  ],
};

const FeaturesListing = () => {
  return (
    <div className="grid grid-cols-1 overflow-hidden pb-8">
      <Slider {...settings}>
        <Component type={"menu"} data="Desde 1 a 1" />
        <Component type={"guests"} data="Desde 1 a 1" />
        <Component type={"location"} data="Desde 1 a 1" location="NearTheSea" />
      </Slider>
    </div>
  );
};

export default FeaturesListing;

const locations = {
  NearTheSea: <NearTheSeaIcon />,
  "": "",
};

const types = {
  menu: {
    title: "Precio del menú",
    icon: <CurrencyIcon />,
  },
  guests: {
    title: "Numero de invitados",
    icon: <GuestsIcon />,
  },
  location: {
    title: "Localización",
    icon: undefined,
  },
};

interface ComponentProps {
  type: keyof typeof types;
  location?: keyof typeof locations;
  data: string;
}
const Component: FC<ComponentProps> = ({ type, data, location = "" }) => {
  return (
    <div className="flex md:flex-col items-center justify-center w-full text-tertiary gap-6 md:gap-0 py-6">
      <span className="h-10">{types[type]?.icon || locations[location]}</span>
      <div className="flex flex-col items-start md:items-center leading-5 md:pt-2 ">
        <h2 className="font-semibold">{types[type]?.title}</h2>
        <h3 className="font-light">{data}</h3>
      </div>
    </div>
  );
};
