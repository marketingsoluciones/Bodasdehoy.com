import { useState } from "react"
import { useRanger } from "react-ranger";

export const RangeComponent = ({min, max} : {min: number, max: number}) => {
    const [values, setValues] = useState([10])

    const { getTrackProps, handles } = useRanger({
        values,
        onChange: setValues,
        min: min,
        max: max,
        stepSize: 1,
    })
    return (
        <>
        <div className="bg-gray-100 w-full h-1.5 rounded-full"
        {...getTrackProps()}
      >
        {handles.map(({ getHandleProps }, idx) => (
          <div className="rounded-full w-5 h-5 border-2 border-primary bg-white"
            {...getHandleProps()}
            key={idx}
          />
        ))}

      </div>
      <input type="number" className="focus:outline-none bg-transparent text-gray-200 text-sm font-light pt-1" min={min} max={max} step={1} value={values[0]} onChange={(e : any) => setValues([e.target.value])}/>
      </>
    )
}
