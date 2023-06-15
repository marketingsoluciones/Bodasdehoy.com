import { FC, useEffect, useState, memo } from 'react';
import {
  EuroIcon as EuroIcon2,
  HeartIconFill,
  HeartIconOutline,
  StarRating,
} from "../Icons";
import { PlusButton } from "../Inputs";
const Slider = dynamic((): any => import('react-slick'), { ssr: false })
import { Markup } from "interweave"
import dynamic from 'next/dynamic';
import Link from 'next/link'
import { createURL } from '../../utils/UrlImage';
import { business } from '../../interfaces';
import { createSrcSet } from '../../utils/CreateSrcSet';
import { CardBusiness } from '../Category';
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';

interface propsFeaturedCompanies {
  business: business[];
}
const settings = {
  speed: 200,
  infinite: false,
  slidesToShow: 3,
  arrows: false,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        rows: 1,
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

export const FeaturedCompanies: FC<propsFeaturedCompanies> = ({ business }) => {
  const [data, setData] = useState<business[]>([])

  useEffect(() => {
    setData(business)
  }, [business])

  return (
    <div className="w-full xl:max-w-screen-lg 2xl:max-w-screen-lg mx-auto inset-x-0 flex flex-col px-5 md:px-0 mb-5">
      <Link href={"/categoria/proveedores"} passHref>
        <div className="w-max flex flex-col items-center h-full mx-auto inset-x-0">
          <h2 className="w-max text-center text-lg md:text-2xl text-primary font-semibold cursor-default">
            Empresas de bodas destacadas
          </h2>
          <p className="font-light text-sm w-full text-right text-primary cursor-pointer hover:text-gray-400 transition">
            Ver todos los proveedores
          </p>
        </div>
      </Link>

      <div className="md:grid md:grid-cols-1 w-full mb-16 md:mb-0 h-96">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
          }}
          preloadImages={false}
          lazy={true}
          modules={[Autoplay, Navigation]}
          className='pb-10 md:h-1/2'
        >
          <div className='h-96'>
            {data?.map((item: business, idx) => (
              <SwiperSlide key={idx} className="pr-10 pl-10">
                <div className='flex '>
                  <CardBusiness key={item._id} {...item} size={'lg'} redi={`/empresa/${item.slug}`} />
                </div>
              </SwiperSlide>
            ))}
          </div>

        </Swiper>
      </div>
    </div>
  );
};

interface propsCompanyCard {
  data: business;
  pricing?: boolean
}

export const CompanyCard: FC<propsCompanyCard> = memo(({ data, pricing = true }) => {
  const [isFav, setFav] = useState(false);
  const [business, setBusiness] = useState<business>();

  useEffect(() => {
    setBusiness(data);
  }, [data]);

  return (
    <div className="rounded-3xl w-72 h-full mx-auto inset-x-0  relative h-full">
      <div className="h-60 rounded-3xl cursor-pointer overflow-hidden ">
        <div className="bg-gradient-to-t from-transparent to-black w-full h-1/4 rounded-3xl opacity-60 absolute" />
        <img
          alt={business?.businessName}
          className="object-cover object-center w-full h-full"
          src={createURL(business?.imgMiniatura?.i640)}
          srcSet={createSrcSet(business?.imgMiniatura)}
        />

      </div>
      <div className="bg-color-base rounded-3xl h-max transform -translate-y-10 w-full text-center p-4 flex flex-col gap-1 shadow-md">
        <h2 className="font-ligth text-gray-500 tracking-widest text-regular pt-1 uppercase">
          {business?.subCategories && business.subCategories.length >= 0 && business?.subCategories[0]}
        </h2>
        <Link href={`/empresa/${business?.slug}`} passHref>

          <h3 className="text-gray-700 text-lg font-medium transition cursor-pointer hover:text-primary capitalize">
            {business?.businessName}
          </h3>
        </Link>
        <RatingStars rating={4} active={false}/>
        <h3 className="text-gray-500 text-sm">{business?.address}</h3>
        {pricing && (
          <div className="border-t border-b border-primary py-2 my-2 flex items-center justify-center gap-2">
            <EuroIcon2 />
            <p className="font-bold text-primary">
              desde <span className="font-normal">300€</span>
            </p>
          </div>
        )}
        <p className="text-gray-500 text-sm h-max py-4 leading-5">
          <Markup content={business?.description} noHtml />
        </p>
        <PlusButton />
      </div>
      <span
        className="absolute top-4 right-4 hover:scale-110 transform transition cursor-pointer"
        onClick={() => setFav(!isFav)}
      >
        {isFav ? (
          <HeartIconFill className="text-primary" />
        ) : (
          <HeartIconOutline />
        )}
      </span>
    </div>
  );
});

interface propsRatings {
  rating: number;
  size?: string;
  visibleText?: number;
  outValue?: any;
  active?:boolean;
}

export const RatingStars: FC<propsRatings> = ({
  rating,
  size = "base",
  visibleText,
  outValue = () => { },
  active
}) => {
  const matriz: number[] = [1, 2, 3, 4, 5];
  const sizes: any = {
    base: "",
    lg: "w-4 h-4 mx-0.5",
    xl: "w-5 h-5 mx-0.5",
  };
  console.log(rating)
  return (
    <div className="flex items-center justify-center h-max gap-2">
      <div className={`flex  items-center  ${active === true?"cursor-pointer":"cursor-default"}`}>
        {matriz.map((item, idx) => (
          <StarRating
            key={idx}
            className={`transition ${rating >= item
              ? "text-yellow-400 "
              : active===true?"hover:text-yellow-400 text-gray-400":"text-gray-400 "
              }  ${sizes[size]} `}
            onClick={() => outValue(item)}
          />
        ))}
      </div>
      {visibleText && <p className="text-xs text-gray-700">{visibleText}</p>}
    </div>
  );
};
