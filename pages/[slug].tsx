import { IndexPoliticas } from "../components/Politicas"
import { GraphQL, fetchApi, queries } from "../utils/Fetching";

const PoliticasWeb = () =>{
    
    return <div className="flex gap-5 max-w-screen-lg mx-auto inset-x-0 w-full space-y-10 mt-5 mb-5">
    
            <IndexPoliticas />
    
    </div>
}

export default PoliticasWeb

export async function getStaticProps() {
    return {
      props: {}, // will be passed to the page component as props
    }
  }

export async function getStaticPaths() {
    try{
        const data = await fetchApi({query: queries.getAllPage})
        console.log("DATAAAA",data)
        return {
            paths: [  ],
            fallback: true // false or 'blocking'
        };
    }catch(error){
        console.log("ERRORR",error)
        return {
            paths: [],
            fallback: true,
          };
        }
}

