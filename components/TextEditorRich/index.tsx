import { useField } from "formik";
import { FC } from "react";
import ReactQuill from "react-quill";

interface propsTextEditor {
  name: string;
}
const TextEditorRich: FC<propsTextEditor> = (props) => {
  const [{ value }, meta, { setValue }] = useField({ ...props });
  return (
    <div className="relative flex flex-col gap-2">
      <ReactQuill
        value={value}
        onChange={(value) => setValue(value)}
        theme={"snow"}
      />
      {meta.touched && meta.error ? (
          <span className="text-red text-xs absolute bottom-0 left-0 pl-1 transform translate-y-full">{meta.error}</span>
        ) : null}
    </div>
  );
};

export default TextEditorRich;
