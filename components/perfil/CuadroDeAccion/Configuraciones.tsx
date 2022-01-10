import {Form,Formik} from "formik";
import { InputField } from "../../Inputs";

export const Configuraciones =() =>{
    const initialValues = {
        email: "",
      };
      const handleSubmit = () => { console.log("hola mundo")};
    return (
        <div className="space-y-5">{/* cuerpo de las configuraciones  */}
            
            {/* primer cuadro de configuraciones*/}
            <div className="bg-white p-7 space-y-5 mx-8 rounded-lg  items-center pl-16  shadow-md"> 
               
                <div className=" pb-2"> {/* descripcion del cuadro */}
                    <h1 className="text-primary font-bold text-2xl">Configuración</h1>
                    <small>Email que recibe las Notificaciones.</small>
                </div>

                <div className=" flex flex-row items-center space-x-2">{/* Correo por defecto */}
                    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        <Form>
                            <InputField
                                name={"Email"}
                                placeholder="Ejemplo@gmail.com"
                                type={"email"}
                            />
                        </Form>
                    </Formik>
                    <h1 >( Por Defecto ) </h1>
                </div>

                <div className="pt-3 space-y-2">{/* añadir correos */}
                    <small className="">Añade otros emails, separados por comas ( , ) , para que reciban también las solicitudes.</small>
                    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        <Form>
                            <InputField
                                name={"Email"}
                                placeholder="Ejemplo@gmail.com"
                                type={"email"}
                            />
                        </Form>
                    </Formik>
                    <button className="bg-primary text-white px-5 py-2 rounded-xl" color="primary" type="submit">Añadir mails</button> 
                </div>
            </div>

            {/* segundo cuadro de configuraciones*/}
            <div className="bg-white p-7 space-y-5 mx-8 rounded-lg  items-center pl-16  shadow-md"> 
                <div className=" pb-2"> {/* descripcion del cuadro */}
                    <h1 className="text-primary font-bold text-2xl">Notificaciones</h1>
                    <small>Las comunicaciones que te enviamos son información importante. No queremos que recibas comunicaciones que no te interesan, así que aquí 
                        puedes seleccionar cuáles quieres recibir y cuáles no.
                    </small>
                </div>
                <div >
                    <form action=""className=" flex flex-col space-y-3">
                      <label htmlFor="" ><input type="checkbox" className="appearance-none checked:bg-blue-500" />Newsletter mensuales. </label>  
                      <label htmlFor=""><input type="checkbox" />Emails de formación durante durante la primera semana. </label>
                      <label htmlFor=""><input type="checkbox" />Alertas para saber sobre tus proveedores favoritos. </label>
                    </form>
                </div>

                <button className="bg-primary text-white px-5 py-2 rounded-xl" color="primary" type="submit">Añadir mails</button> 
                
            </div>

        </div>
    )

}