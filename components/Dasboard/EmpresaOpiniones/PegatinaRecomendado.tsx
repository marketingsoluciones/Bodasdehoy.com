import { IconDescuento2, IconEmpresaDestacada } from "../../Icons"
import { ButtonComponent } from "../../Inputs"

export const HeaderPegatinas = () => {
    return <div className="flex flex-col p-10 bg-white rounded-lg shadow-lg space-x-4">
                <h1 className="text-primary text-2xl text-bold">Consigue Opiniones de tus Clientes</h1>
                <p>Las opiniones son decisivas a la hora de contratar. Fomenta que tus clientes opinen y valores tus servicios.</p>       
            </div>
        }

export const BodyPegatinas = () => {
    return <div className=" grid grid-cols-2 gap-4">

                <div className="bg-white rounded-lg shadow-lg p-5 space-y-5">
                    <div className=" flex space-x-5 justify-center items-center">
                        <IconEmpresaDestacada/>
                        <div>
                            <h2>Empresa</h2>
                            <h3>Destacada</h3>
                        </div>
                    </div>
                    <p className="text-center">
                        Es un distintivo de calidad y buen servicio. Te permitirá comunicar 
                        que otras parejas te están recomendando y háras que más clientes 
                        se interesen por tus servicios 
                    </p>
                    <ButtonComponent>Pedir Opinion</ButtonComponent>
                </div>
       
                <div className="bg-white rounded-lg shadow-lg p-5 space-y-5">
                    <div className=" flex space-x-5 justify-center items-center ">
                        <IconDescuento2/>
                        <div>
                            <h1>Promoción</h1>
                            <h1>Activa</h1>
                        </div>                
                    </div>
                    <p className="text-center pb-8">
                        Es un distintivo que indica si tienes activo algún servicio con %
                        de descuento en tu escaparate.
                    </p>
                    <ButtonComponent>Añadir opinion</ButtonComponent>
                </div>

            </div>
}


export const Pegatinas = () =>{
    return <div className="space-y-5 col-span-4">
        <HeaderPegatinas/>
        <BodyPegatinas/>
    </div>
}