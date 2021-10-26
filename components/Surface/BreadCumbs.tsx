import Link from "next/link"
import router from "next/router"
import { useState } from "react"
import { useEffect } from "react"
import { FC } from "react"
import { ArrowIcon } from "../Icons"

interface propsBreadCumbs {
    className? : string
}
type Level = {
    title: string,
    route : string
}
export const BreadCumbs: FC <propsBreadCumbs> = ({className}) => {
    const [niveles, setNiveles] = useState<Level[]>([])

    useEffect(() => {
        const arr = router.asPath.split("/").slice(1).map((item,idx) => {
            return {title: item, route: "/"}
        })
        setNiveles(arr)
    }, [])

    return (
        <div className={`w-max flex items-center w-full text-sm text-gray-200 capitalize font-light py-10`}>
            <Link href={`/`} passHref>
                    <span className="w-max flex items-center">
                    <p className="px-1">Inicio</p>
                    <ArrowIcon className="w-4 h-4" />
                    </span>
                </Link>
            {niveles?.map(({title,route}, idx) => (
                <Link key={idx} href={route} passHref>
                    <span className="w-max flex items-center">
                    <p className={`px-1 ${idx === niveles.length - 1 ? "text-primary" : ""}`}>{title}</p>
                    {idx !== niveles.length - 1 && <ArrowIcon className="w-4 h-4" />} 
                    </span>
                </Link>
            ))}
        </div>
    )
}

