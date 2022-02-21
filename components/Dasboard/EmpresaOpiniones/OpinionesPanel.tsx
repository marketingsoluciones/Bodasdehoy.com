import {FC, useState} from 'react'
import { PedirOpiniones } from './PedirOpiniones'
import { PedirMisOpiniones } from './MisOpiniones'
import { Pegatinas } from './PegatinaRecomendado'

const Opciones = ["Pedir Opiniones", "Mis Opiniones", "Pegatina Recomendado"]

export const OpinionesMenu: FC <{onClick:CallableFunction}> = ({onClick}) => {
    return <div>
            <ul className='space-y-5 bg-white p-5 mt-5 w-48'>
                {Opciones?.map((item,idx)=>(
                    <li key={idx} onClick={()=> onClick(idx)}>
                        <button>{item}</button>
                    </li>
                ))}
            </ul>
    </div>
}

export const Contenido = () => {
    const [isActive,setActive] = useState(0)
    const components=[
        {component: <PedirOpiniones/>, id : 0 },
        {component: <PedirMisOpiniones/>, id : 1 },
        {component: <Pegatinas/>, id : 2 },
    ]
    const handleClickOption = ( idx : number ) =>{
        setActive(idx)
    }

    return <div className="flex flex-row justify-center space-x-7">
        <div >
            <h1 className="text-primary text-2xl text-bold">Opiniones</h1>
            <OpinionesMenu onClick={handleClickOption}/>
        </div>
        <div>
            {components[isActive].component}
        </div>
    </div>

}