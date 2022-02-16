import Link from "next/link";
import router from "next/router";
import { FC, MouseEventHandler,useState } from 'react';
import DatosEmpresa from '../EmpresaActualizar/DatosEmpresa'
import LocalizacionMapa from "./LocalizacionMapa";
import PreguntasFrecuentes from '../EmpresaRegistro/PreguntasFrecuentes'
import Galeria from '../EmpresaRegistro/GaleriaFotos'
import Promociones from "../EmpresaRegistro/Promociones";
import AñadirVideo from "./AñadirVideo";
import AñadirRedes from "./AñadirRedes";
import PerfilFotoEmpresa from "../EmpresaActualizar/PerfilFotoEmpresa"

const Opciones = ["Datos de la empresa", "Localización y mapa", "Preguntas Frecuentes", "Promociones", "Fotos", "Videos", "Redes Sociales"]
type Item = {
    title: string;
    route: string;
}

export const MenuEmpresa: FC <{onClick:CallableFunction}> = ({onClick}) => {
    return <div >
            <ul className="space-y-5 text-center mt-5 bg-white p-5 rounded-lg">
                {Opciones?.map((item, idx) =>(
                    <li  key={idx} onClick={()=> onClick(idx)} >
                        <button>{item}</button>
                    </li>
                ))}
            </ul>
    </div>
}

export const Menu = () => {
    const [isActive,setActive] = useState(0)
    const components=[
        {component:<DatosEmpresa/>, id : 0 },
        {component:<LocalizacionMapa/>, id : 1},
        {component:<PreguntasFrecuentes/>, id : 2},
        {component:<Promociones/>,id: 3},
        {component:<Galeria/>,id:4},
        {component:<AñadirVideo/>, id: 5},
        {component:<AñadirRedes/>, id: 6}
       
    ]
    const handleClickOption = (idx :number) =>{
        setActive(idx)
    }

    return <div className="flex flex-row justify-center space-x-7">
            <div>
                <PerfilFotoEmpresa/>
                <MenuEmpresa onClick={handleClickOption} />
            </div>
            <div>
                {components[isActive].component}
            </div>
    </div>
}