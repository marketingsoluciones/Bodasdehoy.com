import { SectionForm } from "../../pages/empresa/crear-empresa";
import { Location2Icon, UserIcon, EuroIcon } from "../Icons";
import { Checkbox, InputField, SelectField } from "../Inputs";
import { useState, useEffect, FC, memo, Dispatch, SetStateAction } from "react";
import { FieldArray, FormikValues, useFormikContext } from "formik";
import {
  questionsAndAnswers,
  characteristic,
  itemCharacteristic,
  character
} from "../../interfaces";

interface propsFormQuestion {
  data: {
    characteristics: characteristic[];
    questionsAndAnswers: questionsAndAnswers[];
  };
}
export const FormQuestion: FC<propsFormQuestion> = ({ data }) => {
  const { values, setFieldValue } = useFormikContext<FormikValues>();
     
  
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
        {/* <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col items-center gap-1">
            <EuroIcon className="w-10 h-10 text-tertiary" />
            <p className="text-tertiary font-semibold">Precio</p>
            <div className="flex items-center text-primary gap-3">
              <p>Desde</p>
              <InputField
                type={"number"}
                name={"priceFrom"}
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
        </div> */}
        <span className="flex flex-col">
          <QuestionsComponent data={data?.questionsAndAnswers} />
          <CharacteristicComponent data={data?.characteristics} />
        </span>
      </SectionForm>
    </div>
  );
};

const QuestionsComponent: FC<{ data: questionsAndAnswers[] }> = ({ data }) => {
  const { values, setFieldValue } = useFormikContext<FormikValues>();

  useEffect(() => {
    if(values.questionsAndAnswers){
      const mapResult = values.questionsAndAnswers.reduce((acc:any,item : questionsAndAnswers) => {
        acc[item.questions._id] = item.answers
        return acc
      }, {})
      setFieldValue("questionsAndAnswers2", mapResult)
    }
  }, []) 

  
 
  
  useEffect(() => {
    if (values.questionsAndAnswers2) {
      const arrCharac = Object?.entries(values?.questionsAndAnswers2 ?? {});
      console.log(arrCharac)
      const reduce = arrCharac?.reduce((acc: any, item: any) => {
          acc.push({ questions: {_id : item[0]}, answers: item[1] });
        return acc;
      }, []);
      console.log("reduce", reduce)
      values && setFieldValue("questionsAndAnswers", reduce);
    }
  }, [values.questionsAndAnswers2]);
  

  return (
    <div className="w-full flex flex-col gap-3 ">
      {data?.map((item : questionsAndAnswers) => {
        return (
          <div key={item.questions._id} className="text-primary text-lg">
            <InputField
              name={`questionsAndAnswers2.${item.questions._id}`}
              type="text"
              label={item.questions.title}
            />
          </div>
        );
      })}
    </div>
  );
};

interface propsCharacteristicsComponent {
  data: characteristic[];
}

const CharacteristicComponent: FC<propsCharacteristicsComponent> = ({
  data,
}) => {
  const { values, setFieldValue } = useFormikContext<FormikValues>();


  useEffect(() => {
    if(values.characteristics){
      const mapResult = values.characteristics.reduce((acc:any,item : characteristic) => {
        if(item.characteristic._id){
          acc[item.characteristic._id] = item.items.map((character) => character.title)
        }
        return acc
      }, {})
      setFieldValue("characteristics2", mapResult)
    }
  }, []) 

  useEffect(() => {
    if (values) {
      const arrCharac = Object?.entries(values?.characteristics2 ?? {});
      const reduce = arrCharac?.reduce((acc: any, item: any) => {
        if (item[1]?.length > 0) {
          acc.push({ characteristic: {_id : item[0]}, items: item[1]?.map((item: string) => ({title: item})) });
        }
        return acc;
      }, []);
      values && setFieldValue("characteristics", reduce);
    }
  }, [values.characteristics2]);

  return (
    <div className="w-full pt-12">
      <h2 className="text-primary text-lg font-semibold">Caracteristicas</h2>
      <p className="text-sm text-gray-500 w-full">
        Selecciona las caracteristicas que definan tu empresa.
      </p>
      {data?.map((item) => (
        <div key={item.characteristic._id} className="flex flex-col gap-6 pt-6">
          <FieldArrayWithProps
            key={item?.characteristic?._id}
            data={item?.characteristic?.items}
            label={item?.characteristic?.title}
            name={`characteristics2.${item?.characteristic?._id}`}
            values={values?.characteristics2 && values?.characteristics2[item.characteristic._id]}
          />
        </div>
      ))}
    </div>
  );
};

//

interface propsFieldArrayWithProps {
  data: character[];
  label: string;
  name: string
  values : string[]
}
const FieldArrayWithProps: FC<propsFieldArrayWithProps> = ({
  data,
  label,
  name,
  values
}) => {
  const [dataArray, setDataArray] = useState(data ?? []);

  useEffect(() => {
    setDataArray(data);
  }, [data]);

  const handleRemove = (values: string[], id: string) => {
    return values.findIndex((item: string) => item === id);
  };

  return (
    <div className="w-full">
      <h3 className="text-primary font-medium capitalize">{label}</h3>
      <FieldArray name={name}>
        {({ remove, push }) => (
          <div className="grid grid-cols-3 gap-3 py-2">
            {dataArray?.map((item: character) => (
              <Checkbox
                key={item._id}
                checked={values?.includes(item.title)}
                label={item.title}
                name={item.title}
                onChange={(e: any) =>
                  e.target.checked
                    ? push(item.title)
                    : remove(
                        handleRemove(values, item.title)
                      )
                }
              />
            ))}
          </div>
        )}
      </FieldArray>
    </div>
  );
};
