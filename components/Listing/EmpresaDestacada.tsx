import { EmpresaDestacadaIcon } from "../icons"

const EmpresaDestacada = () => {
    return (
        <div className="w-max flex items-center gap-2 ">
            <EmpresaDestacadaIcon className="w-9 h-9" />
            <h2 className="font-light text-tertiary leading-5">Empresa <br/> <span className="font-bold">Destacada</span></h2>
        </div>
    )
}

export default EmpresaDestacada
