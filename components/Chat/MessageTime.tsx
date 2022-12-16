import { FC } from "react";
import { getRelativeTime } from "../../utils/FormatTime";

interface propsMessageTime {
  createdAt: any
}

export const MessageTime: FC<propsMessageTime> = ({ createdAt }) => {

  return (
    <>
      <small className={`text-[0.60rem] text-gray-100  absolute -bottom-[-3px] -right-[-10px]`}>
        {createdAt &&
          getRelativeTime(
            typeof createdAt !== "number" ? parseInt(createdAt) : createdAt
          )}
      </small>
    </>
  )
}