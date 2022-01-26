import { FC } from "react"
import { Post } from "../../interfaces"

export const TagsComponent: FC <Partial<Post>> = ({categories = [], subCategories = []}) => {
    const iteration = [...categories, ...subCategories]
    return (
        <div className="flex items-center gap-4 flex-wrap col-span-5">
            {iteration?.map((item,idx) => (
                <Item key={idx}>
                    {item}
                </Item>
            ))}
        </div>
    )
}


const Item : FC = ({children}) => {
    return (
        <div className="rounded-full border border-gray-400 text-gray-500 text-xs md:text-sm px-3 py-1">
            {children}
        </div>
    )
}

