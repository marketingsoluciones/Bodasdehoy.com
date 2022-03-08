import { GetStaticPropsContext, NextPage } from "next";
import { IndexPoliticas } from "../components/Politicas"
import { Page } from "../interfaces";
import { fetchApi, queries } from "../utils/Fetching";
import { FC, useEffect } from "react";

const PageComponent: FC<Partial<Page>> = (props) => {
    const {title, _id} = props
    /* useEffect(() => {
        console.log(props)
    }) */

    return (
        <div className=" gap-5 max-w-screen-lg mx-auto inset-x-0 w-full space-y-10 mt-5 mb-5">
            <h1 className="mt-7 text-lg  font-bold">{title}</h1>
            <IndexPoliticas {...props}  />

        </div>
    )
}

export default PageComponent

export async function getStaticProps({ params }: GetStaticPropsContext) {
    try {
        const dataProps = await fetchApi({ query: queries.getOnePage, variables: { slug: params?.slug } })
        console.log(dataProps)
        return {
            props: dataProps , // will be passed to the page component as props
        }
    } catch (error) {
        return {
            error
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
        console.log("ERRORR", error)
        return {
            paths: [],
            fallback: true,
        };
    }
}

