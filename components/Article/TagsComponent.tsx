import { FC } from "react"

export const TagsComponent: FC = () => {
    const cate = [
        {title : "Antes de la boda"},
        {title : "Antes de la boda"},
        {title : "Antes de la boda"},
    ]
    return (
        <div className="flex items-center gap-4 flex-wrap col-span-5">
            {cate.map((item,idx) => (
                <Item key={idx}>
                    {item.title}
                </Item>
            ))}
        </div>
    )
}


const Item : FC = ({children}) => {
    return (
        <div className="rounded-full border border-gray-100 text-gray-200 text-xs md:text-sm px-2 py-1">
            {children}
        </div>
    )
}

