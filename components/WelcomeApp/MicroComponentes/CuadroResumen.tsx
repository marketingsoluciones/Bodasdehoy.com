import { FC } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper";


interface PropsCuadroResumen {
    DataCuadro: any
}

export const CuadroResumen: FC<PropsCuadroResumen> = ({ DataCuadro }) => {

    return (
        <>
            <div className="space-y-4 px-10 md:px-20 md:block hidden">
                {DataCuadro.map((item: any, idx: any) => {
                    const theData = { __html: item.texto }
                    return (
                        <>
                            <div key={idx} className="flex flex-col md:flex-row bg-white  w-[100%] rounded-3xl shadow-lg">
                                <div className="md:w-[30%] text-white text-center text-sm bg-green-secundario flex flex-col items-center justify-center p-5 rounded-3xl gap-3">
                                    <img src={item.img} alt={item.alt} width={70} />
                                    <span>{item.textoImg}</span>
                                </div>
                                <div className="md:w-[70%] py-5 px-10 text-sm flex items-center text-gray-600">
                                    <p dangerouslySetInnerHTML={theData}></p>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
            <div className=" md:hidden block">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    loop={false}
                    pagination
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[Pagination,Autoplay]}>
                    {DataCuadro.map((item: any, idx: any) => {
                        const theData = { __html: item.texto }
                        return (
                            <>
                                <SwiperSlide key={idx}
                                >
                                    <div className="flex flex-col mx-10  bg-white rounded-3xl shadow-lg mb-10">
                                        <div className=" text-white text-center text-sm bg-green-secundario flex flex-col items-center p-5 rounded-3xl gap-3">
                                            <div className="w-1/2 h-1/2">
                                                <img src={item.img} alt={item.alt} width={8} height={5} />
                                            </div>
                                            <span>{item.textoImg}</span>
                                        </div>
                                        <div className="px-5 text-sm flex items-center text-gray-600  h-96 ">
                                            <p className="" dangerouslySetInnerHTML={theData}></p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </>
                        )
                    })}
                </Swiper>
            </div>

        </>
    )

}