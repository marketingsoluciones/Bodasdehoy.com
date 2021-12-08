import { SectionForm } from "../../pages/empresas/crear-empresa";
import { Location2Icon, UserIcon, EuroIcon } from "../Icons";
import { InputField, SelectField } from "../Inputs";
import { useContext, useState, useEffect, FC } from 'react';
import { AuthContext } from "../../context";
import { GraphQL } from '../../utils/Fetching';

export const FormQuestion: FC = (props) => {
  
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
              <InputField type={"number"} name={"menuPrice"} placeholder={""} label={""}/>
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
              <InputField type={"number"} name={"guestsNumber"} placeholder={""} label={""}/>
            </div>
          </div>
        </div>
          <span className="flex flex-col">
            <h3 className="text-sm text-tertiary font-medium">
              ¿Cuáles son las características más relevantes de las
              instalaciones?
            </h3>
            <QuestionsComponent {...props}/>
          </span>
      </SectionForm>
    </div>
  );
};


interface propsQuestionComponent {
  values? : any
}
const QuestionsComponent : FC <propsQuestionComponent> = ({values}) => {
  const {user} = useContext(AuthContext)
  const [questions, setQuestions] = useState([])

  const fetchQuestions = async () => {
    try {
      const res = await GraphQL.createBusiness({userUid: user?.uid, ...values})
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchQuestions()
  }, [])

  return (
    <div>
      
    </div>
  )
}

export default FormQuestion


