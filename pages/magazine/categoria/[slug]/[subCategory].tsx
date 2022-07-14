import { GetStaticPaths, GetStaticPropsContext } from "next";
import { FC, useEffect, useState } from "react";
import { category, Post, subCategory } from "../../../../interfaces";
import { fetchApi, queries } from "../../../../utils/Fetching";
import { capitalize } from "../../../../utils/Capitalize";
import { BreadCumbs } from "../../../../components/Surface/BreadCumbs";
import Slider from "react-slick";
import { PostComponent } from "../../../../components/Home/Magazine";
import useFetch from "../../../../hooks/useFetch";
import {
  AsideLastestArticles,
  LastestArticles,
} from "../../../../components/Magazine";
import { createURL } from "../../../../utils/UrlImage";
import { CategoriesBlog } from './index';
import { LoadingItem } from "../../../../components/Loading";
import EmptyComponent from '../../../../components/Surface/EmptyComponent';

const SubCategory: FC<subCategory> = ({
  title,
  description,
  _id,
  imgBanner,
}) => {
  const initialQuery = {
    query: queries.getAllPost,
    variables: {
      criteria: { subCategories: _id },
      skip: 0,
      limit: 10,
    },
  };
  const [posts, setPosts, loading, error, fetch] = useFetch(initialQuery);

  const [fivePost, setPost] = useState<Post[]>([]);

  const fetchData = async () => {
    try {
      const { results } = await fetchApi({
        query: queries.getAllPost,
        variables: { sort: { createdAt: 1 }, limit: 5 },
      });
      setPost(results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const settings = {
    speed: 200,
    infinite: false,
    slidesToShow: 3,
    arrow: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          rows: 1,
        },
      },

      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          rows: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="bg-white w-full h-full pb-10">
        <div className={`banner w-full h-60 -mt-28`} />
        <div className="max-w-screen-lg mx-auto inset-x-0 p-5 md:p-0">
          <span className="hidden md:block">
          <BreadCumbs />
          </span>
          <h1 className="font-bold text-xl text-tertiary pt-2">
            {title && capitalize(title)}
          </h1>
          {description && (
            <article className="text-sm text-gray-500 pt-1">
              {capitalize(description)}
            </article>
          )}

          <div className="p-10 bg-color-base flex flex-col items-center justify-center rounded-xl my-6">
            <h2 className="text-xl text-primary">
              <strong>Recomendados</strong> para tu boda
            </h2>
            <div className="grid grid-cols-1 w-full">
              {!loading ? (
                posts?.results?.length > 0 ? (
                    <Slider {...settings}>
                      {posts?.results?.slice(0,3)?.map((item: Post) => (
                        <PostComponent key={item._id} {...item} />
                      ))}
                    </Slider>
                ) : (
                  <EmptyComponent text="No hay articulos" />
                )
              ) : (
                <div className="text-gray-500 text-sm w-full h-20 grid place-items-center">
                  <LoadingItem text="Cargando" size="small" />
                </div>
              )}
              
            </div>
          </div>
          {!loading ? (
            posts?.results?.length > 3 && (
              <div className="grid md:grid-cols-3 max-w-screen-lg w-full mx-auto inset-x-0 gap-6 px-5 md:px-0 overflow-hidden ">
              <LastestArticles data={posts?.results?.slice(3)} />
  
              <AsideLastestArticles
                data={fivePost}
                title={"TOP 5 más leidos"}
                className="... w-full  bg-white p-7 shadow-md rounded-xl"
              />
            </div>
            )
          ) : (
            <div className="w-full h-20 grid place-items-center text-gray-500 text-sm ">
              <LoadingItem text="Cargando" size="small"/> 
            </div>
          )}
          <CategoriesBlog />
        </div>
      </div>
      <style jsx>
        {`
          .banner {
            background-image: url("${imgBanner?.i1024
              ? createURL(imgBanner.i1024)
              : "/placeholder/image.png"}");
            background-size: cover;
            background-position: center;
          }
        `}
      </style>
    </>
  );
};
export default SubCategory;

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const result = await fetchApi({
    query: queries.getOneSubcategoryPost,
    variables: { slug: params?.subCategory },
  });
  return {
    props: result,
    revalidate: 10
  };
}

export const getStaticPaths: GetStaticPaths = async (props) => {
  try {
    const { results } = await fetchApi({
      query: queries.getAllCategoryPost,
      variables: {},
    });
    const resultsMap = results?.reduce(
      (
        acc: { params: { slug: string; subCategory: string } }[],
        category: category
      ) => {
        category?.subCategories?.forEach((subCategory) => {
          const instance = {
            params: { slug: category.slug, subCategory: subCategory.slug },
          };
          acc.push(instance);
        });
        return acc;
      },
      []
    );
    return {
      paths: resultsMap,
      fallback: "blocking",
    };
  } catch (error) {
    console.log(error);
    return {
      paths: [],
      fallback: false,
    };
  }
};
