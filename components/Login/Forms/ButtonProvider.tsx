import { FC } from "react";
import { LoadingContextProvider } from "../../../context";
import { useToast } from "../../../hooks/useToast";
import { useAuthentication } from "../../../utils/Authentication";
import { EmailIcon, GoogleIcon } from "../../Icons";

interface propsButtonProvider {
  provider: string
  handle: any
  icon: any
  setStage: any
  whoYouAre: string
}

export const ButtonProvider: FC<propsButtonProvider> = ({ provider, handle, icon, setStage, whoYouAre }) => {
  const { signIn } = useAuthentication();
  const toast = useToast();
  const { setLoading } = LoadingContextProvider();
  const handleClick = async (provider: any) => {
    console.log("click ButtonProvider", setStage)
    try {
      signIn({ type: "provider", payload: provider, setStage, whoYouAre });
    } catch (error) {
      setLoading(false);
      toast("error", JSON.stringify(error));
      console.log("este es un error en el onClick de los listProviders", error);
    }
  };
  return (
    <>
      <div className="*bg-blue-200">
        <span className="*bg-white flex m-2 rounded  ">
          <button onClick={() => handleClick(handle)} className="*bg-red-200 rounded-md border-[1px] border-gray-300 hover:border-blue-300 hover:border-2 w-[250px] h-[40px] flex items-center" >
            {icon}
            <p className="*bg-blue-300 w-[215px] font-['Roboto'] text-[14px]">{`Continúa con ${provider}`}</p>
          </button>
        </span>
      </div>
    </>
  )

}