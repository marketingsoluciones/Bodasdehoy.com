import Slider from "react-slick";
import TitleSection from "./TitleSection";
import { useState, useEffect, FC } from "react";
import { api } from "../../api";
import Link from "next/link";

export const PodcastList = () => {
  const [podcasts, setPodcast] = useState([]);

  const settings = {
    speed: 200,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    accessibility: true,

    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerPadding: "-10px",
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
        <Slider {...settings} className="pt-6 overflow-hidden">
          {podcasts?.map((item: any, idx: number) => (
            <Podcast key={idx} data={item} />
          ))}
        </Slider>
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
