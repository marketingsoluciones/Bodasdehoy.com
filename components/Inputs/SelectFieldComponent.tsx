import { useField } from "formik";
import { FC, memo } from "react";

interface propsSelectField {
  name: string;
  placeholder: string;
  icon?: boolean;
  label?: string;
}

export const SelectField: FC<propsSelectField> = memo(
  ({ icon = false, label, ...props }) => {
    const [{ value }, meta, { setValue }] = useField({ ...props });
    const className: string = `bg-color-base text-sm focus:border focus:border-primary border-transparent focus:ring-transparent pr-3 py-2 rounded-lg w-full focus:outline-none transition text-gray-700 ${
      icon ? "pl-12" : "pl-3"
    }`;
    return (
      <div className="w-full relative">
        <label className="text-sm text-gray-500">{label}</label>
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
          <option value="1">Hola m2undo</option>
          <option value="2">Hola mu2ndo</option>
        </select>
        {meta.touched && meta.error ? (
          <div className="text-red-500 text-xs absolute bottom-0 left-0 pl-1 transform translate-y-full">
            {meta.error}
          </div>
        ) : null}
      </div>
    );
  }
);
