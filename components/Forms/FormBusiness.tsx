import { useState, useEffect, FC } from "react";
import dynamic from "next/dynamic";
import { InputField, Checkbox } from "../Inputs";
import { SectionForm } from "../../pages/empresa/crear-empresa";
import { category } from "../../interfaces";
import { FieldArray, useFormikContext, FormikValues } from 'formik';
import {
  UserIcon as UserIcon2,
  EmailIcon,
  CompanyIcon,
  WebSiteIcon,
} from "../Icons";
import { fetchApi, queries } from '../../utils/Fetching';
import { subCategory } from '../../interfaces/index';
import SelectFieldCoutries from "../Inputs/SelectFieldCoutries";
import GoogleMapsField from "../GoogleMaps/GoogleMapsField";
import UploadImage from '../Inputs/UploadImage';
import InputCity from "../Inputs/InputCity";
const TextEditorRich = dynamic(() => import("../TextEditorRich"), {
  ssr: false,
});

interface propsFormYourBusiness {
  values?: any;
}
export const FormYourBusiness: FC<propsFormYourBusiness> = ({ values }) => {

  return (
    <div className="flex flex-col gap-10">
      <SectionForm>
        <div className="grid grid-cols-2 gap-3">
          <h2 className="text-primary text-lg font-semibold">
            Datos de contacto
          </h2>
          <span className="relative col-span-2">
            <InputField
              name={"contactName"}
              placeholder={""}
              label={"Persona de contacto"}
              type={"text"}
              icon={
                <UserIcon2
                  fill={"currentColor"}
                  className="absolute w-5 h-5 inset-y-0 left-4 m-auto text-gray-500"
                />
              }
            />
          </span>
          <span className="relative col-span-2 md:col-span-1 ">
            <InputField
              name={"contactEmail"}
              placeholder={""}
              label={"Email de contacto"}
              type={"text"}
              icon={
                <EmailIcon className="absolute w-5 h-5 inset-y-0 left-4 m-auto text-gray-500" />
              }
            />
          </span>
          <span className="relative col-span-2 md:col-span-1">
            <InputField
              name={"webPage"}
              placeholder={""}
              label={"Pagina web"}
              type={"text"}
              icon={
                <WebSiteIcon className="absolute w-5 h-5 inset-y-0 left-4 m-auto text-gray-500" />
              }
            />
          </span>
          <span className="relative col-span-2 md:col-span-1 ">
            <InputField
              name={"landline"}
              placeholder={""}
              label={"Teléfono fijo"}
              type={"number"}
            />
          </span>
          <span className="relative col-span-2 md:col-span-1 ">
            <InputField
              name={"mobilePhone"}
              placeholder={""}
              label={"Teléfono movil"}
              type={"number"}
            />
          </span>
        </div>
      </SectionForm>
      <SectionForm>
        <div className="flex flex-col w-full gap-3">
          <h2 className="text-primary text-lg font-semibold">Tu empresa</h2>
          <div className=" text-gray-300">
            <span className="grid md:grid-cols-2 md:gap-4">
              <UploadImage
                label={"Imagen Logo"}
                name={"imgLogo"}
              />
              <UploadImage
                label={"Imagen Miniatura"}
                name={"imgMiniatura"}
              />
            </span>

            <span className="">
              <InputField
                name={"businessName"}
                label={"Nombre de tu empresa"}
                type={"text"}
                icon={
                  <CompanyIcon
                    fill={"currentColor"}
                    className="absolute w-5 h-5 inset-y-0 left-4 m-auto text-gray-500"
                  />
                }
              />
            </span>

            <span className="grid md:grid-cols-2 gap-4 mt-4">
              <SelectFieldCoutries name={"country"} label={"País"} />

              <InputCity
                name={"city"}
                type="text"
                label={"Ciudad"}
              />
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
            </span>

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
            <TextEditorRich name={"description"} label="Descripción" />
          </div>
        </div>
      </SectionForm>
      <SectionForm>
        <CategoriesComponent />
      </SectionForm>
      <SectionForm>
        <GoogleMapsField name="coordinates" label="Ubicación" />
      </SectionForm>
    </div>
  );
};

const CategoriesComponent: FC = () => {
  const [categories, setCategories] = useState<Partial<category>[]>([]);
  const { errors, touched } = useFormikContext<any>()


  const fetchData = async () => {
    try {
      const { results } = await fetchApi({
        query: queries.getCategories,
        variables: { development: "bodasdehoy" }
      });
      const mapResults = results.filter((item: any) => item.subCategories.length > 0 && item)
      setCategories(mapResults);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const removeElementFieldArray = (values: any, id: string) => {
    return values?.subCategories?.findIndex((item: { _id: string }) => item._id === id)
  }

  return (
    <div className="flex flex-col w-full gap-3 pb-3">
      <span className="flex items-center gap-2">
        <h2 className="text-primary text-lg font-semibold">Sector o Actividad</h2>
        {errors.subCategories ? (
          <span className="text-red-500 text-xs font-medium ">
            {errors?.subCategories}
          </span>
        ) : null}
      </span>

      <div className="grid md:grid-cols-3 gap-10 text-gray-300 justify-center">
        <FieldArray name={"subCategories"}>
          {({ insert, remove, push, form }) =>
            categories?.map((category: Partial<category>) => (
              <div key={category._id} className="flex flex-col gap-4">
                <h3 className="text-primary font-medium capitalize">
                  {category?.title}
                </h3>
                <div className="flex flex-col gap-6">
                  {category?.subCategories?.map((subCategory: subCategory) => (
                    <Checkbox
                      key={subCategory._id}
                      checked={form.values?.subCategories?.filter((item: any) => item._id === subCategory._id)?.length > 0}
                      label={subCategory.title}
                      name={subCategory.title}
                      onChange={(e: any) =>
                        e.target.checked ? push({ _id: subCategory._id }) : remove(removeElementFieldArray(form.values, subCategory._id))
                      }
                    />
                  ))}
                </div>
              </div>
            ))
          }
        </FieldArray>
      </div>
    </div>
  );
};
