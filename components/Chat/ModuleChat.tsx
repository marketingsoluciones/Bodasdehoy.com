import { FC, useEffect, useRef, useState } from "react";
import { AuthContextProvider, SocketContextProvider } from "../../context";
import useFetch from "../../hooks/useFetch";
import { Chat, propsModuleChat } from "../../interfaces";
import { queries } from "../../utils/Fetching";
import { LoadingItem } from "../Loading";
import { HeaderChat } from "./HeaderChat";
import { InputChat } from "./InputChat";
import { MessageItem } from "./MessageItem";


export const ModuleChat: FC<propsModuleChat> = ({ setConversation, data }) => {
  const [limitMsg, setLimitMsg] = useState(2);
  const [skipMsg, setSkipMsg] = useState(0);
  const initialQuery = {
    query: queries.getOneChat,
    variables: { IDChat: data?._id, skip: skipMsg, limit: limitMsg },
  }
  const [messages, setMessages, loading, error, fetch] = useFetch(initialQuery);
  const { user } = AuthContextProvider();
  const { socket } = SocketContextProvider();
  const [value, setValue] = useState("");

  // Ref del div que continene los mensajes para hacer el scroll bottom
  const refBoxMsg: any = useRef();

  useEffect(() => {
    if (refBoxMsg && refBoxMsg.current) {
      const element = refBoxMsg.current;
      element.scroll({
        top: element.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [refBoxMsg, messages, loading]);

  // Socket para escuchar evento(ID Chat) para recibir mensajes
  const handleSocket = (data: any) => {
    setMessages((old: Chat) => ({
      ...old,
      messages: [...old?.messages, data],
    }));
  };

  useEffect(() => {
    // PARA RECIBIR MENSAJES
    socket?.on(`${data?._id}`, handleSocket);

    return () => {
      socket?.off(`${data?._id}`, handleSocket);
    };
  }, [socket, data?._id]);


  return (
    <>
      <div className="flex-col h-full absolute top-10 left-0 w-full z-10 bg-white sm:rounded-t-xl">
        <HeaderChat data={data} setConversation={setConversation} />
        {/* BODY */}
        <div
          ref={refBoxMsg}
          className="moduleChat w-full flex flex-col gap-5 overflow-auto px-5"
        >
          {!loading ? (
            // @ts-ignore
            messages?.messages?.map(({ emitUserUid, ...message }, idx: number) => (
              <MessageItem
                key={idx}
                isSender={user?.uid === emitUserUid}
                {...message}
              />
            )
            )
          ) : (
            <span className="text-gray-400 w-full h-full flex items-center justify-center">
              <LoadingItem size="small" text="" />
            </span>
          )}
        </div>
        {/* INPUT */}
        <InputChat value={value} setValue={setValue} data={data} />
      </div>
      <style jsx>
        {`
        .moduleChat{
          height: calc(100% - 7rem - 40px)
        }
      `}
      </style>
    </>
  );
};
