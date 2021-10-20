import TitleSection from "./TitleSection";
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FC, useState } from "react";

const PlaceDiscovery: FC = () => {
  const settings = {
    autoplay: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll:1,
    responsive : [
      
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      },
      
    ]
  };

  const fakeData = [
    {title: "Fincas"},
    {title: "Fincas"},
    {title: "Fincas"},
    {title: "Fincas"},

  ]
  const [categories, setCategories] = useState(fakeData)
  return (
    <>
    <div className="grid-cards relative w-full -mt-12 md:-mt-96">
    <div className="w-full xl:max-w-screen-lg 2xl:max-w-screen-lg mx-auto inset-x-0 pt-20 flex flex-col gap-5 md:gap-6 md:pt-32 pb-20 z-20 px-5">
      <TitleSection className="text-normal md:text-2xl " principal={"Descubre"} secondary={"lugares para bodas"} />
      <div className="z-20 relative w-full pb-8 pt-4 overflow-hidden ">
        <Slider {...settings}>
        {categories.map((item, idx) => (
          <PlaceCard key={idx} data={item} />
        ))}
        </Slider>
      </div>
    </div>
    </div>
    <style jsx>
        {`
        .grid-cards::after {
            content: "";
            background-image: url("/break.svg");
            background-size: cover;
            background-repeat: no-repeat;
            background-position:left;
            position: absolute;
            width: 100%;
            height: 100px;
            top: 50%
          }
          
          .grid-cards::before{
              content: "";
              background-color: white;
              width: 100%;
              height: 40%;
              position: absolute;
              margin: auto;
              right: 0;
              left: 0;
              bottom: 0
          }

        @media (max-width: 600px) {
          .grid-cards::after {
            background-size: contain;
            top: 5%;
            background-position: left top;
          }
          .grid-cards::before {
            height:90%;
          }
          

        }
        `}
    </style>
    </>
  );
};

export default PlaceDiscovery;


interface propsPlaceCard {
  data : {
    title : string,
    route?: string,
    image?: string
  }
}

const PlaceCard : FC <propsPlaceCard> = ({data}) => {
  const { title, route, image} = data
  return (
    <div className="px-4">
      <div className="w-full h-32 md:h-52 bg-gray-100 rounded-2xl"/>
      <h2 className="px-2 py-1 font-light md:text-base text-sm text-gray-200 tracking-widest">{title}</h2>
    </div>
  );
};
