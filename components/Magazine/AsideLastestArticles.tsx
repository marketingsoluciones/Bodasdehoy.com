import { FC, useState, useEffect } from 'react';
import { Post } from '../../interfaces';
import { GraphQL, fetchApi, queries } from '../../utils/Fetching';
import Link from 'next/link';
import { capitalize } from '../../utils/Capitalize';


interface props {
    title : string
    className? : string
}
export const AsideLastestArticles : FC <props> = ({title, ...props}) => {
   const [fivePost, setPost] = useState<Post[]>([])

    const fetchData = async () => {
        try {
            const {results} = await fetchApi({query : queries.getAllPost, variables: {sort: {createdAt : 1}, limit: 5}})
            setPost(results)
            
        } catch (error) {
            console.log(error);
        }
    }

   useEffect(() => {
    fetchData()
   }, []);
   
    return (
        <div className="... w-full " >
          <div className="bg-white p-7 shadow-md rounded-xl" {...props}>
            <h3 className="font-semibold text-lg text-primary border-b border-gray-100 pb-4">{title && capitalize(title)}</h3>
              {fivePost?.map((item,idx) => (
                  <Link key={idx} href={`/magazine/${item.slug}`} passHref>
                  <button key={idx}  className="py-4 border-b border-gray-100 text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
                      {item.title}
                  </button>
                  </Link>
              ))}
              
          </div>
        </div>
    )
}

