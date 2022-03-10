import { FC } from "react";
import { Location2Icon as LocationIcon, StarRating } from "../Icons";
import { business } from "../../interfaces/index";
import { createURL } from "../../utils/UrlImage";
import { useHover } from "../../hooks/useHover";
import { useRouter } from "next/router";
import { Markup } from "interweave";

const sizes = {
  lg: {
    dimensions: "h-[22rem] w-80",
    fontSize: "text-lg pb-0.5"
  },
  md:{
    dimensions:  "h-80 w-60",
    fontSize: "text-md"
  },
}

interface propsCardBusiness extends Partial<business> {
  promocion?: boolean;
  size? : keyof typeof sizes
}
export const CardBusiness: FC<propsCardBusiness> = ({
  promocion = false,
  imgMiniatura,
  businessName,
  city,
  slug,
  content,
  size = "md"
}) => {
  const [hoverRef, isHovered] = useHover();
  const router = useRouter()
  
  return (
    <div ref={hoverRef} onClick={() => router.push(`/empresa/${slug}`)} className={`rounded-xl ${sizes[size].dimensions} transition cursor-pointer mx-auto inset-x-0`}>
      <img
        className={`h-2/3 rounded-xl w-full relative object-cover object-center transition ${isHovered ? "opacity-90" : "opacity-100"}`}
        src={
          imgMiniatura?.i640
            ? createURL(imgMiniatura.i640)
            : "/placeholder/image.png"
        }
        alt=""
      />
      <div
        className={`bg-white overflow-hidden shadow rounded-xl -mt-12 p-6 flex h-max flex-col  z-20 relative  ${
          isHovered ? " -mt-16" : " "
        } transition-all duration-500`}
      >
        {promocion && (
          <div className="text-white bg-primary px-4 text-xs absolute top-0 left-5 rounded-full transform -translate-y-1/2 py-1">
            Promoción
          </div>
        )}
        <h2 className={`${sizes[size].fontSize} text-tertiary font-semibold truncate capitalize w-full `}>
          {businessName}
        </h2>
        <div className="flex gap-0.5 items-center">
          {Array.of(1, 2, 3, 4, 5).map((item, idx) => (
            <StarRating key={idx} className="text-yellow-300 w-4 h-4" />
          ))}
        </div>
        <div className="flex items-end gap-2 pt-2 ">
          <LocationIcon className="text-primary w-4 h-4" />
          <p className={"text-gray-500 text-xs truncate"}>{city}</p>
        </div>
          <Markup className={`${isHovered ? `h-auto ${content && "pt-4"} opacity-100` : "h-0 opacity-0"} text-xs  text-gray-500 line-clamp-4 transition-all duration-500` } content={content} noHtml />
        {/* <button className="bg-primary rounded-lg text-white text-sm mt-2 py-1 hover:bg-pink-600 transition-all duration-300 ">
          Visitar
        </button> */}
      </div>
    </div>
  );
};
