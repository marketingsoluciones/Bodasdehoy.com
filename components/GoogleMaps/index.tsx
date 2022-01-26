import Map from "./Map";
import { FC, useState } from 'react';
import Marker from "./Marker";

const GoogleMaps : FC <any> = ({ coordenadas }) => {
  const [bound, setBound] = useState({});
  return (
    <Map
      zoom={10}
      center={{
        lat: coordenadas[0],
        lng: coordenadas[1],
      }}
      disableDefaultUI={true}
      events={{ onBoundsChangerd: (arg : any) => setBound(arg) }}
    >
      {/* <Marker
        title={"marker id: " + 2}
        active={false}
        position={{ lat: coordenadas[0], lng: coordenadas[1] }}
        onClick={() => {}}
      /> */}
     
    </Map>
  );
};

export default GoogleMaps;
