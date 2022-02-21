import { Header, Panel, PanelDerecho} from "../../components/Dasboard/EmpresaInicio/Inicio"

const EmpresaInicio = () => {

    return <div className=" max-w-screen-lg mx-auto inset-x-0 w-full space-y-10 mt-5 mb-5">
        
        <Header/>

        <div className="flex flex-row space-x-2">
            <div>
                <Panel />
            </div>
            <div >
                <PanelDerecho/>
            </div>
            
        </div>
        
    </div>
}
export default EmpresaInicio