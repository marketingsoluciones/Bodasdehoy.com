import { FC } from "react"
import { OnePost } from "../../interfaces"
import React from "react"

export const TagsComponent: FC <Partial<OnePost>> = ({categories = [], subCategories = []}) => {
    const iteration = [...categories, ...subCategories ]
   console.log(iteration)
   
   
  
  
    return (
         <div className="flex items-center gap-4 flex-wrap col-span-5">
            
           {iteration.map((item,idx)=>(
               <Item key={idx}>
                  {item.title}
                  {console.log(item.title)}
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

