import {
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { useField } from "formik";
import { useCallback, useState, useRef, FC, useEffect } from "react";
import usePlacesAutoComplete,{getGeocode, getLatLng} from 'use-places-autocomplete'

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};



const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

type marker = {
  lat: number;
  lng: number;
};

interface propsGoogleMapsField {
  name: string;
  label: string;
}
const GoogleMapsField: FC<propsGoogleMapsField> = ({ label, ...props }) => {
  const [ libraries ] = useState(['places']);
  const [marker, setMarker] = useState<marker | null>(null);
  const [center, setCenter] = useState<marker>({
    lat: 40.416729,
    lng: -3.703339,
  })

  const [field, meta, { setValue }] = useField<marker>({ ...props });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY_CONSOLE_GOOGLE ?? "",
    //@ts-ignore
    libraries,
  });

  useEffect(() => {
    field?.value?.lat && setCenter(field.value)
  }, [])

  const onMapClick = useCallback((event: any) => {
    setValue({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  }, []);

  const mapRef: any = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }: { lat: number; lng: number }) => {
    mapRef?.current?.panTo({ lat, lng });
    mapRef?.current?.setZoom(16);
    setValue({lat, lng})
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
                <Search panTo={panTo} center={center} />
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
            <Marker position={field.value} />
          </GoogleMap>
          </div>

              </div>
        </div>
      )}
    </>
  );
};

export default GoogleMapsField;


const Search : FC <any> = ({panTo, center}) => {
  const [selected, setSelected] = useState <google.maps.GeocoderRequest>()
  const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutoComplete({
    requestOptions: {
      //@ts-ignore
      location : {
        lat: () => center.lat,
        lng: () => center.lng,
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
          panTo({lat, lng})
        }
      } catch (error) {
        console.log(error)
      }
  }
  useEffect(() => {
    process()
  }, [selected])
  
  return (
    <div className="relative">
      <input 
        className="px-3 py-2 text-sm w-full focus:outline-none shadow-sm border border-gray-300 mt-2 rounded-lg" placeholder="Buscar dirección"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        
        />
      {status === "OK" && (
        <ul className="text-xs absolute z-20 bg-white w-full">
        {data.map((item:any) => (
          <li 
            key={item.id} 
            className="py-2 px-3 border cursor-pointer hover:bg-gray-100 transition"
            onClick={() => setSelected(item.description)}
          >{item.description}</li>
        ))}
        
      </ul>
      )}
    </div>
  )
}
