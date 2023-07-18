import { FC } from "react"

interface PropsCirculoResumen {
    DataCirculo: any
}

export const CirculoResumen: FC<PropsCirculoResumen> = ({ DataCirculo }) => {
    return (
        <>
            <div className="grid grid-cols-2 gap-4 my-20">

                <div className="text-4xl *w-[55%] flex items-center justify-center">
                    <p className="text-gray-500">El <span className="text-primary">EventosOrganizador</span> <br/>es para ti si:</p>
                </div>
                {DataCirculo.map((item: any, idx: any) => (
                    <div key={idx} className="flex gap-2">
                        <img src={item.img} alt={item.alt} width={150}/>
                        <div className="space-y-2 text-sm flex flex-col items-center justify-center">
                            <p className="text-primary font-semibold">{item.titulo}</p>
                            <p className="text-gray-500">{item.texto}</p>
                        </div>
                    </div>
                ))}

            </div>
        </>
    )
}