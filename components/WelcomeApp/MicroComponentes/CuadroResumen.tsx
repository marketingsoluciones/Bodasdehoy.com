import { Markup } from "interweave"
import { FC } from "react"

interface PropsCuadroResumen {
    DataCuadro: any
}

export const CuadroResumen: FC<PropsCuadroResumen> = ({ DataCuadro }) => {

    return (
        <>
            <div className="space-y-4 px-20">
                {DataCuadro.map((item: any, idx: any) => {
                    const theData = { __html: item.texto }
                    return (
                        <div key={idx} className="flex flex-row-2 bg-white  w-[100%] rounded-3xl shadow-lg">
                            <div className="w-[30%] text-white text-center text-sm bg-green-secundario flex flex-col items-center justify-center p-5 rounded-3xl gap-3">
                                <img src={item.img} alt={item.alt} width={70} />
                                <span>{item.textoImg}</span>
                            </div>
                            <div className="w-[70%] py-5 px-10 text-sm flex items-center text-gray-600">
                                <p dangerouslySetInnerHTML={theData}></p>
                            </div>
                        </div>
                    )
                })}
            </div>

        </>
    )

}