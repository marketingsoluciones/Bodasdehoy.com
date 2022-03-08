import {Form,Formik} from "formik";
import { ButtonComponent, InputField } from "../../Inputs";


export const MiPerfil = () => {
    const initialValues = {
        Usuario:'',
      };
    const handleSubmit = () => { console.log({handleSubmit})};

      return (
        <div className="space-y-5 mx-8 w-200"> {/* cuadro de datos */}

            <div className=" hidden md:block"> 
                <button className="bg-white text-primary border border-primary px-4 py-2 rounded-xl " color="primary" type="submit">Gestor de eventos</button>      
            </div>

            <div className="bg-white p-7"> {/* cuadro de datos de acceso  */}
                <h2 className="text-primary font-bold ml-3 mb-5 text-2xl">Datos de acceso</h2>
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
                <small className="text-primary ml-4 mt-1 text-sm">Quiero Cambiar mi contraseña</small>
            </div>
            <div className="bg-white p-7">{/* Cuadro Del Formulario */}

                <h2 className="ml-3 text-primary font-bold text-2xl ">Datos de contacto</h2>
                <h3 className="ml-3 mt-3 text-sm">Recibiras todas las novedades del portal en la direccion de email que hayas introducido.</h3>

                <div> 
                    <Formik initialValues={initialValues} onSubmit={handleSubmit}> 
                        <Form className="flex flex-col justify-end">
                            <div className="w-full p-3 space-y-3 ">
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
                                <div className="grid md:grid-cols-2 gap-4">
                                    <InputField
                                        name={"Vives"}
                                        placeholder="Vives en"
                                        type={"text"}
                                    />
                                    <InputField
                                        name ={"Pais"}
                                        placeholder="Pais"
                                        type={"text"}
                                    />
                                    <InputField
                                        name={"Date"}
                                        placeholder="Nos casamos el"
                                        type={"date"}
                                    />
                                    <InputField
                                        name ={"Telefono"}
                                        placeholder="Telefono"
                                        type={"text"}
                                    />
                                </div>                                  
                            </div>
                            <ButtonComponent>Guardar</ButtonComponent>   
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}