import { SectionForm } from "../../pages/empresas/crear-empresa";
import { Location2Icon, UserIcon, EuroIcon } from "../Icons";
import { Checkbox, InputField, SelectField } from "../Inputs";
import { useState, useEffect, FC, memo, Dispatch, SetStateAction } from 'react';
import { FieldArray } from "formik";

interface propsFormQuestion {
  values?: any;
  setValues? : Dispatch<SetStateAction<any>> | undefined
}
export const FormQuestion: FC <propsFormQuestion> = ({ values, setValues }) => {
 
  return (
    <div className="flex flex-col gap-10">
      <SectionForm>
        <div>
          <h2 className="text-primary text-lg font-semibold">
            Preguntas frecuentes
          </h2>
          <p className="text-sm text-gray-500 w-full">
            Responde las preguntas frecuentes que realizan los novios sobre tus
            servicios
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col items-center gap-1">
            <EuroIcon className="w-10 h-10 text-tertiary" />
            <p className="text-tertiary font-semibold">Precio del menú</p>
            <div className="flex items-center text-primary gap-3">
              <p>Desde</p>
              <InputField
                type={"number"}
                name={"menuPrice"}
                placeholder={""}
                label={""}
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Location2Icon className="w-10 h-10 text-tertiary" />
            <p className="text-tertiary font-semibold">Localización</p>
            <SelectField name={"location"} placeholder={"Elegir"} />
          </div>
          <div className="flex flex-col items-center gap-1">
            <UserIcon className="w-10 h-10 text-tertiary" />
            <p className="text-tertiary font-semibold">Número de invitados</p>
            <div className="flex items-center text-primary gap-3">
              <p>Desde</p>
              <InputField
                type={"number"}
                name={"guestsNumber"}
                placeholder={""}
                label={""}
              />
            </div>
          </div>
        </div>
        <span className="flex flex-col">
          <QuestionsComponent data={values?.questionsAndAnswers} />
          {/* <ServicesAndAccessoriesComponent
            data={{ services: data?.services, accessories: data?.accessories }}
            values={values}
          /> */}
        </span>
      </SectionForm>
    </div>
  );
};

type Question = {
  frequentQuestions : string
  answers : string
}

interface propsQuestionComponent {
  data: Question[];
}
const QuestionsComponent: FC<propsQuestionComponent> = memo(({ data }) => {
  const [questions, setQuestions] = useState(data);

  useEffect(() => {
    setQuestions(data);
  }, [data]);
  
  return (
      <div className="w-full flex flex-col gap-3 ">
        {questions?.map((item, idx) => {
          return (
            <div key={idx} className="text-primary text-lg">
              <h3 className="text-sm text-tertiary font-medium">
              {item.frequentQuestions}
              </h3>
              <InputField name={`questionsAndAnswers.${idx}`} placeholder={""} type="text" question={item?.frequentQuestions}  />
            </div>
          )
        })}
        </div>
  );
});

interface propsServiceAndAccessoriesComponent {
  data: {
    services: string[];
    accessories: string[];
  };
  values: any;
}

const ServicesAndAccessoriesComponent: FC<propsServiceAndAccessoriesComponent> =
  ({ data: { services, accessories }, values }) => {
    return (
      <div className="w-full pt-12">
        <h2 className="text-primary text-lg font-semibold">
          Servicios e instalaciones
        </h2>
        <p className="text-sm text-gray-500 w-full">
          Selecciona los servicios e instalaciones que incluyes.
        </p>
        <div className="flex flex-col gap-6 pt-6">
          <FieldArrayWithProps
            data={services}
            label={"servicios"}
            values={values}
          />
          <FieldArrayWithProps
            data={accessories}
            label={"Instalaciones"}
            values={values}
          />
        </div>
      </div>
    );
  };

//

interface propsFieldArrayWithProps {
  data: string[];
  label: string;
  values: any;
}
const FieldArrayWithProps: FC<propsFieldArrayWithProps> = ({
  data,
  label,
  values,
}) => {
  const [dataArray, setDataArray] = useState(data ?? []);

  useEffect(() => {
    setDataArray(data);
  }, [data]);
  return (
    <div className="w-full">
      <h3 className="text-primary font-medium capitalize">{label}</h3>
      <FieldArray name={label}>
        {({ insert, remove, push }) => (
          <div className="grid grid-cols-3 gap-3 py-2">
            {dataArray?.map((item: any, idx) => (
              <Checkbox
                key={idx}
                checked={values[label] && values[label].includes(item)}
                label={item}
                name={item}
                onChange={(e: any) =>
                  e.target.checked ? push(item) : remove(item)
                }
              />
            ))}
          </div>
        )}
      </FieldArray>
    </div>
  );
};
