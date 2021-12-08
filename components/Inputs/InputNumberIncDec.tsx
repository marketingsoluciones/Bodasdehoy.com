import { useField } from "formik";
import { FC } from "react";

interface propsInput {
  name: string
}
const InputNumberIncDec : FC <propsInput> = (props) => {
    const [field, meta, helpers] = useField({...props});

  return (
    <>
      <label className="relative overflow-hidden border border-primary rounded-xl flex items-center">
        <input
          type={"number"}
          className="w-12 mx-0 pl-3 pr-0 border-none  focus:ring-transparent focus:border-gray-200 font-semibold"
          {...props}
          {...field}
        />
        <div className="flex flex-col items-center bg-gray-300 w-8">
          <button
            type={"button"}
            className="w-full bg-white font-medium text-lg  hover:bg-gray-100 transition h-5 flex items-center justify-center"
            onClick={() => helpers.setValue(field.value + 1)}
          >
            +
          </button>
          <button
            type={"button"}
            className="w-full bg-white font-medium text-lg hover:bg-gray-100 transition h-5 flex items-center justify-center"
            onClick={() => helpers.setValue(field.value - 1)}
          >
            -
          </button>
        </div>
        {meta.touched && meta.error ? (
          <div className="text-red text-xs absolute bottom-0 left-0 pl-1 transform translate-y-full">{meta.error}</div>
        ) : null}
      </label>
      <style jsx>
        {`
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        `}
      </style>
    </>
  );
};

export default InputNumberIncDec;
