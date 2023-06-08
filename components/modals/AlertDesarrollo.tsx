/* Code generated with AutoHTML Plugin for Figma */
import { FC } from "react";
import { WarningIcon } from "../Icons";

interface propsAlertDesarrollo{
  alertDev: boolean
  setAlertDev: any 
}

export const AlertDesarrollo:FC<propsAlertDesarrollo> = ({ alertDev, setAlertDev }) => {
  return (
    <>
      <div className="z-50 fixed top-0 left-0 w-screen h-screen overflow-hidden" />
      <div className=" bg-gray-500 bg-opacity-75 z-50 fixed top-0 left-0 w-screen h-screen overflow-hidden transition-opacity " />

      <div
        className="bg-white inset-0 m-auto z-50 fixed rounded-lg pl-3 flex flex-col md:flex-row gap-3 items-center md:w-[549px] h-[150px] md:h-[100px] "
        style={{ boxShadow: "var(--_01-shadows-light-z-8-box-shadow, 0px 8px 16px 0px rgba(145, 158, 171, 0.16))" }}
      >

        <div className="rounded-xl shrink-0 w-10 h-10 relative overflow-hidden">
          <WarningIcon />
        </div>

        <div
          className=" text-left relative md:w-[333px] text-gray-700"
          style={{font: "var(--subtitle-2, 600 14px/22px 'Public Sans', sans-serif)"}}
        >
          Esta sección esta en desarrollo, para habilitarla, necesita suscribirse
          para incentivar la activación.
        </div>

        <div className="flex flex-row md:flex-col md:w-[142px] relative gap-3">

            <div
              onClick={() => setAlertDev(!alertDev)}
              className=" cursor-pointer text-center  md:w-16 h-[31px] border flex items-center  justify-center p-3 rounded-lg "
              style={{font: "var(--_01-button-03-small, 700 13px/22px 'Public Sans', sans-serif)"}}
            >
              No
            </div>

            <div
              onClick={() => setAlertDev(!alertDev)}
              className="cursor-pointer text-center relative md:w-16 h-[31px] border flex items-center justify-center p-3 rounded-lg"
              style={{
                font: "var(--_01-button-03-small, 700 13px/22px 'Public Sans', sans-serif)",
              }}
            >
              Yes
            </div>

        </div>
      </div>
    </>
  );
};
