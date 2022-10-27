import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { FC } from "react";
import { useRouter } from 'next/router';
import { HomeIcon } from "../Icons";

interface propsBreadCumbs {
  className?: string;
}

type crumb = {
  crumb: string;
  href: string;
};

export const BreadCumbs: FC<propsBreadCumbs> = ({ className }) => {
  const [levels, setLevels] = useState<crumb[]>([]);
  const router = useRouter()

  useEffect(() => {
    const pathsWithoutSelector = router.asPath.split("#");

    const arr = pathsWithoutSelector[0]
      .split("/")
      .filter((item) => item.length > 0);

    const pathArray: crumb[] = arr.map((path, i) => {
      return { crumb: path, href: "/" + arr.slice(0, i + 1).join("/") };
    });
    setLevels(pathArray);
  }, [router]);

  

  return (
    <>
      <div
        className={`lg:max-w-screen-lg mx-auto inset-x-0 flex items-center w-full text-sm text-gray-500 capitalize font-light py-4 w-full sm:flex`}
      >
        <nav className="flex w-full" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/">
                <span className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 cursor-pointer ">
                  <HomeIcon />
                  Inicio
                </span>
              </Link>
            </li>
            {levels.filter(item => !["categoria", "empresa"].includes(item.crumb)).map((item: crumb, idx: number) => (
              <li key={idx}>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <Link href={item.href} passHref>
                    <span className="ml-1 text-sm font-medium text-gray-500 hover:text-gray-900 md:ml-2 cursor-pointer ">
                      {item.crumb && decodeURI(item.crumb) /* item.crumb.replaceAll("-", " ") */}
                     
                    </span>
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </>
  );
};
