import { useRouter } from "next/router"
import { CirculoResumen } from "./MicroComponentes/CirculoResumen"
import { CuadroResumen } from "./MicroComponentes/CuadroResumen"

export const EventoOrganizador = () => {
    const router = useRouter()

    const DataCuadro = [
        {
            img: "/check.png",
            alt: "check",
            textoImg: "Destaca cada acción en tu planificación por tiempo o importancia",
            texto: "Registra cada momento dentro de tu planificación de forma visible. <br/><br/>Establece prioridades y acciones en rangos de tiempo de forma gráfica.<br/><br/>Tienes la facilidad de recibir las actualizaciones una vez ejecutadas en un panel de manejo intuitivo. Esto te permite hacer un seguimiento de la ejecución de las acciones en tiempo real.",
        },
        {
            img: "/calculadora.png",
            alt: "calculadora",
            textoImg: "Crea tu presupuesto sin complicaciones y optimiza su ejecución",
            texto: `No se trata de solo establecer un presupuesto. Es tener un registro minucioso de su ejecución en cada fase de la organización del tu evento.<br/><br/>

            Se trata de tener una herramienta que te facilite la gestión de tu presupuesto para cada evento.`,
        },
        {
            img: "/burbujaTexto.png",
            alt: "burbuja de texto",
            textoImg: "Crea tu presupuesto sin complicaciones y optimiza su ejecución",
            texto: `Te ayuda a concentrar las comunicaciones necesarias en una misma plataforma:<br/><br/>

            - Facilita el contacto directo con cada uno de los invitados.
            Permite la interacción de los invitados entre ellos.<br/>
            - Hace la comunicación con tus proveedores más eficientes porque puedes crear en el un registro de cada avance y secuencia de acción.<br/>
            - Abres un canal de interacción directa entre los proveedores y tus invitados en las acciones que así lo requieran.`,
        },
    ]

    const DataCirculo = [
        {
            img: "/noviaApp.png",
            alt: "noviaApp",
            titulo: "Estás próxima a casarte y deseas estar enterada de cada paso en el avance de la planificación. ",
            texto: "El EventosOrganizador te permite estar en línea con tu wedding planner y con todas las personas que en la organización de tu boda, así como la lista de invitados.",
        },
        {
            img: "/calendarioApp.png",
            alt: "calendario",
            titulo: "Eres una apasionada de la organización de eventos.",
            texto: "¿Amas hacerte cargo de todos los eventos de tu familia e incluso en tu trabajo? Con el EventosOrganizador puedes llevar la agenda de tus eventos familiares o profesionales.",
        },
        {
            img: "/hojaApp.png",
            alt: "hojaApp",
            titulo: "Eres una organizadora de eventos corporativos o wedding planer profesional.",
            texto: "No importa el tamaño de la celebración o cuantos eventos necesites crear en simultaneo. Crea un panel por evento desde donde puedes coordinar",
        },
    ]

    return (
        <>
            <div className="flex justify-center mt-10 md:mt-0 mb-10 md:mb-20 "  >
                <p className="text-gray-500 md:w-[65%] w-[95%] text-center text-2xl md:text-3xl">Navega dentro de tu <span className="text-primary">EventosOrganizador</span> y descubre el nuevo significado de llevar la batuta en la planeación de eventos</p>
            </div>
            <div className="md:my-8 " >
                <CuadroResumen DataCuadro={DataCuadro} />
            </div>
            <div>
                <CirculoResumen DataCirculo={DataCirculo} />
            </div>
            <div className="flex flex-col justify-center items-center space-y-5 mb-10">
                <p className="text-primary text-xl font-semibold">Inicia tu prueba gratis ¡ahora!</p>
                <button onClick={()=>router.push(`${process.env.NEXT_PUBLIC_EVENTSAPP}`)} className=" text-primary bg-yellow-button py-[8px] px-[22px] shadow-md">
                        CREAR EVENTO
                </button>
            </div>
        </>
    )
}