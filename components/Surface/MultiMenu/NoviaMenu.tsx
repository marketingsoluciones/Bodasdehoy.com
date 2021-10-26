import { FC } from "react";
import Link from "next/link";
import { Promo } from ".";

export const NoviaMenu: FC = () => {
  const List = [
    { title: "Vestidos de novia", route: "/" },
    { title: "Belleza para novias", route: "/" },
    { title: "Joyeria", route: "/" },
    { title: "Complementos", route: "/" },
    { title: "Trajes de fiesta", route: "/" },
  ];
  return (
    <div className="max-w-screen-lg px-24 mx-auto inset-x-0 p-6">
      <h2 className="text-primary text-semibold py-2">Novias</h2>
      <div className="grid grid-cols-6">
        <ul className="col-span-4 grid grid-cols-3 text-sm">
          {List.map((item, idx) => (
            <Link key={idx} href={item.route}>
              <li className="text-gray-300 hover:text-tertiary cursor-pointer">
                {item.title}
              </li>
            </Link>
          ))}
        </ul>
        <div className="col-span-2">
          <Promo />
        </div>
      </div>
    </div>
  );
};
