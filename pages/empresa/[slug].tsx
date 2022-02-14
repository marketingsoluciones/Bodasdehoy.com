import { Markup } from "interweave";
import Link from "next/link";
import { FC, ReactNode, useState, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from "next";

import { FormListing } from "../../components/Forms";
import { RatingStars } from "../../components/Home/FeaturedCompanies";
import {
  CrossIcon,
  DocsIcon,
  FacebookIcon,
  Isologo,
  LessIcon,
  Location2Icon,
  OpinionesIcon,
  PreguntasIcon,
  WebSiteIcon,
  PhoneIcon,
  YoutubeIcon,
} from "../../components/Icons";
import EmpresaDestacada from "../../components/Listing/EmpresaDestacada";
import FAQ from "../../components/Listing/FAQ";
import FeaturesListing from "../../components/Listing/FeaturesListing";
import Feautres2Listing from "../../components/Listing/Feautres2Listing";
import FloatingButton from "../../components/Listing/FloatingButton";
import PromoActiva from "../../components/Listing/PromoActiva";
import ReviewComponent from "../../components/Listing/ReviewComponent";
import { business } from "../../interfaces";
import { fetchApi, queries } from '../../utils/Fetching';
import { InstagramIcon } from "../../components/Icons/index";
import { BreadCumbs } from "../../components/Surface";
import { createURL } from "../../utils/UrlImage";
import { createSrcSet } from '../../utils/CreateSrcSet';
import GoogleMapsView from '../../components/GoogleMaps/GoogleMapsView';
import ChatComponentView from "../../components/Listing/ChatComponentView";

type Boton = {
  title: string;
  route: string;
  icon: ReactNode;
};

const Listing: FC<business> = (props) => {
  
  const {
    imgMiniatura,
    businessName,
    content,
    accessoriesList,
    questionsAndAnswers,
    coordinates,
    webPage,
    landline,
    facebook,
    instagram,
    youtube,
    servicesList,
    characteristics,
    _id
  } = props


  
  
  const [sendMessage, setMessage] = useState(false);
  const List: Boton[] = [
    { title: "Descripción", route: "#description", icon: <DocsIcon /> },
    { title: "Opiniones", route: "#reviews", icon: <OpinionesIcon /> },
    { title: "Comó llegar", route: "#maps", icon: <Location2Icon /> },
    { title: "Preguntas", route: "#questions", icon: <PreguntasIcon /> },
  ];

  return (
    <>
      {/* Imagenes solo para moviles */}
      <div className="md:hidden relative -mt-20">
        {sendMessage ? (
          <div className="fixed w-screen h-screen top-0 left-0 md:block bg-white p-12 flex flex-col items-center justify-center z-40 ">
            <p
              className="absolute top-5 text-gray-200 text-lg right-5"
              onClick={() => setMessage(false)}
            >
              X
            </p>
            <FormListing />
          </div>
        ) : (
          <FloatingButton onClick={() => setMessage(true)} />
        )}
        <div className="buttons flex gap-3 absolute top-3 right-3">
          <span className="bg-white rounded-full border border-primary z-20 w-8 h-8 grid place-items-center">
            <FacebookIcon className="text-primary h-5 w-5" />
          </span>
        </div>
        
        <img
          alt={businessName}
          className="w-full object-cover h-80"
          src={createURL(imgMiniatura?.i640)}
          srcSet={createSrcSet(imgMiniatura)}
        />
      </div>
      
      <div id={"listing"} className="mx-auto inset-x-0 flex flex-col gap-6 mt-6">
        {/* <BreadCumbs /> */}
        <HeaderListing {...props} />
        <div className="md:bg-white w-full px-5">
          <div className="lg:max-w-screen-lg inset-x-0 mx-auto w-full grid md:grid-cols-3 gap-10 ">
            <section className="w-full md:col-span-2">
              <img
          alt={businessName}
          className="w-full object-cover h-96 hidden md:block"
          src={createURL(imgMiniatura?.i640)}
          srcSet={createSrcSet(imgMiniatura)}
        />
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
                {/* Hay que hacerlo para que quede condicional */}
                {/* <div className="w-full h-full flex items-center justify-center gap-6 py-6">
                  <PromoActiva />
                  <svg className="h-12 w-0.5 bg-gray-300" />
                  <EmpresaDestacada />
                </div> */}
              </div>
              <div className="flex flex-col flex-wrap gap-12 py-6 ">
                <ContentListing text={content} />
                <hr />
               
                {/* <FeaturesListing /> */}
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
                
                {questionsAndAnswers && questionsAndAnswers?.filter(
                  (item) => item.answers !== "").length > 0 && (
                    <>
                    <FAQ data={questionsAndAnswers} />
                    </>
                  )}
                  <div id={"maps"} className="rounded-xl overflow-hidden w-full h-64">
                  <GoogleMapsView {...coordinates}/>
                  </div>
                  <hr />
                  <ReviewComponent {...props} />
              </div>
            </section>
            <div className="hidden md:block w-full ... relative ">
              <div className="bg-white shadow md:-mt-12 rounded-xl  p-4 relative">
                <div className="flex gap-4 items-center text-primary w-full justify-center flex-col">
                <ChatComponentView {...props} />
               
                  
                  {webPage && (
                    <ItemContact
                      icon={<WebSiteIcon className="w-5 h-5" />}
                      title={webPage}
                      route={webPage}
                    />
                  )}
                  {landline && (
                    <ItemContact
                      icon={<PhoneIcon className="w-5 h-5" />}
                      title={landline}
                      route={`tel:${landline}`}
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
                      title={youtube}
                      route={youtube}
                    />
                  )}
                </div>

               
              </div>
            </div>
        <p className="text-xs w-full text-gray-300 -mt-10"><strong>Business ID: </strong> {_id}</p>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Listing;

const ItemContact: FC<{ icon: ReactNode; title: string; route: string }> = ({
  icon,
  title,
  route,
}) => {
  return (
    <div className="flex items-center gap-2 text-xs justify-between w-full border-b border-gray-100 py-2">
      {icon}
      <a href={route} rel="noreferrer" target={"_blank"}>
        <p className="text-tertiary">{title}</p>
      </a>
    </div>
  );
};

const HeaderListing: FC<Partial<business>> = ({ businessName, imgLogo }) => {
  return (
    <div className="lg:max-w-screen-lg mx-auto w-full inset-x-0 flex items-center justify-between px-5 sm:px-0">
      <div className="flex items-center gap-2">
      <img
          alt={businessName}
          className="object-cover w-24 h-24 rounded-full border-2 border-primary"
          src={imgLogo?.i640 ? createURL(imgLogo.i640) : "/placeholder/logo.png"}
          srcSet={createSrcSet(imgLogo)}
        />
        
        <div className="flex flex-col items-start md:items-start justify-center gap-y-2 ">
          <h1 className="md:text-4xl text-3xl text-tertiary pl-1">{businessName}</h1>
          <RatingStars rating={4} size={"lg"} />
        </div>
      </div>
    </div>
  );
};

interface propsContentListing {
  text: string | undefined;
}

const ContentListing: FC<propsContentListing> = ({ text }) => {
  const [seeMore, setSeeMore] = useState(false);
  return (
    <div id="description" className="max-h-full w-full">
      <div
        className={`w-full text-tertiary overflow-hidden h-auto ${
          seeMore ? "max-h-full" : "max-h-48 md:max-h-full"
        }`}
      >
        {text ? <Markup className="text-sm text-justify" content={text} /> : (
          <div className="min-h-40 h-40 flex items-center justify-center text-xs text-gray-400">
            No content
          </div>
        )}
      </div>
      <button
        className="text-primary text-sm w-full justify-end flex gap-2 items-center md:hidden"
        type={"button"}
        onClick={() => setSeeMore(!seeMore)}
      >
        {seeMore ? (
          <LessIcon className="w-3 h-3" />
        ) : (
          <CrossIcon className="w-3 h-3" />
        )}
        {seeMore ? "Leer menos" : "Leer más"}
      </button>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  try {
    const data = await fetchApi(queries.getOneBusiness, {slug : params.slug});
    return {
      props: data,
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const data = await fetchApi(queries.getSlugBusiness);
    const paths = data.reduce((acc: {params: {slug : string}}[], slug : string) => {
      slug && acc.push({params: {slug}})
      return acc
    }, [])
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