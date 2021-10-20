import { FC } from "react"

const sizes = {
    sm : "text-sm",
    md : "text-md",
    lg : "text-lg",
    xl : "text-xl",
    "2xl" : "text-2xl"
}
interface propsTitle {
    principal:string
    secondary:string
    size?: keyof typeof sizes
    className?: string
}
const TitleSection :FC <propsTitle> = ({principal, secondary, size, className}) => {
    return (
        <h2 className={`text-primary ${size && sizes[size]} font-bold  px-5 md:px-0 z-20 relative ${className}`}>
        {principal} <span className="font-light">{secondary}</span>
      </h2>
    )
}

export default TitleSection
