import { Formik,Form,Field } from "formik"
import { InputField } from "../../Inputs";

export const FormularioContacto = () => {
    
    const initialValues = {
     contacto: '',
     email:'',
     page:'',
     tmovil:'',
     tfijo:''

    };

    const handleSubmit = ( ) => {
        console.log({initialValues})
    }

return <div className="  bg-white rounded-lg p-5 ">
     <h1 className="text-primary text-2xl mb-3" >Datos de Contacto</h1>
        <div className=" items-center pl-10 pr-10">
            <Formik initialValues={initialValues} onSubmit={handleSubmit} >
            <Form>
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
                
            {/* <button type="submit"  className="">Submit</button> */}
            </Form>
        </Formik>
     </div>
</div>
}

export const FormularioEmpresa = () => {
    
    const initialValues = {
        nombre: '',
        pais:'',
        ciudad:'',
        postal:'',
        direccion:''
   
       };
   
    const handleSubmit = ( ) => {
           console.log({initialValues})
       }

    return <div className=" bg-white rounded-lg p-5">
        <h1 className="text-primary text-2xl mb-3" >Tu empresa</h1>
        <div className="items-center pl-10 pr-10">
            <Formik initialValues={initialValues} onSubmit={handleSubmit} >
                <Form>
                    <div className="w-fit mb-3">
                        <InputField 
                            name={"nombre"}
                            type={"text"}
                            placeholder="Nombre de tu empresa"
                        /> 
                    </div>
                <div className="grid grid-cols-2 mb-3 gap-4 ">
                    
                        <InputField
                            name={"pais"}
                            type={"text"}
                            placeholder="pais"
                        />
                    
                    
                        <InputField
                            name={"ciudad"}
                            type={"text"}
                            placeholder="ciudad"
                        />

                        <InputField
                            name={"postal"}
                            type={"number"}
                            placeholder="codigo postal"
                        />

                        <InputField
                            name={"direccion"}
                            type={"number"}
                            placeholder="dirección"
                        />
                    
                </div>
            {/* <button type="submit"  className="">Submit</button> */}
            </Form>
        </Formik>
        </div>
</div>
}

export const FormularioActividad = () => {
    const initialValues = {
        nombre: '',
        pais:'',
        ciudad:'',
        postal:'',
        direccion:''
   
       };
   
    const handleSubmit = ( ) => {
           console.log({initialValues})
       }
    return <div className="bg-white rounded-lg p-10" >
        <h1 className="text-primary text-2xl mb-3" >Sector de Actividad</h1>

        <Formik initialValues={initialValues} onSubmit={handleSubmit} >
         <Form>
            <div className="flex justify-items-center grid grid-cols-3 space-y-5 mb-10 "> 
          
                        <div role="group" className="flex flex-col space-y-2 mt-5 ">
                            <h1 className="text-primary text-xl">Novias</h1>
                            <label><Field type="checkbox" name="checked" value="VestidosNovia"/> Vestidos de novia</label>
                            <label><Field type="checkbox" name="checked" value="ComplementosNovias"/> Complementos</label>
                            <label><Field type="checkbox" name="checked" value="BellazaNovias"/> Belleza para novias</label>
                            <label><Field type="checkbox" name="checked" value="JoyeriaNovias"/> Joyería</label>
                            <label><Field type="checkbox" name="checked" value="TrajesFiesta"/> Trajes de fiesta</label>
                        </div>
                        <div role="group" className="flex flex-col space-y-2">
                            <h1 className="text-primary text-xl">Novios</h1>
                            <label><Field type="checkbox" name="checked" value="TrajesNovios"/> Trajes para novios</label>
                            <label><Field type="checkbox" name="checked" value="ComplementosNovios"/> Complementos para novios</label>
                            <label><Field type="checkbox" name="checked" value="AlquilerTrajes"/> Alquiler de trajes</label>
                            <label><Field type="checkbox" name="checked" value="JoyeriaNovios"/> Joyería</label>
                        </div>
                        <div role="group" className="flex flex-col space-y-2">
                            <h1 className="text-primary text-xl">Lugares para bodas</h1>
                            <label><Field type="checkbox" name="checked" value="Fincas"/> Fincas</label>
                            <label><Field type="checkbox" name="checked" value="Hoteles"/> Hoteles</label>
                            <label><Field type="checkbox" name="checked" value="Restaurantes"/> Restaurantes</label>
                            <label><Field type="checkbox" name="checked" value="Salones"/> Salones</label>
                            <label><Field type="checkbox" name="checked" value="Bodegas"/> Bodegas</label>
                            <label><Field type="checkbox" name="checked" value="Castillos"/> Castillos</label>
                        </div>
                        <div role="group" className="flex flex-col space-y-2 pr-14">
                            <h1 className="text-primary text-xl">Catering</h1>
                            <label><Field type="checkbox" name="checked" value="Banquete"/> Banquete</label>
                            <label><Field type="checkbox" name="checked" value="Cocteleria"/> Cocteleria</label>
                            <label><Field type="checkbox" name="checked" value="Tartas"/> Tartas</label>
                            <label><Field type="checkbox" name="checked" value="Camareros"/> Camareros</label>
                        </div>
                        <div role="group" className="flex flex-col space-y-2 pr-16">
                            <h1 className="text-primary text-xl">Decoración</h1>
                            <label><Field type="checkbox" name="checked" value="Floristería"/> Floristeria</label>
                            <label><Field type="checkbox" name="checked" value="Mobiliario"/> Mobiliario</label>
                            <label><Field type="checkbox" name="checked" value="Papeleria"/> Papelería</label>
                            <label><Field type="checkbox" name="checked" value="Planner"/> Wedding Planner</label>
                        </div>
                        <div role="group" className="flex flex-col space-y-2 pr-7">
                            <h1 className="text-primary text-xl">Servicios</h1>
                            <label><Field type="checkbox" name="checked" value="Fotografos"/> Fotógrafos</label>
                            <label><Field type="checkbox" name="checked" value="Animacion"/> Animación</label>
                            <label><Field type="checkbox" name="checked" value="Coches"/> Coches</label>
                            <label><Field type="checkbox" name="checked" value="MusicaSonido"/> Música y sonido</label>
                        </div>
                        <div role="group" className="flex flex-col space-y-2 pr-3">
                            <h1 className="text-primary text-xl">Viajes de novios</h1>
                            <label><Field type="checkbox" name="checked" value="Viajes"/> Agencia de viajes</label>
                        </div>


           </div>
           {/* <button type="submit"  className="">Submit</button> */}
         </Form>
     </Formik>

    </div>
}

export const MultiFormulario = () => {
    return <div className="space-y-5">
        <FormularioContacto/>
        <FormularioEmpresa/>
        <FormularioActividad/>
    </div>
}