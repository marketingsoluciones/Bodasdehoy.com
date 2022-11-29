import { AuthContextProvider } from '../context'
import React, { FC } from 'react'
import { ChatIcon, CrossIcon, UserIcon } from './Icons'
import { useHover } from '../hooks/useHover';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const ButtonMessages: FC = () => {

    const [hoverRef, isHovered] = useHover()
    const router = useRouter()
    const { user } = AuthContextProvider()
    const handleClick = async () => {
        router.push("/login")
    }
    return (
        <>
            <div className='cursor-pointer flex fixed md:bottom-6 bottom-24 right-1 md:right-6 z-30 items-center justify-center'>
                <ChatIcon className='md:w-[60px] md:h-[60px] w-[40px] h-[40px]' />
            </div>
        </>
    )
}