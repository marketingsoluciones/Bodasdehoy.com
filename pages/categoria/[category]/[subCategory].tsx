import { GetStaticPaths, GetStaticPropsContext, NextPage } from 'next'
import {FC, useState } from 'react';
import React from 'react'
import { Filters, GridCards } from '.';
import { HeaderCategory } from '../../../components/Category';
import { subCategory } from '../../../interfaces';
import { fetchApi, queries } from '../../../utils/Fetching';
import { createURL } from '../../../utils/UrlImage';
import { category } from '../../../interfaces/index';
import { BreadCumbs } from '../../../components/Surface/BreadCumbs';
import { SidebarContextProvider } from "../../../context";
import { CloseIcon } from '../../../components/Icons/index';
import { connectSearchBox, Hits, InstantSearch } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";
import { BurgerIcon,LogoFullColor,SearchIcon } from "../../../components/Icons";
import { connectWithQuery, Hit } from "../../../components/Surface/Navigation";

const subCategoryBusinessPage: NextPage<subCategory> = (props) => {
  const { imgBanner, title, characteristics, _id } = props

  const NavbarMobile = () => {
    const { showSidebar, setShowSidebar } = SidebarContextProvider();
    const [showSearcher, setShowSearcher] = useState<boolean>(false);
    
    const MySearch : FC <any> = ({
      currentRefinement,
      refine,
      setSearch,
      isSearch,
    }) => {
      return (
        <div className="w-full mx-auto inset-x-0 bg-white h-14 -mt-2 rounded-full flex items-center relative">
          
          <input
            autoFocus
            type="input"
            value={currentRefinement}
            onChange={(e) => refine(e.currentTarget.value)}
            className="w-full border-none bg-none w-full h-full rounded-full pl-8 focus:outline-none text-sm text-gray-700"
            placeholder="Buscar en bodasdehoy.com"
          />
          <button onClick={() => setShowSearcher(!showSearcher)} className="w-5 h-5  absolute right-5 ">
          <CloseIcon className="w-full h-full" />
          </button>
        </div>
      );
    };
  
    const ConnectMySearchBox = connectSearchBox(MySearch);
    const conditionalQuery = {
      search(requests: any) {
        if (
          requests.every(({ params }: any) => !params.query) ||
          requests.every(({ params }: any) => !params.query.trim())
        ) {
          // Here we have to do something else
          return Promise.resolve({
            results: requests.map(() => ({
              hits: [],
              nbHits: 0,
              nbPages: 0,
              processingTimeMS: 0,
            })),
          });
        }
        const searchClient = algoliasearch(
          "4YG7QHCVEA",
          "920a6487923dbae05fb89b1be0955e74"
        );
        return searchClient.search(requests);
      },
    };
    return (
      <div className="mx-auto inset-x-0 w-full px-5 sm:hidden relative -mt-10 mb-10 flex items-center justify-between relative  ">
        {!showSearcher ? (
          <>
            <button className="p-2" onClick={() => setShowSidebar(true)}>
              <BurgerIcon />
            </button>
  
            <LogoFullColor className="h-auto w-48" />
  
            <button
              className="p-2"
              onClick={() => setShowSearcher(!showSearcher)}
            >
              <SearchIcon />
            </button>
            
          </>
        ) : (
          <InstantSearch indexName="bodasdehoy" searchClient={conditionalQuery}>
            <ConnectMySearchBox setSearch={setShowSearcher} isSearch={showSearcher} />
            {/* <SearchBox searchAsYouType={false} /> */}
            <div className="absolute -bottom-0 left-0 w-[80%] mx-auto inset-x-0 bg-white shadow translate-y-full max-h-60 overflow-auto no-scrollbar  rounded-b-3xl z-40">
              <Hits hitComponent={Hit} />
            </div>
          </InstantSearch>
        )}
      </div>
    );
  };

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
