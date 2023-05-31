import { GetStaticPaths, GetStaticPropsContext, NextPage } from 'next'
import React from 'react'
import { Filters, GridCards } from '.';
import { HeaderCategory } from '../../../components/Category';
import { subCategory } from '../../../interfaces';
import { fetchApi, queries } from '../../../utils/Fetching';
import { createURL } from '../../../utils/UrlImage';
import { category } from '../../../interfaces/index';
import { BreadCumbs } from '../../../components/Surface/BreadCumbs';

const subCategoryBusinessPage: NextPage<subCategory> = (props) => {
  const { imgBanner, title, characteristics, _id } = props

  return (
    <section className="flex flex-col gap-10 ">
      <div>
        {/* Imagen Banner */}
        <img
          alt={title}
          src={
            imgBanner?.i640
              ? createURL(imgBanner?.i640)
              : "/placeholder/image.png"
          }
          className="hidden md:block md:w-full md:h-60 md:transform md:-mt-32 md:z-10 md:object-center md:object-cover"
        />
        <HeaderCategory {...props} />
      </div>


      <span className='-mt-6 px-2 hidden md:block'>
        <BreadCumbs />
      </span>
      {/* Aside Filters */}
      <div className="-mt-6 xl:max-w-screen-lg 2xl:max-w-screen-xl gap-4 md:gap-10 mx-auto inset-x-0 grid md:grid-cols-7 2xl:grid-cols-5 w-full">
        <Filters optionsCheckbox={{ characteristics: characteristics ?? [] }} />
        <GridCards query={{ subCategories: _id }} />
      </div>
    </section>
  )
}

export default subCategoryBusinessPage

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const result = await fetchApi({
    query: queries.getOneSubcategoryBusiness,
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
      query: queries.getAllCategoryBusiness,
      variables: { development: "bodasdehoy" },
    });
    const resultsMap = results?.reduce(
      (
        acc: { params: { category: string; subCategory: string } }[],
        category: category
      ) => {
        category?.subCategories?.forEach((subCategory) => {
          const instance = {
            params: { category: category.slug, subCategory: subCategory.slug },
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
