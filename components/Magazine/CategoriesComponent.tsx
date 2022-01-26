import { FC, ReactNode } from "react"
import { CameraIcon as ActualidadIcon,  CameraIcon as BagIcon, CameraIcon as BanqueteIcon, CameraIcon, CarIcon, DressIcon } from "../Icons"
import Link from 'next/link'
import {useHover} from "../../hooks"
import { category, fetchCategory } from "../../interfaces"

type Category = {
    title: string,
    icon : ReactNode,
    route : string

}

export const CategoriesComponent : FC <{data: Partial<fetchCategory>[]}> = ({data = []}) => {
    console.log(data)
    const Categories : Category[] = [
        {title: "Antes de la boda", icon: <CameraIcon className="w-12 h-12" />, route: "/"},
        {title: "Ceremonia", icon: <CarIcon className="h-12"  />, route: "/"},
        {title: "Banquete", icon: <BanqueteIcon className="w-12 h-12" />, route: "/"},
        {title: "Moda Nupcial", icon: <DressIcon className="w-12 h-12" />, route: "/"},
        {title: "Luna de Miel", icon: <BagIcon className="w-12 h-12" />, route: "/"},
        {title: "Actualidad", icon: <ActualidadIcon className="w-12 h-12" />, route: "/"},
    ]
    return (
        <div className="bg-white w-full py-10">
        <div className="max-w-screen-lg mx-auto inset-x-0 grid gap-6 ">
          <h2 className="uppercase text-tertiary text-lg text-center font-semibold tracking-widest w-full ">
            Articulos según temas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
            {data?.map(({categorie}, idx) => (
                <CategoryItem key={idx} {...categorie} />
            ))}
          </div>
        </div>
      </div>
    )
}




const CategoryItem : FC <Partial<category>> = ({title, slug}) => {
    console.log(title)
    const [HoverRef, isHovered] = useHover()
    return (
        <Link href={`/magazine/${slug}`} passHref>
        <div ref={HoverRef} className="text-tertiary flex flex-col gap-2 items-center justify-center cursor-pointer ">
            <span className={`p-3 rounded-full ${isHovered ? "bg-gray-100" : ""} transition w-20 h-20 grid place-items-center`}>H</span>
            <p className="text-xs">{title}</p>
        </div>
        </Link>
    )
}


