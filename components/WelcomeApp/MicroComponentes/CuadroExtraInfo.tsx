export const CuadroExtraInfo = () => {
    return (
        <>
            <div className="grid md:grid-cols-2 gap-10">
                <div className="flex justify-end items-center text-end  ">
                    <p className="md:w-[90%] text-4xl text-gray-500 ">
                        ¿Cómo integras el <span className="text-primary">EventosOrganizador</span> en la planificación de tu evento?
                    </p>
                </div>
                <p className="text-md px-5 md:px-0 text-gray-600">
                    Al igual que el mecanismo de un reloj, un evento exige que todo funcione en el momento correcto. Cada pieza debe entrar en acción en solo cuando corresponde.<br /><br />

                    El EventoOrganizador es la herramienta que integra en un solo panel todas las funciones que necesitas para llevar el control y seguimiento de cada fase el la organización de tu evento. Antes, durante y después de su celebración.<br /><br />

                    Este es el centro de todas las operaciones, en tienes una vista panorámica de cada aspecto de la organización de tu evento.
                </p>
            </div>
        </>
    )
}

export const CuadroExtraInfo2 = () => {

    const Data = [
        {
            title: "Invitados",
            texto: "Crea la lista, envía las invitaciones, confirma asistencia, distribuye en las mesas… Todos los detalles desde una sola herramienta.",
        },
        {
            title: "Las mesas",
            texto: "Organiza la distribución de las mesas y de tus invitados desde el  EventosOrganizador.",
        },
        {
            title: "Lista de regalos",
            texto: "Facilita el acceso de tus invitados a tus regalos favoritos. Comparte la lista de regalos conectada con la tienda de Amazon de tu preferencia.",
        },
        {
            title: "Manejo amigable de tu presupuesto",
            texto: "No necesitas ser contable o especialista para que lleves el control de las cotizaciones de productos y servicios, facturas pagadas y el seguimiento de presupuesto.",
        },
        {
            title: "Invitaciones",
            texto: "Diseña y envía las invitaciones a tu evento desde tu herramienta. Además, puedes automatizar el seguimiento de entrega y confirmación de asistencia de cada invitado.",
        },
        {
            title: "Chat de invitados",
            texto: "Facilita la interacción entre los invitados a tu celebración. Desde aquí es posible crear sorpresas o eventos asociados al tuyo.",
        },
        {
            title: "Web personalizadas",
            texto: "Crea aquí la web de tu evento. Comparte aquí tu registro del paso a paso de tu gran día, e incluso puedes generar tu álbum y compartir todos los momentos especiales en esta.",
        },
        {
            title: "Marketplace",
            texto: "Encuentra productos y servicios para hacer de tu evento el más destacado. ",
        },
    ]

    return (
        <>
            <div className="grid md:w-[85%]  md:grid-cols-2 gap-10 ">
                {Data.map((item,idx)=>(
                    <div key={idx}  >
                        <p className="text-primary text-lg">{item.title}</p>
                        <p className="text-gray-600 md:w-[85%]*">{item.texto}</p>
                    </div>
                ))}
            </div>

        </>
    )
}