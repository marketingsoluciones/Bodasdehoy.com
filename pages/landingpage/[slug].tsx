import { GetStaticPropsContext, NextPage } from "next";
import { Page } from "../../interfaces";
import { FC } from "react";
import { fetchApi, queries } from "../../utils/Fetching";


const PageComponent: FC<any> = (props) => {
    return (
        <div className="max-w-screen-lg md:mx-auto mx-5 inset-x-0  ">
            hola mundo
        </div>
    )
}

export default PageComponent

export async function getStaticProps({ params }: GetStaticPropsContext) {
    try {
        const { results } = await fetchApi({
            query: queries.getCodePage,
            variables: { args: { slug: params?.slug } }
        })
        if (results?.length > 0) {
            return {
                props: results[0], // will be passed to the page component as props
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
            query: queries.getCodePage,
            variables: { args: { status: true, state: "publicated" } }
        })
        const result = results?.map((item: any) => ({ params: { slug: item.slug } }))
        const params = {
            paths: result, // [ {params: {slug : ///// } } ]
            fallback: true // false or 'blocking'
        }
        return params;
    } catch (error) {
        console.log(error)
        return {
            paths: [],
            fallback: true,
        };
    }
}

