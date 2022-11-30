import { AuthContextProvider } from '../context'
import React from 'react'
import { CrossIcon, UserIcon } from './Icons'
import { useHover } from '../hooks/useHover';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ButtonEmpezar = () => {
    const [hoverRef, isHovered] = useHover()
    const router = useRouter()
    const { user } = AuthContextProvider()
    const handleClick = async () => {
        router.push("/login")
    }
    return (
        <>
            {(() => {
                if (!user) {
                    return (
                        <div className="flex cursor-pointer bg-primary font-semibold rounded-full w-max px-4 text-xs py-2 text-color-base fixed md:bottom-24 bottom-32 right-1 md:right-6 z-30 items-center gap-2  transition-all duration-500 shadow-lg">
                            <Link href={`/login?d=${router.asPath.slice(1, router.asPath.length)}`} passHref>
                                <a>
                                    Empezar Gratis
                                </a>
                            </Link>
                        </div>
                    )
                }
            })()}
        </>
    )
}

export default ButtonEmpezar 