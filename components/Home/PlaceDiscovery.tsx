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
    <div className="grid-cards relative w-full">
    <div className="w-full xl:max-w-screen-lg 2xl:max-w-screen-lg mx-auto inset-x-0 pt-20 md:pt-32 pb-20 z-20 px-5">
      <TitleSection principal={"Descubre"} secondary={"lugares para bodas"} />
      <div className="z-20 relative w-full py-4 overflow-hidden ">
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
            position: absolute;
            width: 100%;
            height: 100px;
            top: 40%
          }
          
          .grid-cards::before{
              content: "";
              background-color: white;
              width: 100%;
              height: 50%;
              position: absolute;
              margin: auto;
              right: 0;
              left: 0;
              bottom: 0
          }

        @media (max-width: 600px) {
          .grid-cards::after {
            top: 0%;
            background-position: center top;
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
      <div className="w-full h-32 md:h-52 bg-gray-100 rounded-2xl shadow"/>
      <h2 className="px-2 py-1 font-ligth text-gray-200 tracking-widest">{title}</h2>
    </div>
  );
};
