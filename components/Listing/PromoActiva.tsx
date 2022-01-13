import { CheckIcon as PromoIcon } from "../Icons"

const PromoActiva = () => {
    return (
        <div className="w-max flex items-center gap-2">
            <PromoIcon className="w-9 h-9" />
            <h2 className="font-light text-primary leading-5">Promoción <br/> <span className="font-bold">Activa</span></h2>
        </div>
    )
}

export default PromoActiva
