import { FC, memo, useState, useEffect } from "react";
import { useHover } from "../../hooks";
import {
  CameraIcon,
  LocationWeddingIcon,
  DressIcon,
  HeartIconFill,
  RestaurantIcon,
  TravelIcon,
  SuiteIcon,
} from "../Icons";
import TitleSection from "./TitleSection";
import { category } from "../../interfaces/index";
import { createURL } from "../../utils/UrlImage";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";


interface propsRecommendCategories {
  data: Partial<category>[];
}
export const RecommendCategories: FC<propsRecommendCategories> = ({ data }) => {
  const [categories, setCategories] = useState<Partial<category>[]>([]);

  useEffect(() => {
    setCategories(data);
  }, [data]);

  const icons: any = {
    "lugares para bodas": (
      <LocationWeddingIcon className="w-12 h-12 text-white" />
    ),
    novias: <DressIcon />,
    novios: <SuiteIcon />,
    catering: <RestaurantIcon />,
    decoración: (
      <HeartIconFill className="w-10 h-10 text-white transform scale-75 md:scale-100" />
    ),
    servicios: <CameraIcon />,
    viajes: <TravelIcon />,
  };

  useEffect(() => {
    setCategories(data);
  }, [data]);
  return (
    <div className="max-w-screen-lg mx-auto inset-x-0 w-full">
      <div className="ml-7 pt-2 md:pt-0 md:ml-0">
        <TitleSection
          principal={"Recomendados"}
          secondary={"para tu boda"}
          size={"xl"}
        />
      </div>

      <div className="w-full py-10 mx-auto  md:pl-0 overflow-hidden text-white">
        <Swiper
          slidesPerView={2}
          spaceBetween={0}
          loop={true}
          navigation={true}
          // autoplay={{
          //   delay: 2500,
          //   disableOnInteraction: false,
          // }}
          breakpoints={{
            640: {
              slidesPerView: 5,
              spaceBetween: 0,
            },
          }}
          preloadImages={false}
          lazy={true}
          modules={[Autoplay, Navigation]}
        >
          {categories &&
            categories.length > 0 &&
            categories?.map((item: Partial<category>, idx: number) => (
              <>
                <SwiperSlide key={idx}>
                  <Category key={idx} {...item} />
                </SwiperSlide>
              </>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RecommendCategories;


const Category: FC<Partial<category>> = memo(({ icon, title, slug }) => {
  const [hoverRef, isHovered] = useHover();

  return (
    <>
      <div
        ref={hoverRef}
        className={`md:w-28 md:h-28 w-20 h-20 rounded-full bg-primary hover:bg-color-base transition duration-300 flex items-center justify-center p-3 relative mx-auto`}
      >

        <svg className={` ${isHovered ? "hidden" : ""} transition duration-200 w-1/2 h-1/2`}>
          <image href={createURL(icon?.i320)} className="w-full h-full" />
        </svg>
        <Link href={`/categoria/${slug}`}>
          <p
            className={`w-max h-max text-tertiary font-medium transition cursor-pointer ${isHovered ? "" : "hidden"
              } text-center text-xs md:text-sm capitalize`}
          >
            {title}
          </p>

        </Link>
      </div>
      <style >
        {`
      image {
          filter: invert(100%)  saturate(0%)  brightness(100%) contrast(100%);
      }
      `}
      </style>
    </>
  );
});
