import { FC } from "react"
import { Location2Icon as LocationIcon, StarRating } from "../Icons"
import { business } from '../../interfaces/index';
import { createURL } from '../../utils/UrlImage';

interface propsCardBusiness extends business {
    promocion?: boolean
}
export const CardBusiness: FC <propsCardBusiness> = ({promocion = false, imgMiniatura}) => {
    
    return (
        <div className="rounded-xl">
            <img className="h-60 rounded-xl w-full relative object-cover object-center" src={imgMiniatura?.i640 ? createURL(imgMiniatura.i640): "/placeholder/image.png"} alt="" />
            <div className="bg-white h-max shadow rounded-xl -mt-12 p-6  flex flex-col gap-2 z-20 relative">
                {promocion && <div className="text-white bg-primary px-4 text-xs absolute top-0 left-5 rounded-full transform -translate-y-1/2 py-1">Promoción</div>}
                <div className="flex gap-0.5 items-center">
                    {Array.of(1,2,3,4,5).map((item, idx) => (
                        <StarRating key={idx} className="text-yellow-300 w-4 h-4" />
                    
                    ))}
                    
                </div>
                <h2 className="text-md text-tertiary font-semibold">La Manga Club</h2>
                <div className="flex items-end gap-2">
                <LocationIcon className="text-primary w-4 h-4"/>
                <p className="text-gray-500 text-xs">Guimar, Santa Cruz</p>
                </div>
            </div>
        </div>
    )
}

