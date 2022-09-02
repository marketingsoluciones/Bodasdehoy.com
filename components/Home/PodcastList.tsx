import TitleSection from "./TitleSection";
import { useState, useEffect, FC } from "react";
import { api } from "../../api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

export const PodcastList = () => {
  const [podcasts, setPodcast] = useState([]);

  const settings = {
    speed: 200,
    slidesToShow: 3,
    slidesToScroll: 1,
    accessibility: true,

    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerPadding: "-10px",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  const fetchingYoutube = async () => {
    try {
      const {
        data: { items },
      } = await api.youtube();
      setPodcast(items);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchingYoutube();
  }, []);
  return (
    <div className="max-w-screen-lg mx-auto inset-x-0 w-full">
      <TitleSection
        principal={"Podcast"}
        secondary={"Cómplices de Bodas"}
        size={"xl"}
      />
      <div className="grid grid-cols-1 w-full">
        <Swiper
          slidesPerView={1}
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
              slidesPerView: 3,
              spaceBetween: 0,
            },
          }}
          preloadImages={false}
          lazy={true}
          modules={[Autoplay]}
        >
          {podcasts?.map((item: any, idx: number) => (
            <>
              <SwiperSlide key={idx} >
                <div className="pt-6 overflow-hidden">
                  <Podcast key={idx} data={item} />
                </div>
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

const Podcast: FC<{ data: any }> = ({ data }) => {
  return (
    <>
      <a
        href={`https://www.youtube.com/watch?v=${data?.id?.videoId}`}
        target={"_blank"}
        rel="noreferrer"
      >
        <div className="bg-white rounded-xl shadow w-80 h-44 hover:opacity-80 transition cursor-pointer mx-auto inset-x-0"></div>
      </a>
      <style jsx>
        {`
          div {
            background-image: url("${data?.snippet?.thumbnails?.high?.url}");
            background-size: cover;
            background-position: center;
          }
        `}
      </style>
    </>
  );
};
