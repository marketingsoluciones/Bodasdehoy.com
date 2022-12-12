import { FC, useEffect, useRef, useState } from "react";
import { AuthContextProvider, SocketContextProvider } from "../../context";
import useFetch from "../../hooks/useFetch";
import { Chat, propsModuleChat } from "../../interfaces";
import { queries } from "../../utils/Fetching";
import { LoadingItem } from "../Loading";
import { HeaderChat } from "./HeaderChat";
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

  // Controlador de input mensaje
  const handleChangeInput = (e: any) => {
    setValue(e.target.value);
  };

  // Al enviar el mensaje
  const handleClick = (e: any) => {
    e.preventDefault();
    //PARA ENVIAR MENSAJES
    if (value !== "") {
      socket?.emit(`chat:message`, {
        chatID: data?._id,
        receiver: data?.addedes,
        data: {
          type: "text",
          message: value,
        },
      });
      setValue("");
    }
  };

  return (
    <>
      <div className=" flex-col p-3 h-full absolute top-10 left-0 w-full z-10 bg-white sm:rounded-t-xl ">
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
        <form className="relative w-full mt-2" onSubmit={handleClick}>
          <input
            onChange={handleChangeInput}
            value={value}
            className="focus:outline-none bg-white h-10 border rounded-lg w-full pr-10 pl-3 text-sm"
          />
          <button onClick={handleClick}>
            <svg
              className="cursor-pointer w-6 h-6 rotate-90 hover:bg-color-base transition p-0.5 absolute inset-y-0 my-auto right-2 text-primary rounded-full "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
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
