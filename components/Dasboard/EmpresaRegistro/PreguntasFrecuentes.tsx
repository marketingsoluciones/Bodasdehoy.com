import { Formik,Form, Field } from "formik"
import { InputField } from "../../Inputs"

const PreguntasFrecuentes = () => {
    const initialValues ={
        Caracteristicas: '',
        Catering: '',

    }

    const handleSubmit = () =>{

    }


    return <div className="bg-white p-7 rounded-lg space-y-5 shadow-lg">
        <h1 className="text-primary text-2xl">Preguntas frecuentes</h1>
        <h1>Responde las preguntas frecuentes que realizan los novios sobre tus Servicios</h1>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
                <div className="space-y-6">
                    <div className="flex flex-row justify-center space-x-16">
                        <div>
                            <img src="" alt="imagen de precio" />
                            <h1>Precio del menú</h1>
                            <h1>input contador</h1>
                        </div>
                        <div>
                            <img src="" alt="imagen de localizacion" />
                            <h1>localización</h1>
                            <h1>input de localización</h1>
                        </div>
                        <div>
                            <img src="" alt="imagen de invitado" />
                            <h1>Número de invitados</h1>
                            <h1>input de invitados</h1>
                        </div>
                       
                    </div>

                    <div className="pr-5 pl-5">
                        <h1>¿Cuáles son las Características más relevantes de las instalaciones? </h1>
                        <InputField
                            name={"Caracteristicas"}
                            type={"text"}
                            placeholder=""
                        />

                        <h1 className="mt-5">¿Dispones de catering/cocina propia? </h1>
                        <InputField
                            name={"Catering"}
                            type={"text"}
                            placeholder=""
                        />

                        <h1 className="mt-5">¿Dispones de menús especiales? </h1>
                        <div role="group" className=" grid   grid-cols-3 gap-3 bg-color-base p-5 rounded-lg">    
                            <label><Field type="checkbox" name="checked" value="Vegetariano"/> Vegetariano</label>
                            <label><Field type="checkbox" name="checked" value="Tipico"/> Típico</label>  
                            <label><Field type="checkbox" name="checked" value="SinGluten"/> Sin gluten</label>
                            <label><Field type="checkbox" name="checked" value="Vegano"/> Vegano</label>
                            <label><Field type="checkbox" name="checked" value="DeFusion"/> De fusión</label>
                            <label><Field type="checkbox" name="checked" value="SinAzucar"/> Sin azúcar</label>
                        </div>

                        <h1 className="mt-5">¿Pueden los novios llevar las bebidas y la tarta de bodas? </h1>
                        <InputField
                            name={"BebidasTarta"}
                            type={"text"}
                            placeholder=""
                        />

                        <h1 className="mt-5">¿Banquete de la boda al aire libre, en jardín o terraza? </h1>
                        <InputField
                            name={"Banquete"}
                            type={"text"}
                            placeholder=""
                        />

                        <h1 className="mt-5">¿Disponés de un espacio dedicado a realizar la ceremonia de boda? </h1>
                        <InputField
                            name={"EspacioDedicado"}
                            type={"text"}
                            placeholder=""
                        />

                        <h1 className="mt-5">¿Cómo se efectúa el pago? </h1>
                        <InputField
                            name={"Pago"}
                            type={"text"}
                            placeholder=""
                        />

                        <h1 className="text-2xl text-primary mt-5">¿Servicios e Intalaciones? </h1>
                        <h1 className="mt-5">Selecciona los servicios e instalaciones que incluyes </h1>
                        <h1 className="text-primary text-xl mt-5" >Instalaciones</h1>

                        <div role="group" className=" grid grid-cols-3  p-5 gap-3">    
                            <label><Field type="checkbox" name="checked" value="Terraza"/> Terraza</label>
                            <label><Field type="checkbox" name="checked" value="ZonaAjardinada"/> Zona ajardinada</label>  
                            <label><Field type="checkbox" name="checked" value="ZonaBaile"/> Zona de baile</label>
                            <label><Field type="checkbox" name="checked" value="ZonaCeremonia"/> Zona para ceremonias</label>
                            <label><Field type="checkbox" name="checked" value="SalonesBanquetes"/> Salones de banquetes</label>
                            <label><Field type="checkbox" name="checked" value="Carpas"/> Carpas</label>
                            <label><Field type="checkbox" name="checked" value="CocinaCatering"/> Cocina para catering</label>
                            <label><Field type="checkbox" name="checked" value="HospedajeInvitados"/> Hospedaje para invitados</label>
                            <label><Field type="checkbox" name="checked" value="Parking"/> Parking</label>
                        </div>
                        <h1 className="text-primary text-xl">Servicios</h1>
                        <div role="group" className=" grid grid-cols-3  p-5 gap-3 ">    
                            <label><Field type="checkbox" name="checked" value="Banquete"/> Banquete</label>
                            <label><Field type="checkbox" name="checked" value="Musica"/> Música</label>  
                            <label><Field type="checkbox" name="checked" value="Fotografia"/> Fotografía</label>
                            <label><Field type="checkbox" name="checked" value="Ceremonia"/> Ceremonia</label>
                            <label><Field type="checkbox" name="checked" value="Transporte"/> Transporte</label>
                            <label><Field type="checkbox" name="checked" value="Decoracion"/> Decoración</label>
                        </div>
                    </div>
                </div>
                <button className="bg-primary rounded-full w-40 p-3  text-white">SEGUIR</button>
            </Form>
        </Formik>


    </div>

}

export default PreguntasFrecuentes