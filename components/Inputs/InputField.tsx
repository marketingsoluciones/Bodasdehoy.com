import { useField } from "formik";
import { FC, ReactNode } from "react";

interface propsField {
    name: string
    placeholder : string
    type : string
    autoComplete? : string
    icon?: ReactNode
    label?: string
}
export const InputField : FC <propsField> = ({icon= false, label, ...props}) => {
    const [field, meta, helpers] = useField({...props});
    const className:string = `bg-color-base text-sm focus:border focus:border-primary border-transparent focus:ring-transparent pr-3 py-2 rounded-lg w-full focus:outline-none placeholder-gray-400 text-gray-700 transition ${icon ? "pl-12" : "pl-3"}`
    return (
      <div className="relative">
        <label className="text-sm text-gray-500">{label}</label>
        <div className="relative">
          <input className={className} {...field} {...props} />
        {meta.touched && meta.error ? (
          <span className="text-red-500 text-xs absolute bottom-0 left-0 pl-1 transform translate-y-full">{meta.error}</span>
        ) : null}
        {icon}
        </div>
        <style jsx>
          {`
          input[type=number]::-webkit-inner-spin-button, 
          input[type=number]::-webkit-outer-spin-button { 
            -webkit-appearance: none; 
            margin: 0; 
          }
          `}
        </style>
      </div>
    );
  };