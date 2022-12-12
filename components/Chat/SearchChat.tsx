import { FC, useEffect, useState } from "react";

export const SearchChat: FC<any> = ({ onChange }) => {
  const [value, setValue] = useState("");
  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <div className="w-full h-10">
      <input
        placeholder="Buscar chat"
        value={value}
        onChange={handleChange}
        className="pl-4 text-sm py-2 w-full rounded-md focus:outline-none border-b border-color-base"
      />
    </div>
  );
};