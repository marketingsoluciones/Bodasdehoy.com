import { Markup } from "interweave";
import Link from "next/link";
import { FC, MouseEventHandler, ReactNode, useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { FormListing } from "../../components/Forms";
import { RatingStars } from "../../components/Home/FeaturedCompanies";
import { CrossIcon, DocsIcon, FacebookIcon, Isologo, LessIcon, Location2Icon, OpinionesIcon, PreguntasIcon, WebSiteIcon, PhoneIcon, YoutubeIcon, ArrowIcon, MessageIcon, } from "../../components/Icons";
import EmpresaDestacada from "../../components/Listing/EmpresaDestacada";
import FAQ from "../../components/Listing/FAQ";
import FeaturesListing from "../../components/Listing/FeaturesListing";
import Feautres2Listing from "../../components/Listing/Feautres2Listing";
import FloatingButton from "../../components/Listing/FloatingButton";
import PromoActiva from "../../components/Listing/PromoActiva";
import ReviewComponent from "../../components/Listing/ReviewComponent";
import { business } from "../../interfaces";
import { fetchApi, queries } from "../../utils/Fetching";
import { InstagramIcon } from "../../components/Icons/index";
import { createURL } from "../../utils/UrlImage";
import { createSrcSet } from "../../utils/CreateSrcSet";
import GoogleMapsView from "../../components/GoogleMaps/GoogleMapsView";
import ChatComponentView from "../../components/Listing/ChatComponentView";
import ModalReview from "../../components/Listing/ModalReview";
import { capitalize } from "../../utils/Capitalize";
import { useDisclosure } from "../../hooks/useDisclosure";
import { ButtonComponent } from "../../components/Inputs";
import { AuthContextProvider } from "../../context";
import { BreadCumbs } from "../../components/Surface";
import { useRouter } from "next/router";
import { reviewsT } from '../../interfaces/index';
import Slider from "react-slick"
import "slick-carousel/slick/slick-theme.css";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import ButtonReclamarEmpresa from "../../components/ButtonReclamarEmpresa";

type Boton = {
  title: string;
  route: string;
  icon: ReactNode;
};

const Listing: FC<business> = (props) => {
  const { user } = AuthContextProvider();
  const router = useRouter()
  const [sendMessage, setMessage] = useState(false);
  const [totalReviews, setTotalReviews] = useState(0);

  const {
    imgMiniatura,
    businessName,
    description,
    accessoriesList,
    content,
    questionsAndAnswers,
    coordinates,
    webPage,
    landline,
    facebook,
    instagram,
    youtube,
    characteristics,
    _id,
    userUid,
    review,
    reviewsT,
    imgCarrusel

  } = props;

  const [averageTotal, setAverageTotal] = useState<number>(review);
  const [reviewsProps, setReviewsProps] = useState<reviewsT>(reviewsT);
  const [newRout, setNewRout] = useState("")
  const http = 'http://'
  const inclu = webPage.includes(http)

useEffect(()=>{
  if (inclu == false) {
    setNewRout(webPage.replace('www', 'http://www'))
  }else{
    setNewRout(webPage)
  }
}, [webPage])

  const List: Boton[] = [
    //{ title: "Descripción", route: "#description", icon: <DocsIcon /> },
    { title: "Opiniones", route: "#reviews", icon: <OpinionesIcon /> },
    { title: "Cómo llegar", route: "#maps", icon: <Location2Icon /> },
    { title: "Preguntas", route: "#questions", icon: <PreguntasIcon /> },
  ];

  const scroll = () => {
    window.scrollTo(0, document.body.scrollHeight);
  }

  const settings = {
    arrows: true,
    infinite: false,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "hidden md:block text-center",
    centerMode: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <>
      {/* Imagenes solo para moviles */}
      <div className="md:hidden relative md:-mt-20">
        {sendMessage ? (
          <div className="fixed w-screen h-screen top-0 left-0 md:block bg-white p-12 flex flex-col items-center justify-center z-40 ">
            <p className="absolute top-5 text-gray-200 text-lg right-5" onClick={() => setMessage(false)}>
              X
            </p>
            <FormListing />
          </div>
        ) : (
          <FloatingButton onClick={() => setMessage(true)} />
        )}

        <img
          alt={businessName}
          className="w-full object-cover h-80"
          src={createURL(imgMiniatura?.i640)}
          srcSet={createSrcSet(imgMiniatura)}
        />
      </div>

      <div
        id={"listing"}
        className="mx-auto inset-x-0 flex flex-col gap-6 px-5 "
      >
        <BreadCumbs />

        <HeaderListing
          {...props}
          totalReviews={totalReviews}
          averageTotal={averageTotal}
        />

        <div className="md:bg-white w-full">
          <div className="lg:max-w-screen-lg inset-x-0 mx-auto w-full grid md:grid-cols-3 gap-10  ">
            <section className="w-full md:col-span-2">
              <div className=" hidden md:block ">
                <Slider {...settings} >
                  {imgCarrusel?.map((item, idx) => (
                    <img
                      key={idx}
                      alt={businessName}
                      className="w-full object-cover h-96 "
                      src={createURL(item?.i640)}
                      srcSet={createSrcSet(imgMiniatura)} />
                  ))}
                </Slider>
              </div>
              <div className="hidden md:block bg-gray-200 w-full h-max -mt-4 rounded-lg relative z-10 bg-opacity-30">
                <div className="bg-white rounded-lg py-3 w-full border border-primary flex items-center justify-between px-16">
                  {List.map((item, idx) => (
                    <Link key={idx} href={item.route} passHref>
                      <div className="flex items-center text-gray-500 text-sm gap-2 hover:scale-105 transition transform cursor-pointer">
                        {item?.icon}
                        {item?.title}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-col flex-wrap gap-12 py-5 pb-0">
                {content && (
                  <>
                    <ContentListing text={content} />
                    <hr />
                  </>
                )}

                {/* <FeaturesListing /> */}
                {characteristics && characteristics?.length > 0 && (
                  <>
                    <div id="questions" className="transition flex flex-col gap-6">
                      {characteristics?.map((item) => (
                        <Feautres2Listing
                          key={item.characteristic._id}
                          title={item?.characteristic.title}
                          provider={businessName ?? ""}
                          items={item?.characteristic.items}
                        />
                      ))}
                    </div>
                    <hr />
                  </>
                )}

                {questionsAndAnswers &&
                  questionsAndAnswers?.filter((item) => item.answers !== "")
                    .length > 0 && (
                    <>
                      <FAQ data={questionsAndAnswers} />
                    </>
                  )}

                <ReviewComponent
                  {...props}
                  totalReviews={totalReviews}
                  averageTotal={averageTotal}
                  setTotalReviews={setTotalReviews}
                  reviewsProps={reviewsProps}
                  setAverageTotal={setAverageTotal}
                  setReviewsProps={setReviewsProps}
                />

                {coordinates?.coordinates?.length > 0 && (
                  <>
                    <div id={"maps"} className="flex items-center gap-3">
                      <Location2Icon className="w-10 h-10" />
                      <h2 className="text-lg text-gray-500">
                        Cómo llegar
                      </h2>
                    </div>
                    <div className="w-full grid justify-items-center">
                      <div className="rounded-xl overflow-hidden w-11/12">
                        <GoogleMapsView
                          lat={coordinates?.coordinates[0]}
                          lng={coordinates?.coordinates[1]}
                          businessName={props.businessName}
                        />
                      </div>
                    </div>
                    <hr />
                  </>
                )}
              </div>
            </section>

            <div className="  md:block w-full ... relative ">
              <div className="bg-white shadow md:-mt-12 rounded-xl  p-4 relative">
                <div className="flex gap-4 items-center text-primary w-full justify-center flex-col">
                  {/* Si soy el dueño de la empresa no aparece y si la empresa no tiene userUid tampoco aparece*/}
                  {userUid !== user?.uid && userUid !== '' && <ChatComponentView {...props} />}

                  {webPage && (
                    <ItemContact
                      icon={<WebSiteIcon className="w-5 h-5" />}
                      title={webPage.length > 33 ? webPage.substring(0, 30) + "..." : webPage}
                      route={newRout}
                    />
                  )}
                  {landline && (
                    <ItemContact
                      icon={<PhoneIcon className={"w-5 h-5 md:cursor-default"} />}
                      title={landline}
                      route={`tel:${landline}`}
                      type="phone"
                    />
                  )}
                  {facebook && (
                    <ItemContact
                      icon={<FacebookIcon className="w-5 h-5" />}
                      title={businessName ?? ""}
                      route={facebook}
                    />
                  )}
                  {instagram && (
                    <ItemContact
                      icon={<InstagramIcon className="w-5 h-5" />}
                      title={businessName ?? ""}
                      route={instagram}
                    />
                  )}
                  {youtube && (
                    <ItemContact
                      icon={<YoutubeIcon className="w-5 h-5" />}
                      title={businessName ?? ""}
                      route={youtube}
                    />
                  )}

                  {userUid !== user?.uid && userUid === '' && <ButtonReclamarEmpresa />}
                </div>

              </div>
            </div>
            <p className="text-xs w-full text-gray-300 md:-mt-10">
              <strong>Business ID: </strong> {_id}
            </p>
          </div>
        </div>
        <button onClick={scroll} className="absolute bg-primary p-4 rounded-full md:hidden top-96 right-5">
          <MessageIcon />
        </button>
      </div>
    </>
  );
};

export default Listing;

const ItemContact: FC<{ icon: ReactNode; title: string; route: string, type?: string }> = ({
  icon,
  title,
  route,
  type
}) => {
  const [widthScreen, setWidthScreen] = useState(0)
  useEffect(() => {
    if (window?.innerWidth) {
      setWidthScreen(window.innerWidth)
    }
  }, [])
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window?.innerWidth) {
        setWidthScreen(window.innerWidth)
      }
    });
    return () => {
      window.removeEventListener("resize", () => { })
    }
  }, [])

  const onClick: MouseEventHandler<HTMLDivElement> | undefined = () => {
    widthScreen < 768 ? window.open(route, '_blank') :
      !type && window.open(route, '_blank')
  }

  return (
    <div className="flex items-center gap-10 text-xs justify-between w-full border-b border-gray-100 py-2 overflow-hidden relative">
      <div className="w-5 h-5">
        {icon}
      </div>
      <div className="w-full flex items-center justify-end cursor-pointer" onClick={onClick}>
        <p id={type} className="text-tertiary truncate" >{title}</p>
      </div>
    </div>
  );
};

interface propsHeaderListing extends business {
  totalReviews: number
  averageTotal: number
}
const HeaderListing: FC<propsHeaderListing> = ({
  businessName,
  imgLogo,
  averageTotal,
  totalReviews
}) => {
  return (
    <div className="lg:max-w-screen-lg mx-auto w-full inset-x-0 flex items-center justify-between  pt-10 md:pt-0">
      <div className="flex items-center gap-2">
        <img
          alt={businessName}
          className="object-cover w-24 h-24 rounded-full border-2 border-primary"
          src={
            imgLogo?.i640 ? createURL(imgLogo.i640) : "/placeholder/logo.png"
          }
          srcSet={createSrcSet(imgLogo)}
        />

        <div className="flex flex-col items-start md:items-start justify-center gap-y-2 ">
          <h1 className="md:text-4xl text-3xl text-tertiary pl-1">
            {businessName}
          </h1>
          <RatingStars
            active={false}
            rating={averageTotal}
            size={"lg"}
            visibleText={totalReviews}
          />
        </div>
      </div>
    </div>
  );
};

interface propsContentListing {
  text: string | undefined;
}

const ContentListing: FC<propsContentListing> = ({ text }) => {
  const [seeMore, setSeeMore] = useState<boolean>(text ? text.repeat(2)?.length > 100 : false);
  const [showContent, setShowContent] = useState<boolean>(false)
  return (
    <div id="content" className="max-h-full w-full">
      <div
        className={`w-full text-tertiary overflow-hidden h-auto ${seeMore ? "max-h-full" : "max-h-48 md:max-h-full"
          }`}
      >
        {text ? (
          <Markup className="text-sm text-justify transition-all" content={showContent ? text.repeat(1) : text.repeat(1)?.slice(0, 250)} />
        ) : (
          <div className="min-h-40 h-40 flex items-center justify-center text-xs text-gray-400">
            No content
          </div>
        )}
      </div>
      {seeMore && (
        <button
          className="text-primary text-sm w-full justify-end flex gap-2 py-4 w-max float-right items-center "
          type={"button"}
          onClick={() => setShowContent(!showContent)}
        >
          {showContent ? (
            <LessIcon className="w-3 h-3" />
          ) : (
            <CrossIcon className="w-3 h-3" />
          )}
          {showContent ? "Leer menos" : "Leer más"}
        </button>
      )}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  try {
    const data = await fetchApi({
      query: queries.getOneBusiness,
      variables: { slug: params.slug },
    });
    if (data.errors) {
      throw new Error("Error al traer los datos");
    }
    return {
      props: data,
      revalidate: 10
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  try {
    const data = await fetchApi({
      query: queries.getSlugBusiness,
      variables: { development: "bodasdehoy" }
    });
    const paths = data.reduce(
      (acc: { params: { slug: string } }[], slug: string) => {
        slug && acc.push({ params: { slug } });
        return acc;
      },
      []
    );
    return {
      paths: paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.log(error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};
