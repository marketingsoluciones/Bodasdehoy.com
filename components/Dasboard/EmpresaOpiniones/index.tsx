import {FC, useState} from 'react'
import { PedirOpiniones } from './PedirOpiniones'
import { PedirMisOpiniones } from './MisOpiniones'
import { Pegatinas } from './PegatinaRecomendado'

const Opciones = ["Pedir Opiniones", "Mis Opiniones", "Pegatina Recomendado"]

export const OpinionesMenu: FC <{onClick:CallableFunction}> = ({onClick}) => {
    return (
            <ul className='space-y-10 bg-white p-5 text-center col-span-1 h-max rounded-lg shadow-lg'>
                {Opciones?.map((item,idx)=>(
                    <li key={idx} onClick={()=> onClick(idx)}>
                        <button>{item}</button>
                    </li>
                ))}
            </ul>
    )
}

export const PanelOpiniones = () => {
    const [isActive,setActive] = useState(0)
    const components=[
        {component: <PedirOpiniones/>, id : 0 },
        {component: <PedirMisOpiniones/>, id : 1 },
        {component: <Pegatinas/>, id : 2 },
    ]
    const handleClickOption = ( idx : number ) =>{
        setActive(idx)
    }

    return <div className="grid grid-cols-5 gap-10 ">
            <OpinionesMenu onClick={handleClickOption}/>
            {components[isActive].component}
    </div>

}