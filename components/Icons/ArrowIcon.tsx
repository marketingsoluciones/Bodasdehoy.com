import { FC } from "react"
import { PropsIcon } from "."

export const ArrowIcon: FC<PropsIcon> = (props) => {
    const {width = 1} = props
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={width} d="M9 5l7 7-7 7" />
      </svg>
    )
  }