import { useField } from 'formik';
import { FC } from 'react';

interface propsCheckBox {
    name : string
    label: string
    onChange? : any
    checked : boolean
}
export const Checkbox : FC <propsCheckBox> = (props) => {
    const [field, meta, helpers] = useField({...props});
    return (
        <>
        <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type={"checkbox"} className="rounded-full w-5 h-5 text-primary checked:text-primary checked:bg-primary transition focus:ring-primary focus:ring-1" {...field} {...props} />
            {props?.label}
        </label>
        {/* <style jsx>
            {`
            [type='checkbox'], [type='radio']{
                color: red
            }
            `}
        </style> */}
        </>
    )
}

