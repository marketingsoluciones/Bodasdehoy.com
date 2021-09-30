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
    const className:string = "bg-base pr-3 pl-12 py-2 rounded-xl w-full focus:outline-none focus:ring transition"
    return (
      <>
          <input className={className} {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };