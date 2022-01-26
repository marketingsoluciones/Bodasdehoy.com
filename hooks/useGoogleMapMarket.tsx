import { useEffect, useState } from "react";

const eventMapping = {
  onClick: "click",
  onDoubleClick: "dblclick"
};

export default function useGoogleMapMarker({
  position,
  type,
  maps,
  map,
  events,
  title
} : any) {
  const [marker, setMarker] = useState();
  useEffect(() => {
    const marker = new maps.Marker({
      position,
      map,
      title
    });
    Object.keys(events).forEach(eventName =>
      //@ts-ignore
      marker.addListener(eventMapping[eventName], events[eventName])
    );
    setMarker(marker);
  }, []);

  return marker;
}
