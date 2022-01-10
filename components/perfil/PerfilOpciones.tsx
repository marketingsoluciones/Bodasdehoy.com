import Link from "next/link";
import router from "next/router";
import { FC, MouseEventHandler } from 'react';

const Opciones = ["Mi perfil" , "Notificaciones", "Favoritos", "Guardados", "Mensajería", "Configuración"]
type Item = {
    title: string;
    route: string;
}


export const PerfilOpciones : FC <{onClick : CallableFunction}> = ({onClick}) =>{
    
    return(
        <div className="bg-white  ">
            <div>
                <ul className="space-y-4 p-7">
                    {Opciones?.map((item, idx) => (
                        <li key={idx} className="border-b-2" onClick={() => onClick(idx)}>
                            <button>{item}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}