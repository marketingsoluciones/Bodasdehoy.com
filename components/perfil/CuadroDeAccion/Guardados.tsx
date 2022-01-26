import CardBusiness from "../../Category/CardBusiness"
import { PostComponent } from "../../Home/Magazine"

export const Guardados =() =>{
    return (
        <div>{/* cuerpo */}

            <div className="bg-white h-40 space-y-5 mx-8 rounded-lg flex flex row items-center pl-16 space-x-4 shadow-md"> {/* cabezera de favoritos */}
                <div >
                    <img src="/mask.png" alt="hola" className="h-20 w-20" />
                </div>
                <div className=" pb-4">
                    <h1 className="text-primary font-bold text-2xl">Guardados</h1>
                    <small>Tus articulos guardados, encuentralos aqui.</small>
                </div>
            </div>

            {/* contenedor de las tarjetas favoritas */}
            {/* <div className=" grid grid-rows-2 grid-flow-col">
                <div >
                    <Post/>
                </div>
                <div >
                    <Post/>
                </div>
                <div >
                    <Post/>
                </div>
                <div>
                    <Post/>
                </div>
            </div> */}
        </div>
    )
}