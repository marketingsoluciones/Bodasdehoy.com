import { FC } from "react"
import { PropsIcon } from "."

export const LessIcon : FC <PropsIcon> = (props) => {
    return (
      <svg width={58} height={14} viewBox="0 0 58 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width={58} height={14} rx={7} fill="currentColor" />
    </svg>
    )
  }