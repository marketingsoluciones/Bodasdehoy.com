import { Markup } from "interweave";
import { GetStaticPaths } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import BreadCumbs from "../../components/BreadCumbs";
import FormListing from "../../components/Forms/FormListing";
import { RatingStars } from "../../components/Home/FeaturedCompanies";
import { DocsIcon, HeartIconFill, Isologo, Location2Icon, OpinionesIcon, PreguntasIcon } from "../../components/icons";
import EmpresaDestacada from "../../components/Listing/EmpresaDestacada";
import PromoActiva from "../../components/Listing/PromoActiva";

type Boton = {
    title: string,
    route: string,
    icon: ReactNode
}
const listing = () => {
    const List: Boton[] = [
        { title: "Descripción", route: "#description", icon: <DocsIcon /> },
        { title: "Opiniones", route: "#opiniones", icon: <OpinionesIcon /> },
        { title: "Como llegar", route: "#como-llegar", icon: <Location2Icon /> },
        { title: "Preguntas", route: "#preguntas", icon: <PreguntasIcon /> },
    ]
    return (
        <div className="mx-auto inset-x-0 my-10 flex flex-col gap-10">
            <BreadCumbs />
            <HeaderListing />
            <div className="bg-white w-full">
                <div className="max-w-screen-xl inset-x-0 mx-auto w-full grid grid-cols-3 gap-10 ">
                    <section className="w-full col-span-2">
                        <img className="w-full object-cover h-96" src="/mask_1.png" />
                        <div className="bg-gray-100 w-full h-max -mt-4 rounded-lg relative z-10 bg-opacity-30">
                            <div className="bg-white rounded-lg py-3 w-full border border-primary flex items-center justify-between px-16">
                                {List.map((item, idx) => (
                                    <Link key={idx} href={item.route}>
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
                        <div className="w-full text-tertiary my-10">
                            <Markup content={"Hola mundo"} />
                        </div>
                    </section>
                    <ContactBlock />
                </div>
            </div>
        </div>
    )
}

export default listing

const HeaderListing = () => {
    return (
        <div className="max-w-screen-xl mx-auto w-full inset-x-0 flex items-center gap-4">
            <img className="object-cover w-24 h-24 rounded-full border border-primary" src="/mask_1.png" />
            <div className="flex flex-col items-start justify-center gap-y-2">
                <h1 className="text-4xl text-tertiary">Hotel La Manga Club</h1>
                <RatingStars rating={4} size={"lg"} />
            </div>
        </div>
    )
}



export const getStaticProps = async ({ params }: any) => {
    console.log(params)
    return {
        props: {

        }
    };
};


export const getStaticPaths: GetStaticPaths = async () => {


    return {
        paths: [
            { params: { category: "1", listing: "nuevo" } },
            { params: { category: "2", listing: "nuevo2" } }
        ],
        fallback: false
    }
}


const ContactBlock = () => {
    return (
        <aside className="w-full ... bg-white h-90 shadow -mt-12 rounded-xl p-8">
            <div className="flex gap-2 items-center text-primary w-full justify-center">
                <Isologo className="w-6 h-6" />
                <h2 className="text-lg text-light">Consultar disponibilidad</h2>
            </div>
            <FormListing />
        </aside>
    )
}

