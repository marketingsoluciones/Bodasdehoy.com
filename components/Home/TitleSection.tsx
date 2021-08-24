import { FC } from "react"

interface propsTitle {
    principal:string
    secondary:string
}
const TitleSection :FC <propsTitle> = ({principal, secondary}) => {
    return (
        <h2 className="text-primary font-bold text-2xl px-5 md:px-0 z-20 relative">
        {principal} <span className="font-light">{secondary}</span>
      </h2>
    )
}

export default TitleSection
