import { FC, useEffect } from "react";
import { category, subCategory } from "../../interfaces";
import { capitalize } from "../../utils/Capitalize";
import { ArrowIcon } from "../Icons";
import IconButton from "../Inputs/IconButton";
import { useRouter } from 'next/router';
import { LoadingContextProvider, FiltersContextProvider } from "../../context";

export const HeaderCategory: FC<category | subCategory> = ({
  heading,
  title,
  description,
}) => {
  const router = useRouter()
  const { setLoading, loading } = LoadingContextProvider()
  const { filters, setFilters } = FiltersContextProvider();

  useEffect(() => {
    if (!filters.valir) {
      setFilters({ type: "RESET_FILTER", payload: "" })

      console.log("desmontado")
    } else {
      if (filters.valir == "lugares para bodas" && title != "lugares para bodas") {
        setFilters({ type: "RESET_FILTER", payload: "" })

        console.log("desmontado2")
      }
    }
  }, [title])


  return (
    <div className="bg-white relative overflow-hidden rounded-2xl max-w-screen-lg 2xl:max-w-screen-xl mx-auto inset-x-0 flex items-center justify-center p-4 relative -mt-12 shadow-md w-[95%] ">
      {/* <button onClick={() => router.back()} type="button" className="absolute hidden sm:flex left-5 text-primary hover:text-white border border-primary hover:bg-primary focus:ring-4 focus:ring-pink-200 font-medium rounded-lg text-sm px-3 py-2.5 text-center transition items-center gap-1 justify-center"><ArrowIcon className="w-5 h-5 rotate-180" /><h3 className="hidden md:block">Ir atras</h3></button> */}
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-semibold text-primary text-2xl capitalize z-10 relative ">
          {heading ?? title ? title: "Proveedores"}
        </h1>
        <h3 className="font-medium text-gray-600 text-sm tracking-tight z-10 relative text-center">
          {description?capitalize(description):"Los mejores profesionales para todo lo que necesitas en tu boda" }
        </h3>
      </div>
    </div>
  );
};

// elemento de color
// before:bg-gradient-to-r before:from-primary before:to-rose-400 before:w-[30rem] before:absolute before:bottom-0 before:h-[30rem] before:-right-2 before:rounded-full before:my-auto before:inset-y-0
