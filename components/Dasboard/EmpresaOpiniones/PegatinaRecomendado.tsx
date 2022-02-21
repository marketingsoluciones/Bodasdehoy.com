export const HeaderPegatinas = () => {
    return <div className="flex flex-row p-5 bg-white rounded-lg shadow-lg space-x-4">
        
        <div>
            <h1 className="text-primary text-2xl text-bold">Consigue Opiniones de tus Clientes</h1>
            <div className="flex flex-row space-x-5">
                <p>Las opiniones son decisivas a la hora de contratar. Fomenta que tus clientes opinen y valores tus servicios.</p>
            </div>
        </div>
    </div>
}

export const BodyPegatinas = () => {
    return <div className=" p-5 grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-5 space-y-5">
            <div className=" flex flex-row space-x-5 justify-center">
                <img src="" alt="Logo" />
               <div>
               <h1>Empresa</h1>
                <h1>Destacada</h1>
               </div>
            </div>
            <div>
                <p className="text-center">
                    Es un distintivo de calidad y buen servicio. Te permitirá comunicar 
                    que otras parejas te están recomendando y háras que más clientes 
                    se interesen por tus servicios 
                </p>
            </div>
            <button>Añadir opinion</button>
        </div>
       
        <div className="bg-white rounded-lg shadow-lg p-5 space-y-5">
            <div className=" flex flex-row space-x-5 justify-center ">
                <img src="" alt="Logo" />
                <div>
                    <h1>Promoción</h1>
                    <h1>Activa</h1>
                </div>                
            </div>
            <div>
                <p className="text-center mb-12">
                    Es un distintivo que indica si tienes activo algún servicio con %
                    de descuento en tu escaparate.
                </p>
            </div>
            <button className="">Añadir opinion</button>
        </div>
    </div>
}


export const Pegatinas = () =>{
    return <div className="space-y-5">
        <HeaderPegatinas/>
        <BodyPegatinas/>
    </div>
}