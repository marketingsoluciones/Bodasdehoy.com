import { Dispatch, FC, MouseEventHandler, SetStateAction, useState } from 'react';
import { LogoFullColor } from '../../../Icons/';
import { Providers } from '../../Components';
import FormRegister from './FormRegister';
import { WhoYouAre } from './WhoYouAre'
import { AuthContextProvider } from '../../../../context';

/*
  ### Componente FirstStep ###
  @params value : Callback para enviar el valor de tipo de perfil seleccionado 
*/
interface propsFirstStep {
  value: FunctionStringCallback;
  setStageRegister: Dispatch<SetStateAction<number>>
}

export const FirstStep: FC<propsFirstStep> = ({ value, setStageRegister }) => {
  const { linkMedia } = AuthContextProvider()
  const [select, setSelect] = useState<string>("");

  // Tipo de dato para definir opciones

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {linkMedia && <div className='flex flex-col justify-center items-center w-full'>
        <h2 className="text-lg text-primary ">Te damos la bienvenida a</h2>
        <LogoFullColor />
      </div>}
      <h2 className="text-2xl text-primary ">¿Quien eres?</h2>

      <WhoYouAre select={select} setSelect={setSelect} />
      <button
        className={` rounded-full px-10 py-2 text-white font-medium w-max mx-auto inset-x-0 ${select === ""
          ? "bg-gray-200"
          : "bg-primary hover:bg-tertiary transition"
          }`}
        onClick={() => {
          value(select)
          setStageRegister(old => old + 1)
        }}
        disabled={select === ""}
      >
        Siguiente
      </button>
    </div>
  );
};


interface propsSecondStep {
  whoYouAre: string;
  stageRegister: number;
  setStageRegister: Dispatch<SetStateAction<number>>
  setStage: CallableFunction
}
export const SecondStep: FC<propsSecondStep> = (props) => {
  const { linkMedia, preregister } = AuthContextProvider()
  return (
    <div className={`gap-4 flex flex-col justify-center items-center w-full ${linkMedia && "space-y-12"}`}>
      <LogoFullColor />
      {!linkMedia && <>
        <Providers setStage={props.setStage} whoYouAre={props?.whoYouAre} />
        <h2 className={`font-light w-full text-tertiary text-center text-md`}>
          Ó
        </h2>
        {props?.whoYouAre == "empresa" &&
          <h2 className={`font-light text-tertiary flex items-center text-md `}>
            Crea tu cuenta de Empresa en Bodasdehoy.com
          </h2>}
      </>}
      <FormRegister {...props} />

    </div>
  );
};
