import React, { useEffect, useState } from "react";
import { debounce } from "../../../hooks/useThrottledEffect";
import { category } from "../../../interfaces";
import { fetchApi, queries } from "../../../utils/Fetching";
import { capitalize } from "../../../utils/Capitalize";
import Link from "next/link";

const Proveedores = () => {
  const [categories, setCategories] = useState<category[]>();

  const fetchingData = async () => {
    const { results }: { results: category[]; total: number } = await fetchApi({
      query: queries.getAllCategoryBusiness,
      variables: { development: "bodasdehoy" },
    });
    if (results) {
      const dataLocalStorage = localStorage.getItem("dataMenu");
      let obj = {
        proveedores: results,
      };
      if (dataLocalStorage) {
        obj = { ...JSON.parse(dataLocalStorage), ...obj };
      }
      localStorage.setItem("dataMenu", JSON.stringify(obj));
      setCategories(results);
    }
  };

  useEffect(() => {
    const dataLocalStorage = localStorage.getItem("dataMenu");
    if (!dataLocalStorage || !JSON.parse(dataLocalStorage).proveedores) {
      fetchingData();
    } else {
      const { proveedores } = JSON.parse(dataLocalStorage);
      proveedores && setCategories(proveedores);
    }
  }, []);

  return (
    <div className="w-full h-full grid gap-3 grid-cols-7 text-gray-600 text-xs  relative">
      {categories?.map((category, idx) => (
        <div key={category._id} className={`relative ${idx !== categories.length - 1 ? " border-r border-gray-200" : ""}`} >
          <h3 className="text-xs font-bold pb-2 text-left truncate cursor-default ">
            {category.title && capitalize(category.title)}
          </h3>
          <ul className="h- flex flex-col gap-1 items-start col-span-3">
            {category.subCategories.map((subCategory) => (
                <Link  key={subCategory._id} href={`/categoria/${category.slug}/${subCategory.slug}`} passHref>
              <li className={"hover:text-tertiary hover:font-semibold transition-all cursor-pointer"}>
                {subCategory.title && capitalize(subCategory.title)}
              </li>
                </Link>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Proveedores;
