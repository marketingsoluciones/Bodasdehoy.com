import { FC, MouseEventHandler, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { BellIcon } from "../Icons";
import { LedIndicator } from "../LedIndicator";

interface propsNotication {
  valir?: boolean;
  value?: number | undefined | null
  onClick: MouseEventHandler<HTMLDivElement> | undefined
}

export const Notification: FC<propsNotication> = ({ valir, value, onClick }) => {
  const [show, setShow] = useState(false)
  console.log(show)
  return (
    <>
      <div className="flex items-center px-4 md:border-l md:border-r md:border-base h-full icon cursor-pointer transition transform hover:-rotate-6 hover:scale-110" onClick={onClick}>
        <button className="relative" onClick={() => setShow(!show)}>
          <BellIcon className="w-7 h-7 text-gray-500" />
          <LedIndicator valir={valir} value={value} />
        </button>
        <ClickAwayListener onClickAway={() => show && setShow(false)}>
          <span className={`${show ? " md:translate-y-12 block absolute top-20 right-7 md:right-80" : "hidden"}`} >
            {/* <NotificacionesMenu /> */}
          </span>
        </ClickAwayListener>
      </div>
    </>

  )

};
