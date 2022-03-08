import {IconExclamacion , IconReloj, IconInterrogacion, IconEstrella, IconImportar } from "../../Icons/index"
import { ButtonComponent, InputField } from "../../Inputs" 
import { Formik, Form } from "formik"

export const HeaderOpiniones = () => {
    
    const DatosOpiniones = [
        {icon:<IconExclamacion/>,descripcion:"0 Peticiones Enviadas"},
        {icon:<IconReloj/>,descripcion:"0 Sin Contestar"},
        {icon:<IconInterrogacion/>,descripcion:"0 Sin Contestar"},
    ] 

    return <div className="flex p-10 bg-white rounded-lg shadow-lg gap-5 items-center">
        
        <IconEstrella/>
        
        <div className="w-full">
            <h2 className="text-primary text-md text-bold">Has conseguido 0 opiniones</h2>
            <div className="flex space-x-10 justify-between pt-5  ">
                {DatosOpiniones.map((item,idx)=>(
                    <div key={idx} className ="flex ">
                        {item.icon}
                        {item.descripcion}
                    </div>
                ))}
            </div>
        </div>

    </div>
}

export const BodyOpiniones = () =>{
    const initialValues={

    }
    const handleSubmit = () =>{

    }
    return <div className=" space-y-5">

            <div className="bg-white rounded-lg shadow-lg p-10 space-y-5">

                <h1 className="text-primary text-xl font-bold">Pedir ipiniones</h1>
                <h2 className="text-xl">Destinatarios</h2>
                <h3 className="text-md">Edita y envía este email para pedir opiniones a tus clientes. Tú también recibirás una copia en tu correo elecetrónico.</h3>
                <h3 className="text-md">Para:</h3>
                
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form className="flex gap-5">
                        <InputField
                            name={"usuario"}
                            type={"text"}
                            placeholder="Nombre"
                        />
                        <InputField
                            name={"email"}
                            type={"email"}
                            placeholder="Email"
                        />
                        <ButtonComponent>Añadir</ButtonComponent>
                    </Form>
                </Formik>

                <div className="flex gap-5">
                    <IconImportar/>
                    <h2>Importar Clientes</h2>
                </div>

                <h3>CC: ejemplosxs@gmail.com</h3>
                <h3 className="text-primary text-md font-bold">Mensaje</h3>
                <ButtonComponent>Enviar</ButtonComponent>
            </div>

        <div className="bg-white rounded-lg shadow-lg p-10 space-y-5">
            <h3 className="text-primary text-2xl font-bold">Comparte tu enlace y consigue opiniones</h3>
            <p>Envía este enlace personalizado a tus clientes para poder opinar de forma rápida</p>
            <input type="text" />

        </div>


    </div>
}

export const PedirOpiniones = () =>{
    return <div className="space-y-5 col-span-4">
        <HeaderOpiniones/>
        <BodyOpiniones/>
    </div>
}