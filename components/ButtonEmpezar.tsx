import { AuthContextProvider } from '../context'
import React from 'react'
import { CrossIcon, UserIcon } from './Icons'
import { useHover } from '../hooks/useHover';
import { useRouter } from 'next/router';

const ButtonEmpezar = () => {

    const [hoverRef, isHovered] = useHover()

    const router = useRouter()

    const {user} = AuthContextProvider()

    const handleClick = async () => {
        
       
            router.push("/login")
      
    }

  return (
    <>
    {(()=>{
        if (!user) {
            return (
                <div className="flex cursor-pointer bg-primary font-semibold rounded-full w-max px-4 text-xs py-2 text-color-base fixed md:bottom-20 bottom-44 right-1 md:right-6 z-30 items-center gap-2  transition-all duration-500 shadow-lg  ">
                    
                    
                            {/* <button className=" fixed bg-primary text-white text-sm py-2  px-4 rounded-full w-full mt-10 "> */}
                                Empezar Gratis
                          {/*   </button> */}
                        
                    
                </div>
            )
        } else {
        
        }

    })()}

    {/* <div ref={hoverRef} onClick={handleClick} className={`hidden sm:flex cursor-pointer bg-color-base font-semibold rounded-full w-max px-4 text-xs py-2 text-primary fixed bottom-10 right-6 z-30 items-center gap-2  transition-all duration-500 shadow-lg`}>
        <CrossIcon/>
        Publica tu empresa aquí
    </div> */}
    </>
  )




   /*  const user = AuthContextProvider()
    return (
        <>        
            {
                (() => {
                    if (!user) {
                        return (
                            <div className="flex fixed -bottom-10 right-6 w-full z-30  ">
                                <Link href={"/login"} passHref>
                                
                                        <button className=" fixed bg-primary text-white text-sm py-2  px-4 rounded-full w-full mt-10 ">
                                            Empezar
                                        </button>
                                    
                                </Link>
                            </div>
                        )
                    } else {
                    
                    }
                })()}
        </>
    ) */
}

export default ButtonEmpezar 