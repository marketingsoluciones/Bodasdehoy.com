import { Markup } from "interweave";
import { GetStaticPaths } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import Accordion from "../../components/Accordion";
import BreadCumbs from "../../components/BreadCumbs";
import FormListing from "../../components/Forms/FormListing";
import { RatingStars } from "../../components/Home/FeaturedCompanies";
import {
  DocsIcon,
  HeartIconFill,
  Isologo,
  Location2Icon,
  OpinionesIcon,
  PreguntasIcon,
} from "../../components/icons";
import EmpresaDestacada from "../../components/Listing/EmpresaDestacada";
import FAQ from "../../components/Listing/FAQ";
import FeaturesListing from "../../components/Listing/FeaturesListing";
import Feautres2Listing from "../../components/Listing/Feautres2Listing";
import PromoActiva from "../../components/Listing/PromoActiva";
import ReviewComponent from "../../components/Listing/ReviewComponent";

type Boton = {
  title: string;
  route: string;
  icon: ReactNode;
};
const listing = () => {
  const List: Boton[] = [
    { title: "Descripción", route: "#description", icon: <DocsIcon /> },
    { title: "Opiniones", route: "#opiniones", icon: <OpinionesIcon /> },
    { title: "Como llegar", route: "#como-llegar", icon: <Location2Icon /> },
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
    <div className="mx-auto inset-x-0 my-10 flex flex-col gap-10">
      <BreadCumbs />
      <HeaderListing />
      <div className="bg-white w-full">
        <div className="lg:max-w-screen-lg 2xl:max-w-screen-xl inset-x-0 mx-auto w-full grid grid-cols-3 gap-10 ">
          <section className="w-full col-span-2">
            <img
              className="w-full object-cover h-96"
              src="/mask_1.png"
              alt={"prueba"}
            />
            <div className="bg-gray-100 w-full h-max -mt-4 rounded-lg relative z-10 bg-opacity-30">
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
                <svg className="h-12 w-0.5 bg-gray-200" />
                <EmpresaDestacada />
              </div>
            </div>
            <div className="flex flex-col gap-14 py-10">
              <div className="w-full text-tertiary">
                <Markup content={text} />
              </div>
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
          <ContactBlock />
        </div>
      </div>
    </div>
  );
};

export default listing;

const HeaderListing = () => {
  return (
    <div className="lg:max-w-screen-lg 2xl:max-w-screen-xl mx-auto w-full inset-x-0 flex items-center gap-4">
      <img
        className="object-cover w-22 h-22 rounded-full border border-primary"
        src="/logo_prueba.png"
        alt={"Hola mundo"}
      />
      <div className="flex flex-col items-start justify-center gap-y-2">
        <h1 className="text-4xl text-tertiary">Hotel La Manga Club</h1>
        <RatingStars rating={4} size={"lg"} />
      </div>
    </div>
  );
};

export const getStaticProps = async ({ params }: any) => {
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

const ContactBlock = () => {
  return (
    <aside className="w-full ... bg-white h-max shadow -mt-12 rounded-xl p-8">
      <div className="flex gap-2 items-center text-primary w-full justify-center">
        <Isologo className="w-5 h-5" />
        <h2 className="text-md text-light">Consultar disponibilidad</h2>
      </div>
      <FormListing />
    </aside>
  );
};
