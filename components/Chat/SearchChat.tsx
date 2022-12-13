import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { ArrowLeft, SearchIcon } from "../Icons";

interface propsSearchChat {
  onChange: Dispatch<any>
  activeSearch: boolean | undefined;
  setActiveSearch: Dispatch<SetStateAction<boolean>>
}

export const SearchChat: FC<propsSearchChat> = ({ onChange, activeSearch, setActiveSearch }) => {
  const [value, setValue] = useState("");
  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    onChange(value);
    console.log(123, value)
  }, [value]);

  return (
    <>
      <div className="h-10 grid grid-cols-8 content-center pr-2">
        <div
          className="bg-white flex justify-center items-center"
          onClick={
            () => {
              setActiveSearch(!activeSearch)
              activeSearch ? setValue("") : document.getElementById("search")?.focus()
            }
          }
        >
          {!activeSearch ? <SearchIcon className="w-4 h-4" onClick={() => { }} /> : <ArrowLeft className="w-6 h-6" onClick={() => { }} />}
        </div>
        <div className="bg-white col-span-7">
          <input
            id="search"
            placeholder="Buscar chat"
            value={value}
            onChange={handleChange}
            onFocus={() => { setActiveSearch(!activeSearch) }}
            className="w-full h-8 pl-2 text-sm rounded-md focus:outline-none border-b border-color-base"
          />
        </div>
      </div>
    </>
  );
};