import { useField } from 'formik';
import { FC, memo } from 'react';
import { capitalize } from '../../utils/Capitalize';

interface propsCheckBox {
    name : string
    label: string
    onChange? : any
    checked : boolean
}
export const Checkbox : FC <propsCheckBox> = memo((props) => {
    const [field, meta, helpers] = useField({...props});
    return (
        <>
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input type={"checkbox"} className="rounded-full w-5 h-5 text-primary checked:text-primary checked:bg-primary transition focus:ring-primary focus:ring-1" {...field} {...props} />
            {capitalize(props?.label)}
        </label>
       
        </>
    )
})

