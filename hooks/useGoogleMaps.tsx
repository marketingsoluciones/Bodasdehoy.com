import { useEffect, useState, useRef } from "react";
//@ts-ignore
import GoogleMapsApiLoader from 'google-maps-api-loader';


const apiKey = process.env.NEXT_PUBLIC_API_KEY_CONSOLE_GOOGLE

const eventsMapping = {
  onCenterChanged: ["center_changed", (map: any) => map.getCenter()],
  onBoundsChangerd: ["bounds_changed", (map: any) => map.getBounds()]
};

export default function useGoogleMap({ zoom, center, disableDefaultUI, events } : any) {
  const [mapState, setMapState] = useState<any>({ loading: true });
  const mapRef = useRef();

  useEffect(() => {
    GoogleMapsApiLoader({ apiKey }).then((google : any) => {
      const map = new google.maps.Map(mapRef.current, { zoom, center, disableDefaultUI });
      Object.keys(events).forEach(eventName =>
         //@ts-ignore
        map.addListener(eventsMapping[eventName][0], () =>
         //@ts-ignore
          events[eventName](eventsMapping[eventName][1](map))
        )
      );

      setMapState({ maps: google.maps, map, loading: false });
    });
  }, []);
  return { mapRef, ...mapState };
}
