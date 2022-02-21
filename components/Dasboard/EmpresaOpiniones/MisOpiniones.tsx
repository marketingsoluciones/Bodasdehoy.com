export const HeaderMisOpiniones = () => {
    return <div className="flex flex-row p-5 bg-white rounded-lg shadow-lg space-x-4">
        <div>
            <img src="" alt="img" />
        </div>
        <div>
            <h1 className="text-primary text-2xl text-bold">Consigue Opiniones de tus Clientes</h1>
            <div className="flex flex-row space-x-5">
                <p>Las opiniones son decisivas a la hora de contratar. Fomenta que tus clientes opinen y valores tus servicios.</p>
            </div>
        </div>
    </div>
}

export const BodyMisOpiniones = () => {
    return <div className=" p-5 bg-white rounded-lg shadow-lg space-x-4 space-y-4">
       <h1>Mis opiniones</h1>
       <div className="bg-color-base p-5 rounded-lg space-y-5">
            <div className="flex justify-between">
               <div className="flex flex-row space-x-4">
                   <img src="" alt="perfilFoto" />
                    <div>
                        <h1>Por Carolina lopez</h1>
                        <h1>fecha</h1>
                    </div>
               </div>
               <div>
                   <button>Responder</button>
               </div>
            </div>
            <div>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                     Eligendi vitae ipsum animi error, tempora accusantium placeat officia 
                     facilis aliquid neque rerum temporibus sint ducimus quis culpa eveniet
                     reiciendis in quam quidem libero maiores! Illo numquam aliquam assumenda 
                     illum ad expedita fugit repellat ratione, explicabo tenetur harum maiores 
                     libero doloremque quasi?</p>
            </div>
       </div>
    </div>
}


export const PedirMisOpiniones = () =>{
    return <div className="space-y-5">
        <HeaderMisOpiniones/>
        <BodyMisOpiniones/>
    </div>
}