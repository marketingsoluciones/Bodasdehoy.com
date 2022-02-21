import { Formik, Form } from "formik"
import { InputField } from "../../Inputs"
import {IconDescuento} from "../../Icons/index"

const Promociones =()=>{

    const initialValues ={
        Promocion : ' ',
        TipoPromocion: ' ',
        Duracion: ' ',
        Descripcion: ' ',
    }

    const handleSubmit =() =>{

    }

    const Descuentos = [
        "3%",
        "4%",
        "10%",
        "15%",
        "20%",
        "30%",
    ];
    
    return<>
                <div className="bg-white rounded-lg p-7 shadow-lg ml-10 mr-10 space-y-5">
                    <h1 className="text-primary text-2xl text-bold"> Promociones </h1>

                        <p className="bg-color-base rounded-lg p-3 ml-10 mr-10">
                            si deseas deseas puedes añadir promociones especiales para los novios. Cuanto mejores <br/>
                            sean las ofertas y descuentos que anuncies, mayor interés tendrán los novios en tus <br/>
                            servicios y recibirás más solicitudes de presupuesto 
                        </p>
                   
                        <div className=" flex pt-5 pl-10 items-center ">
                            <IconDescuento/>                   
                            <h2 className="text-primary text-xl text-bold">Descuentos</h2>
                        </div>

                        <h3 className="text-primary pl-20">Descuentos especiales para los novios de bodas de hoy </h3>
                        <p className="pl-20">Ofrece a los novios un descuento por contratar tus servicios. El descuento se aplicara sobre los servicios contratados</p>
                        
                        <div className="flex space-x-4 justify-center">
                            {Descuentos.map((item,idx)=>(
                                <div key= {idx} className="border border-primary rounded-full text-primary text-md p-7">
                                    {item}
                                </div>
                            ))}
                        </div>

                        <div className="space-x-3 items-center">
                            <input type="checkbox" value="descuento"/> 
                            <label htmlFor="descuento">no deseo hacer ningún descuento a los novios</label> 
                        </div>                                   
                </div>

                <div className="bg-white rounded-lg p-7 shadow-lg ml-10 mr-10 space-y-5">

                    <h2 className="text-primary text-ml text-bold">Otras promociones</h2>

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

            </>
};
export default Promociones