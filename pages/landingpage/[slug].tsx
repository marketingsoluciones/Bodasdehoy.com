import { GetStaticPropsContext, NextPage } from "next";
import { Page } from "../../interfaces";
import { FC, useEffect, useState } from "react";
import { fetchApi, queries } from "../../utils/Fetching";


const PageComponent: FC<any> = (props) => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        if (!isMounted) {
            setIsMounted(true)
        }
        return () => {
            setIsMounted(false)
        }
    }, [])

    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: props?.htmlPage?.html }} />
            <style>
                {isMounted && props?.htmlPage?.css}
            </style>
        </>
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

