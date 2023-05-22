import TitleSection from "./TitleSection";
const Slider = dynamic(() => import("react-slick"), { ssr: false });
import { FC, memo, useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { category, fetchCategory, subCategory } from "../../interfaces";
import { createURL } from "../../utils/UrlImage";
import { createSrcSet } from "../../utils/CreateSrcSet";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";


interface propsPlaceDiscovery {
  data: Partial<category>[];
}
const settings = {
  speed: 200,
  infinite: false,
  slidesToShow: 4,
  arrows: false,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        rows: 2,
      },
    },

    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        rows: 1,
      },
    },
  ],
};

export const PlaceDiscovery: FC<propsPlaceDiscovery> = ({ data }) => {
  const [state, setState] = useState<Partial<category>>();

  useEffect(() => {
    const findCategory = data?.find(
      (item: any) => item?.title?.toLowerCase() === "lugares para bodas"
    );
    setState(findCategory);
  }, [data]);

  return (
    <>
      <div className="grid-cards relative w-full -mt-6 md:-mt-52 lg:-mt-80">
        <div className="w-full xl:max-w-screen-lg 2xl:max-w-screen-lg mx-auto inset-x-0 pt-20 flex flex-col gap-5 md:gap-6 md:pt-32 pb-10 z-20 px-5">
          <TitleSection
            className="text-normal md:text-xl "
            principal={"Descubre"}
            secondary={"lugares para bodas"}
          />
          <div className="z-20 relative w-full pb-8 pt-4 overflow-hidden ">
            {state && state?.subCategories && state.subCategories.length > 0 && (
              <Swiper
                slidesPerView={1}
                spaceBetween={0}
                loop={true}
                navigation={true}
                breakpoints={{
                  640: {
                    slidesPerView: 4,
                    spaceBetween: 0,
                  },
                }}
                preloadImages={false}
                lazy={true}
                modules={[Autoplay, Navigation]}
              >
                {state?.subCategories?.map((item: any, idx: any) => (
                  <div key={idx}>
                    <SwiperSlide  className="pr-4 pl-4">
                      <PlaceCard  {...item} />
                    </SwiperSlide>
                  </div>
                ))}
              </Swiper>
            )}
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
              top: 6%;
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

const PlaceCard: FC<subCategory> = memo(({ title, imgMiniatura, slug }) => {

  const router = useRouter()
  return (
    <Link href={`/categoria/lugares-para-bodas/${slug}` ?? "/"} passHref>
      <div className="px-4 cursor-pointer">
        <img
          alt={title}
          className="w-full h-32 md:h-52 bg-gray-100 rounded-2xl object-center object-cover"
          src={createURL(imgMiniatura?.i640)}
          srcSet={createSrcSet(imgMiniatura)}
        />

        <h2 className="px-2 py-1 font-light md:text-base text-sm text-gray-600 tracking-widest capitalize cursor-pointer hover:text-gray-900 text-left">
          {title}
        </h2>
      </div>
    </Link>
  );
});
