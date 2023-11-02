import Link from "next/link"
import { Dispatch, FC, SetStateAction, useMemo } from "react"
import ClickAwayListener from "react-click-away-listener"
import { ArrowLeft, Icon036Profile, CarIcon as SettingsIcon, UserIcon } from "../Icons"
import ModalReclarEmpresa from '../ReclamarEmpresa/ModalReclamarEmpresa'
import { useState } from 'react'
import { ButtonClose2 } from '../../components/Inputs/ButtonClose2'
import { AuthContextProvider, LoadingContextProvider } from '../../context';
import { PiUserPlusLight } from "react-icons/pi"
import { useRouter } from "next/router"
import Cookies from "js-cookie"
import { getAuth, signOut } from "firebase/auth"
import { useToast } from "../../hooks/useToast"
import { MdLogout } from "react-icons/md"
import { BiBell } from "react-icons/bi"
import { RiLoginBoxLine } from "react-icons/ri"

type ItemNav = {
    title: string
    route?: string
    icon: any
    user: string
    onClick?: any
}
// setShowSidebar showSidebar
interface propsSidebar {
    setShowSidebar: Dispatch<SetStateAction<boolean>>
    showSidebar: boolean
}
// menu hamburguesa en el mobile 
export const Sidebar: FC<propsSidebar> = ({ setShowSidebar, showSidebar }) => {

    const [showForm, setShowForm] = useState(false)
    const { user } = AuthContextProvider()
    const router = useRouter()
    const toast = useToast()


    const ListaNavbar: ItemNav[] = [
        {
            title: "Organiza tu Boda",
            icon: "",
            route: "/welcome-app",
            user: "all"
        },
        {
            title: "Novia",
            icon: "",
            route: "/categoria/novias",
            user: "all"
        },
        {
            title: "Novio",
            icon: "",
            route: "/categoria/novios",
            user: "all"
        },
        {
            title: "Proveedores",
            icon: "",
            route: "/categoria/proveedores",
            user: "all"
        },
        {
            title: "Lugares para bodas",
            icon: "",
            route: "/categoria/lugares-para-bodas",
            user: "all"
        },
        {
            title: "Magazine",
            icon: "",
            route: "/magazine",
            user: "all"
        },
        {
            title: "Mis post",
            icon: "",
            onClick: async () => {
                const path = `${window.origin.includes("://test.") ? process.env.NEXT_PUBLIC_CMS?.replace("//", "//test") : process.env.NEXT_PUBLIC_CMS}/InfoPage/publicaciones`
                await router.push(path ?? "")
            },
            user: "loged"
        },
        {
            title: "Mis empresas",
            icon: "",
            onClick: async () => {
                const path = window.origin.includes("://test.") ? process.env.NEXT_PUBLIC_CMS?.replace("//", "//test") : process.env.NEXT_PUBLIC_CMS
                await router.push(user?.role?.includes("empresa") ? path ?? "" : "/info-empresa")
            },
            user: "all"
        },
        {
            title: "Mis eventos",
            icon: "",
            route: "/welcome-app",
            user: "all"
        },
        {
            title: "Notificaciones",
            icon: <BiBell className="w-6 h-6" />,
            route: "/configuracion",
            user: "loged"
        },
        {
            title: "Perfil",
            icon: <UserIcon className="w-6 h-6" />,
            route: "/configuracion",
            user: "loged"
        },
        {
            title: "Iniciar sesión",
            icon: <RiLoginBoxLine className="w-6 h-6" />,
            route: `/login?d=${router.asPath.slice(1, router.asPath.length)}`,
            user: "guest"
        },
        {
            title: "Registrarse",
            icon: <PiUserPlusLight className="w-6 h-6" />,
            route: `/login?q=register&d=${router.asPath.slice(1, router.asPath.length)}`,
            user: "guest"
        },
        {
            title: "Cerrar sesión",
            icon: <MdLogout className="w-6 h-6" />,
            onClick: () => {
                router.push("/")
                Cookies.remove("sessionBodas", { domain: process.env.NEXT_PUBLIC_DOMINIO });
                Cookies.remove("idToken", { domain: process.env.NEXT_PUBLIC_DOMINIO });
                signOut(getAuth());
                toast("success", "Gracias por su visita")
            },
            user: "loged"
        },
    ]

    const valirUser = user?.displayName ? "loged" : "guest"
    const ListaNavbarFilter = ListaNavbar.filter(elem => elem?.user === valirUser || elem?.user === "all")

    const handleOnClip = async (item: any) => {
        try {
            setShowSidebar(!showSidebar)
            if (item?.onClick) {
                item.onClick()
                return
            }
            await router.push(item?.route ?? "")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {showForm ? (
                <ModalReclarEmpresa set={setShowForm} state={showForm} />
            ) : null}
            <ClickAwayListener onClickAway={() => showSidebar && setShowSidebar(false)}>
                <div className={`bg-white w-5/6 opacity-95 z-[60] shadow-lg fixed top-0 left-0 h-screen md:hidden transform transition duration-300 ${showSidebar ? "translate-x-0" : "-translate-x-full"} `}>
                    <div className="relative w-full h-full">
                        <ArrowLeft className="absolute w-6 h-6 text-white cursor-pointer translate-x-5 translate-y-5" onClick={() => setShowSidebar(!showSidebar)} />
                        <div className="bg-primary h-[160px] flex flex-col  items-center justify-center text-sm text-gray-500">
                            <img
                                src={user?.photoURL ?? "/placeholder/user.png"}
                                className="object-cover w-16 h-16 rounded-full"
                                alt={user?.displayName ?? ""}
                            />
                            <p className="min-h-[36px] text-lg text-white pt-2">
                                {user?.displayName
                                    ? <span className="capitalize">{user?.displayName}</span>
                                    : <div className="text-sm">
                                        <span onClick={async () => { await router.push(`/login?d=${router.asPath.slice(1, router.asPath.length)}`) }}>
                                            Iniciar sesión
                                        </span>

                                        <span onClick={async () => { await router.push(`/login?q=register&d=${router.asPath.slice(1, router.asPath.length)}`) }} className="m-1">
                                            / Registrarse
                                        </span>
                                    </div>}
                            </p>
                        </div>

                        <ul className="flex flex-col pl-6 pt-2">
                            {ListaNavbarFilter.map((item, idx) => (
                                // eslint-disable-next-line @next/next/link-passhref
                                <li
                                    key={idx}
                                    onClick={() => { handleOnClip(item) }}
                                    className="flex text-primary  py-2 font-display text-md items-center justify-start w-full cursor-pointer hover:text-gray-300 transition ">
                                    <button className="flex gap-3 capitalize" >{item.icon} {item.title}</button>
                                </li>
                            ))}
                            {/* {ListaNavbar.map((item, idx) => (
                                    <Link key={idx} href={item.route} passHref>
                                        <p className="flex text-primary  py-2 font-display text-md items-center justify-start w-full cursor-pointer hover:text-gray-300 transition">{item.title}</p>
                                    </Link>
                                ))} */}
                        </ul>

                        <p className="text-xs text-primary font-bold absolute h-max bottom-20 mx-auto w-max inset-x-0">Bodasdehoy.com</p>
                    </div>
                </div>
            </ClickAwayListener>
        </>
    )
}


