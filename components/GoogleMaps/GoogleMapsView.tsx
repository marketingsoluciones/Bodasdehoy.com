import {
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { useCallback, useRef, useState, FC } from "react";
import { coordinates } from '../../interfaces/index';

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};


const center = {
  lat: 40.416729,
  lng: -3.703339,
};

const options = {
  disableDefaultUI: true,
  zoomControl: false,
};

const GoogleMapsView : FC <coordinates> = ({lat, lng}) => {
  const [ libraries ] = useState(['places']);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY_CONSOLE_GOOGLE ?? "",
    //@ts-ignore
    libraries
  });

  const mapRef: any = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={11}
          center={lat ? {lat, lng} : center}
          options={options}
          onLoad={onMapLoad}
        >
          <Marker position={{lat,lng}} />
        </GoogleMap>
      )}
    </>
  );
};

export default GoogleMapsView;
