import Link from "next/link"
import { Icon } from "./Footer"
import { FacebookIcon, InstagramIcon, PinterestIcon, YoutubeIcon } from "./icons"

type itemFooter = {
    title: string,
    route: string,
    bar?: boolean
}
const FooterMobile = () => {
    const List: itemFooter[] = [
        { title: "Tarifas y condiciones generales", route: "/", bar: true },
        { title: "Privacidad", route: "/" },
        { title: "Condiciones proveedores", route: "/", bar: true },
        { title: "FAQ", route: "/", bar: true },
        { title: "Contacto", route: "/" },
    ]
    return (
        <div className="md:hidden bg-color-base w-full pb-8">
            <div className="px-5 mx-auto inset-x-0">
                <div className="border-b border-primary pt-10 pb-4">
                    <img src="/logo.webp" alt={"Logo bodasdehoy.com"} className="h-5 object-contain object-center" />
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

export default FooterMobile
