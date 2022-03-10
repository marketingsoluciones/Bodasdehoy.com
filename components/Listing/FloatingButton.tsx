import { FC, MouseEventHandler } from "react"
import { CrossIcon } from "../Icons"

interface propsFloatingButton {
    onClick : MouseEventHandler
}
const FloatingButton : FC <propsFloatingButton> = (props) => {
    return (
        <button className="hidden bg-primary p-4 w-40 h-10 fixed rounded-xl bottom-4 right-4 text-white flex items-center justify-center gap-2 shadow z-50"{...props}>
            <CrossIcon className="w-3 h-3" />
            Contactar
        </button>
    )
}

export default FloatingButton
