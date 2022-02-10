import { useField } from "formik";
import { FC } from "react";
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'))

interface propsTextEditor {
  name: string;
  label: string
}
const TextEditorRich: FC<propsTextEditor> = ({label, ...props}) => {
  const [{ value }, meta, { setValue }] = useField({ ...props });
  return (
    <div className="relative flex flex-col gap-2">
     <span className="flex items-center gap-2">
        <label className="text-sm text-gray-500">{label}</label>
        {meta.touched && meta.error ? (
          <span className="text-red-500 text-xs font-medium ">
            {meta.error}
          </span>
        ) : null}
      </span>
      <ReactQuill
        value={value?? ""}
        onChange={(value) => setValue(value)}
        theme={"snow"}
      />
      
    </div>
  );
};

export default TextEditorRich;
