import Link from "next/link";
import React, { FC } from "react";
import { subCategory } from "../../interfaces";
import { createURL } from "../../utils/UrlImage";

interface propsItemSubCategory extends subCategory {
  slugCategory : string
}

export const ItemSubCategory: FC<propsItemSubCategory> = ({ imgMiniatura, title, slug, slugCategory }) => {
  const image = imgMiniatura?.i320
    ? createURL(imgMiniatura.i320)
    : "/placeholder/image.png";
  return (
    <>
    <Link href={`/categoria/${slugCategory}/${slug}`} passHref>
      <button
        className={`${imgMiniatura?"":"hidden"}  relative focus:ring-4 focus:ring-pink-300 my-1 hover:opacity-90 transition category m-auto inset-0 card w-60 h-24 bg-gray-500 rounded-2xl after:bg-gradient-to-t 
        after:from-gray-900 
        after:to-transparent 
        after:w-full after:h-full 
        after:absolute after:top-0 after:left-0 relative overflow-hidden 	`}
      >
        <p className="absolute mx-auto inset-x-0 bottom-2 w-max text-white capitalize font-medium z-20 text-sm tracking-wide flex items-center gap-1">
          {title}
        </p>
      </button>
      </Link>
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
};

export default ItemSubCategory;
