import Link from "next/link";
import router from "next/router";

const Opciones ={
    ["Mi Perfil"]:false,
    ["Notificaciones"]:false,
    ["Favoritos"]:false,
    ["Guardados"]:false,
    ["Mensajería"]:false,
    ["Configuración"]:false,
};
type Item = {
    title: string;
    route: string;
}


export const PerfilOpciones = () =>{
    return(
        <div className="bg-white  ">
            <div>
                <ul className="space-y-4 p-7">
                    <li className="border-b-2">Mi Perfil</li>
                    <li className="border-b-2">Notificaciones</li>
                    <li className="border-b-2">Favoritos</li>
                    <li className="border-b-2">Guardados</li>
                    <li className="border-b-2">Mensajería</li>
                    <li className="">Configuración</li>
                </ul>
            </div>
        </div>
    )
}