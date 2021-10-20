import Slider from "react-slick";
import TitleSection from "./TitleSection";

const PodcastList = () => {
    const settings = {
        speed: 200,
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
        accessibility: true,
        
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              centerPadding: "-10px",
            },
          },
        ],
      };
  return (
    <div className="max-w-screen-lg mx-auto inset-x-0 w-full">
      <TitleSection principal={"Podcast"} secondary={"Cómplices de Bodas"} />
      <div className="grid grid-cols-1 w-full">
        <Slider {...settings} className="pt-6 overflow-hidden">
          <Podcast />
          <Podcast />
          <Podcast />
        </Slider>
      </div>
    </div>
  );
};

export default PodcastList;

const Podcast = () => {
  return (
    <>
      <div className="bg-white rounded-xl shadow w-80 h-44 hover:opacity-80 transition cursor-pointer mx-auto inset-x-0"></div>
      <style jsx>
        {`
          div {
            background-image: url("/mask_2.png");
            background-size: cover;
            background-position: center;
          }
        `}
      </style>
    </>
  );
};
