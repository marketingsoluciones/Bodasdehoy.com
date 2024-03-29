import { useRouter } from "next/router";
import { CheckboxScreen } from "../../components/CheckboxScreen";

export const CrearEvento = () => {
    const router = useRouter()
    return (
        <>
            <div className="mb-14 px-10 md:px-0">
                <div className="md:pl-[37%] text-primary text-end ">
                    Obtén una visión panorámica de cada acción en la organización de tu evento.
                    Gestiona tu planificación y garantiza que tu boda, fiesta, ceremonia, celebración o actividad corporativa sea un éxito.
                </div>
                <div className="flex justify-center items-center">
                    <img src="/bannerApp.webp" width={600} />
                </div>
                <div className="grid md:grid-cols-2 mt-10 space-y-8 md:space-y-0 " >
                    <div className="flex items-start justify-center">
                        <img src="/EventoOrganizador.png" width={350} />
                    </div>
                    <div className="space-y-4 flex flex-col justify-center items-center">
                        <p className="text-primary">
                            Esta poderosa herramienta te ayuda a hacer el seguimiento detallado del avance de tu celebración de forma automática y con la precisión propia de un reloj suizo.
                        </p>
                        <p className="text-primary font-semibold">
                            Coordina desde tu móvil todas las acciones para un evento memorable.
                        </p>
                        <button
                            onClick={async () => {
                                const asd = `${process.env.NEXT_PUBLIC_EVENTSAPP}/?c=true`
                                const path = window.origin.includes("://test.") ? asd?.replace("//", "//test") : asd
                                router.push(path ?? "")
                            }
                            }
                            className=" text-primary bg-yellow-button py-[8px] px-[22px] shadow-md">
                            CREA GRATIS TU EVENTO
                        </button>
                        {/* <CheckboxScreen setState={() => { }} /> */}
                    </div>
                </div>
            </div>
        </>
    )
}