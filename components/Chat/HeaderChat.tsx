import { FC, useEffect, useState } from "react";
import { SocketContextProvider } from "../../context";
import { propsModuleChat } from "../../interfaces";
import { getRelativeTime } from "../../utils/FormatTime";
import { ExitIcon, SearchIcon } from "../Icons";
import { Tooltip } from "../Tooltip";
import { ImageProfile } from "./ImageProfile";

const initialState = { state: false, data: null };

export const HeaderChat: FC<propsModuleChat> = ({ data, setConversation }) => {
  const { socket } = SocketContextProvider();
  const [isOnline, setOnline] = useState<boolean>(
    data?.onLine?.status ?? false
  );
  const [latestConnection, setLatestConnection] = useState<number | null>(
    data?.onLine?.dateConection ?? null
  );

  const handleSocket = (data: { status: boolean; dateConection: number }) => {
    setOnline(data?.status);
    setLatestConnection(data?.dateConection);
  };
  useEffect(() => {
    socket?.on(`${data?.addedes[0]?.userUid}`, handleSocket);
    return () => {
      socket?.off(`${data?.addedes[0]?.userUid}`, handleSocket);
    };
  }, [socket, data?.addedes]);
  return (
    <div className="p-2 border-b border-color-base w-full flex items-center justify-between">
      <div className="flex items-center gap-2">
        <ImageProfile isActived={isOnline} image={data?.photoURL} />
        <div className="flex items-start flex-col justify-end">
          <span className="block font-bold text-sm text-gray-600 capitalize">
            {data?.title}
          </span>
          <span className="text-[0.7rem] text-gray-400">
            {isOnline
              ? "En linea"
              : latestConnection && getRelativeTime(latestConnection)}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Tooltip tooltipText="Buscar">
          <button className="p-3 flex items-center justify-center focus:outline-none text-gray-700 bg-gray-100 w-10 h-10  rounded-xl hover:bg-gray-200 transition">
            <SearchIcon />
          </button>
        </Tooltip>
        <Tooltip tooltipText="Salir">
          <button
            onClick={() => setConversation(initialState)}
            className="p-3 flex items-center justify-center focus:outline-none text-gray-700 bg-gray-100 w-10 h-10 rounded-xl hover:bg-gray-200 transition"
          >
            <ExitIcon />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};