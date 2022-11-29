import { FC } from "react";

interface propsLedIndicator {
  valir?: boolean;
  value: number | undefined | null
}




export const LedIndicator: FC<propsLedIndicator> = ({ valir, value }) =>
  <>
    {
      valir && <div>
        <svg className="rounded-full bg-primary w-6 h-4 absolute top-0 left-4" />
        <span className="w-5 text-[11px] text-white text-center absolute top-0 left-[18px]">
          {value}
          {/* {value?.toFixed.length !== undefined && value.toString.length > 99 ? "99+": value} */}
        </span>
      </div>
    }
  </>
  ;
