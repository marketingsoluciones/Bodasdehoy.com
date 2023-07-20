import { FC } from "react";
import { useEffect, useState } from "react";
import { NextPage } from "next";
import { TitleSection } from "../../components/Home";
import { GridPost } from "../../components/Home/Magazine";
import { AsideLastestArticles, CategoriesComponent, LastestArticles, PrincipalPost, SuscribeComponent } from "../../components/Magazine";
import { fetchCategory, Post } from "../../interfaces";
import { GraphQL, fetchApi, queries } from '../../utils/Fetching';
import { Searcher } from '../index';
import algoliasearch from "algoliasearch/lite";
import { connectSearchBox, Hits, InstantSearch } from "react-instantsearch-dom";
import { connectWithQuery } from "../../components/Surface/Navigation";
import { CloseIcon, SearchIcon } from "../../components/Icons";
import ClickAwayListener from "react-click-away-listener";
import { Hit } from "../../components/Surface/SearchNavigation";




interface propsMagazine {
  categoriesPost: Partial<fetchCategory>[]
  lastestPosts: Partial<Post>[]
  postsByCategory: Partial<Post>[]
  postsMoreViews: Partial<Post>[]
}

const Magazine: NextPage<propsMagazine> = (props) => {
  const { categoriesPost, lastestPosts, postsByCategory, postsMoreViews } = props
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
    <section className="w-full -mt-0 md:mt-0 md:pt-8 grid gap-6">
      <div className="max-w-screen-lg mx-auto inset-x-0 grid gap-6 w-full  ">
        <h1 className="text-5xl md:text-6xl  font-title text-primary w-full text-center">
          Magazine
        </h1>
        <div className="w-[95%] md:w-2/3 mx-auto inset-x-0  relative z-20">
          <InstantSearch
            indexName="bodasdehoy"
            searchClient={conditionalQuery}
          >
            <ConnectedSearchBox placeholder="catering, hoteles, fincas, vestidos" />
            <div className="absolute z-50 -bottom-0 -left-5 w-[80%] mx-auto inset-x-0 bg-white shadow translate-y-full max-h-60 overflow-auto no-scrollbar rounded-b-3xl">
              <Hits hitComponent={Hit} />
            </div>
          </InstantSearch>
          {/*  <Searcher placeholder={"¿Qué necesitas para tu boda?"} autoFocus /> */}
        </div>
        <PrincipalPost {...lastestPosts[0]} />
        <div className="w-full flex items-center justify-center flex-col pt-6 z-10 space-y-9">
          <TitleSection
            principal={"Recomendados"}
            secondary={"para tu boda"}
            size={"xl"}
          />
          <GridPost data={fivePost} />
        </div>
      </div>
      {/* 2da sección */}
      <CategoriesComponent data={categoriesPost} />

      {/* 3er sección */}
      <div className="grid md:grid-cols-3 max-w-screen-lg w-full mx-auto inset-x-0 gap-6 px-5 md:px-0 overflow-hidden ">
        <LastestArticles data={lastestPosts.slice(1)} />
        <AsideLastestArticles data={fivePost} title={"TOP 5 más leidos"} className="... w-full  bg-white p-7 shadow-md rounded-xl" />
      </div>
      <SuscribeComponent />
    </section>
  );
};

export default Magazine;

export const Searche: FC<any> = ({
  currentRefinement,
  refine,
}) => {
  const [input, setInput] = useState("")

  return (
    <ClickAwayListener onClickAway={() => [refine(""), setInput("")]}>
      <div className="relative w-full">
        <div className="flex items-center relative">
          <input
            placeholder="catering, hoteles, fincas, vestidos"
            type="input"
            value={currentRefinement}
            onChange={(e) => [refine(e.currentTarget.value), setInput(e.target.value)]}
            className="px-6 h-14 py-1 md:py-3 w-full rounded-full text-gray-500 text-sm md:text-base focus:outline-none transition shadow-lg"
          />
          <button onClick={() => [refine(""), setInput("")]} className={`${input != "" ? "block" : "hidden"} p-1 bg-color-base rounded-full z-50 right-16 absolute`}>
            <CloseIcon className="w-5 h-5 text-gray-500 " />
          </button>
        </div>
        <span className="bg-primary w-14  h-full rounded-full absolute top-0 right-0 flex items-center justify-center">
          <SearchIcon className="text-white w-6 h-6" />
        </span>
      </div>
    </ClickAwayListener>
  );
};

const ConnectedSearchBox = connectWithQuery(Searche);


export async function getServerSideProps() {
  try {
    const data = await fetchApi({
      query: queries.getMagazine,
      variables: { development: "bodasdehoy" }
    })
    return { props: data };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
}
