import { FC, MouseEventHandler } from "react"

const colors = {
    white : "bg-white border-primary text-primary hover:opacity-95",
    primary : "bg-primary border-primary text-white hover:opacity-95"
}
const types = {
    submit : "",
    button : "",
    reset : ""
}
interface propsButton {
    onClick? : MouseEventHandler<HTMLButtonElement>
    color?: keyof typeof colors,
    className? : string,
    type? : keyof typeof types,
    
}
export const ButtonComponent : FC <propsButton> = ({color = "primary", className, type = "button", children, ...props}) => {
    return (
            <button type={type} className={`px-5 py-2 border w-max rounded-full transition flex gap-2 items-center ${colors[color]} ${className}`}{...props}>{children}</button>
    )
}

