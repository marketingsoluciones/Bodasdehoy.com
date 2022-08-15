import {
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { useCallback, useRef, useState, FC, useEffect } from "react";
import { coordinates } from '../../interfaces/index';
import { marker } from './GoogleMapsField';
import { GoToGoogleMaps } from "./GoToGoogleMaps";

const centerDefault = {
  lat: 40.416729,
  lng: -3.703339,
};

const zoom = 14

const options = {
  disableDefaultUI: true,
  streetViewControl: true,
  scaleControl: true,
  zoomControl: true,
  fullscreenControl: true,
  gestureHandling: "greedy",
  zoom,
  minZoom: zoom - 3,
  maxZoom: zoom + 8,
  restriction: {
    latLngBounds: {
      north: 0,
      south: 0,
      east: 0,
      west: 0
    }
  }
};

interface propsGoogleMapsView extends marker {
  businessName: string
}

const GoogleMapsView: FC<propsGoogleMapsView> = ({ lat, lng, businessName }) => {
  const center = lat ? { lat, lng } : centerDefault
  options.restriction = {
    latLngBounds: {
      north: center.lat + 0.20,
      south: center.lat - 0.20,
      east: center.lng + 0.45,
      west: center.lng - 0.45,
    },
  }

  const [height, setHeight] = useState("400px")

  useEffect(() => {
    const widthScreen = Math.max(document?.documentElement?.clientWidth, window?.innerWidth || 0)
    if (window?.innerWidth < 768) {
      setHeight("200px")
    } else {
      setHeight("400px")
    }
  }, [])

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window?.innerWidth < 768) {
        setHeight("200px")
      } else {
        setHeight("400px")
      }
    });
    return () => {
      window.removeEventListener("resize", () => { })
    }
  }, [])

  const [libraries]: any = useState(["places"]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY_CONSOLE_GOOGLE ?? "",
    libraries
  });

  const mapRef: any = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  return (
    <>
      {isLoaded && (
        <div className="relative">
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: height,
            }}
            center={center}
            options={options}
            onLoad={onMapLoad}
          >
            <Marker
              position={center}
            // label={{
            //   text: businessName,
            //   className: "background-color: #f18973;",
            //   color: "blue",
            //   fontFamily: "",
            //   fontSize: "20px",
            //   fontWeight: "900"
            // }}
            />
          </GoogleMap>
          <GoToGoogleMaps lat={center.lat} lng={center.lng} zoom={zoom} businessName={businessName} />
        </div>
      )}
    </>
  );
};

export default GoogleMapsView;
