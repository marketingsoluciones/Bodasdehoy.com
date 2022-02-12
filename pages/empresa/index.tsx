import Link from "next/link";
import { useState, useEffect, FC } from "react";

import { ButtonComponent } from "../../components/Inputs";
import { AuthContextProvider } from "../../context";
import PagesWithAuth from "../../HOC/PagesWithAuth";
import { business, subCategory } from "../../interfaces";
import { createSrcSet } from "../../utils/CreateSrcSet";
import { createURL } from "../../utils/UrlImage";
import useFetch from "../../hooks/useFetch";
import { LoadingItem } from "../../components/Loading";
import { GraphQL, fetchApi, queries } from '../../utils/Fetching';
import { useToast } from '../../hooks/useToast';
import { useRouter } from 'next/router';
import { DeleteIcon, EditIcon, EmptyIcon, ViewIcon } from "../../components/Icons";
import IconButton from '../../components/Inputs/IconButton';

const query = `query ($uid : ID){
  getBusinesses(uid:$uid){
      _id,
      userUid,
      businessName,
      country,
      city,
      slug,
      zip,
      fase
      address,
      description,
    subCategories{
      _id
      title
    }
    }
}`;
const Empresas = () => {
  const { user } = AuthContextProvider();
  const [data = [], loading, error, fetchy] = useFetch({
    query,
    variables: { uid: user?.uid },
  });

  return (
    <div className="container max-w-screen-lg mx-auto inset-x-0 py-10 w-full">
      <div className="flex items-center w-full justify-between">
        <h1 className="text-primary text-2xl font-semibold">Mis empresas</h1>
        <Link href={"/empresa/crear-empresa"} passHref>
          <ButtonComponent>+ Crear empresa</ButtonComponent>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-10 py-10 w-full">
        {loading ? (
          <div className="h-40 w-full flex items-center justify-center transition text-primary">
            <LoadingItem text={"Cargando"} size="small" />
          </div>
        ) : (
          data?.map((item: business, ) => (
                <BusinessItem key={item._id} {...item} refreshData={fetchy} />
          ))
        )}
        {data?.length === 0 && (
          <div className="w-full h-40 min-h-40 flex items-center justify-center text-gray-500 gap-5">
            <EmptyIcon className="w-10 h-10 text-gray-500" />
            <p>No hay empresas creadas</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PagesWithAuth(Empresas);

interface propsBusinessItem extends business {
  refreshData : CallableFunction
}

const BusinessItem: FC<propsBusinessItem> = ({ businessName, imgLogo, _id, refreshData, subCategories, fase, slug }) => {
  const toast = useToast()
  const router = useRouter()
  const handleRemove = async () => {
    try {
      await fetchApi(queries.deleteBusiness, {id : _id})
      toast("success", "Eliminado con exito" )
      refreshData()
    } catch (error) {
      toast("error", JSON.stringify(error) )
      console.log(error)
    }
  }
  const fases = {
    fase1 : {
      color: "bg-yellow-500",
      text : "En proceso"
    },
    fase2 : {
      color: "bg-green-500",
      text : "Publicado"
    }
  }
  return (
    <div className="w-full border border-gray-300 rounded-lg min-h-16  hover:bg-gray-200 transition flex items-center p-4 justify-between gap-10 relative overflow-hidden">
      {/* @ts-ignore */}
      <div className={`absolute h-6 w-28 ${fases[fase]?.color} top-0 left-0 opacity-80 flex items-center`}>
      {/* @ts-ignore */}
        <p className="text-white text-sm text-center w-full">{fases[fase]?.text}</p>

      </div>
      <img className="w-80 object-center object-cover rounded-sm h-14" src={imgLogo?.i320 ? createURL(imgLogo?.i320) : "/mask_1.png"} srcSet={createSrcSet(imgLogo)} />
      <div>
        <p className="text-md text-gray-600 font-bold tracking-tight">
          {businessName ?? "Titulo de prueba"}
        </p>
        <p className="text-xs text-gray-600">
          <strong>Identificador: </strong>
          {_id}
        </p>
        <div className="flex items-center gap-5 flex-wrap">
          {subCategories.map((subcategory) => (
            <Badge key={subcategory._id} text={subcategory.title} />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <IconButton onClick={() => router.push(`/empresa/${slug}`)} size={"sm"} variant={"primary"}>
          <ViewIcon />
        </IconButton>
        <IconButton onClick={() => router.push(`/empresa/crear-empresa?id=${_id}`)} size={"sm"} variant={"primary"}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleRemove} size={"sm"} variant={"primary"}>
          <DeleteIcon/>
        </IconButton>
      </div>
    </div>
  );
};

export const Badge: FC<{ text: string }> = ({ text }) => {
  return (
    <p className="text-xs px-1 py-0.5 text-white bg-gray-500 rounded my-1">
      {text}
    </p>
  );
};
