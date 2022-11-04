import { BurbujaChat } from "./BurbujaChat";
import {useState} from 'react';
import { capitalize } from '../../../utils/Capitalize';
import { Tooltip } from "../../Tooltip";
import { BlockConfiguration } from "../../../pages/configuracion";

export const Notificaciones = () =>{
    const [isActived, setActived] = useState(0)
    const sections = [
        {title: "no leídas"},
        {title: "todas"},
    ]
    return(
      <BlockConfiguration title={"Notificaciones"}>
                <div className=" flex border-t border-b border-color-base text-sm p-2 gap-2 ">
                    {sections.map((section, idx) => (
                        <button key={idx} onClick={() => setActived(idx)}
                        className={`transition  px-3 py-1 rounded-xl ${isActived === idx ? "bg-primary text-white" : "text-gray-700 hover:bg-primary hover:text-white"}`} color="primary" type="submit">{section.title && capitalize(section.title)}</button>      
                    ))}
                </div>
                <div className="grid grid-cols-1 gap-6 mt-6">
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                </div>
        </BlockConfiguration>
    )
}


export const NotificationItem = () => {
  return (
    <div className="w-full bg-color-base h-20 rounded-xl flex items-center p-2 gap-3">
        <img alt={"Perfilimg"} className="w-14 h-14 rounded-full object-cover object-center border-2 border-white" src="/placeholder/user.png" />
        <Tooltip tooltipText="Francisco Montilla">
        <h2 className="text-xs truncate w-10 md:w-20">Francisco Montilla</h2>
        </Tooltip>
        <div className="w-full bg-white h-full rounded-xl text-xs md:text-sm p-3 overflow-auto no-scrollbar">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta, dolorum.
        </div>
    </div>
  )
}
