import { useField } from "formik";
import { FC, memo } from "react";

interface propsSelectField {
  name: string;
  placeholder?: string;
  icon?: boolean;
  label?: string;
  options : string[]
}

export const SelectField: FC<propsSelectField> = memo(
  ({ icon = false, label, options, ...props }) => {
    const [{ value }, meta, { setValue }] = useField({ ...props });
    const className: string = `bg-color-base text-sm focus:border focus:border-primary border-transparent focus:ring-transparent pr-3 py-2 rounded-lg w-full focus:outline-none transition text-gray-700 ${
      icon ? "pl-12" : "pl-3"
    }`;
    return (
      <div className="w-full relative">
        <span className="flex items-center gap-2">
        <label className="text-sm text-gray-500 pb-1">{label}</label>
        {meta.touched && meta.error ? (
          <span className="text-red-500 text-xs font-medium ">
            *
          </span>
        ) : null}
      </span>
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={className}
        >
          <option
            value={"0"}
            selected
            disabled={value !== ""}
            className="bg-gray-200"
          >
            Seleccionar
          </option>
          {options?.map((option, idx) => (
            <option key={idx} value={option}>{option}</option>
          ))}
          
        </select>
        
      </div>
    );
  }
);
