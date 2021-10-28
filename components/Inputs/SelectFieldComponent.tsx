import { useField } from "formik"
import { FC } from "react"

interface propsSelectField {
    name : string
    placeholder: string
}

export const SelectField : FC <propsSelectField> = (props) => {
    const [{ value }, meta, { setValue } ] = useField({...props})
    const className:string = "bg-color-base focus:border focus:border-primary border-transparent focus:ring-transparent pr-3 pl-12 py-2 rounded-lg w-full focus:outline-none transition"
    return (
        <div className="w-full">
            <select value={value} onChange={(e) => setValue(e.target.value)} className={className}>
                <option>Hola mundo</option>
                <option>Hola m2undo</option>
                <option>Hola mu2ndo</option>
            </select>
        </div>
    )
}

