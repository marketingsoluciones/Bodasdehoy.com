import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { Promo } from ".";
import { subCategory } from "../../../interfaces";
import { fetchingData } from "./MultiMenu";
import { capitalize } from '../../../utils/Capitalize';

export const NoviaMenu: FC = () => {
  const [subCategories, setSubcategories] = useState<subCategory[]>([]);

  useEffect(() => {
    const dataLocalStorage = localStorage.getItem('dataMenu')
    if (!dataLocalStorage || !JSON.parse(dataLocalStorage).novias) {
      fetchingData("novias")
        .then(data => data && setSubcategories(data))
        .catch(error => console.log(error))
    } else {
      const { novias } = JSON.parse(dataLocalStorage)
      novias && setSubcategories(novias)
    }
  }, []);


  return (
    <>

      <div className="grid grid-cols-3">
        <ul className="col-span-2 grid grid-cols-3 gap-2 w-full text-gray-500">
          {subCategories.map((item, idx) => (
            <Link key={idx} href={`/categoria/novias/${item.slug}`} passHref>
              <li className={"hover:text-tertiary hover:font-semibold cursor-pointer w-max"} >{item?.title && capitalize(item.title)}</li>
            </Link>
          ))}
        </ul>
        <div>
          <Promo />
        </div>
      </div>
    </>
  );
};
