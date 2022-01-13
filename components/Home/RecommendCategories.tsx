import { FC, memo, ReactNode, useState, useEffect } from 'react';
import Slider from "react-slick";
import {useHover} from "../../hooks";
import { CameraIcon, LocationWeddingIcon, DressIcon, HeartIconFill, RestaurantIcon, TravelIcon, SuiteIcon } from "../Icons";
import TitleSection from "./TitleSection";

const settings = {
  dots: true,
  infinite: false,
  speed: 200,
  slidesToShow: 6,
  slidesToScroll:1,
  className: "text-center",
  centerMode: false,
  responsive : [
    
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
      }
    },
    
  ]
  
};

interface propsRecommendCategories {
  data: object[]
}
export const RecommendCategories: FC <propsRecommendCategories> = ({data}) => {
  const [ categories , setCategories ] = useState<object[]>([])

  useEffect(() => {
    setCategories(data)
  }, [data])

  const icons : any = {
    "lugares para bodas" : <LocationWeddingIcon className="w-12 h-12 text-white" />,
    "novias" : <DressIcon />,
    "novios" : <SuiteIcon  />,
    "catering" : <RestaurantIcon  />,
    "decoración" : <HeartIconFill className="w-10 h-10 text-white transform scale-75 md:scale-100" />,
    "servicios" : <CameraIcon />,
    "viajes" : <TravelIcon />,
  }

  useEffect(() => {
    setCategories(data)
  }, [data])
  return (
    <div className="max-w-screen-lg mx-auto inset-x-0 w-full">
      <TitleSection principal={"Recomendados"} secondary={"para tu boda"} size={"xl"} />
      <div className="w-full py-10 mx-auto  md:pl-0 overflow-hidden text-white">

        <Slider {...settings}>
          {categories?.map(({categorie} : any, idx : number) => (
            <Category key={idx} title={categorie.title} icon={icons[categorie.title.toLowerCase()]} route={categorie.slug} />
          ))}
        </Slider>

        {/* <Slider {...settings}>
        <Category title="Fotográfos para bodas" icon={<CameraIcon  className="transform scale-75 md:scale-100" />} />
        <Category title="Catering para bodas" icon={<RestaurantIcon className="transform scale-75 md:scale-100" />} />
        <Category title="Decoración para bodas" icon={<HeartIconFill className="w-10 h-10 text-white transform scale-75 md:scale-100" />} />
        <Category title="Servicios para bodas" icon={<CarIcon className="transform scale-75 md:scale-100" />} />
        <Category title="Vestidos y trajes" icon={<DressIcon className="transform scale-75 md:scale-100" />} />
        <Category title="Viajes para novios" icon={<TravelIcon className="transform scale-75 md:scale-100" />} />
        </Slider> */}
      </div>
    </div>
  );
};

export default RecommendCategories;

interface propsCategory {
  title?: string;
  icon?: ReactNode;
  route: string
}
const Category: FC<propsCategory> = memo(({ icon, title, route }) => {
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
        } text-center text-xs md:text-sm capitalize`}
      >
        {title}
      </p>
    </div>
  );
})
