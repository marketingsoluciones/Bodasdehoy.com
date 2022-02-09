import Link from "next/link";
import router from "next/router";
import { FC, MouseEventHandler } from 'react';

const Opciones = ["Impresiones a tu escaparate", "Solicitudes recibidas","Click en ver telefono", "Click en ver sitio web" ]
type Item ={
    title: string;
    route: string;
}

export const Menu : FC <{onClick: CallableFunction}>=({onClick}) => {
    return <div>
            <div className="bg-color-base p-3 rounded-lg">
                    <ul>
                        {Opciones?.map((item, idx) => (
                            <li className=" mb-2 text-center " key ={idx} onClick={() => onClick(idx)}>
                                <button className="h-28 bg-white w-52 rounded-lg ">{item}</button>
                            </li>
                         ))}
                    </ul>
            </div>
        </div>
}