import Link from "next/link";
import router from "next/router";
import { FC, MouseEventHandler } from 'react';
import {Menu} from './Menu'
import { useState } from 'react';
import {Escaparate, Solicitudes, Telefono, SitioWeb} from '../EmpresaInicio/Tablero'

export const Header = ( ) =>{
    return <div className="bg-white rounded-lg shadow-lg flex flex-row p-10 space-x-5">
        <div className="text-center">
            <img src="" alt="imagen de carta" />
            <h1 className="text-primary text-xl">Solicitudes recibidas</h1>
            <h1>Los últimos 12 meses</h1>
        </div>

        <div className="text-center">
            <img src="" alt="imagen de reloj" />
            <h1 className="text-primary text-xl">Tiempo de respuesta</h1>
            <h1>Los úlltimos 3 meses</h1>
        </div>

        <div className="text-center">
            <img src="" alt="imagen de opiniones" />
            <h1 className="text-primary text-xl">Opiniones</h1>
            <h1>Los úlltimos 12 meses</h1>
        </div>

        <div className="text-center">
            <img src="" alt="imagen de ojo" />
            <h1 className="text-primary text-xl">Impresiones de tu escaparate</h1>
            <h1>Los úlltimos 12 meses</h1>
        </div >

        <div className="text-center">
            <img src="" alt="imagen de telefono" />
            <h1 className="text-primary text-xl">Clics en ver teléfono</h1>
            <h1>Los úlltimos 12 meses</h1>
        </div>
    </div>
}

export const Panel =( ) => {
    const [isActive, setActive] = useState(0)
    const components = [
       {component:<Escaparate/>, id : 0 },
       {component:<Solicitudes/>, id : 1 },
       {component:<Telefono/>, id : 2 },
       {component:<SitioWeb/>, id : 2 },
    ]
    const handleClickOption = (idx : number) => {
        setActive(idx)
    }

    return <div className="">
        <h1 className="text-primary text-2xl mb-5">Estadísticas</h1>
       <div className="bg-white rounded-lg shadow-lg p-2 flex flex-row space-x-10">
            <div>
                <Menu onClick={handleClickOption} />
            </div>
            <div className="p-5">
                {components[isActive].component}
            </div>
       </div>
    </div>
}

export const PanelDerecho = () => {
    return <div className="bg-white rounded-lg shadow-lg mt-14 p-5 space-y-5 ">
            <div>
                <h1 className="text-primary text-2xl">¡Sigue estas recomendaciones!</h1>
                <h1>Manten tu escaparate actualizado</h1>
            </div>
            <div>
                <h1><img src="" alt="check" /> Comparte tus mejores </h1>
                <h1><img src="" alt="check" /> Actualiza las preguntas frecuentes </h1>
                <h1><img src="" alt="check" /> Activa tus promociones </h1>
                <h1><img src="" alt="check" /> Comparte tus mejores </h1>
                <h1><img src="" alt="check" /> Comportelo en otras plataformas</h1>
            </div>
            <button>Actualizar</button>
    </div>
}