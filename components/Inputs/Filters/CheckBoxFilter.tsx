import { BlockFilter } from "./BlockFilter";
import { capitalize } from '../../../utils/Capitalize';
import { FC, MouseEventHandler, useState } from 'react';
import { FiltersContextProvider } from "../../../context/FiltersContext";
import { characteristic } from '../../../interfaces/index';
import {useEffect} from 'react';

interface checkbox {
  _id : string,
  label : string,
}

interface CheckboxProps {
  options : checkbox[]
  label: string
}

// {"total":1,"filters":{"characteristics":"Orlando, Florida, EE. UU."}}
export const CheckBoxFilter : FC <CheckboxProps> = ({options, label}) => {

  return (
    <BlockFilter label={label}>
      <div className="py-2 grid gap-2">
      {options.map((item,idx) => (
        <Checkbox key={idx} {...item} />
      ))}
      </div>
    </BlockFilter>
  );
};




interface propsCheckbox extends checkbox {

}
const Checkbox : FC <propsCheckbox> = ({label, _id}) => {
  const {setFilters, filters} = FiltersContextProvider()
  
  const handleChange = () => {
    if(!filters.filters.characteristics?.includes(_id)){
      setFilters({type: "ADD_CHARACTERISTIC", payload: _id })
    } else {
      setFilters({type: "REMOVE_CHARACTERISTIC", payload: _id })
    }
  }


  
  
  return (
    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
        <input
          type={"checkbox"}
          className="rounded-full border-primary w-4 h-4 text-primary checked:text-primary checked:bg-primary transition focus:ring-primary focus:ring-1"
          checked={filters.filters.characteristics?.includes(_id)}
          onChange={handleChange}
         
        />
        {capitalize(label)}
      </label>
  )
}
