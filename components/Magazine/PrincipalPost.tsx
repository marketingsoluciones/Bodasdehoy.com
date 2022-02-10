import { Markup } from "interweave";
import { FC } from "react";
import { Post } from "../../interfaces";
import { format } from "../../utils/FormatTime";
import { createURL } from "../../utils/UrlImage";
import { createSrcSet } from '../../utils/CreateSrcSet';
export const PrincipalPost: FC<Partial<Post>> = ({
  title,
  content,
  updatedAt,
  categories = [],
  imgMiniatura,
}) => {
  return (
    <div className="w-full relative  hidden md:grid pt-4">
      <div className="bg-white w-3/5 rounded-2xl shadow-lg h-max absolute top-1/4 py-6 px-12">
        <h2 className="font-medium text-2xl">{title}</h2>
        <div className="grid grid-cols-8 pt-3">
          <div className="col-span-2 flex flex-col justify-center items-start border-r pr-3 border-primary py-1">
            {categories?.length > 0 && (
              <h3 className="text-primary text-xs ">{categories[0]}</h3>
            )}
            {updatedAt && (
              <p className="text-gray-500 text-xs">
                {updatedAt && format(new Date(updatedAt), "es", {})}
              </p>
            )}
          </div>
          <div className="col-span-6 px-4 flex items-center">
            <Markup
              content={content?.slice(0, 250)}
              noHtml
              className="text-xs text-gray-500"
            />
          </div>
        </div>
      </div>
      <div>
        <img
          alt={title}
          className="h-80 w-2/4 rounded-2xl object-cover float-right"
          src={createURL(imgMiniatura?.i320)}
          srcSet={createSrcSet(imgMiniatura)}
        />
      </div>
    </div>
  );
};
