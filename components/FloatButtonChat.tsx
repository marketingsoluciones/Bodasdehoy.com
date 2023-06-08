import { AuthContextProvider, ChatContextProvider } from '../context'
import React from 'react'
import { ChatpIcon } from './Icons'

export const FloatButtonchat = () => {
    const { setShow, show } = ChatContextProvider()
    const { user } = AuthContextProvider()
  
    return (
        <>
            {(() => {
                if (user) {
                    return (
                        <div className=" md:hidden flex cursor-pointer bg-primary font-semibold rounded-full w-max px-4 text-xs py-2 text-color-base fixed bottom-10 right-3 md:right-6 z-30 items-center gap-2  transition-all duration-500 shadow-lg">
                            <button  onClick={() => {
                                if (user) {
                                    setShow(!show)
                                } else {
                                   /*  toast("warning", "Debes iniciar sesión para ver tus chats") */
                                }
                            }}>
                                {/* <img src="/chat.png" alt="chats" className="w-8 h-9" /> */}
                                <ChatpIcon/>
                            </button>
                        </div>
                    )
                }
            })()}
        </>
    )
}

