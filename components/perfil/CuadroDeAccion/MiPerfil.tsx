import {Form,Formik} from "formik";
import { InputField } from "../../Inputs";


export const MiPerfil = () => {
    const initialValues = {
        email: "",
      };
      const handleSubmit = () => { console.log("hola mundo")};
      return (

      



        <div className="space-y-5 mx-8 w-200"> {/* cuadro de datos */}

            <div className=" flex flex-row-reverse"> 
            <button className="bg-white text-primary border border-primary px-4 py-2 rounded-xl " color="primary" type="submit">Gestor de eventos</button>      
            </div>

            <div className="bg-white p-7"> {/* cuadro de datos de acceso  */}
                <h2 className="text-primary font-bold ml-3 mb-5 text-2xl">Datos de acceso</h2>
                    <div className="ml-3">
                        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                            <Form>
                                <span>
                                    <InputField
                                        name={"Usuario"}
                                        placeholder="Usuario"
                                        type={"text"}
                                    />
                                </span>
                            </Form>
                        </Formik>
                    </div>
                <small className="text-primary ml-4 mt-1 text-sm">Quiero Cambiar mi contraseña</small>
            </div>

   
            <div className="bg-white p-7">{/* Cuadro Del Formulario */}

                <h2 className="ml-3 text-primary font-bold text-2xl ">Datos de contacto</h2>
                <h3 className="ml-3 mt-3 text-sm">Recibiras todas las novedades del portal en la direccion de email que hayas introducido.</h3>

                <div> {/* inputs de nombre y correo */}
                    <Formik initialValues={initialValues} onSubmit={handleSubmit}> 
                        <Form className="flex item center gap-3">
                            <span className="relative w-full p-3 space-y-3 ">
                                <InputField
                                    name={"Nombre"}
                                    placeholder="Nombre y apellido"
                                    type={"text"}
                                /> 
                                <InputField
                                    name ={"Email"}
                                    placeholder="Email"
                                    type={"email"}
                                />  
                            </span>
                        </Form>
                    </Formik>
                </div>

                <div className="flex flex-col">{/* contenedor que divide los inputs en dos columnas */}
                    
                    <div className=""> {/* fila de arriba */}
                        <Formik initialValues={initialValues} onSubmit={handleSubmit}> 
                            <Form className="">
                                   <div className="flex flex-row  mr-3">
                                       <div className="mx-3 w-1/2">
                                        <InputField
                                            name={"Vives"}
                                            placeholder="Vives en"
                                            type={"text"}
                                            />
                                       </div>
                                       <div className="w-1/2">
                                        <InputField
                                            name ={"Pais"}
                                            placeholder="Pais"
                                            type={"text"}
                                            />
                                       </div>
                                   </div>
                            </Form>
                        </Formik>
                    </div>

                    <div> {/*fila de abajo */}
                        <Formik initialValues={initialValues} onSubmit={handleSubmit}> 
                            <Form className=" ">
                                    <div className="flex flex-row mr-3 mt-3">
                                       <div className="mx-3 w-1/2">
                                        <InputField
                                            name={"Date"}
                                            placeholder="Nos casamos el"
                                            type={"date"}
                                            />
                                       </div>
                                       <div className="w-1/2">
                                        <InputField
                                            name ={"Telefono"}
                                            placeholder="Telefono"
                                            type={"text"}
                                            />
                                       </div>
                                   </div>  
                            </Form>    
                        </Formik>
                    </div>
                </div>
            </div>

            <div className=" flex flex-row-reverse">
            <button className="bg-primary text-white px-4 py-2 rounded-xl" color="primary" type="submit">Guardar</button>      
            </div>

        </div>
    )
}