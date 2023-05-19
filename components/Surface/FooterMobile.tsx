import Link from "next/link"
import { Icon } from "./Footer"
import { FacebookIcon, InstagramIcon, PinterestIcon, YoutubeIcon } from "../Icons"

type itemFooter = {
    title: string,
    route: string,
    bar?: boolean
}
export const FooterMobile = () => {
    const List: itemFooter[] = [
        { title: "Tarifas y condiciones generales", route: "/tarifas-y-condiciones-generales", bar: true },
        { title: "Privacidad", route: "/privacidad" },
        { title: "Condiciones proveedores", route: "/condiciones-proveedores", bar: true },
        { title: "Cookies", route: "/cookies" },
    ]
    return (
        <div className="md:hidden bg-color-base w-full pb-8">
            <div className="px-5 mx-auto inset-x-0">
                <div className="border-b border-primary pt-10 pb-4">
                    <Link
                        href={"/"}
                        passHref
                    >
                        <img src="/logo.webp" alt={"Logo bodasdehoy.com"} className="h-5 object-contain object-center" />
                    </Link>
                </div>
                <div className="w-full px-5 mx-auto inset-x-0 py-2 flex gap-2 flex-wrap justify-center pt-4">
                    {List.map(({ title, route, bar = false }, idx) => (
                        <Link key={idx} href={route} passHref>
                            <p className={`text-xs text-tertiary ${bar ? " pr-2 border-r border-primary" : ""}`}>{title}</p>
                        </Link>
                    ))}
                </div>
                <div className="flex gap-4 items-center justify-center py-2">
                    <Icon icon={<FacebookIcon className="w-4 h-4" />} size="small" />
                    <Icon icon={<InstagramIcon className="w-4 h-4" />} size="small" />
                    <Icon icon={<PinterestIcon className="w-4 h-4" />} size="small" />
                    <Icon icon={<YoutubeIcon className="w-4 h-4" />} size="small" />
                </div>
            </div>
        </div>
    )
}

