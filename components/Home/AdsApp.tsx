import { FC } from "react";
import Slider from "react-slick";
import {useHover} from "../../hooks";
import { CheckIcon } from "../Icons";
import Image from 'next/image'

export const AdsApp = () => {
  const List: string[] = [
    "Gestiona la lista de invitados",
    "Ordena las mesas del banquete",
    "Confirma asistencias en tiempo real",
    "Chat en vivo con tus invitados",
    "Organiza tu presupuesto",
    "Crea tu lista de regalos",
  ];

  const settings = {
    dots: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    slidesPerRow: 3,
    infinite: false,
    accessibility: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="max-w-screen-lg mx-auto inset-x-0 grid md:grid-cols-2 w-full">
        <div className="relative p-2 w-full h-72 md:h-auto">
          <Image src="/bannerApp.webp" layout={"fill"} objectPosition={"0px -25px"} objectFit={"contain"} />
          <div className="absolute bg-tertiary bottom-12 md:left-20 left-16 opacity-90 rounded-full w-20 h-20 p-4 flex items-center justify-center text-white">
            <h3 className="text-sm md:text-md tracking-widest">GRATIS</h3>
          </div>
        </div>
        <div>
          <h2 className="font-title text-4xl flex flex-col md:text-6xl w-max mx-auto inset-x-0 text-primary pt-14 pb-10 text-right leading-6">
            Organiza tu boda
            <span className="font-display text-xl w-full font-light ">
              con nuestra app
            </span>
          </h2>

          <div className="grid grid-cols-1 overflow-hidden px-5 md:px-0  ">
            <Slider {...settings}>
              {List.map((item, idx) => (
                <Feature key={idx} item={item} />
              ))}
            </Slider>
          </div>
          <div className="w-full flex items-center justify-center py-10">
            <button className="bg-primary rounded-full px-5 py-2 text-white hover:bg-white hover:text-primary transition border border-primary">
              Empecemos
            </button>
          </div>
        </div>
      </div>
    </>
  );
};


interface propsFeautre {
  item: string;
}
const Feature: FC<propsFeautre> = ({ item }) => {
  const [hoverRef, isHovered] = useHover();
  return (
    <div
      ref={hoverRef}
      className="flex items-center gap-2 mx-auto inset-x-0 w-max"
    >
      <span
        className={`${
          isHovered ? "bg-primary text-white" : "bg-white text-primary"
        } border border-primary rounded-full`}
      >
        <CheckIcon className="w-4 h-4" />
      </span>
      <h3 className="text-gray-300">{item}</h3>
    </div>
  );
};
