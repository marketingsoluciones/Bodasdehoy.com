import { FC, useRef } from "react";
import Slider from "react-slick";
import { PostComponent } from "../Home/Magazine";
import { ArrowIcon } from "../Icons";

const settings = {
  autoplay: true,
  infinite: true,
  speed: 200,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

interface propsRelatedArticles {
  title : string
}
export const RelatedArticles : FC <propsRelatedArticles> = ({title}) => {
  const refSlider = useRef<any>();
  return (
    <div className="w-full grid grid-cols-1 relative py-10 overflow-hidden md:overflow-visible">
      <h2 className="text-center text-primary w-full text-lg">{title}</h2>
      <button 
        onClick={() => refSlider?.current?.slickPrev()}
        className="w-12 h-12 absolute top-0 inset-y-0 my-auto rotate-180 transform -translate-x-full text-primary hover:bg-gray-100 flex flex-col items-center justify-center rounded-full transition">
        <ArrowIcon className="w-8 h-8" />
      </button>
      <button 
        onClick={() => refSlider?.current?.slickNext()}
        className="w-12 h-12 absolute top-0 inset-y-0 my-auto right-0 transform translate-x-full text-primary hover:bg-gray-100 flex flex-col items-center justify-center rounded-full transition">
        <ArrowIcon className="w-8 h-8" />
      </button>
      {/* <Slider {...settings} ref={refSlider}>
        <Post />
       
      </Slider> */}
    </div>
  );
};
