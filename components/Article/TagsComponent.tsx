import { FC } from "react"
import { OnePost } from "../../interfaces"
import React from "react"
import { capitalize } from '../../utils/Capitalize';

export const TagsComponent: FC <Partial<OnePost>> = ({categories = [], subCategories = []}) => {
    const iteration = [...categories, ...subCategories ]
   
    return (
         <div className="flex items-center gap-4 flex-wrap col-span-5">
            
           {iteration.map((item,idx)=>(
               <Item key={idx}>
                  {item.title && capitalize(item.title)}
               </Item>
           ))}
        </div> 
        
    )
}


const Item : FC = ({children}) => {
    return (
        <div className="rounded-full border border-gray-400 text-gray-500 text-xs px-3 py-1">
            {children}
        </div>
    )
}

