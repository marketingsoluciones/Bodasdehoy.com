import { useState } from "react";
import Slider from "react-slick";
import { Post } from "../Home/Magazine";
import { ButtonComponent } from "../Inputs";

export const LastestArticles = () => {
  const [rows, setRows] = useState(3);

  
  return (
    <div className="col-span-2 w-full pb-6 ">
      <h3 className="text-lg text-primary font-semibold">Ultimos articulos</h3>
      <div className="grid grid-cols-1 w-full ">
        <Slider>
          <Post />
          <Post />
          <Post />
          <Post />
        </Slider>
        <div className="col-span-2 w-full flex items-center justify-center">
          <ButtonComponent onClick={() => setRows(rows + 3)} color={"primary"}>
            Ver más articulos
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
};
