import { FC } from "react";
import { EmptyIcon } from "../Icons";

const EmptyComponent: FC<{ text: string }> = ({ text }) => {
  return (
    <div className="w-full h-40 min-h-40 flex items-center justify-center text-gray-500 gap-5">
      <EmptyIcon className="w-10 h-10 text-gray-500" />
      <p>{text}</p>
    </div>
  );
};

export default EmptyComponent;
