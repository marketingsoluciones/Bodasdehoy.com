import { FC, MouseEventHandler } from "react"

interface propsButtonClose2 {
    onClick? : MouseEventHandler
}
export const ButtonClose2 : FC <propsButtonClose2> = ({onClick}) => {
    return (
        <button 
            className=" pb-3.5 text-gray-400 text-xl font-light transform scale-x-125 transition hover:rotate-180 duration-1000 hover:text-gray-300"
            onClick={onClick}
            >
            X
        </button>
    )
}