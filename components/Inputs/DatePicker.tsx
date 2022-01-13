import { useField } from "formik";
import { FC, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import { format } from "../../utils/FormatTime";
import { EmailIcon as DateIcon } from "../Icons";

interface propsDatePicker {
  name: string;
  label?: string;
}
export const DatePicker: FC<propsDatePicker> = (props) => {
  const [show, setShow] = useState(false);
  const [field, meta, helpers] = useField(props);
  const className: string = `bg-color-base ${
    show ? "border border-primary" : "border border-transparent"
  } focus:ring-transparent pr-3 pl-3 py-2 rounded-lg w-full focus:outline-none transition flex items-center gap-2 `;
  return (
    <ClickAwayListener onClickAway={() => show && setShow(false)}>
      <div className="relative w-full">
        <label className="text-sm text-gray-500">{props.label}</label>
        <div className={className} onClick={() => setShow(!show)}>
          <DateIcon className="text-gray-500 w-5 h-5" />
          <p className="text-sm text-gray-700">
            {field?.value && format(field.value, "es")}
          </p>

          {meta.touched && meta.error ? (
            <div className="error text-red-500 text-xs absolute pl-1 bottom-0 left-0 transform translate-y-full">
              {meta.error}
            </div>
          ) : null}
        </div>

        {show && (
          <DateComponent
            setState={(act: boolean) => setShow(act)}
            set={(day: Date) => helpers.setValue(day)}
          />
        )}
      </div>
    </ClickAwayListener>
  );
};

interface propsDateComponent {
  set: CallableFunction;
  setState: CallableFunction;
}
const DateComponent: FC<propsDateComponent> = ({ set, setState }) => {
  const handleClickDay = (day: Date) => {
    set(day);
    setState(false);
  };
  return (
    <>
      <div className="fixed mx-auto inset-x-0 top-1/4 w-max  bg-white rounded-lg p-2 z-30 text-gray-600  ">
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
