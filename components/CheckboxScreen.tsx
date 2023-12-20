import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
interface propsCheckboxScreen {
  setState: Dispatch<SetStateAction<boolean>>
}
export const CheckboxScreen: FC<propsCheckboxScreen> = ({ setState }) => {
  const [checked, setChecked] = useState(false)
  useEffect(() => {
    setState(checked)
  }, [checked])

  return (
    <label className="flex gap-2 text-sm items-center">
      <input type="checkbox" className="w-3 h-3 rounded-sm" checked={checked} onChange={e => setChecked(e.target.checked)} />
      <span>No mostrar esta pantalla la próxima vez</span>
    </label>
  )
}