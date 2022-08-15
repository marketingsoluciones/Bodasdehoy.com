import { FC, MouseEventHandler } from "react";


interface propsGoToGoogleMaps {
  lat: number;
  lng: number;
  zoom: number;
  businessName: string;
}

export const GoToGoogleMaps: FC<propsGoToGoogleMaps> = ({ lat, lng, zoom, businessName }) => {
  const onClick: MouseEventHandler<HTMLDivElement> | undefined = () => {
    window.open(`https://maps.google.com/maps?ll=${lat},${lng}&z=${zoom}&t=m&hl=es-ES&gl=ES&mapclient=embed&q=${businessName}`, '_blank');
  }
  return (
    <div className="bg-white text-center text-xs p-3 w-30 h-10 absolute top-2 left-2 border-solid border-sm border-gray-400 rounded shadow-md cursor-pointer" onClick={onClick}>
      ir a google Maps
    </div >
  )
}
