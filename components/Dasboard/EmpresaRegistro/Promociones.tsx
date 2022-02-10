import { Formik, Form } from "formik"
import { InputField } from "../../Inputs"

const Promociones =()=>{

    const initialValues ={
        Promocion : ' ',
        TipoPromocion: ' ',
        Duracion: ' ',
        Descripcion: ' ',

    }

    const handleSubmit =() =>{

    }
    
    return <div className="space-y-5">
        <div className="bg-white rounded-lg p-7 shadow-lg ml-10 mr-10 space-y-5">

            <h1 className="text-primary text-2xl text-bold"> Promociones </h1>

            <div className="bg-color-base rounded-lg p-3 ml-10 mr-10">
                <p className="">
                    si deseas deseas puedes añadir promociones especiales para los novios. Cuanto mejores <br/>
                    sean las ofertas y descuentos que anuncies, mayor interés tendrán los novios en tus <br/>
                    servicios y recibirás más solicitudes de presupuesto 
                </p>
            </div>

            <div className="p-9 space-y-4">
                <div className=" flex flex-row space-y-3 ">
                    <img src="" alt="logo de descuento" />                    
                    <h1 className="text-primary text-2xl text-bold">Descuentos</h1>
                </div>

                <h1 className="text-primary ml-9">Descuentos especiales para los novios de bodas de hoy </h1>
                <p className="ml-9">Ofrece a los novios un descuento por contratar tus servicios.<br/> El descuento se aplicara sobre los servicios contratados</p>

               <div className="flex flex-col items-center space-y-4">

                    <div className="flex flex-row space-x-4">
                        1
                        2
                        3
                        4
                        5
                        6
                    </div>

                    <div className="space-x-3">
                        <input type="checkbox" value="descuento"/>
                        <label htmlFor="descuento">no deseo hacer ningún descuento a los novios</label> 
                    </div>

               </div>
               
            </div>

        </div>

        <div className="bg-white rounded-lg p-7 shadow-lg ml-10 mr-10 space-y-5">

            <h1 className="text-primary text-2xl ">Otras promociones</h1>

            <div className="space-y-5 flex flex-col items-center">
                <img src="" alt="imagen para agregar otras promociones" />
                <h1 className="text-primary text-xl">Publica tu primer promoción</h1>
                <p className="text-center">Consiguirás mas visibilidad en el directiorio <br/> y más posibilidades de conseguir clientes</p>
                <button className="bg-primary text-white p-4 w-36 rounded-full text-xl">Crear</button>
            </div>

            <div>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form>
                        <div className="space-y-4">
                            <InputField
                                name={"Promocion"}
                                type={"text"}
                                placeholder="Nombre de la promoción"
                            />
                            <InputField
                                name={"TipoPromocion"}
                                type={"text"}
                                placeholder="Tipo de la promoción"
                            />
                            <InputField
                                name={"Duracion"}
                                type={"date"}
                                placeholder="Válida hasta"                            
                            />
                             <InputField
                                name={"Descripcion"}
                                type={"textarea"}
                                placeholder="Describe la promoción"                            
                            />

                        </div>
                    </Form>
                </Formik>
            </div>

        </div>

    </div>
}
export default Promociones