import {CardBusiness} from "../../Category/CardBusiness"

export const Favoritos =() =>{
    return (
        <div>{/* cuerpo */}

            <div className="bg-white h-40 space-y-5 mx-8 rounded-lg flex flex row items-center pl-16 space-x-4 shadow-md"> {/* cabezera de favoritos */}
                <div >
                    <img src="/mask.png" alt="hola" className="h-20 w-20" />
                </div>
                <div className=" pb-4">
                    <h1 className="text-primary font-bold text-2xl">Favoritos</h1>
                    <small>Tus empresas para bodas favoritas, encuentralas aqui.</small>
                </div>
            </div>

            <div className=" grid grid-rows-2 grid-flow-col">{/* contenedor de las tarjetas favoritas */}
                {/* <div className="  shadow-md w-72  mx-auto inset-x-0 h-max bg-white rounded-3xl overflow-hidden hover:shadow-xl hover:opacity-95 transition-all cursor-pointer my-8 duration-400 ">
                    <CardBusiness/>
                </div>
                <div className="  shadow-md w-72  mx-auto inset-x-0 h-max bg-white rounded-3xl overflow-hidden hover:shadow-xl hover:opacity-95 transition-all cursor-pointer my-8 duration-400 ">
                    <CardBusiness/>
                </div>
                <div className="  shadow-md w-72  mx-auto inset-x-0 h-max bg-white rounded-3xl overflow-hidden hover:shadow-xl hover:opacity-95 transition-all cursor-pointer my-8 duration-400 ">
                    <CardBusiness/>
                </div>
                <div className="  shadow-md w-72  mx-auto inset-x-0 h-max bg-white rounded-3xl overflow-hidden hover:shadow-xl hover:opacity-95 transition-all cursor-pointer my-8 duration-400 ">
                    <CardBusiness/>
                </div> */}
            </div>
            
        </div>
    )
}