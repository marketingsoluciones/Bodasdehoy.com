import { FC } from "react";
import { StarRating } from "../icons";

const FeaturedCompanies = () => {
  return (
    <div className="xl:max-w-screen-lg 2xl:max-w-screen-lg mx-auto inset-x-0 grid place-items-center">
      <div className="w-max flex flex-col items-end">
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
  return (
    <div className="shadow rounded-3xl w-72 h-96 overflow-hidden">
      <div className="bg-red opacity-40 h-3/6 pb-10" />
      <div className="bg-base rounded-t-2xl h-60 transform -translate-y-10 w-full text-center p-4 flex flex-col gap-2">
        <h2 className="font-ligth text-gray-200 tracking-widest text-sm pt-1">
          HOTELES
        </h2>
        <h2 className="text-gray-300 text-lg">La Manga Club</h2>
        <RatingStars rating={4} />
        <h3 className="text-gray-200 text-sm">Guimar, Santa Cruz</h3>
        <div className="border-t border-b border-primary h-10 my-2">
            
        </div>
      </div>
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
      <div className="flex gap-1 items-center">
        {matriz.map((item, idx) => (
          <StarRating
            key={idx}
            className={`${rating >= item ? "text-yellow" : "text-gray-200"}`}
          />
        ))}
      </div>
      <p className="text-xs text-gray-300">12</p>
    </div>
  );
};
