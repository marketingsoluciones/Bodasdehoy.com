import { FC } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay,Pagination } from "swiper";





interface PropsCirculoResumen {
    DataCirculo: any
}



export const CirculoResumen: FC<PropsCirculoResumen> = ({ DataCirculo }) => {


    return (
        <>
            <div className="hidden md:block">
                <div className="grid md:grid-cols-2 gap-4 my-20 px-5 md:px-0 ">
                    <div className="text-3xl md:text-4xl flex items-center justify-center text-center md:text-start mb-5 md:mb-0">
                        <p className="text-gray-500">El <span className="text-primary">EventosOrganizador</span> <br />es para ti si:</p>
                    </div>
                    {DataCirculo.map((item: any, idx: any) => (
                        <div key={idx} className="flex items-center gap-2">
                            <img src={item.img} alt={item.alt} className="md:w-36 w-24 h-24 md:h-full" />
                            <div className="space-y-2 text-sm flex flex-col items-center justify-center ">
                                <p className="text-primary font-semibold">{item.titulo}</p>
                                <p className="text-gray-500">{item.texto}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="block md:hidden">
                <div className="grid md:grid-cols-2 gap-4 my-5 px-10 md:px-0 ">
                    <div className="text-3xl md:text-4xl flex items-center justify-center md:text-start mb-5 md:mb-0">
                        <p className="text-gray-500">El <span className="text-primary">EventosOrganizador</span> <br />es para ti si:</p>
                    </div>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={0}
                        loop={false}
                        pagination
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        modules={[Pagination, Autoplay]}
                    >
                        {DataCirculo.map((item: any, idx: any) => (
                            <SwiperSlide key={idx}>
                                <div  className="flex items-center gap-2 mb-10">
                                    <img src={item.img} alt={item.alt}  className="md:w-36 w-24 h-24 md:h-full" />
                                    <div className="space-y-2 text-sm flex flex-col items-center justify-center ">
                                        <p className="text-primary font-semibold text-start">{item.titulo}</p>
                                        <p className="text-gray-500 text-start">{item.texto}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div >
        </>
    )
}