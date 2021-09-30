import Link from "next/link"
import { FC, useState } from "react"
import ClickAwayListener from "react-click-away-listener"
import { SettingsIcon } from "./icons"

type ItemNav = {
    title: string
    route: string

}

interface propsSidebar {
    set: any
    state : boolean
}

const Sidebar: FC <propsSidebar> = ({set, state}) => {
    
    const FirstList: ItemNav[] = [
        { title: "Mi boda", route: "/" },
        { title: "Novia", route: "/" },
        { title: "Novio", route: "/" },
        { title: "Proveedores", route: "/" },
        { title: "Lugares para bodas", route: "/" },
    ]

    const SecondaryList: ItemNav[] = [
        { title: "Magazine", route: "/" },
        { title: "Comunidad", route: "/" },
        { title: "Podcast", route: "/" },
        { title: "Promociones", route: "/" },
        { title: "Gestor de invitados", route: "/" },
    ]
    return (
        <ClickAwayListener onClickAway={() => state && set(false)}>
        <div className={`fixed bg-white shadow-lg z-30 h-screen w-3/4 transform transition  ${state ? "translate-x-0 ease-in" : "-translate-x-full ease-out"} `}>
            <div className="relative w-full h-full">
                <div className="p-10">
                    <p className="text-primary text-md font-light pb-4">Accede <span className="text-tertiary">o</span> Regístrate</p>
                    <BlockButtons list={FirstList} />
                    <BlockButtons list={SecondaryList} />
                    <div className="w-full py-4 border-t border-base gap-2 flex flex-col items-center">
                        <p className="text-tertiary">Nuestro contacto</p>
                        <button className="focus:outline-none bg-primary text-white text-sm py-1 w-max px-4 rounded-full"> Acceso a empresas</button>
                    </div>
                </div>
                <div className="border-t border-gray-100 py-4 w-full px-5 flex gap-2 items-center justify-start absolute bottom-0 right-0">
                    <SettingsIcon className="text-gray-200 w-5 h-5" />
                    <p className="text-gray-200">Configuración</p>
                </div>
            </div>
        </div>
        </ClickAwayListener>
    )
}

export default Sidebar

interface propsBlock {
    list: ItemNav[]
}
const BlockButtons: FC<propsBlock> = ({ list }) => {
    return (
        <div className="w-full py-4 border-t border-base gap-2 flex flex-col">
            {list.map((item, idx) => (
                <Link key={idx} href={item.route} passHref>
                    <p className="text-tertiary">{item.title}</p>
                </Link>
            ))}
        </div>
    )
}

