import { FC, ReactNode } from "react"
import { CameraIcon as ActualidadIcon,  CameraIcon as BagIcon, CameraIcon as BanqueteIcon, CameraIcon, CarIcon, DressIcon } from "../Icons"
import Link from 'next/link'
import {useHover} from "../../hooks"
import { category, fetchCategory } from "../../interfaces"
import { createURL } from '../../utils/UrlImage';
import { capitalize } from '../../utils/Capitalize';

type Category = {
    title: string,
    icon : ReactNode,
    route : string

}

export const CategoriesComponent : FC <{data: Partial<category>[]}> = ({data = []}) => {
    return (
        <div className="bg-white w-full py-10">
        <div className="max-w-screen-lg mx-auto inset-x-0 grid gap-6 ">
          <h2 className="uppercase text-tertiary text-lg text-center font-semibold tracking-widest w-full ">
            Articulos según temas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
            {data?.map((categorie, idx) => {
              if(categorie?.icon?.i320) {
                return <CategoryItem key={idx} {...categorie} />
              }
            })}
          </div>
        </div>
      </div>
    )
}




const CategoryItem : FC <Partial<category>> = ({title, slug, icon, heading}) => {
    const [HoverRef, isHovered] = useHover()
    return (
      <div className="flex items-center justify-center flex-col">
        <Link href={`/magazine/categoria/${slug}`} passHref>
        <button ref={HoverRef} className={`text-tertiary flex flex-col gap-2 items-center justify-center cursor-pointer p-2 rounded-full p-4 ${isHovered ? "bg-gray-100" : ""} `}>
          <img className={`p-3 transition w-20 h-20 flex justify-center items-center cursor-pointer`} src={createURL(icon?.i320)} alt={title}></img>
        </button>
        </Link>
        <small className="text-tertiary text-sm">{title && capitalize(title)}</small>
        </div>
    )
}


