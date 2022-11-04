import { GetStaticPropsContext, NextPage } from "next";
import { Page } from "../interfaces";
import { fetchApi, queries } from "../utils/Fetching";
import { FC, useEffect } from "react";
import { BreadCumbs } from "../components/Surface";
import { capitalize } from '../utils/Capitalize';
import { Markup } from "interweave";
import Link from "next/link";
import { Isologo, LogoFullColor } from "../components/Icons";

const PageComponent: FC<Page> = (props) => {
    const { title, content } = props


    return (
        <div className="max-w-screen-lg mx-auto  inset-x-0 ">
            <BreadCumbs />
            <h1 className="text-xl text-tertiary font-semibold pt-1">{capitalize(title)}</h1>

            <div className="bg-white w-full rounded-xl shadow  item-center pb-10">

                <Markup content={content} />


                <div className="w-full flex flex-col justify-center  items-center truncate">
                    <div className="banner -mt-20 w-full h-40" />

                    <div className="flex items-center  space-x-10 py-10">
                        <div>
                            <h2 className="text-2xl md:text-6xl text-tertiary  subpixel-antialiased font-bold ">404</h2>
                        </div>
                        <div>
                            <span className="relative  font-light">
                                <h2 className="text-2xl md:text-3xl text-tertiary  subpixel-antialiased font-bold">Lo Sentim<b className="hidden">o</b><b className="pl-20px">s</b></h2>
                                <Isologo className="mt-1 isologo absolute bottom-1.5 -right-4 md:right-182px" />
                            </span>

                            <h3 className="text-2xl md:text-xl text-tertiary  subpixel-antialiased font-bold">no pudimos encontrar esta pagina</h3>

                            <span className="flex gap-4">
                                <h3 className="text-2xl md:text-xl text-tertiary  subpixel-antialiased font-bold">vuelve a</h3>
                                <Link href={"/"} passHref>
                                    <LogoFullColor className="w-auto h-5 mt-1.5 cursor-pointer " />
                                </Link>
                            </span>
                        </div>

                    </div>

                    <div>
                        <img src="" alt="" />
                    </div>
                </div>
            </div>
            <style jsx>
                {`
          .banner {
            background-image: url("/bannerCreateBusiness.webp");
            background-size: cover;
            background-position: center;
          }
        `}
            </style>

        </div>
    )
}

export default PageComponent

export async function getStaticProps({ params }: GetStaticPropsContext) {
    try {
        const dataProps = await fetchApi({ query: queries.getOnePage, variables: { slug: params?.slug } })
        if (dataProps) {
            return {
                props: dataProps, // will be passed to the page component as props
            }
        } else {
            throw new Error("Data null")
        }
    } catch (error) {
        console.log(error)
        return {
            props: {},
            revalidate: 10
        }
    }
}

export async function getStaticPaths() {
    try {
        const { results } = await fetchApi({ query: queries.getAllPage })
        const result = results?.map((item: Page) => ({ params: { slug: item.slug } }))
        return {
            paths: result, // [ {params: {slug : ///// } } ]
            fallback: true // false or 'blocking'
        };
    } catch (error) {
        console.log(error)
        return {
            paths: [],
            fallback: true,
        };
    }
}

