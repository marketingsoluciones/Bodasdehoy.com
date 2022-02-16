import { Formik, Form, Field } from "formik"
import { InputField } from "../../Inputs"

const LocalizacionMapa = () => {
    return <div className="space-y-5">
        <div className="bg-white rounded-lg p-5">
            <h1 className="text-primary text-2xl text-bold">Modificar localización y mapa </h1>
            <p>Pudes modificar la ubicación sobre el mapa arrastrando hasta el punto deseado</p>
            <p>La dirección debe constar del nombre de la calle seguido de una coma y el resto de datos. Ejemplo: Avenida Alcalde Barnils, 64-68</p>
        </div>

        <div className="bg-white rounded-lg p-5">
            <h1 className="text-primary text-2xl text-bold">Datos de localización</h1>
        </div>

        <div className="bg-white rounded-lg p-5">
            <h1 className="text-primary text-2xl text-bold">Dirección</h1>
        </div>
    </div>
}
export default LocalizacionMapa