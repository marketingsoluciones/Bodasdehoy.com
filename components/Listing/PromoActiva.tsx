import { PromoIcon } from "../icons"

const PromoActiva = () => {
    return (
        <div className="w-max flex items-center gap-2">
            <PromoIcon className="w-12 h-12" />
            <h2 className="text-xl font-light text-primary leading-5">Promoción <br/> <span className="font-bold">Activa</span></h2>
        </div>
    )
}

export default PromoActiva
