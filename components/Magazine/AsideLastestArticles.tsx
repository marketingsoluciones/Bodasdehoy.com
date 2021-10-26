import { FC } from "react"

interface props {
    title : string
    className? : string
}
export const AsideLastestArticles : FC <props> = ({title, ...props}) => {
    const List = [
        {title : "7 tendencias de bodas que desapareceran ¡impresionante!"},
        {title : "5 destinos de ensueño para luna de miel en Europa"},
        {title : "7 tendencias de bodas que desapareceran ¡impresionante!"},
        {title : "5 destinos de ensueño para luna de miel en Europa"},
        {title : "7 tendencias de bodas que desapareceran ¡impresionante!"},
        {title : "5 destinos de ensueño para luna de miel en Europa"},
    ]
    return (
        <div className="... w-full " >
          <div className="bg-white p-7 shadow-md rounded-xl" {...props}>
            <h3 className="font-semibold text-lg text-primary border-b border-gray-100 pb-4">{title}</h3>
              {List.map((item,idx) => (
                  <div key={idx} className="py-4 border-b border-gray-100 text-sm text-gray-200 hover:text-gray-300">
                      {item.title}
                  </div>
              ))}
              
          </div>
        </div>
    )
}

