import { FC, ReactNode } from "react";
import { DocsIcon } from "../../components/Icons";
import { GraphQL } from '../../utils/Fetching';
import { SectionForm } from '../empresa/crear-empresa';
const index = ({params} : {params: any}) => {
  const options = [
    {title: "Datos de la empresa", icon: <DocsIcon />},
    {title: "Localización y mapa"},
    {title: "Preguntas frecuentes"},
    {title: "Promociones"},
    {title: "Fotos"},
    {title: "Videos"},
    {title: "Redes sociales"},
  ]
  return (
    <div className="container w-full mx-auto inset-x-0 flex flex-col gap-10 max-w-screen-lg py-10 grid grid-cols-4">
      <div className="col-span-1 flex flex-col gap-2 items-center w-full">
        <div className="bg-white border border-primary rounded-full w-48 h-48"/>
        <h1 className="capitalize text-xl text-tertiary font-semibold min-h-10">{params?.businessName}</h1>
        <ul className="p-4 bg-white rounded-2xl">
          {options.map((item,idx) => (
            <li key={idx} className="text-sm p-2 text-tertiary font-light flex items-center gap-2 ">{item.icon}{item.title}</li>
          ))}
        </ul>
      </div>
      <div className="col-span-3">
        <SectionComponent>
          <h2 className="text-primary text-lg font-semibold">Datos de acceso</h2>
        </SectionComponent>
      </div>
    </div>
  );
};

export default index;

export const SectionComponent : FC = ({children}) => {
  return (
    <div className="bg-white rounded-2xl w-full p-6">
          {children}
    </div>
  )
}

export async function getServerSideProps({params} : {params: object}) {
  return {
    props: {}, // will be passed to the page component as props
  }
}