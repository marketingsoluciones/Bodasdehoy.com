import {
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { useField } from "formik";
import { useCallback, useState, useRef, FC, useEffect, cloneElement, Children } from "react";
import usePlacesAutoComplete,{getGeocode, getLatLng} from 'use-places-autocomplete'
import { CloseIcon, Location2Icon } from '../Icons/index';
import { geolocation, coordinates } from '../../interfaces/index';
import { FiltersContextProvider } from "../../context/FiltersContext";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

export type marker = {
  lat: number;
  lng: number;
};

interface propsGoogleMapsField {
  name: string;
  label: string;
}
// [, 40.416729]
const GoogleMapsField: FC<propsGoogleMapsField> = ({ label, ...props }) => {
  const [ libraries ] = useState(['places', 'geometry']);
  const [center, setCenter] = useState<marker>({
    lng: -3.703339,
    lat : 40.416729
  })
  const [field, meta, { setValue }] = useField<coordinates>({ ...props });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY_CONSOLE_GOOGLE ?? "",
    //@ts-ignore
    libraries,
  });

  useEffect(() => {
    field?.value && setCenter({
      lng : field.value.coordinates[0],
      lat: field.value.coordinates[1]
    })
  }, [field.value])

  const onMapClick = useCallback((event: any) => {
    setValue({
      type: "Point",
      coordinates: [event.latLng.lng(), event.latLng.lat()]
    });
  }, []);
  
  const mapRef: any = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  
  const panTo = useCallback(({ lat, lng }: marker) => {
    mapRef?.current?.panTo({ lat, lng });
    mapRef?.current?.setZoom(16);
    setValue({
      type: "Point",
      coordinates:[lng, lat]
    });
    
  }, []);

  return (
    <>
      {isLoaded && (
        <div className="w-full">
          <span className="flex items-center gap-2">
            <label className="text-sm text-gray-500">{label}</label>
            {meta.touched && meta.error ? (
              <span className="text-red-500 text-xs font-medium ">
                {meta.error}
              </span>
            ) : null}
          </span>

              <div className="relative w-full">
                <Search panTo={panTo} center={center}   />
                <div className="pt-3">
                  <p className="text-xs font-bold text-primary pb-2 text-center">Selecciona la ubicación con el click derecho</p>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={18}
            center={center}
            options={options}
            onRightClick={onMapClick}
            onLoad={onMapLoad}
          >
            {field?.value?.coordinates?.length > 0 && <Marker position={center} />}
          </GoogleMap>
          </div>

              </div>
        </div>
      )}
    </>
  );
};

export default GoogleMapsField;


interface propsSearchPlaces {
  panTo? : CallableFunction,
  center: geolocation
  initialValue? : string
  slice? : boolean
  types?: string[]
  getAddress? : CallableFunction
}
export const Search : FC <propsSearchPlaces> = ({panTo, center, initialValue, slice = false, children, types = [], getAddress}) => {
  const {filters} = FiltersContextProvider()
  const [Child, setChild] = useState<any>(Children.toArray(children))
  const [selected, setSelected] = useState <google.maps.GeocoderRequest | string>()
  const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutoComplete({
    cacheKey: "autocomplete-google",
    cache: false,
    requestOptions: {
      types,
      //@ts-ignore
      location : {
        lat: () => center?.lat,
        lng: () => center?.lng,
      },
      radius: 200 * 1000
    }
  })

  const process = async() => {
    //@ts-ignore
    setValue(selected, false)
    clearSuggestions()
      try {
        if(selected){
          //@ts-ignore
          const results = await getGeocode({address: selected})
          const {lat, lng} = await getLatLng(results[0])
          getAddress && getAddress(selected)
          panTo && panTo({lat, lng})
        }
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(() => {
    process()
  }, [selected])

  useEffect(() => {
    initialValue && setSelected(initialValue)
  }, [])

  useEffect(() => {
    !initialValue && !filters?.filters?.city && setSelected("")
  }, [filters, initialValue])
  

  return (
    <div className="relative">
      <span className="relative">
      <Location2Icon className="text-primary absolute w-4 h-4 inset-y-0 my-auto left-5" />
      <input 
        className="w-full bg-color-base rounded-full h-10 focus:outline-none px-12 text-sm text-gray-500" placeholder="Buscar"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={selected !== ""}
      />
  {selected !== "" && <CloseIcon onClick={() => setSelected("")} className="absolute right-5 text-gray-700 cursor-pointer inset-y-0 my-auto z-20 w-4 h-4" />}
      </span>
      {status === "OK" && (
        <ul className="text-xs absolute z-20 bg-white w-full text-gray-500">
        {data?.slice(0,slice ? 1 : undefined)?.map((item: google.maps.places.AutocompletePrediction) => (
          <li 
            key={item.place_id} 
            className="py-2 px-3 border-b cursor-pointer hover:bg-gray-100 transition relative"
            onClick={() => setSelected(item.description)}
          >{item.description} </li>
        ))}
        
      </ul>
      )}
      {Child.length > 0 && cloneElement(Child[0], {selected})}
    </div>
  )
}
