import { FC } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper";
import { ItemSubCategory } from "./Category";
import { subCategory } from "../interfaces";


interface propsCarrusel {
  slides: any
}

export const Carrusel: FC<propsCarrusel> = ({ slides }) => (
  <>
    <Swiper
      spaceBetween={0}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3.3,
          spaceBetween: 0,
        },
      }}
      preloadImages={false}
      lazy={true}
      modules={[Autoplay]}
    >
      {slides?.length > 0 &&
        slides.map((item: subCategory) => (
          <>
            <SwiperSlide >
              <ItemSubCategory key={item._id} {...item} slugCategory={item.slug} />
            </SwiperSlide>
          </>
        ))}
    </Swiper>

  </>
);
