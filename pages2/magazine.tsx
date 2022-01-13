import { GridPost } from "../components/Home/Magazine";
import TitleSection from "../components/Home/TitleSection";
import { AsideLastestArticles, CategoriesComponent, LastestArticles, PrincipalPost, SuscribeComponent } from "../components/Magazine";
import { Searcher } from "./index";

const Magazine = () => {
  return (
    <section className="w-full pt-4 md:pt-8 grid gap-6">
      {/* 1era sección */}
      <div className="max-w-screen-lg mx-auto inset-x-0 grid gap-6 ">
        <h1 className="text-5xl md:text-6xl  font-title text-primary w-full text-center">
          Magazine
        </h1>
        <div className="w-95 mx-auto instet-x-0 md:w-2/4">
          <Searcher placeholder={"¿Qué necesitas para tu boda?"} autoFocus />
        </div>
        <PrincipalPost />
        <div className="w-full flex items-center justify-center flex-col pt-10 ">
          <TitleSection
            principal={"Recomendados"}
            secondary={"para tu boda"}
            size={"xl"}
          />
          <GridPost  />
        </div>
      </div>
      {/* 2da sección */}
      <CategoriesComponent />

      {/* 3er sección */}
      <div className="grid md:grid-cols-3 max-w-screen-lg w-full mx-auto inset-x-0 gap-6 px-5 md:px-0 overflow-hidden ">
        <LastestArticles />

        <AsideLastestArticles title={"TOP 5 más leidos"} className="... w-full -mt-6 bg-white p-7 shadow-md" />
      </div>
      <SuscribeComponent />
    </section>
  );
};

export default Magazine;


