import { FC, memo, ReactNode } from "react";
import useHover from "../../hooks/useHover";
import { CameraIcon, CarIcon, DressIcon, HeartIconFill, RestaurantIcon, TravelIcon } from "../icons";
import TitleSection from "./TitleSection";

const RecommendCategories: FC = () => {
  return (
    <div className="max-w-screen-lg mx-auto inset-x-0 w-full">
      <TitleSection principal={"Recomendados"} secondary={"para tu boda"} />
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 py-5">
        <Category title="Fotográfos para bodas" icon={<CameraIcon />} />
        <Category title="Catering para bodas" icon={<RestaurantIcon />} />
        <Category title="Decoración para bodas" icon={<HeartIconFill className="w-10 h-10 text-white" />} />
        <Category title="Servicios para bodas" icon={<CarIcon />} />
        <Category title="Vestidos y trajes" icon={<DressIcon />} />
        <Category title="Viajes para novios" icon={<TravelIcon />} />

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
      className={`w-28 h-28 rounded-full bg-primary hover:bg-base transition duration-300 flex items-center justify-center p-3`}
    >
      <span className={`absolute ${isHovered ? "hidden" : ""}`}>{icon}</span>
      <p
        className={`w-max h-max text-tertiary font-medium transition cursor-pointer ${
          isHovered ? "" : "hidden"
        } text-center text-sm `}
      >
        {title}
      </p>
    </div>
  );
})
