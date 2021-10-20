import Slider from "react-slick";
import { GridPost, Principal } from "../components/Home/Magazine";
import TitleSection from "../components/Home/TitleSection";
import CategoriesComponent from "../components/Magazine/CategoriesComponent";
import PrincipalPost from "../components/Magazine/PrincipalPost";
import { Searcher } from "./index";

const Magazine = () => {
  return (
    <section className="w-full py-4 md:py-8 grid gap-6">
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
          <GridPost />
        </div>
      </div>
      <CategoriesComponent />
    </section>
  );
};

export default Magazine;
