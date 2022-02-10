const GaleriaFoto = () => {
    return <div className="bg-white p-7 rounded-lg space-y-5 shadow-lg">
        <h1 className="text-primary text-2xl">Galería Fotográfica</h1>
        <div className="p-5 bg-color-base rounded-lg ml-10 mr-10 pl-10">
            <p>Publica un mínimo de 8 fotos de tu empresa (salones, menús, vestidos, coches, etc.) <br/>
                Cuantas más fotos publiques más fácil será que los usuarios te contacten 
            </p>
        </div>
        <div className="ml-10">
            <h1 className="text-primary text-lg">Sube 8 fotos y selecciona una como imagen principal</h1>
            <h1 className="text-primary text-lg">Arrastra  las imágenes para cambiarlas de orden</h1>
        </div>
        <div className=" flex flex-col justify-center ">
            <h1 >Arrastra y deja tus imágenes aquí</h1>
            <button className="border-solid border-2 border-primary rounded-full w-40 p-3  text-primary">Añadir imágenes</button>
        </div>
        
    </div>
}

export default GaleriaFoto