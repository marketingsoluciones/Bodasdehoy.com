import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { LogoFullColor } from '../../../Icons/';
import { Providers } from '../../Components';
import FormRegister from './FormRegister';
import { WhoYouAre } from './WhoYouAre'
import { AuthContextProvider } from '../../../../context';
import { useAuthentication } from '../../../../utils/Authentication';
import { useActivity } from '../../../../hooks/useActivity';

/*
  ### Componente FirstStep ###
  @params value : Callback para enviar el valor de tipo de perfil seleccionado 
*/
interface propsFirstStep {
  value: FunctionStringCallback;
  setStageRegister: Dispatch<SetStateAction<number>>
  validProvider: any
}

export const FirstStep: FC<propsFirstStep> = ({ value, setStageRegister, validProvider }) => {
  const { signIn } = useAuthentication();
  const { linkMedia, user } = AuthContextProvider()
  const [select, setSelect] = useState<string>("");
  const [updateActivity, updateActivityLink] = useActivity()


  useEffect(() => {
    if (select) {
      updateActivityLink("selectRole", select)
    }
  }, [select])


  // Tipo de dato para definir opciones

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {linkMedia && <div className='flex flex-col justify-center items-center w-full'>
        <h2 className="text-lg text-primary ">Te damos la bienvenida a</h2>
        <LogoFullColor />
      </div>}
      {validProvider && <div className='flex flex-col justify-center items-center w-full space-y-4'>
        <span className="text-lg text-gray-700 text-center">{`Hola: ${validProvider?.user?.email}`}</span>
        <span className="text-lg text-primary text-center">Aún no estás registrado, para registrarte dinos</span>
      </div>}
      <h2 className="text-2xl text-primary ">¿Quien eres?</h2>

      <WhoYouAre select={select} setSelect={setSelect} />
      <button
        className={` rounded-full px-10 py-2 text-white font-medium w-max mx-auto inset-x-0 ${select === ""
          ? "bg-gray-200"
          : "bg-primary hover:bg-tertiary transition"
          }`}
        onClick={() => {
          updateActivityLink("clikNextStep2")
          value(select)
          !validProvider
            ? setStageRegister(old => old + 1)
            : signIn({ type: "credentials", payload: null, setStage: null, validProvider, whoYouAre: select })
        }}
        disabled={select === ""}
      >
        {!validProvider ? "Siguiente" : "Registrar"}
      </button>
    </div>
  );
};


interface propsSecondStep {
  whoYouAre: string;
  stageRegister: number;
  setStageRegister: Dispatch<SetStateAction<number>>
  setStage: CallableFunction
  validProvider: any
  setValidProvider: any
}
export const SecondStep: FC<propsSecondStep> = (props) => {
  const { linkMedia, preregister } = AuthContextProvider()
  return (
    <div className={`gap-4 flex flex-col justify-center items-center w-full ${linkMedia && "space-y-12"}`}>
      <LogoFullColor />
      {!linkMedia && <>
        <Providers setStage={props.setStage} whoYouAre={!preregister ? props?.whoYouAre : preregister.role[0]} validProvider={props.validProvider} setValidProvider={props.setValidProvider} />
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
