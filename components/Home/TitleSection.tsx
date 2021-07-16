import { FC } from "react"

interface propsTitle {
    principal:string
    secondary:string
}
const TitleSection :FC <propsTitle> = ({principal, secondary}) => {
    return (
        <h2 className="text-primary font-bold text-2xl">
        {principal} <span className="font-light">{secondary}</span>
      </h2>
    )
}

export default TitleSection
