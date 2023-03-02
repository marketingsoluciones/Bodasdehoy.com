import { FC } from "react"
import { CSSTransition } from "react-transition-group"
import { category } from "../../../interfaces";
import { fetchApi, queries } from "../../../utils/Fetching";

export const MultiMenu : FC <{title: string}> = ({title, children}) => {
    return (
      <div className=" w-[90%] pt-3 absolute left-0 z-40 ">
        <div className="w-[90%] mx-auto inset-x-0 bg-color-base shadow-md px-10 py-4 h-auto absolute bottom-0 left-0 transform translate-y-full rounded-b-xl">
            <h2 className="text-primary font-medium tracking-wider uppercase text-lg py-2">{title}</h2>
            {children}
        </div>
      </div>
    )
}

export const fetchingData = async (title: string) => {
    const { results }: { results: category[]; total: number } = await fetchApi({
      query: queries.getAllCategoryBusiness,
      variables: { criteria: { title }, development: "bodasdehoy" },
    });
    if (results) {
      const dataLocalStorage = localStorage.getItem('dataMenu')
      let obj = {
          [title]: results[0].subCategories
      }
      if (dataLocalStorage){
        obj = {...JSON.parse(dataLocalStorage), ...obj}
      }

      localStorage.setItem('dataMenu', JSON.stringify(obj))
      return results[0].subCategories
    }
  };

