import dayjs from "dayjs";
import { useField } from "formik";
import { FC, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

interface propsDatePicker {
    name : string
}
export const DatePicker : FC <propsDatePicker> = (props) => {
  const [show, setShow] = useState(false);
  const [field, meta, helpers] = useField(props);
  const className:string = `bg-color-base ${show ? "border border-primary" : "border border-transparent"} focus:ring-transparent pr-3 pl-12 py-2 rounded-lg w-full focus:outline-none transition`
  return (
    <ClickAwayListener onClickAway={() => show && setShow(false)}>
      <div className="relative w-full">
        <div
          className={className}
          onClick={() => setShow(!show)}
        >
            <p className="text-sm">{field?.value && dayjs(field.value).format("DD-MM-YYYY")}</p>
          
          {meta.touched && meta.error ? (
         <div className="error text-red-500 text-xs absolute pl-1 bottom-0 left-0 transform translate-y-full">{meta.error}</div>
       ) : null}
        </div>

        {show && <DateComponent setState={(act : boolean) => setShow(act)} set={(day : Date) => helpers.setValue(day)} />}
      </div>
    </ClickAwayListener>
  );
};


interface propsDateComponent {
    set : CallableFunction
    setState : CallableFunction
}
const DateComponent : FC <propsDateComponent> = ({ set, setState }) => {
    const handleClickDay = (day : Date) => {
        set(day)
        setState(false)
    } 
  return (
    <>
      <div className="fixed mx-auto inset-x-0 top-1/4 w-max  bg-white rounded-lg p-2 z-30  ">
        <DayPicker onDayClick={handleClickDay} />
      </div>
      <style jsx>
        {`
          .date-picker {
            opacity: 0;
          }
          .date-picker-enter {
            opacity: 0;
          }
          .date-picker-enter-active {
            opacity: 1;
            transition: opacity 200ms;
          }
          .date-picker-exit {
            opacity: 1;
          }
          .date-picker-exit-active {
            opacity: 0;
            transition: opacity 200ms;
          }
        `}
      </style>
    </>
  );
};
