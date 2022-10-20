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
      console.log("pais", data.translations?.spa?.common)
      //item => ({ name: item?.translations?.spa?.common.toLowerCase() })
      const map = data?.map((item: any) => item?.translations?.spa?.common).sort((a: any, b: any) => a.localeCompare(b));
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
