import Link from "next/link"
import router from "next/router"
import { useState } from "react"
import { useEffect } from "react"
import { FC } from "react"
import { ArrowIcon } from "./icons"

interface propsBreadCumbs {
    className? : string
}
const BreadCumbs: FC <propsBreadCumbs> = ({className}) => {
    const [niveles, setNiveles] = useState<string[][]>([])

    useEffect(() => {
        const niveles: any = Object.entries(router.query)
        setNiveles(niveles)
        console.log(router)
    }, [])

    return (
        <div className={`lg:max-w-screen-lg 2xl:max-w-screen-xl mx-auto inset-x-0 flex items-center w-full text-sm text-gray-200 capitalize font-light ${className}`}>
            <Link href={`/`} passHref>
                    <span className="w-max flex items-center">
                    <p className="px-1">Inicio</p>
                    <ArrowIcon className="w-4 h-4" />
                    </span>
                </Link>
            {niveles?.map((item, idx) => (
                <Link key={idx} href={`/${item[1]}`} passHref>
                    <span className="w-max flex items-center">
                    <p className="px-1">{item[1]}</p>
                    <ArrowIcon className="w-4 h-4" />
                    </span>
                </Link>
            ))}
        </div>
    )
}

export default BreadCumbs
