import { FC, MouseEventHandler } from "react"

const colors = {
    white : "bg-white border-primary text-primary hover:bg-primary hover:text-white",
    primary : "bg-primary border-primary text-white hover:bg-white hover:text-primary"
}
const types = {
    submit : "",
    button : ""
}
interface propsButton {
    onClick? : MouseEventHandler<HTMLButtonElement>
    color?: keyof typeof colors,
    className? : string,
    text : string,
    type? : keyof typeof types
}
const ButtonComponent : FC <propsButton> = ({onClick, color = "primary", className, text, type = "button"}) => {
    return (
            <button onClick={onClick} type={type} className={`px-5 py-2 border w-max rounded-full transition ${colors[color]} ${className}`}>{text}</button>
    )
}

export default ButtonComponent
