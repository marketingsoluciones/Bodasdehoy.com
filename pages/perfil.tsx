import { Configuraciones } from "../components/perfil/CuadroDeAccion/Configuraciones"
import { Favoritos } from "../components/perfil/CuadroDeAccion/Favoritos"
import { Guardados } from "../components/perfil/CuadroDeAccion/Guardados"
import { Mensajeria } from "../components/perfil/CuadroDeAccion/Mensajeria"
import { MiPerfil } from "../components/perfil/CuadroDeAccion/MiPerfil"
import { Notificaciones } from "../components/perfil/CuadroDeAccion/Notificaciones"
import { PerfilFoto } from "../components/perfil/PerfilFoto"
import { PerfilOpciones } from "../components/perfil/PerfilOpciones"


const perfil = () => {
    return (
        <section className="flex flex-row mt-7 justify-center"> 
            <div className="     ">
                <PerfilFoto/>
                <PerfilOpciones/>
            </div>
            <div className=" w-3/5 ">
                {/* <MiPerfil/> */}
               {/*  <Notificaciones/> */}
                {/* <Mensajeria/> */}
                {/* <Favoritos/> */}
                {/* <Guardados/> */}
                <Configuraciones/>
            </div>
            
        </section>
    )
}
export default perfil
