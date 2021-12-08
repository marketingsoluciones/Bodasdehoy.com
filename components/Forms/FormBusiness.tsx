import { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
import { CompanyIcon } from "../Icons";
import { InputField, SelectField, Checkbox } from "../Inputs";
const TextEditorRich = dynamic(() => import("../TextEditorRich"), {
  ssr: false,
});
import { api } from '../../api';
import { SectionForm } from '../../pages/empresas/crear-empresa';
import { GetCategory } from '../../interfaces/FetchCategories';
import { FieldArray } from "formik";

export const FormYourBusiness = () => {
  return (
    <div className="flex flex-col gap-10">
     
      <SectionForm>
      <div className="flex flex-col w-full gap-3">
        <h2 className="text-primary text-lg font-semibold">Tu empresa</h2>
        <div className="grid grid-cols-2 gap-4 text-gray-300">
          
          <span className="relative col-span-2">
            <InputField
              name={"businessName"}
              placeholder={"Joyeria Montilla"}
              label={"Nombre de tu empresa"}
              type={"text"}
              icon={<CompanyIcon
                fill={"currentColor"}
                className="absolute w-5 h-5 inset-y-0 left-4 m-auto text-gray-500"
              />}
            />
            
          </span>

          <SelectField name={"country"} placeholder={"País"} label={"País"} />
          <SelectField name={"city"} placeholder={"Ciudad"} label={"Ciudad"} />
          <InputField
            name={"zip"}
            label={"Codigo Postal"}
            placeholder={"33198"}
            type={"text"}
          />
          <InputField
            name={"address"}
            placeholder={"Calle 173 Avenida 9"}
            label={"Dirección"}
            type={"text"}
          />
        </div>
      </div>
      <div className="flex flex-col w-full gap-3">
        <div>
          <h2 className="text-primary text-lg font-semibold">
            Describe tu empresa (en tercera persona)
          </h2>
          <p className="text-xs text-gray-600 w-2/3">
            Describe detalladamente todos los servicios y productos que ofrece
            tu empresa con la máxima información de interés para los novios
          </p>
        </div>
        <div className="pt-4">
          <TextEditorRich name={"description"}   />
        </div>
      </div>
      </SectionForm>
      <SectionForm>
      <CategoriesComponent />
      </SectionForm>

    </div>
  );
};

const CategoriesComponent = () => {
  const [categories, setCategories] = useState<Partial<GetCategory[]>>([])

  const fetchData = async () => {
    try {
      const params = {
        query: `query{
          getCategories{categorie,subCategories}
        }`,
        variables: {},
      };
      const {data}  = await api.graphql(params)
      const categories : GetCategory[] = data.data.getCategories
      setCategories(categories)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="flex flex-col w-full gap-3 pb-3">
        <h2 className="text-primary text-lg font-semibold">
          Sector o Actividad
        </h2>
        <div className="grid grid-cols-3 gap-10 text-gray-300">
        <FieldArray name={"subcategories"}>
          {({insert, remove, push}) => (
            categories.map((item : any, idx : number) => (
              <div key={idx} className="flex flex-col gap-4">
                <h3 className="text-primary font-medium capitalize">{item?.categorie}</h3>
                <div className="flex flex-col gap-6">
                  {item?.subCategories.map((item : string, idx : number) => (
                    //@ts-ignore
                    <Checkbox key={idx} label={item} name={item} onChange={(e: any) => e.target.checked ? push(item) : remove(item)} />
                  ))}
                </div>
              </div>
            ))
          )}
          </FieldArray>
        </div>
      </div>
  )
}

