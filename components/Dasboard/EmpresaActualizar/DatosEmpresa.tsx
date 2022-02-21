import {Formik, Form, Field} from "formik"
import { InputField } from "../../Inputs"

const DatosEmpresa = () => {
    const initialValues = {

    }
  
const handleSubmit = ( ) => {
    console.log({initialValues})
}     
    
    return <div>
        <Formik initialValues={initialValues} onSubmit= {handleSubmit}>
            <Form className="space-y-5">
                <div className="bg-white rounded-lg p-5">
                    <h1 className=" text-primary text-2xl text-bold">Datos de acceso</h1>
                    <InputField
                        name={"acceso"}
                        type= {"text"}
                        placeholder= "Usuario"
                    />
                    <small>quiero cambiar mi contraseña</small>
                </div>

                <div className=" bg-white rounded-lg p-5">
                    <h1 className="text-primary text-2xl text-bold">Describe tu empresa <small className="text-primary">(en tercera persona)</small></h1>
                    <p>Describe detalladamente todos los servicios y productos que ofrece 
                        tu empresa con la máxima información de interés para los novios
                    </p>
                    <InputField
                        name= {"descripcion"}
                        type= {"textarea"}
                        placeholder= ""
                    />
                </div>

                <div className=" bg-white rounded-lg p-5">
                    <h1 className="text-primary text-2xl text-bold">Datos de Contacto</h1>
                    <p>Recibirás las solicitudes de información de usuario interesados en la 
                        dirección de email que hayas introducido, así como todas las novedades del 
                        portal que te puedan interesar. 
                    </p>
                    <div className="w-fit mb-4 ">
                        <InputField 
                            name={"contacto"}
                            type={"text"}
                            placeholder="Contacto"
                        /> 
                    </div>
                    <div className="grid grid-cols-2 mb-3 gap-4 ">
                
                        <InputField
                            name={"email"}
                            type={"email"}
                            placeholder="Email"
                        />
                    
                        <InputField
                            name={"page"}
                            type={"text"}
                            placeholder="Pagina Web"
                        />

                        <InputField
                            name={"tmovil"}
                            type={"number"}
                            placeholder="telefono movil"
                        />
                            
                        <InputField
                            name={"tfijo"}
                            type={"number"}
                            placeholder="telefono fijo"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-lg p-5">
                    <h1 className="text-primary text-2xl text-bold">Información sobre tu empresa </h1>
                    <p className="text-primary"> Diferenciamos las empresas registradas como profesionales. Así proporcionamos 
                        mayor información a las parejas 
                    </p>
                    <InputField
                        name = {"TipoEmpresa"}
                        type = {"text"}
                        placeholder= "CIF / NIF"
                    />
                    <h1>Documento acreditativo pago tributarios</h1>
                    <p>Certificado de estar al corriente de las oblibaciones tributarias.
                        Puede hacer la solicitud online en la web de AEAT.
                    </p>
                    <button>Añadir Fichero</button>
                    <h1>Documento acreditativo IAE</h1>
                    <h1>Certificado de Situación Censal</h1>
                    <p>Puede hacer la solicitud online en la web de AEAT. En su defecto, también 
                        serán válidos los Modelos 036, 037 y 840
                    </p>
                    <button>Añadir Fichero</button>
                </div>

                <button>Guardar</button>
            </Form>
        </Formik>
    </div>
}
export default DatosEmpresa