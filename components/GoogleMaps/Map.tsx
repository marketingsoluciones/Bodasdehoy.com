import useGoogleMap from "../../hooks/useGoogleMaps";
import { FC, Children, cloneElement, useEffect } from 'react';

const Map : FC <any> = ({ center , zoom, children, disableDefaultUI,  events }) => {
    const { maps, map, mapRef, loading } = useGoogleMap({ zoom, center, disableDefaultUI, events });

    useEffect(
        () => {
          map && map.panTo(center);
        },
        [center.lat, center.lng]
      );

    return (
       
    <div className="h-96 w-full">
      <div ref={mapRef} className="map-ref h-full" />
      {!loading &&
        Children.map(children, child => {
          return cloneElement(child, { map, maps });
        })}
    </div>
    )
}

export default Map

