import { FC, useState } from "react";
import { messageChat } from "../../interfaces";
import { getRelativeTime } from "../../utils/FormatTime";

interface propsMessageItem extends messageChat {
  isSender?: boolean;
}

export const MessageItem: FC<Partial<propsMessageItem>> = ({
  isSender = true,
  message,
  createdAt,
}) => {
  const [dateView, setDateView] = useState(false);
  const handleClick = () => {
    setDateView(!dateView);
  };
  return (
    <div
      className={`flex flex-col gap-[0.2rem] relative ${isSender ? "items-end" : "items-start"
        }`}
    >
      <p
        className={`p-2 ${isSender ? "bg-primary" : "bg-gray-400"
          } rounded-md text-xs text-white`}
        onClick={handleClick}
      >
        {message}
      </p>

      <small
        className={` text-[0.65rem] text-gray-600  absolute -bottom-0.5 transform translate-y-full transition-all`}
      >
        {/* {createdAt && typeof createdAt === "string" ? getRelativeTime(Date(createdAt)) : getRelativeTime(createdAt)} */}
        {createdAt &&
          getRelativeTime(
            typeof createdAt !== "number" ? parseInt(createdAt) : createdAt
          )}
      </small>
    </div>
  );
};
