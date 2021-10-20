import { FC, useEffect, useState } from "react";
import { EuroIcon, HeartIconFill, HeartIconOutline, StarRating } from "../icons";
import PlusButton from "../PlusButton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

interface propsFeaturedCompanies {
  business : object[]
}
const FeaturedCompanies : FC <propsFeaturedCompanies> = ({business = [1,2,3]}) => {
  const settings = {
    autoplay: true,
    accessibility: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
     responsive : [
       {
         breakpoint: 600,
         settings: {
           slidesToScroll: 1,
           slidesToShow: 1,
         }
       },
  
     ]
  };

  const data = [
    {url: "/catering.jpg", title: "Hotel La Margarita", content: "Si queréis disfrutar de un recuerdo único de un día irrepetible, contar con un fotógrafo profesional para realizar el reportaje...", category: "Hoteles"},
    {url: "/catering.jpg", title: "Hotel La Margarita", content: "Si queréis disfrutar de un recuerdo único de un día irrepetible, contar con un fotógrafo profesional para realizar el reportaje...", category: "Hoteles"},
    {url: "/catering.jpg", title: "Hotel La Margarita", content: "Si queréis disfrutar de un recuerdo único de un día irrepetible, contar con un fotógrafo profesional para realizar el reportaje...", category: "Hoteles"},
    {url: "/catering.jpg", title: "Hotel La Margarita", content: "Si queréis disfrutar de un recuerdo único de un día irrepetible, contar con un fotógrafo profesional para realizar el reportaje...", category: "Hoteles"},
    {url: "/catering.jpg", title: "Hotel La Margarita", content: "Si queréis disfrutar de un recuerdo único de un día irrepetible, contar con un fotógrafo profesional para realizar el reportaje...", category: "Hoteles"},
    {url: "/catering.jpg", title: "Hotel La Margarita", content: "Si queréis disfrutar de un recuerdo único de un día irrepetible, contar con un fotógrafo profesional para realizar el reportaje...", category: "Hoteles"}
  ]
  return (
    <div className="w-full xl:max-w-screen-lg 2xl:max-w-screen-lg mx-auto inset-x-0 flex flex-col px-5 md:px-0">
      <div className="w-max flex flex-col items-center h-full pb-10 mx-auto inset-x-0">
        <h2 className="w-max text-center text-lg md:text-2xl text-primary font-semibold">
          Empresas de bodas destacadas
        </h2>
        <p className="font-light text-sm w-full text-right text-primary cursor-pointer hover:text-gray-200 transition">
          Ver todas los proveedores
        </p>
      </div>

      <div className="grid grid-cols-1 w-full overflow-hidden">
        <Slider {...settings}>
          {data?.map((item,idx) => (
            <CompanyCard key={idx} data={item} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FeaturedCompanies;

interface propsCompanyCard {
  data : object
}

const CompanyCard : FC <propsCompanyCard> = ({data}) => {
  const [isFav, setFav] = useState(false)
  const [business, setBusiness] = useState<any>({})

  useEffect(() => {
    setBusiness(data)
  }, [])

  return (
    <div className="rounded-3xl w-72 h-full mx-auto inset-x-0  relative h-full">
      <div className="h-60 rounded-3xl cursor-pointer overflow-hidden ">
        <div className="bg-gradient-to-t from-transparent to-black w-full h-1/4 rounded-3xl opacity-60 absolute"/>
      <img src={business?.url} alt={"imagen"} className="object-cover object-center w-full h-full" />
      </div>
      <div className="bg-color-base rounded-3xl h-max transform -translate-y-10 w-full text-center p-4 flex flex-col gap-1 shadow-md">
        <h2 className="font-ligth text-gray-200 tracking-widest text-regular pt-1 uppercase">
          {business?.category}
        </h2>
        <h2 className="text-gray-300 text-lg font-medium transition cursor-pointer hover:text-primary">{business?.title}</h2>
        <RatingStars rating={4} />
        <h3 className="text-gray-200 text-sm">{business.gAddress}</h3>
        <div className="border-t border-b border-primary py-2 my-2 flex items-center justify-center gap-2">
            <EuroIcon />
            <p className="font-bold text-primary">desde <span className="font-normal">300€</span></p>
        </div>
          <p className="text-gray-200 text-sm h-max py-4 leading-5">{business.content}</p>
        <PlusButton />
      </div>
      <span className="absolute top-4 right-4 hover:scale-110 transform transition cursor-pointer" onClick={() => setFav(!isFav)}>
        {isFav ? <HeartIconFill className="text-primary" /> : <HeartIconOutline  /> }
        
      </span>
    </div>
  );
};


interface propsRatings {
    rating : number,
    size? : string,
    visibleText? : boolean
    outValue? : any 
}

export const RatingStars : FC <propsRatings> = ({rating, size = "base", visibleText = true, outValue = () => {}}) => {
  const matriz: number[] = [1, 2, 3, 4, 5];
  const sizes : any = {
    base : "",
    lg : "w-4 h-4 mx-0.5",
    xl : "w-5 h-5 mx-0.5"
  }
  return (
    <div className="flex items-center justify-center h-max gap-2">
      <div className="flex  items-center cursor-pointer ">
        {matriz.map((item, idx) => (
          <StarRating
            key={idx}
            className={`transition ${rating >= item ? "text-gold hover:opacity-80" : "text-gray-100 hover:text-gold"}  ${sizes[size]} `}
            onClick={() => outValue(item)}
          />
        ))}
      </div>
      {visibleText && <p className="text-xs text-gray-300">12</p>}
    </div>
  );
};
