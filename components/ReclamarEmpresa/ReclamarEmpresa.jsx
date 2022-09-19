import ModalReclarEmpresa from "./ModalReclamarEmpresa"
import { useState } from "react"
const ReclamarEmpresa = () => {

    const [showForm, setShowForm] = useState(true)
    return (
        <>
            {showForm ? (
                <ModalReclarEmpresa set={setShowForm} state={showForm}/>
            ) : null}
        </>
    )

}
export default ReclamarEmpresa