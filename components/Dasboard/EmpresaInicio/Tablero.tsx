import { FC } from "react"


interface propsStatisticsInside {
    title: string,
    description : string
}
export const StatisticsInsideComponent : FC <propsStatisticsInside> = ({title, description, children}) => {
    return (
        <div className="flex flex-col">
            <h2 className="text-primary text-lg font-bold">{title}</h2>
            <small>{description}</small>
        <div>
            {children}
        </div>
    </div>
    )
}
