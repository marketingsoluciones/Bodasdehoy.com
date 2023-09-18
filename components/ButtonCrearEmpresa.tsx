import React from 'react'
import { CrossIcon } from './Icons'
import { AuthContextProvider, SidebarContextProvider } from '../context';
import Link from 'next/link';

const ButtonCrearEmpresa = () => {
    const { user } = AuthContextProvider()
    const { showButtons } = SidebarContextProvider()

    const url = () => {
        const lowerCase = user?.role?.map((item: string) => item.toLowerCase())
        if (lowerCase?.includes("empresa")) {
            return `${process.env.NEXT_PUBLIC_CMS}/?d=busines`
        }
        return "/info-empresa"
    }


    if (showButtons) {
        return (
            <Link href={url()} >
                <div className={`hidden sm:flex cursor-pointer bg-color-base font-semibold rounded-full w-max px-4 text-xs py-2 text-primary fixed bottom-12 right-6 z-30 items-center gap-2  transition-all duration-500 shadow-lg`}>
                    <CrossIcon />
                    Publica tu empresa aquí
                </div>
            </Link>

        )
    }
    return (
        <>
        
        </>
    )
}

export default ButtonCrearEmpresa