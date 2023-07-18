export const LograEvento = () => {
    const Data = [
        {
            img: "/comunicacion.png",
            alt:"comunicacion",
            texto: "Fallos en la comunicación"
        },
        {
            img: "/tiempo.png",
            alt:"tiempo",
            texto: "Falta de tiempo"
        },
        {
            img: "/presupuesto.png",
            alt:"presupesto",
            texto: "Desaciertos en el presupuesto"
        }
    ]
    return (
        <>
            <div className="py-20 xl:max-w-screen-lg 2xl:max-w-screen-lg mx-auto flex flex-col justify-center items-center space-y-10">
                <div className="text-primary text-2xl text-center font-semibold w-[70%] ">
                    Logra un evento perfecto con la herramienta que integra cada faceta de la organización
                </div>
                <div className="space-y-4 text-gray-500">
                    <p >
                        Hacer que una celebración brille depende de la acción coordinada de diversos factores. Sin tu coordinación precisa son más amplias las posibilidades de error.
                    </p>
                    <p className="font-semibold text-gray-400">
                        Logra un evento exitoso evitando:
                    </p>
                </div>
                <div className="grid grid-cols-3">
                    {Data.map((item, idx) => (
                        <div key={idx} className="flex justify-center items-center gap-5" >
                            <img src={item.img} alt={item.alt} />
                            <span className="text-gray-400" >{item.texto}</span>
                        </div>
                    ))}
                </div>
                <div className="text-primary text-center font-semibold w-[75%] ">
                    Está claro que eres la mejor en lo que haces, pero, ¿qué sucede si tienes la posibilidad de obtener los mismos resultados con procesos menos estresantes?
                </div>
            </div>
        </>
    )
}