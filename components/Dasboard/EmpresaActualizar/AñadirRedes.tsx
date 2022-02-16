import { Formik, Form  } from "formik"
import { InputField } from "../../Inputs"

const AñadirRedes = () => {
    const initialValues = {

    }

    const handleSubmit = () =>{

    }



    return <div className="space-y-5">
        <div className="bg-white rounded-lg p-5"> 
            <h1 className="text-primary text-2xl text-bold">Redes Sociales</h1>
            <p>Indícanos los perfiles de tus redes Sociales y la posibilidad de que publiquemos una foto tuya será mucho más alta. Además, te mencionaremos cuando hagamos 
                una publicación con una foto tuya.
            </p>
        </div>

        <div className="bg-white rounded-lg p-5" >
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form className="space-y-5">
                    <div className=" flex flex-row ">
                        <img src="" alt="logo" />
                        <InputField
                            name = {"facebook"}
                            type = {"text"}
                            placeholder ="www.facebook.com/tu-empresa"
                        />
                    </div>
                    <div className=" flex flex-row">
                        <img src="" alt="logo" />
                            <InputField
                                name = {"instagram"}
                                type = {"text"}
                                placeholder ="www.instagram.com/tu-empresa"
                            />
                    </div>
                    <div className=" flex flex-row">
                        <img src="" alt="logo" />
                            <InputField
                                name = {"twitter"}
                                type = {"text"}
                                placeholder ="www.twitter.com/tu-empresa"
                            />
                    </div>
                    <div className=" flex flex-row">
                        <img src="" alt="logo" />
                            <InputField
                                name = {"pinterest"}
                                type = {"text"}
                                placeholder ="www.pinterest.com/tu-empresa"
                            />
                    </div>

                </Form>
            </Formik>
        </div>
    </div>
}
export default AñadirRedes 