import { useState, FC } from 'react';
import { createURL } from '../../utils/UrlImage';

interface propsImageProfile {
  isActived: boolean
  image: string | undefined
}

export const ImageProfile: FC<propsImageProfile> = ({ isActived, image }) => {

  return (
    <div className="relative w-max">
      <img
        className="object-cover w-8 h-8 rounded-full border border-gray-200"
        src={image ? image?.includes("http") ? image : createURL(image) : "/placeholder/logo.png"}
      />
      <span
        className={`absolute w-3 h-3 ${isActived ? "bg-green-600" : "bg-gray-400"
          }  rounded-full -right-0 border border-white top-0`}
      />
    </div>
  )
}

