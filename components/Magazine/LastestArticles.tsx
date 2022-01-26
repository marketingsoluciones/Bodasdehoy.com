import { FC, useEffect, useState } from "react";
import Slider from "react-slick";
import { Post  } from "../../interfaces";
import { PostComponent } from "../Home/Magazine";
import { ButtonComponent } from "../Inputs";

export const LastestArticles: FC<{ data: Partial<Post>[] }> = ({
  data,
}) => {
  const [rows, setRows] = useState(3);
  const [posts, setPosts] = useState<Partial<Post>[] | []>([]);

  useEffect(() => {
    setPosts(data);
  }, [data]);

  return (
    <>
    <div className="col-span-2 w-full pb-6 ">
      <h3 className="text-lg text-primary font-semibold">Ultimos articulos</h3>
      <div className="wrapper transition">
      <div className="grid grid-cols-2 w-full gap-y-16 grid-rows-1 ">
         {posts?.map((item, idx) => (
           <PostComponent key={idx} {...item} />
         ))}
      </div>
        
      </div>
      <div className="col-span-2 w-full flex items-center justify-center">
          <ButtonComponent onClick={() => setRows(rows + 3)} color={"primary"}>
            Ver más articulos
          </ButtonComponent>
        </div>
    </div>
    <style jsx>
      {`
      .wrapper {
        height: 100%
      }
      `}
    </style>
    </>
  );
};
