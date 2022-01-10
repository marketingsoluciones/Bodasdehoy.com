import { BurbujaChat } from "./BurbujaChat";

export const Notificaciones = () =>{
   

    return(
        <div className="space-y-5 mx-8 rounded-lg ">   {/* cuerpo del cuadro de notificaciones */}

            <div className="bg-white">{/* Contenedor de los datos*/}
                <h2 className="ml-3 text-primary font-bold text-2xl p-7">Notificación</h2>

                <div className="  flex flex-row border-t-2 border-b-2 ">{/* contenedor para botones  */}
                    <button className="bg-none text-black px-4 py-2 rounded-xl ml-10" color="primary" type="submit">No Leídas</button>      
                    <div className="border-l-2">
                        <button className="bg-none text-grey px-4 py-2 rounded-xl ml-3" color="primary" type="submit">Leídas</button>      
                    </div>
                    
                </div>

                <div className="p-7 h-screen overflow-hidden"> {/* contenedor de los mensajes */}
                    <div className="border  flex flex-col overflow-auto h-3/4">
                      <BurbujaChat/>
                    </div>
                </div>
            </div>
        </div>
    )
}