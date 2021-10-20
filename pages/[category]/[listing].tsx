import { Markup } from "interweave";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { FC, ReactNode, useState } from "react";
import BreadCumbs from "../../components/BreadCumbs";
import FormListing from "../../components/Forms/FormListing";
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
} from "../../components/icons";
import EmpresaDestacada from "../../components/Listing/EmpresaDestacada";
import FAQ from "../../components/Listing/FAQ";
import FeaturesListing from "../../components/Listing/FeaturesListing";
import Feautres2Listing from "../../components/Listing/Feautres2Listing";
import FloatingButton from "../../components/Listing/FloatingButton";
import PromoActiva from "../../components/Listing/PromoActiva";
import ReviewComponent from "../../components/Listing/ReviewComponent";

type Boton = {
  title: string;
  route: string;
  icon: ReactNode;
};
const listing: FC = () => {
  const [sendMessage, setMessage] = useState(false);
  const List: Boton[] = [
    { title: "Descripción", route: "#description", icon: <DocsIcon /> },
    { title: "Opiniones", route: "#opiniones", icon: <OpinionesIcon /> },
    { title: "Comó llegar", route: "#como-llegar", icon: <Location2Icon /> },
    { title: "Preguntas", route: "#preguntas", icon: <PreguntasIcon /> },
  ];

  const Features = [
    { title: "Terrazas", check: true },
    { title: "Zona ajardinada", check: true },
    { title: "Zona de baile", check: true },
    { title: "Zona para ceremonia", check: true },
    { title: "Salones de banquetes", check: true },
    { title: "Carpas", check: false },
    { title: "Cocina para catering", check: true },
    { title: "Hospedaje para invitados", check: true },
    { title: "Parking", check: true },
  ];

  const Services = [
    { title: "Banquete", check: true },
    { title: "Música", check: true },
    { title: "Fotografia", check: true },
    { title: "Ceremonia", check: true },
    { title: "Transporte", check: true },
    { title: "Decoracion", check: false },
  ];

  const text = `La Manga Club. Una boda especial tiene que celebrarse en un lugar mágico a cargo de profesionales del sector. Eligiendo La Manga Club quedaréis contentos de la perfección del evento y las atenciones que recibiréis. Este enclave os ofrece un marco romántico. Os ayudarán a organizarlo todo de principio a fin.

    El espléndido nuevo Gran Salón Panorama de Las Lomas Village es perfecto para un banquete nupcial. Situado en lo alto de una colina, ofrece vistas espectaculares del complejo, con una amplia terraza también a vuestra disposición.
    
    La Manga Club es un magnífico establecimiento de cinco estrellas, con una ubicación privilegiada en el corazón del galardonado complejo de conferencias, ocio y golf La Manga Club. Se encuentra situado entre colinas que separan el Mediterráneo del Mar Menor en la Región de Murcia, en el sureste español. El acceso al complejo es excelente con el aeropuerto de Murcia a tan solo 20 minutos y el de Alicante a 1 hora de distancia.
    `;

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
        ) : <FloatingButton onClick={() => setMessage(true)} />}
        <div className="buttons flex gap-3 absolute top-3 right-3">
          <span className="bg-white rounded-full border border-primary z-20 w-8 h-8 grid place-items-center">
            <FacebookIcon className="text-primary h-5 w-5" />
          </span>
        </div>
        <img
          className="w-full object-cover h-80"
          src="/mask_1.png"
          alt={"prueba"}
        />
      </div>
      {/* Imagenes solo para moviles */}
      <div className="mx-auto inset-x-0 my-10 flex flex-col gap-10 ">
        <BreadCumbs className="hidden md:flex" />
        <HeaderListing />
        <div className="md:bg-white w-full px-5">
          <div className="lg:max-w-screen-lg inset-x-0 mx-auto w-full grid md:grid-cols-3 gap-10 ">
            <section className="w-full md:col-span-2 ">
              <img
                className="w-full object-cover h-96 hidden md:block"
                src="/mask_1.png"
                alt={"prueba"}
              />
              <div className="hidden md:block bg-gray-100 w-full h-max -mt-4 rounded-lg relative z-10 bg-opacity-30">
                <div className="bg-white rounded-lg py-3 w-full border border-primary flex items-center justify-between px-16">
                  {List.map((item, idx) => (
                    <Link key={idx} href={item.route} passHref>
                      <div className="flex items-center text-gray-200 text-sm gap-2 hover:scale-125 transition transform cursor-pointer">
                        {item?.icon}
                        {item?.title}
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="w-full h-full flex items-center justify-center gap-6 py-6">
                  <PromoActiva />
                  <svg className="h-12 w-0.5 bg-gray-100" />
                  <EmpresaDestacada />
                </div>
              </div>
              <div className="flex flex-col flex-wrap gap-14 py-10 ">
                <ContentListing text={text} />
                <FeaturesListing />
                <div className="flex flex-col gap-6">
                  <Feautres2Listing
                    title={"Instalaciones"}
                    proveedor={"La Manga Club"}
                    data={Features}
                  />
                  <Feautres2Listing
                    title={"Servicios"}
                    proveedor={"La Manga Club"}
                    data={Services}
                  />
                </div>
                <FAQ />
                <ReviewComponent />
              </div>
            </section>
            <div className="hidden md:block w-full ... bg-white shadow md:-mt-12 rounded-xl p-8 mx-auto inset-x-0 ">
              <FormListing />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default listing;

const HeaderListing: FC = () => {
  return (
    <div className="lg:max-w-screen-lg mx-auto w-full inset-x-0 flex flex-col md:flex-row justify-center md:justify-start items-center md:gap-4 gap-2 -mt-24 md:mt-0 z-30">
      <img
        className="object-cover w-22 h-22 rounded-full border border-primary"
        src="/logo_prueba.png"
        alt={"Hola mundo"}
      />
      <div className="flex flex-col items-center md:items-start justify-center gap-y-2 ">
        <h1 className="md:text-4xl text-3xl text-tertiary">
          Hotel La Manga Club
        </h1>
        <RatingStars rating={4} size={"lg"} />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  console.log(params);
  return {
    props: {},
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { category: "1", listing: "nuevo" } },
      { params: { category: "2", listing: "nuevo2" } },
    ],
    fallback: false,
  };
};

interface propsContentListing {
  text: string;
}
const ContentListing: FC<propsContentListing> = ({ text }) => {
  const [seeMore, setSeeMore] = useState(false);
  return (
    <div className="max-h-full w-full">
      <div
        className={`w-full text-tertiary overflow-hidden h-auto ${
          seeMore ? "max-h-full" : "max-h-48 md:max-h-full"
        }`}
      >
        <Markup className="text-sm text-justify" content={text} />
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
