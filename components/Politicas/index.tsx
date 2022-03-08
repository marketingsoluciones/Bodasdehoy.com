import { Page } from "../../interfaces";
import { FC } from "react";

export const IndexPoliticas:FC<Partial<Page>> = ({content}) =>{
    return <>
      <div className="m-5 p-10 bg-white rounded-lg shadow-lg">
        <p>
          {content}
       </p>
      </div>
    </>
}

