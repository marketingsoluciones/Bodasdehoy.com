import { FC, memo } from "react";
import Slider from "react-slick";
import { useHover } from "../../hooks";
import { CheckIcon } from "../Icons";
import Image from 'next/image'
import Link from "next/link";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';

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
      <div className="flex flex-col items-center pb-5 ">
        <h2 className="font-title text-4xl text-center md:text-6xl md:w-[45%] mx-auto *inset-x-0 text-primary pt-14 pb-3   ">
          Tu boda comienza cuando la imaginas
        </h2>
        <span className="text-primary pb-3 ">
          haz tuyo cada instante hasta el gran día
        </span>
        <span className="text-center text-gray-600 text-xs w-[80%] md:w-[100%] pb-2">
          Participa en cada momento de  la preparación de tu boda con la app EVENTOS ORGANIZADOR.<br/>
        </span>
        <span className="text-center text-gray-600 text-xs w-[75%] md:w-[100%]">
          El brillo de tu gran día es el resultado de la perfecta coordinación de muchos detalles.
        </span>
      </div>

      {/* <span className="font-display text-xl w-full font-light ">
          con nuestra app
        </span> */}

      <div className="max-w-screen-lg mx-auto inset-x-0 grid md:grid-cols-2  grid-cols-1 w-full h-[28rem]">

        <div className="relative p-2 w-auto  h-auto  md:h-auto -ml-4   ">
          <Image src="/bannerApp.webp" layout={"fill"} objectPosition={"50% 50%"} objectFit={"contain"} alt="banner bodasdehoy" />
        </div>

        <div className="flex flex-col  justify-center cursor-default">
          <div className=" overflow-hidden px-5 md:px-0 ">
            {/* <Slider {...settings}>
              {List.map((item, idx) => (
                <Feature key={idx} item={item} />
              ))}
            </Slider> */}
            <Swiper
              slidesPerView={1}
              spaceBetween={0}
              loop={true}
              navigation={true}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 0
                }
              }}
              preloadImages={false}
              lazy={true}
              modules={[Autoplay, Navigation]}
            >
              {List.map((item, idx) => (
                <SwiperSlide key={idx} className="">
                  <Feature item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="w-full flex items-center justify-center py-10">
            <Link
              href={process.env.NEXT_PUBLIC_EVENTSAPP ?? ""}
            >
              <a
                className="bg-primary rounded-full px-5 py-2 text-white hover:bg-white hover:text-primary transition border border-primary"
              >
                Quiero saber más
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};


interface propsFeautre {
  item: string;
}
export const Feature: FC<propsFeautre> = memo(({ item }) => {
  const [hoverRef, isHovered] = useHover();
  return (
    <div
      ref={hoverRef}
      className="flex items-center gap-2 mx-auto inset-x-0 w-max px-5"
    >
      <span
        className={`${isHovered ? "bg-primary text-white" : "bg-white text-primary"
          } border border-primary rounded-full`}
      >
        <CheckIcon className="w-4 h-4" />
      </span>
      <h4 className="text-gray-500">{item}</h4>
    </div>
  );
});
