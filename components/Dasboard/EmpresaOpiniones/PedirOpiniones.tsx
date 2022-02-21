
export const HeaderOpiniones = () => {
    return <div className="flex flex-row p-5 bg-white rounded-lg shadow-lg space-x-4">
        <div>
            <img src="" alt="img" />
        </div>
        <div>
            <h1 className="text-primary text-2xl text-bold">Has conseguido 0 opiniones</h1>
            <div className="flex flex-row space-x-5">
                <div className="flex flex-row space-x-2">
                    <img src="" alt="img" />
                    <h1>0 peticiones enviadas</h1>
                </div>
                <div className="flex flex-row space-x-2">
                    <img src="" alt="img" />
                    <h1>0 sin contestar</h1>
                </div>
                <div className="flex flex-row space-x-2">
                    <img src="" alt="img" />
                    <h1>0 sin contestar</h1>
                </div>
            </div>
        </div>
    </div>
}

export const BodyOpiniones = () =>{
    return <div className=" space-y-5">

        <div className="bg-white rounded-lg shadow-lg p-5 space-y-5">
            <h1 className="text-primary text-2xl text-bold">Pedir ipiniones</h1>

            <h1>Destinatarios</h1>
            <p>Edita y envía este email para pedir opiniones a tus clientes. Tú también recibirás una copia en tu correo elecetrónico.</p>
            <h1>Para:</h1>
            <div>
                <input type="text" name="" id="" />
                <input type="email" name="" id="" />
                <input type="submit" />
            </div>
            <h1>Importar Clientes</h1>
            <h1>CC: ejemplosxs@gmail.com</h1>
            <h1>Mensaje</h1>
            <button>Enviar</button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-5 space-y-5 pb-5">
            <h1 className="text-primary text-2xl text-bold">Comparte tu enlace y consigue opiniones</h1>
            <p>Envía este enlace personalizado a tus clientes para poder opinar de forma rápida</p>
            <input type="text" />

        </div>


    </div>
}

export const PedirOpiniones = () =>{
    return <div className="space-y-5">
        <HeaderOpiniones/>
        <BodyOpiniones/>
    </div>
}