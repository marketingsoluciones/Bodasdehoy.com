const AñadirVideo = () => {
    return <div className="bg-white p-7 rounded-lg space-y-5 shadow-lg">
        <h1 className="text-primary text-2xl">Galería Fotográfica</h1>
        <div className="p-5 bg-color-base rounded-lg ml-10 mr-10 pl-10">
            <p>Publica videos sobre tus servicios. Cuantos más videos publiques más fácil será<br/>
                que los usuarios te contacten 
            </p>
        </div>
        <div className="ml-10">
            <h1 className="text-primary text-lg">Sube el Videos que deseas añadir</h1>
            <h1 className="text-primary text-lg">Arrastra los Videos para cambiarlas de orden</h1>
        </div>
        <div className=" flex flex-col justify-center ">
            <h1 >Arrastra y deja tus Videos aquí</h1>
            <button className="border-solid border-2 border-primary rounded-full w-40 p-3  text-primary">Añadir Video</button>
        </div>
        
    </div>
}

export default AñadirVideo