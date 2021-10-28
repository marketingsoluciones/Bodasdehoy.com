import { useField } from "formik";
import { FC } from "react";

interface propsField {
    name: string
    placeholder : string
    type : string
    autoComplete? : string
}
export const InputField : FC <propsField> = (props) => {
    const [field, meta, helpers] = useField({...props});
    const className:string = "bg-color-base focus:border focus:border-primary border-transparent focus:ring-transparent pr-3 pl-12 py-2 rounded-lg w-full focus:outline-none transition"
    return (
      <>
          <input className={className} {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="text-red text-xs absolute bottom-0 left-0 pl-1 transform translate-y-full">{meta.error}</div>
        ) : null}
        <style jsx>
          {`
          input[type=number]::-webkit-inner-spin-button, 
          input[type=number]::-webkit-outer-spin-button { 
            -webkit-appearance: none; 
            margin: 0; 
          }
          `}
        </style>
      </>
    );
  };