import { FC, memo, ReactNode } from "react";
import Slider from "react-slick";
import {useHover} from "../../hooks";
import { CameraIcon, CarIcon, DressIcon, HeartIconFill, RestaurantIcon, TravelIcon } from "../Icons";
import TitleSection from "./TitleSection";

export const RecommendCategories: FC = () => {
  const settings = {
    dots: true,
    speed: 200,
    slidesToShow: 6,
    slidesToScroll:1,
    className: "text-center",
    centerMode: true,
    responsive : [
      
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        }
      },
      
    ]
    
  };
  return (
    <div className="max-w-screen-lg mx-auto inset-x-0 w-full">
      <TitleSection principal={"Recomendados"} secondary={"para tu boda"} size={"xl"} />
      <div className="w-full py-10 mx-auto  md:pl-0 overflow-hidden text-white">
        <Slider {...settings}>
        <Category title="Fotográfos para bodas" icon={<CameraIcon  className="transform scale-75 md:scale-100" />} />
        <Category title="Catering para bodas" icon={<RestaurantIcon className="transform scale-75 md:scale-100" />} />
        <Category title="Decoración para bodas" icon={<HeartIconFill className="w-10 h-10 text-white transform scale-75 md:scale-100" />} />
        <Category title="Servicios para bodas" icon={<CarIcon className="transform scale-75 md:scale-100" />} />
        <Category title="Vestidos y trajes" icon={<DressIcon className="transform scale-75 md:scale-100" />} />
        <Category title="Viajes para novios" icon={<TravelIcon className="transform scale-75 md:scale-100" />} />
        </Slider>
      </div>
    </div>
  );
};

export default RecommendCategories;

interface propsCategory {
  title?: string;
  icon?: ReactNode;
}
const Category: FC<propsCategory> = memo(({ icon, title }) => {
  const [hoverRef, isHovered] = useHover();
  return (
    <div
      ref={hoverRef}
      className={`md:w-28 md:h-28 w-20 h-20 rounded-full bg-primary hover:bg-color-base transition duration-300 flex items-center justify-center p-3`}
    >
      <span className={`absolute ${isHovered ? "hidden" : ""}`}>{icon}</span>
      <p
        className={`w-max h-max text-tertiary font-medium transition cursor-pointer ${
          isHovered ? "" : "hidden"
        } text-center text-xs md:text-sm `}
      >
        {title}
      </p>
    </div>
  );
})
