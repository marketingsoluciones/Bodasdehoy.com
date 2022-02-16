import React, { FC } from 'react'
import { subCategory } from '../../interfaces';
import { createURL } from '../../utils/UrlImage';

export const ItemSubCategory : FC <subCategory> = ({imgMiniatura, title}) => {
    const image = imgMiniatura?.i320 ? createURL(imgMiniatura.i320) : "/placeholder/image.png"
    return (
        <>
        <div className={`category mx-auto inset-x-0 card w-60 h-24 bg-gray-500 rounded-2xl after:bg-gradient-to-t 
        after:from-gray-900 
        
        after:to-transparent 
        after:w-full after:h-full 
        after:absolute after:top-0 relative overflow-hidden 	`}>
          <p className='absolute mx-auto inset-x-0 bottom-2 w-max text-white capitalize font-medium z-20 text-sm tracking-wide flex items-center gap-1'><div className={"h-3 w-0.5 bg-white rounded-lg"} />{title}</p>
        </div>
        <style jsx>
          {`
            .category {
              background-image: url("${image}");
              background-size: cover;
              background-position: center;
            }
          `}
        </style>
        </>
    );
}

export default ItemSubCategory
