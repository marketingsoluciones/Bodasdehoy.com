import { AuthContextProvider } from '../context'
import React, { FC } from 'react'
import { ChatIcon } from './Icons'
import { useHover } from '../hooks/useHover';
import { useRouter } from 'next/router';

export const ButtonMessages: FC = () => {

    const [hoverRef, isHovered] = useHover()
    const router = useRouter()
    const { user } = AuthContextProvider()
    const handleClick = async () => {
        router.push("/login")
    }
    return (
        <>
            <div className='hidden sm:flex cursor-pointer fixed bottom-36 right-1 md:right-6 z-30 items-center justify-center'>
                <ChatIcon className='md:w-[60px] md:h-[60px] w-[40px] h-[40px]' />
            </div>
        </>
    )
}