import { FC } from "react"
import { Location2Icon as LocationIcon, StarRating } from "../Icons"
import { business } from '../../interfaces/index';
import { createURL } from '../../utils/UrlImage';
import { useHover } from '../../hooks/useHover';

interface propsCardBusiness extends business {
    promocion?: boolean
}
export const CardBusiness: FC <propsCardBusiness> = ({promocion = false, imgMiniatura, businessName, city}) => {
    const [hoverRef, isHovered] = useHover()
    return (
        <div ref={hoverRef} className="rounded-xl h-80">
            <img className="h-2/3 rounded-xl w-full relative object-cover object-center" src={imgMiniatura?.i640 ? createURL(imgMiniatura.i640): "/placeholder/image.png"} alt="" />
            <div className={` bg-white overflow-hidden shadow rounded-xl -mt-20 p-4 flex h-full flex-col gap-2 z-20 relative   ${isHovered ? "max-h-44 -mt-14" : "max-h-32 "} transition-all duration-500`}>
                {promocion && <div className="text-white bg-primary px-4 text-xs absolute top-0 left-5 rounded-full transform -translate-y-1/2 py-1">Promoción</div>}
                <div className="flex gap-0.5 items-center">
                    {Array.of(1,2,3,4,5).map((item, idx) => (
                        <StarRating key={idx} className="text-yellow-300 w-4 h-4" />
                    ))}
                </div>
                <h2 className="text-md text-tertiary font-semibold capitalize">
                    {businessName.length<20?businessName:<h2>{businessName.slice(0,20)}...</h2>}
                </h2>
                <div className="flex items-end gap-1">
                <LocationIcon className="text-primary w-4 h-4"/>
                <p className={"text-gray-500 text-xs"}>{city}</p>
                </div>
                <button className="bg-primary rounded-lg text-white text-sm mt-8 py-1 hover:bg-pink-600 transition-all duration-300 ">Visitar</button>
            </div>
        </div>
    )
}

