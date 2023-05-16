import { GetStaticPropsContext, NextPage } from "next";
import { Page } from "../interfaces";
import { fetchApi, queries } from "../utils/Fetching";
import { FC, useEffect } from "react";
import { BreadCumbs } from "../components/Surface";
import { capitalize } from '../utils/Capitalize';
import { Markup } from "interweave";
import { Error404 } from "../components/404";

const PageComponent: FC<Page> = (props) => {
    const { title, content } = props


    return (
        <div className="max-w-screen-lg md:mx-auto mx-5 inset-x-0  ">
            <BreadCumbs />
            <h1 className="text-xl text-tertiary font-semibold pt-1">{capitalize(title)}</h1>
            <div className="bg-white w-full rounded-xl shadow  item-center mt-4  p-10  ">
                {(() => {
                    if (content) {
                        return (
                            <Markup content={content} />
                        )
                    } else {
                        return (
                            <Error404 />
                        )
                    }
                })()}
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
        const { results } = await fetchApi({
            query: queries.getAllPage,
            variables: { development: "bodasdehoy" }
        })
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

