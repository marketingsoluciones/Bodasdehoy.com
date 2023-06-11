import { Markup } from "interweave";
import { GetStaticPaths, GetStaticProps, NextPage, GetStaticPropsContext } from "next";
import { FC, useEffect, useState } from "react";
import { Searcher } from "..";
import { Banner, ShareComponent, TagsComponent } from "../../components/Article";
import { TagIcon } from "../../components/Icons";
import { RelatedArticles, AsideLastestArticles, SuscribeComponent } from "../../components/Magazine";
import { BreadCumbs, DisqusComponent } from "../../components/Surface";
import { OnePost, Post } from "../../interfaces";
import { GraphQL, fetchApi, queries } from '../../utils/Fetching';
import algoliasearch from "algoliasearch/lite";
import { connectSearchBox, Hits, InstantSearch } from "react-instantsearch-dom";
import { connectWithQuery, Hit } from "../../components/Surface/Navigation";
import { SearchIcon } from "../../components/Icons";

const Article: FC<Partial<OnePost>> = (props) => {
  const [fivePost, setPost] = useState<Post[]>([])

  const fetchData = async () => {
    try {
      const { results } = await fetchApi({
        query: queries.getAllPost,
        variables: { sort: { createdAt: 1 }, criteria: { status: true }, limit: 5, development: "bodasdehoy" }
      })
      setPost(results)

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, []);
  const { content, tags = [] } = props

  const conditionalQuery = {
    search(requests: any) {
      if (
        requests.every(({ params }: any) => !params.query) ||
        requests.every(({ params }: any) => !params.query.trim())
      ) {
        // Here we have to do something else
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            processingTimeMS: 0,
          })),
        });
      }
      const searchClient = algoliasearch(
        "4YG7QHCVEA",
        "920a6487923dbae05fb89b1be0955e74"
      );
      return searchClient.search(requests);
    },
  };
  return (
    <section className="w-full flex flex-col items-center md:mt-3 mt-16 ">
      <div className="max-w-screen-lg mx-auto inset-x-0 px-5 md:px-0">
        <span className="hidden md:block">
          <BreadCumbs />
        </span>
        <Banner {...props} />
        <div className="grid md:grid-cols-3 w-full gap-6 py-8">
          <div className="md:col-span-2 bg-white  rounded-xl p-8 grid grid-cols-6">
            <TagsComponent {...props} />
            {/* <ShareComponent /> */}
            <div className="w-full col-span-6 text-sm pt-8 ">
              <Markup content={content} />
              <div className="flex items-center flex-wrap gap-2 pt-8 ">
                <TagIcon className="text-primary w-6 h-6 " />
                {tags?.map((item, idx) => (
                  <a key={idx} className="text-xs text-gray-400">
                    #{item}
                  </a>
                ))}
              </div>
            </div>
            <div className="col-span-6 pt-8">
              <DisqusComponent {...props} />
            </div>
          </div>
          <aside className="hidden md:flex col-span-1 flex-col gap-8 mt-10 relative">
            <InstantSearch
              indexName="bodasdehoy"
              searchClient={conditionalQuery}
            >
              <ConnectedSearchBox />
              <div className="absolute -top-[11.5rem] -left-5 w-[80%] mx-auto inset-x-0 bg-white shadow translate-y-full max-h-60 overflow-auto no-scrollbar rounded-b-3xl">
                <Hits hitComponent={Hit} />
              </div>
            </InstantSearch>
            {/* <Searcher placeholder="¿Que buscas?" /> */}
            <AsideLastestArticles data={fivePost} title={"lo más leido"} />
          </aside>
        </div>
      </div>
      <SuscribeComponent />
    </section>
  );
};
export default Article;

export const Searche: FC<any> = ({
  currentRefinement,
  refine,
  setSearch,
  isSearch,
}) => {
  return (
    <div className="relative w-full">
      <input
        placeholder="¿Que buscas?"
        type="input"
        value={currentRefinement}
        onChange={(e) => refine(e.currentTarget.value)}
        className="px-6 h-14 py-1 md:py-3 w-full rounded-full text-gray-500 text-sm md:text-base focus:outline-none transition shadow-lg"
      />
      <span className="bg-primary w-14  h-full rounded-full absolute top-0 right-0 flex items-center justify-center">
        <SearchIcon className="text-white w-6 h-6" />
      </span>
    </div>
  );
};

const ConnectedSearchBox = connectWithQuery(Searche);

export async function getStaticProps({ params }: GetStaticPropsContext) {
  try {
    const dataProps = await fetchApi({ query: queries.getOnePost, variables: { slug: params?.slug } })
    return {
      props: dataProps,
      revalidate: 10
    }
  } catch (error) {
    return {
      props: {},
      revalidate: 10
    }
  }
}
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const data = await fetchApi({
      query: queries.getSlugPosts,
      variables: { development: "bodasdehoy" }
    })
    return {
      paths: data.map((slug: string) => ({ params: { slug } })),
      fallback: "blocking",
    };
  } catch (error) {
    console.log(error)
    return {
      paths: [],
      fallback: false,
    };
  }
};

