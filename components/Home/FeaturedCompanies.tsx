import { FC, useState } from "react";
import { CrossIcon, EuroIcon, HeartIconFill, HeartIconOutline, StarRating } from "../icons";

const FeaturedCompanies = () => {
  return (
    <div className="xl:max-w-screen-lg 2xl:max-w-screen-lg mx-auto inset-x-0 grid place-items-center">
      <div className="w-max flex flex-col items-end h-full">
        <h2 className="w-max text-center text-2xl text-primary font-semibold">
          Empresas de bodas destacadas
        </h2>
        <p className="font-light text-sm w-max text-primary cursor-pointer hover:text-gray-200 transition">
          Ver todas los proveedores
        </p>
      </div>

      <div className="grid grid-cols-3 gap-10 py-4 ">
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
      </div>
    </div>
  );
};

export default FeaturedCompanies;

const CompanyCard = () => {
  const [isFav, setFav] = useState(false)
  return (
    <div className="rounded-3xl w-72 h-auto transition ease-in transform hover:scale-105 duration-300 relative">
      <div className="h-60 rounded-3xl cursor-pointer overflow-hidden">
        <div className="bg-gradient-to-t from-transparent to-black w-full h-1/4 rounded-3xl opacity-60 absolute"/>
      <img src={"/mask.png"} className="object-cover object-center w-full h-full" />
      </div>
      <div className="bg-base rounded-3xl h-max transform -translate-y-10 w-full text-center p-4 flex flex-col gap-1 shadow-md">
        <h2 className="font-ligth text-gray-200 tracking-widest text-regular pt-1">
          HOTELES
        </h2>
        <h2 className="text-gray-300 text-lg font-medium transition cursor-pointer hover:text-primary">La Manga Club</h2>
        <RatingStars rating={4} />
        <h3 className="text-gray-200 text-sm">Guimar, Santa Cruz</h3>
        <div className="border-t border-b border-primary py-2 my-2 flex items-center justify-center gap-2">
            <EuroIcon />
            <p className="font-bold text-primary">desde <span className="font-normal">300€</span></p>
        </div>
          <p className="text-gray-200 text-sm h-max py-4 leading-5">Si queréis disfrutar de un recuerdo único de un día irrepetible, contar con un fotógrafo profesional para realizar el reportaje...</p>
      <button className="bg-primary rounded-full w-7 h-7 flex items-center justify-center right-0 left-0 mx-auto transform translate-y-3 absolute bottom-0"><CrossIcon/></button>
      </div>
      <span className="absolute top-4 right-4 hover:scale-110 transform transition cursor-pointer" onClick={() => setFav(!isFav)}>
        {isFav ? <HeartIconFill className="text-primary" /> : <HeartIconOutline  /> }
        
      </span>
    </div>
  );
};


interface propsRatings {
    rating : number
}

const RatingStars : FC <propsRatings> = ({rating}) => {
  const matriz: number[] = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center justify-center h-max gap-1">
      <div className="flex gap-1 items-center cursor-pointer ">
        {matriz.map((item, idx) => (
          <StarRating
            key={idx}
            className={`${rating >= item ? "text-yellow" : "text-gray-200"} hover:opacity-80 `}
          />
        ))}
      </div>
      <p className="text-xs text-gray-300">12</p>
    </div>
  );
};
