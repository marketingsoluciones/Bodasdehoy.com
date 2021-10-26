import { FC, MouseEventHandler } from "react"
import { CrossIcon } from "../Icons"

type sizesButton = {
    small : string,
    medium : string,
    big : string
}

const dicSize: sizesButton = {
    small : "w-7 h-7",
    medium: "w-10 h-10",
    big : "w-12 h-12"
}

const iconSize: sizesButton = {
    small : "w-3 h-3",
    medium: "w-4 h-4",
    big : "w-9 h-9"
}

interface propsButton {
    onClick? : MouseEventHandler
    size? : keyof typeof dicSize
}
export const PlusButton : FC <propsButton> = ({onClick, size = "small"}) => {
    
    return (
        <button onClick={onClick} className={`bg-primary rounded-full ${dicSize[size]} flex items-center justify-center right-0 left-0 mx-auto transform translate-y-3 absolute bottom-0 text-white`}><CrossIcon className={iconSize[size]}/></button>
    )
}

