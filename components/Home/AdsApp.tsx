import { FC } from "react";
import Slider from "react-slick";
import useHover from "../../hooks/useHover";
import { CheckIcon } from "../icons";

const AdsApp = () => {
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
      slidesToShow: 3,
      slidesToScroll: 1,
      slidesPerRow: 2,
      infinite: false,
      centerMode: false,
      accessibility: true,
      responsive : [
        
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
          }
        },
        
      ]
      
    };
  return (
    <>
      <div className="max-w-screen-lg mx-auto inset-x-0 w-full -mt-60 md:-mt-12">
        <div className="banner w-full relative">
          <div className="absolute bottom-44 left-14 md:bottom-10 md:left-40 bg-tertiary opacity-90 rounded-full w-20 h-20 md:w-32 md:h-32 p-4 flex items-center justify-center text-white">
            <h3 className="text-sm md:text-xl tracking-widest">GRATIS</h3>
          </div>
        </div>
        <h2 className="font-title text-4xl -mt-40 md:text-6xl w-max mx-auto inset-x-0 text-primary pt-14 pb-10 text-right leading-6">
          Organiza tu boda <br />{" "}
          <span className="font-display text-xl w-full font-light ">
            con nuestra app
          </span>
        </h2>

        <div className="w-full overflow-hidden ">
          <Slider {...settings}>
          {List.map((item, idx) => (
            <Feature key={idx} item={item} />
          ))}
          </Slider>
        </div>
        <div className="w-full flex items-center justify-center py-10">
        <button className="bg-primary rounded-full px-5 py-2 text-white hover:bg-white hover:text-primary transition border border-primary">Empecemos</button>
        </div>

      </div>
      <style jsx>
        {`
          .banner {
            background-image: url("/bannerApp.webp");
            background-position: left;
            background-size: contain;
            background-repeat: no-repeat;
            height: 40rem;
          }
        `}
      </style>
    </>
  );
};

export default AdsApp;

interface propsFeautre {
    item : string
}
const Feature : FC <propsFeautre> = ({item}) => {
    const [hoverRef, isHovered] = useHover()
  return (
    <div ref={hoverRef} className="flex items-center gap-2 mx-auto inset-x-0 w-max">
      <span className={`${isHovered ? "bg-primary text-white" : "bg-white text-primary"} border border-primary rounded-full`}>
        <CheckIcon className="w-4 h-4" />
      </span>
      <h3 className="text-gray-300">{item}</h3>
    </div>
  );
};
