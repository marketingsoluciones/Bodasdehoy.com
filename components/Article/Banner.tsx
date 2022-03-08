import { FC } from "react";
import { OnePost } from "../../interfaces";
import { createURL } from "../../utils/UrlImage";
import Image from 'next/image';
import { createSrcSet } from '../../utils/CreateSrcSet';
;


export const Banner : FC <Partial<OnePost>> = ({authorUsername, subTitle,imgMiniatura, title}) => {
  console.log(subTitle)
  return (
    <div className="w-full relative">
      <div className="relative w-full flex items-center justify-end h-full overflow-hidden pb-28 md:pb-0 ">
        <div className="w-5/6 md:w-1/2 p-8 bg-white absolute md:top-0 my-auto md:inset-y-0 bottom-0  h-max left-0 rounded-xl">
          <h1 className={`text-tertiary text-xl font-semibold border-b pb-4 border-primary`}>
            {title}
          </h1>
         {subTitle &&  <p className="text-sm text-gray-500 pt-4">
            {subTitle}
          </p>}
          <p className="absolute bottom-0 transform pt-3 translate-y-full text-xs text-gray-500 italic">Por {authorUsername}</p>
        </div>
        <img
          alt={"mascara"}
          className="w-5/6 md:w-3/5 bg-gray-300 h-80 md:h-96 rounded-xl object-cover object-center"
          src={createURL(imgMiniatura?.i640)}
          srcSet={createSrcSet(imgMiniatura)}
        />
      </div>
    </div>
  );
};
