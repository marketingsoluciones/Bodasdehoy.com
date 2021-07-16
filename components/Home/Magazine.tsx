import Link from "next/link";
import { FC } from "react";
import PlusButton from "../PlusButton";

const Magazine : FC = () => {
  return (
    <div className="w-full bg-base py-20 relative">
      <div className="max-w-screen-lg mx-auto inset-x-0 ">
        <Principal />
        <BlogCategories />
        <GridPost />
        <span className="absolute bottom-0 mx-auto inset-x-0 transform translate-y-2 hover:scale-105 transition">
        <PlusButton size={"medium"} />
        </span>
      </div>
    </div>
  );
};

export default Magazine;

const Principal : FC = () => {
    return (
        <div className="w-full relative grid grid-cols-2">
          <h2 className="font-title text-7xl text-primary">Magazine</h2>
          <div className="bg-white w-3/5 rounded-2xl shadow-lg h-max absolute top-1/3 py-6 px-12">
            <h2 className="font-medium text-2xl">
              Flores para novias: 5 modelos en tendencia
            </h2>
            <div className="grid grid-cols-8 pt-3">
                <div className="col-span-2 flex flex-col justify-center items-end border-r pr-3 border-primary py-1">
                    <h3 className="text-primary text-sm ">Ceremonia</h3>
                    <p className="text-gray-300 text-xs">17 de junio de 2021</p>
                </div>
                <div className="col-span-6 px-4">
                    <p className="text-xs">Siempre pensamos en las nuevas tendencias de bodas, en la moda y en las más recientes propuestas, lo que nos lleva a dejar de lado antiguas alternativas que aún pueden servirnos.</p>
                </div>
            </div>
          </div>
        <img
          src="/mask_1.png"
          className="h-80 w-full rounded-2xl object-cover float-right"
        />
        </div>
    )
}


const BlogCategories : FC  = () => {

    interface propsCategory {
        title: string
        route: string
    }
     const Category : FC <propsCategory> = ({title, route}) => {
        return (
            <Link href={route}>
            <button className="rounded-full w-40 flex items-center py-2 justify-center text-tertiary font-medium border border-primary bg-white hover:bg-primary hover:text-white transition ease-in duration-200 cursor-pointer">
                {title}
            </button>
            </Link>
        )
    }
    
    const List = [
        {title: "Antes de la boda" , route: "/" },
        {title: "Ceremonia" , route: "/" },
        {title: "Banquete" , route: "/" },
        {title: "Moda Nupcial" , route: "/" },
        {title: "Luna de Miel" , route: "/" },
        
    ]
    return (
        <div className="grid grid-cols-5 gap-10 py-10">
            {List.map((item, idx) => (
                <Category key={idx} title={item.title} route={item.route} />

            ))}
        </div>
    )
}


const GridPost : FC = () => {
    const Post : FC = () => {
        return (
            <div className="w-60 h-max bg-white rounded-3xl overflow-hidden shadow-lg hover:scale-105 transform transition ease-in">
                <img src="/mask_1.png" className="h-40 w-full object-cover object-center" />
                <div className="py-5 text-center">
                    <h2 className="text-gray-300 text-lg font-medium border-b border-primary pb-3 px-5">Tendencias en bodas 2021</h2>
                    <div className="flex justify-between items-center py-2 px-5">
                        <p className="text-xs tracking-widest text-primary">CEREMONIA</p>
                        <p className="text-xs text-gray-300">17/08/2021</p>
                    </div>
                    <p className="text-xs px-4 py-2">
                    Si queréis disfrutar de un recuerdo único de un día irrepetible, contar con un fotógrafo profesional para realizar el reportaje...
                    </p>
                </div>
            </div>
        )
    }
    return (
        <div className="grid grid-cols-3 gap-6 w-full px-16">
            <Post />
            <Post />
            <Post />
            
        </div>
    )
}

