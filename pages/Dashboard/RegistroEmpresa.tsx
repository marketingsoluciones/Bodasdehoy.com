import {MultiFormulario }from "../../components/Dasboard/EmpresaRegistro/RegistroEmpresa"
import GaleriaFoto from "../../components/Dasboard/EmpresaRegistro/GaleriaFotos"
import PreguntasFrecuentes from "../../components/Dasboard/EmpresaRegistro/PreguntasFrecuentes"
import Promociones from "../../components/Dasboard/EmpresaRegistro/Promociones"

const CrearEmpresa = () => {
    return <div className=" max-w-screen-lg mx-auto inset-x-0 w-full space-y-10" >
        <header className="flex flex-row mt-5 justify-center  ">
            <h1>1</h1>
            <h1>2</h1>
            <h1>3</h1>
            <h1>4</h1> 
        </header>
        
        <div className="flex flex-col  space-y-10" >   {/* body */}
            <Promociones/>
            {/* <GaleriaFoto/> */}
            {/* <PreguntasFrecuentes/> */}
            {/* <MultiFormulario/> */}
        </div>
    </div>
}

export default CrearEmpresa