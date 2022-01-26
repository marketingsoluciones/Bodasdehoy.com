import TitleSection from "./TitleSection";
const Slider = dynamic(() => import("react-slick"), {ssr: false})
import { FC, memo, useEffect, useState } from 'react';
import Link from "next/link";
import dynamic from 'next/dynamic';
import { category } from "../../interfaces";
import { createURL } from "../../utils/UrlImage";

interface propsPlaceDiscovery {
  data : object[] | undefined
}
const settings = {
  autoplay: true,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

export const PlaceDiscovery: FC<propsPlaceDiscovery> = ({data}) => {
  const [state, setState] = useState<any>([])

  useEffect(() => {
    const findCategory = data?.find((item: any) => item?.categorie.title.toLowerCase() === "lugares para bodas")
    setState(findCategory)
  }, [data])
  return (
    <>
      <div className="grid-cards relative w-full -mt-12 md:-mt-52 lg:-mt-96">
        <div className="w-full xl:max-w-screen-lg 2xl:max-w-screen-lg mx-auto inset-x-0 pt-20 flex flex-col gap-5 md:gap-6 md:pt-32 pb-20 z-20 px-5">
          <TitleSection
            className="text-normal md:text-xl "
            principal={"Descubre"}
            secondary={"lugares para bodas"}
          />
          <div className="z-20 relative w-full pb-8 pt-4 overflow-hidden ">
            <Slider {...settings}>
              {state?.subCategories?.map((item: any, idx: any) => (
                <PlaceCard key={idx} {...item} />
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
            background-position: left;
            position: absolute;
            width: 100%;
            height: 100px;
            top: 50%;
          }

          .grid-cards::before {
            content: "";
            background-color: white;
            width: 100%;
            height: 40%;
            position: absolute;
            margin: auto;
            right: 0;
            left: 0;
            bottom: 0;
          }

          @media (max-width: 600px) {
            .grid-cards::after {
              background-size: contain;
              top: 5%;
              background-position: left top;
            }
            .grid-cards::before {
              height: 90%;
            }
          }
        `}
      </style>
    </>
  );
};

const PlaceCard: FC<category> = memo(({title, imgMiniatura, slug}) => {
  return (
    <div className="px-4">
      <img
          alt={title}
          className="w-full h-32 md:h-52 bg-gray-100 rounded-2xl object-center object-cover"
          src={createURL(imgMiniatura?.thumbnailUrl)}
          srcSet={`
          ${createURL(imgMiniatura?.thumbnailUrl)} 300w,
          ${createURL(imgMiniatura?.smallUrl)} 994w,
          ${createURL(imgMiniatura?.mediumUrl)} 1240w
          `}
        />
      
      <Link href={slug !== "" ? slug : "/"} passHref>
        <h2 className="px-2 py-1 font-light md:text-base text-sm text-gray-600 tracking-widest capitalize cursor-pointer hover:text-gray-900">
          {title}
        </h2>
      </Link>
    </div>
  );
});


