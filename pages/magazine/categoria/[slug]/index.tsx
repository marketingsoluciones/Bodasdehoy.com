import { GetStaticPropsContext, NextPage, GetStaticPaths } from "next";
import { fetchApi, queries } from "../../../../utils/Fetching";
import { category, subCategory, Post } from '../../../../interfaces/index';
import { createURL } from "../../../../utils/UrlImage";
import { BreadCumbs } from "../../../../components/Surface/BreadCumbs";
import { capitalize } from "../../../../utils/Capitalize";
import Slider from "react-slick";
import { PostComponent } from "../../../../components/Home/Magazine";
import { FC } from "react";
import useFetch from '../../../../hooks/useFetch';
import { LoadingItem } from "../../../../components/Loading";
import EmptyComponent from "../../../../components/Surface/EmptyComponent";
import Link from "next/link";
import { useHover } from "../../../../hooks";
import { ButtonComponent } from "../../../../components/Inputs";
import { useRouter } from "next/router";

const CategoryBlogPage: NextPage<category> = (props) => {
  const { _id, imgBanner, title, description, subCategories } = props;

  return (
    <>
      <div className="w-full h-full bg-white pb-10">
        <div className={`banner w-full h-60 -mt-28`} />
        <div className="max-w-screen-lg mx-auto inset-x-0 p-5 md:p-0">
          <BreadCumbs />
          <h1 className="font-bold text-xl text-tertiary">
            {title && capitalize(title)}
          </h1>
          {description && (
            <article className="text-sm text-gray-500 pt-1">
              {capitalize(description)}
            </article>
          )}
          {subCategories.map((subCategory) => (
            <SubCategoryComponent key={subCategory._id} {...subCategory}  />
          ))}
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

export default CategoryBlogPage;

export async function getStaticProps({ params }: GetStaticPropsContext) {
  try {
    const result = await fetchApi({
      query: queries.getOneCategoryPost,
      variables: { slug: params?.slug },
    });
    return {
      props: result,
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const SubCategoryComponent : FC <subCategory> = (props) => {
  const {title, _id, slug} = props
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
  // const [latestPost, setLatestPost] = useState<Post[]>([])
  const initialQuery = {
    query: queries.getAllPost,
    variables: {
      criteria: {subCategories: _id},
      skip: 0,
      limit: 5,
    }
  }
  const [latestPost, setLatestPost, loading, error, fetch] = useFetch(initialQuery)
  const router = useRouter()
  return (
    <div className="bg-color-base p-6 mt-6 rounded-2xl w-full h-full flex flex-col items-center justify-center">
      <Link href={`${router.asPath}/${slug}`} passHref>
      <h2 className="text-xl text-primary cursor-pointer hover:bg-primary duration-500 px-4 py-1 hover:text-white rounded-full transition-all">{title && capitalize(title)}</h2>
      </Link>
      
      <div className="grid grid-cols-1 w-full">
       {!loading ? latestPost?.results?.length > 0 ? (
          <Slider {...settings}>
          {latestPost?.results?.map((post : Post) => (
            <PostComponent key={post._id} {...post} />
          ))}
        </Slider>
       ) : <EmptyComponent text="No hay articulos" /> : (
         <div className="w-full flex flex-col items-center justify-center h-20 text-sm text-gray-600">
           <LoadingItem text="Cargando" size="small" />
         </div>
       )}

       {error && "Ups... Hubo un error"}
      </div>
      {latestPost?.results?.length > 0 && <ButtonComponent onClick={() => router.push(`${router.asPath}/${slug}`)}>Ver más articulos</ButtonComponent>}
    </div>
  );
};


export const CategoriesBlog = () => {
  const initialQuery ={
    query: queries.getAllCategoryPost,
    variables: {}
  }
  const settings = {
    speed: 200,
    infinite: false,
    slidesToShow: 6,
    arrows: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  }
  const [categories, setCategories, loading, error, fetch] = useFetch(initialQuery)
  return (
    <div className="grid grid-cols-1 w-full pt-6">
      <h2 className="text-tertiary text-md uppercase w-full text-center py-2 tracking-wider">Articulos según temas</h2>
        <Slider {...settings}>
            {categories?.results?.map((item: category) => (
              <CategoryItem key={item._id} {...item} />
            ))}
        </Slider>

      </div>
  )
}

const CategoryItem : FC <category> = ({icon, slug, title}) => {
  const [HoverRef, isHovered] = useHover()
  
  return (
    <div className="flex items-center justify-center flex-col">
        <Link href={`/magazine/categoria/${slug}`} passHref>
        <button ref={HoverRef} className={`text-tertiary flex flex-col gap-2 items-center justify-center cursor-pointer p-2 rounded-full p-4 ${isHovered ? "bg-gray-100" : ""} `}>
          <img className={`p-3 transition w-16 h-16 flex justify-center items-center cursor-pointer`} src={createURL(icon?.i320)} alt={title}></img>
        </button>
        </Link>
        <small className="text-tertiary text-xs text-center">{title && capitalize(title)}</small>
        </div>
  )
}

