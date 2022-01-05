import { CompanyCard } from "../../components/Home/FeaturedCompanies";
import { AuthContextProvider } from "../../context";
import PagesWithAuth from "../../HOC/PagesWithAuth";
import { GraphQL } from '../../utils/Fetching';
import { useState, useEffect } from 'react';
import { ButtonComponent } from "../../components/Inputs";
import Link from 'next/link'

const index = () => {
  const { user } = AuthContextProvider()
  const [data, setData] = useState([])

  const fetchingData =  async () => {
    setData(await GraphQL.getBusinessByUID({uid: user?.uid}))
  }

  useEffect(() => {
    fetchingData()
  }, [user?.uid])
  
  return (
    <div className="container max-w-screen-lg mx-auto inset-x-0 py-10">
      <div className="flex items-center w-full justify-between">
      <h1 className="text-primary text-2xl font-semibold">Mis empresas</h1>
      <Link href={"/empresas/crear-empresa"} >
      <ButtonComponent>+ Crear empresa</ButtonComponent>
      </Link>
      </div>
      <div className="grid grid-cols-3 gap-10 pl-10 py-10">
        {data.map((item : any, idx) => (
          <Link href={`/empresas/${item?._id}`}>
            <div>
          <CompanyCard key={idx} data={item} pricing={false} />
          </div>
          </Link>
        ))}
        {data.length === 0 && "No hay data"}
        
      </div>
    </div>
  );
};

export default index;
