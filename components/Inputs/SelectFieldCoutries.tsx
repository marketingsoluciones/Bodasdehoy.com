import { FC, useEffect, useState } from "react";
import { SelectField } from ".";
import { api } from "../../api";
interface propsSelectFieldCountries {
  name: string;
  label: string;
}
const SelectFieldCoutries: FC<propsSelectFieldCountries> = (props) => {
  const [countries, setCountries] = useState([]);

  const fetchCountries = async () => {
    try {
      const { data } = await api.restCountries();
      const map = data?.map((item: any) => item.name.common).sort((a: any,b : any) => a.localeCompare(b));
      setCountries(map);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return <SelectField {...props} options={countries} />;
};

export default SelectFieldCoutries;
