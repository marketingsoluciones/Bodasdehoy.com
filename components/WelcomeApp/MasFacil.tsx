import { useRouter } from "next/router";

export const MasFacil = () => {
    const router = useRouter()
    return (
        <>
            <div className="grid md:grid-cols-2 gap-10 xl:max-w-screen-lg 2xl:max-w-screen-lg mx-auto px-10 md:px-0 ">
                <div className="space-y-5 flex flex-col justify-center md:items-center justify-items-center ">
                    <img src="/easy.png" alt="Facil" width={300} />
                    <p className="text-gray-500 text-center  md:px-0 md:pl-20 ">
                        <span className="text-primary">Ahora es más fácil</span> coordinar los detalles de tu evento como un mecanismo perfecto
                    </p>
                </div>
                <div className="space-y-10 ">
                    <p className="text-gray-500">
                        Disfruta de la comodidad de hacer la planificación, ejecución y seguimiento de tu celebración o evento desde una sola herramienta.<br /><br />

                        Todas las automatizaciones que coordinan por ti el seguimiento en tiempo real la organización de tu evento.<br /><br />

                        <span className="text-primary font-semibold">Accede GRATIS</span> a está poderosa herramienta y amplia la posibilidad de éxito de tu evento con tu EventosOrganizador.<br /><br />

                        Solo necesitas registrarte con tu correo electrónico y crea tu primer evento.<br /><br />

                        No pagues más por muchas aplicaciones o software de planificación, cuando puedes hacer toda la magia desde una misma herramienta.
                    </p>
                    <button onClick={()=>router.push(`${process.env.NEXT_PUBLIC_EVENTSAPP}`)} className=" text-primary bg-yellow-button py-[8px] px-[22px] shadow-md">
                        CREAR EVENTO
                    </button>
                </div>
            </div>
        </>
    )
}