import { image } from "../interfaces";
import { createURL } from "./UrlImage";

export const createSrcSet = (images: image | undefined) => {
  const sizes = {
    i320: "320w",
    i640: "640w",
    i800: "800w",
    i1024: "1024w",
  };
  const reduce = [];
  for (const image in images) {
    //@ts-ignore
    images[image] &&
      !["_id, createdAt, updatedAt"].includes(image) &&
      //@ts-ignore
      reduce.push(`${createURL(images[image])} ${sizes[image]}`);
  }
  return JSON.stringify(reduce)?.replace("[", "")?.replace("]", "");
};
