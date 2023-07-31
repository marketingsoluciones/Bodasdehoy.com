import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper";


export const LograEvento = () => {
    const Data = [
        {
            img: "/comunicacion.png",
            alt: "comunicacion",
            texto: "Fallos en la comunicación"
        },
        {
            img: "/tiempo.png",
            alt: "tiempo",
            texto: "Falta de tiempo"
        },
        {
            img: "/presupuesto.png",
            alt: "presupesto",
            texto: "Desaciertos en el presupuesto"
        }
    ]
    return (
        <>
            <div className="py-20 px-10 md:px-0 xl:max-w-screen-lg 2xl:max-w-screen-lg mx-auto flex flex-col justify-center items-center space-y-10">
                <div className="text-primary md:text-2xl text-xl text-center font-semibold md:w-[70%]  ">
                    Logra un evento perfecto con la herramienta que integra cada faceta de la organización
                </div>
                <div className="space-y-4 text-gray-500 ">
                    <p >
                        Hacer que una celebración brille depende de la acción coordinada de diversos factores. Sin tu coordinación precisa son más amplias las posibilidades de error.
                    </p>
                    <p className="font-semibold text-gray-400">
                        Logra un evento exitoso evitando:
                    </p>
                </div>
                <div className="hidden md:block">
                    <div className="grid grid-cols-3  justify-content-center items-center">
                        {Data.map((item, idx) => (
                            <div key={idx} className="flex justify-center items-center gap-5" >
                                <img src={item.img} alt={item.alt} />
                                <span className="text-gray-400" >{item.texto}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="block md:hidden">
                    <div className="grid ">
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={10}
                            pagination
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            modules={[Pagination,Autoplay]}
                        >
                            {Data.map((item, idx) => (
                                <SwiperSlide key={idx}>
                                    <div  className="flex justify-center items-center gap-5 mb-10 w-full  " >
                                        <div className="">
                                            <img src={item.img} alt={item.alt}  width={8} height={5}/>
                                        </div>
                                        <span className="text-gray-400 text-start w-[50%]" >{item.texto}</span>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                <div className="text-primary text-center font-semibold md:w-[75%] ">
                    Está claro que eres la mejor en lo que haces, pero, ¿qué sucede si tienes la posibilidad de obtener los mismos resultados con procesos menos estresantes?
                </div>
            </div>
        </>
    )
}