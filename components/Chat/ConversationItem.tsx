import { FC, MouseEventHandler, useCallback, useEffect, useState } from "react";
import { SocketContextProvider } from "../../context";
import { Chat } from "../../interfaces";
import { createURL } from "../../utils/UrlImage";

interface propsConversationItem extends Chat {
  onClick: MouseEventHandler;
}
export const ConversationItem: FC<propsConversationItem> = ({ onClick, ...props }) => {
  const { _id, title, messages, photoURL, onLine, addedes } = props;
  const [messages2, setMessages] = useState(messages ?? []);
  const { socket } = SocketContextProvider();
  const [countMsg, setCountMsg] = useState<number>(0);
  const [isOnline, setOnline] = useState<boolean | null>(onLine.status);

  const handleSocket = (data: { status: boolean; dateConection: number }) => {
    setOnline(data?.status);
  };

  const handleCount = useCallback(() => {
    setCountMsg(countMsg + 1);
  }, [countMsg]);

  // Escuchar mensajes que lleguen para añadir al contador
  useEffect(() => {
    socket?.on("chatBusiness:create", handleCount);
    return () => {
      socket?.off("chatBusiness:create", handleCount);
    };
  }, [socket, handleCount]);

  useEffect(() => {
    if (addedes[0].userUid) {
      socket?.on(`${addedes[0].userUid}`, handleSocket);
    }
    return () => {
      socket?.off(`${addedes[0].userUid}`, handleSocket);
    };
  }, [socket, addedes]);

  return (
    <div
      className="flex items-center gap-2 p-3 hover:bg-gray-100 transition cursor-pointer"
      onClick={onClick}
    >
      <span className="relative w-max">
        <img
          className="object-cover w-10 h-10 rounded-full border border-gray-200"
          alt={"Perfilimg"}
          src={
            photoURL
              ? photoURL?.includes("http")
                ? photoURL
                : createURL(photoURL)
              : "/placeholder/logo.png"
          }
        />
        <span
          className={`absolute w-3 h-3 ${isOnline ? "bg-green-600" : "bg-gray-400"
            }  rounded-full -right-0 border border-white top-0`}
        />
      </span>
      <div className="flex flex-col">
        <h2 className="text-sm text-tertiary font-bold">{title}</h2>
        {messages2?.length > 0 && (
          <small className="text-gray-600">
            {messages2[messages2.length - 1].message}
          </small>
        )}
      </div>
    </div>
  );
};
