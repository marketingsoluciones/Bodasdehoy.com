import { Configuraciones } from "../components/perfil/CuadroDeAccion/Configuraciones"
import { Favoritos } from "../components/perfil/CuadroDeAccion/Favoritos"
import { Guardados } from "../components/perfil/CuadroDeAccion/Guardados"
import { Mensajeria } from "../components/perfil/CuadroDeAccion/Mensajeria"
import { MiPerfil } from "../components/perfil/CuadroDeAccion/MiPerfil"
import { Notificaciones } from "../components/perfil/CuadroDeAccion/Notificaciones"
import { PerfilFoto } from "../components/perfil/PerfilFoto"
import { PerfilOpciones } from "../components/perfil/PerfilOpciones"
import { useState } from 'react';


const Perfil = () => {
    const [isActive, setActive] = useState(0)
    const components = [
        {component: <MiPerfil />, id: 0},
        {component: <Notificaciones/>, id: 1},
        {component: <Favoritos/>, id: 2},
        {component: <Guardados/>, id: 3},
        {component: <Mensajeria/>, id: 4},
        {component: <Configuraciones/>, id: 5},
    ]
    
    const handleClickOption = (idx : number) => {
        setActive(idx)
    }
    
    return (
        <section className="md:flex  justify-center max-w-screen-lg mx-auto md:inset-x-0 w-full mt-7"> 
            <div className="flex justify-center md:flex-col md:w-1/5 md:justify-start  ">
                <PerfilFoto/>
                <div className="hidden md:block">
                    <PerfilOpciones onClick={handleClickOption}/>
                </div>                
            </div>
            <div className="md:w-4/5">
              {components[isActive].component}
            </div>
            
        </section>
    )
}
export default Perfil
