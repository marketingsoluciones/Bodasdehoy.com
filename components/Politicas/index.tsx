import { GraphQL, fetchApi, queries } from "../../utils/Fetching";
import { Page } from "../../interfaces";
import { FC } from "react";

export const IndexPoliticas:FC<Partial<Page>> = () =>{
  
    return <>
      
    </>
}

export async function getServerSideProps() {
    try {
      const data = await fetchApi(queries.getAllPage)
      console.log(await data)
      return {props:data ?? {}};
    } catch (error) {
      console.log(error);
      return {
        props:{}
      };
    }
  }