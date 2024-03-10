import { FC, useEffect, useState } from "react";
import { fetchApi, queries } from "../../utils/Fetching";


const PageComponent: FC<any> = (props) => {
    console.log(props)
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
            <div dangerouslySetInnerHTML={{ __html: props?.html }} />
            <style >
                {isMounted && props?.css}
            </style>
        </>
    )
}

export default PageComponent

export async function getStaticProps({ params }: any) {
    try {
        console.log(10004, params.slug.join("/"))
        console.log(10005, params.slug)

        const { results } = await fetchApi({
            query: queries.getCodePage,
            variables: { args: { title: params?.slug[0].slice(0, -7) } }
        })
        const resultsFilter = results.find((elem: any) => elem._id.includes(params?.slug[0].slice(-6)))
        const props = resultsFilter.htmlPages.find((elem: any) => elem.title === params?.slug[1])
        if (props?.title) {
            return { props } //if exist
        }
        return { notFound: true } // not exist
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
        const paths = results?.reduce((acc: any, item: any) => {
            item.htmlPages.map((elem: any) => {
                acc.push({ params: { slug: [`${item.title}-${item._id.slice(-6)}`, elem.title] } })
            })
            return acc
        }, [])

        const params = {
            paths, // [ {params: {slug : ///// } } ]
            fallback: 'blocking' // false or 'blocking'
        }
        console.log(params)
        return params;
    } catch (error) {
        console.log(error)
        return {
            paths: [],
            fallback: true,
        };
    }
}

