import { NextPage } from "next";
import { TitleSection } from "../../components/Home";
import { GridPost } from "../../components/Home/Magazine";
import { AsideLastestArticles, CategoriesComponent, LastestArticles, PrincipalPost, SuscribeComponent } from "../../components/Magazine";
import { fetchCategory, Post } from "../../interfaces";
import { GraphQL, fetchApi, queries } from '../../utils/Fetching';
import { Searcher } from '../index';

interface propsMagazine {
  categoriesPost : Partial<fetchCategory>[]
  lastestPosts : Partial<Post>[]
  postsByCategory : Partial<Post>[]
  postsMoreViews : Partial<Post>[]
}

const Magazine : NextPage <propsMagazine> = ({categoriesPost, lastestPosts, postsByCategory, postsMoreViews}) => {
  return (
    <section className="w-full pt-4 md:pt-8 grid gap-6">
      {/* 1era sección */}
      <div className="max-w-screen-lg mx-auto inset-x-0 grid gap-6 w-full ">
        <h1 className="text-5xl md:text-6xl  font-title text-primary w-full text-center">
          Magazine
        </h1>
        <div className="w-95 mx-auto instet-x-0 md:w-2/4">
          <Searcher placeholder={"¿Qué necesitas para tu boda?"} autoFocus />
        </div>
        <PrincipalPost {...lastestPosts[0]} />
        <div className="w-full flex items-center justify-center flex-col pt-10 ">
          <TitleSection
            principal={"Recomendados"}
            secondary={"para tu boda"}
            size={"xl"}
          />
          <GridPost data={[]}  />

        </div>
      </div>
      {/* 2da sección */}
      <CategoriesComponent data={categoriesPost} />

      {/* 3er sección */}
      <div className="grid md:grid-cols-3 max-w-screen-lg w-full mx-auto inset-x-0 gap-6 px-5 md:px-0 overflow-hidden ">
        <LastestArticles data={lastestPosts.slice(1)} />

        <AsideLastestArticles title={"TOP 5 más leidos"} className="... w-full  bg-white p-7 shadow-md rounded-xl" />
      </div>
      <SuscribeComponent />
    </section>
  );
};

export default Magazine;


export async function getServerSideProps() {
  try {
    
    const data = await fetchApi({query: queries.getMagazine})
    return { props: data };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
}
