import React, { FC, useEffect } from "react";
import { Search } from "../GoogleMaps/GoogleMapsField";
import { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { geolocation } from "../../interfaces";
import { useField } from "formik";

interface propsInputCity {
    name : string
    type : string
    label: string
}
const InputCity : FC <propsInputCity> = ({type, label, ...props}) => {
  //@ts-ignore
  const [field, meta, { setValue }] = useField<string>({ ...props });
  const [libraries] = useState(["places", "geometry"]);


  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY_CONSOLE_GOOGLE ?? "",
    //@ts-ignore
    libraries,
  });
  const [geolocation, setGeolocation] = useState<geolocation>({
    lat: 40.416729,
    lng: -3.703339,
  });

  useEffect(() => {
    const success = (data: any) => {
      console.log(data);
      const geolocation = {
        lat: data?.coords?.latitude,
        lng: data?.coords?.longitude,
      };
      data && setGeolocation(geolocation);
    };
    const error = (error: any) => {
      console.log(error);
    };
    if (window?.navigator) {
      window.navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);

  return (
  <div>
      <span className="flex items-center gap-2">
        <label className="text-sm text-gray-500">{label}</label>
        {meta.touched && meta.error ? (
          <span className="text-red-500 text-xs font-medium ">
            {JSON.stringify(meta.error)}
          </span>
        ) : null}
      </span>
  {!loadError && isLoaded && <Search center={geolocation} types={["(cities)"]} getAddress={(address: string) => setValue(address) } initialValue={field.value} />}
  </div>);
};

export default InputCity;



