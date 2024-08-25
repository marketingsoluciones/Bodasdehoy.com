import React, { useEffect, useState } from "react";
import { subCategory, category } from "../../../interfaces/index";
import { fetchApi, queries } from "../../../utils/Fetching";
import { fetchingData } from "./MultiMenu";
import { capitalize } from '../../../utils/Capitalize';
import { Promo } from "./Promo";
import Link from "next/link";

const NovioMenu = () => {
  const [subCategories, setSubcategories] = useState<subCategory[]>([]);

  useEffect(() => {
    const dataLocalStorage = localStorage.getItem('dataMenu')
    if (!dataLocalStorage || !JSON.parse(dataLocalStorage).novios) {
      fetchingData("novios")
        .then(data => data && setSubcategories(data))
        .catch(error => console.log(error))
    } else {
      const { novios } = JSON.parse(dataLocalStorage)
      novios && setSubcategories(novios)
    }
  }, []);

  return (
    <div className="w-full grid grid-cols-3">
      <ul className="col-span-2 grid grid-cols-3 gap-2 text-gray-500">
        {subCategories.map((item, idx) => (
          <Link key={idx} href={`/categoria/novios/${item.slug}`} passHref>
            <li className={"w-max hover:text-tertiary hover:font-semibold cursor-pointer"} >{item?.title && capitalize(item.title)}</li>
          </Link>
        ))}
      </ul>
      <Promo />
    </div>
  );
};

export default NovioMenu;
