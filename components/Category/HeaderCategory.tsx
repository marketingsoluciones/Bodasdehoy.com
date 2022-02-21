import { FC } from "react";
import { category } from "../../interfaces";
import { capitalize } from "../../utils/Capitalize";
import { ArrowIcon } from "../Icons";
import IconButton from "../Inputs/IconButton";
import { useRouter } from 'next/router';
import { LoadingContextProvider } from "../../context";

export const HeaderCategory: FC<category> = ({
  heading,
  title,
  description,
}) => {
    const router = useRouter()
    const {setLoading, loading} = LoadingContextProvider()

    
  return (
    <div className="bg-white relative overflow-hidden rounded-2xl max-w-screen-lg 2xl:max-w-screen-xl mx-auto inset-x-0 flex  items-center justify-center p-4 relative -mt-12 shadow-md ">
      
      <button onClick={() => router.back()} type="button" className="absolute left-5 text-primary hover:text-white border border-primary hover:bg-primary focus:ring-4 focus:ring-pink-200 font-medium rounded-lg text-sm px-3 py-2.5 text-center transition flex items-center gap-1 justify-center"><ArrowIcon className="w-5 h-5 rotate-180" />Ir atras</button>


      <div className="flex flex-col justify-center items-center">
        <h1 className="font-semibold text-primary text-2xl capitalize z-10 relative ">
          {heading ?? title}
        </h1>
        <h3 className="font-medium text-gray-600 text-sm tracking-tight z-10 relative">
          {capitalize(description)}
        </h3>
      </div>
      
    </div>
  );
};

// elemento de color
// before:bg-gradient-to-r before:from-primary before:to-rose-400 before:w-[30rem] before:absolute before:bottom-0 before:h-[30rem] before:-right-2 before:rounded-full before:my-auto before:inset-y-0
