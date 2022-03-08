import { ArrowIcon, CheckIcon, ExitIcon, MessageIcon } from "../Icons";
import { useState, FC, MouseEventHandler, useEffect, useCallback, useRef, MutableRefObject, createRef } from 'react';
import { ImageProfile } from "./ImageProfile";
import { SearchIcon } from "../Icons/index";
import { Tooltip } from "../Tooltip";
import {
  SocketContextProvider,
  AuthContextProvider,
  ChatContextProvider,
} from "../../context";
import useFetch from "../../hooks/useFetch";
import { queries, fetchApi } from '../../utils/Fetching';
import { Chat, messageChat } from "../../interfaces";
import { LoadingItem } from "../Loading/index";
import EmptyComponent from "../Surface/EmptyComponent";
import { getRelativeTime } from "../../utils/FormatTime";
import { createURL } from "../../utils/UrlImage";

const initialState = { state: false, data: null };

const ChatComponent = () => {
  const { user } = AuthContextProvider();
  const { socket } = SocketContextProvider();
  const { loadingChats, chats, conversation, setConversation } =
    ChatContextProvider();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (conversation?.state) {
      setShow(true);
    }
  }, [conversation?.state]);

  return (
    user && (
      <>
        <div
          className={`w-96 h-96 bg-white pb-10 shadow-lg fixed bottom-0 right-5 z-50 rounded-t-xl transform transition chat`}
        >
          <div className="w-full h-full relative rounded-t-xl">
            <div
              className="bg-primary p-3 w-full h-10 flex justify-between cursor-pointer rounded-t-xl z-40 "
              onClick={() => setShow(!show)}
            >
              <div className="flex items-center text-white text-sm gap-2">
                <MessageIcon className="w-6 h-6" />
                <p>Mensajería</p>
              </div>

              <ArrowIcon
                className={`w-4 h-4 text-white transform ${
                  show ? "rotate-90" : "-rotate-90"
                }`}
              />
            </div>

            {!loadingChats ? (
              !conversation?.state ? (
                <div className="flex flex-col overflow-auto h-full">
                  {chats?.results?.length > 0 ? (
                    chats?.results?.map((item: Chat) => (
                      <ConversationItem
                        key={item._id}
                        {...item}
                        onClick={() =>
                          setConversation({
                            state: true,
                            data: item,
                          })
                        }
                      />
                    ))
                  ) : (
                    <EmptyComponent text={"No hay chats"} />
                  )}
                </div>
              ) : (
                <ModuleChat
                  data={conversation.data}
                  setConversation={setConversation}
                />
              )
            ) : (
              <div className="text-primary h-full w-full flex items-center justify-center absolute top-0 left-0 bg-white">
                <LoadingItem size="small" text="Cargando chats" />
              </div>
            )}
          </div>
        </div>
        <style jsx>
          {`
            .chat {
              transform: translateY(${show ? "0%" : "90%"});
            }
          `}
        </style>
      </>
    )
  );
};

export default ChatComponent;

interface propsConversationItem extends Chat {
  onClick: MouseEventHandler;
}
const ConversationItem: FC<propsConversationItem> = ({ onClick, ...props }) => {
  const { _id, title, messages, photoURL, onLine, addedes } = props;
  const [messages2, setMessages] = useState(messages ?? [])
  const { socket } = SocketContextProvider();
  const [countMsg, setCountMsg] = useState<number>(0)
  const [isOnline, setOnline] = useState<boolean | null>(onLine.status);

  const handleSocket = (data: { status: boolean; dateConection: number }) => {
    setOnline(data?.status);
  }

  const handleCount = useCallback(
    () => {
      setCountMsg(countMsg + 1)
    },
    [countMsg],
  )
  
  // Escuchar mensajes que lleguen para añadir al contador
  useEffect(() => {
    socket?.on("chatBusiness:create", handleCount );
    return () => {
      socket?.off('chatBusiness:create', handleCount)
    }
  }, [socket, handleCount]);

  useEffect(() => {
    if (addedes[0].userUid) {
      socket?.on(
        `${addedes[0].userUid}`, handleSocket);
    }
    return () => {
      socket?.off(`${addedes[0].userUid}`, handleSocket)
    }
  }, [socket, addedes]);

  return (
    <div
      className="flex items-center gap-2 p-3 hover:bg-gray-100 transition cursor-pointer"
      onClick={onClick}
    >
      <span className="relative w-max">
        <img
          className="object-cover w-10 h-10 rounded-full border border-gray-200"
          alt={""}
          src={
            photoURL
              ? photoURL?.includes("http")
                ? photoURL
                : createURL(photoURL)
              : "/placeholder/logo.png"
          }
        />
        <span
          className={`absolute w-3 h-3 ${
            isOnline ? "bg-green-600" : "bg-gray-400"
          }  rounded-full -right-0 border border-white top-0`}
        />
      </span>
      <div className="flex flex-col">
        <h2 className="text-sm text-tertiary font-bold">{title}</h2>
        {messages2?.length > 0 && (
          <small className="text-gray-600">{messages2[0]?.message}</small>
        )}
      </div>
    </div>
  );
};

interface propsModuleChat {
  setConversation: any;
  data: Chat | null;
}
const ModuleChat: FC<propsModuleChat> = ({ setConversation, data }) => {
  const [messages, setMessages] = useState(data?.messages ?? []);
  const { user } = AuthContextProvider();
  const { socket } = SocketContextProvider();
  const [value, setValue] = useState("");

  // Ref del div que continene los mensajes para hacer el scroll bottom
  const refBoxMsg : any = createRef()

  // Al montar el componente traer todos los mensajes de la base de datos
  const fetchMessages = useCallback(async () => {
    const {messages} = await fetchApi({
      query: queries.getOneChat,
      variables: {IDChat: data?._id}
    })
    setMessages(messages)
  }, [data?._id])
  
  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])
  
  
  const scrollToBottom = () => {
    refBoxMsg.current.scrollIntoView({ behavior: 'smooth' })
  }

  
  // Socket para escuchar evento(ID Chat) para recibir mensajes
  const handleSocket = (data : any) => {
    setMessages(old => [...old, data])
    console.log(refBoxMsg)
    scrollToBottom()
  }
  useEffect(() => {
    // PARA RECIBIR MENSAJES
    socket?.on(`${data?._id}`, handleSocket);

    return () => {
      socket?.off(`${data?._id}`, handleSocket)
    }
  }, [socket, data?._id]);

  // Controlador de input mensaje
  const handleChangeInput = (e: any) => {
    setValue(e.target.value);
  };

  // Al enviar el mensaje
  const handleClick = () => {
    //PARA ENVIAR MENSAJES
    socket?.emit(`chat:message`, {
      chatID: data?._id,
      receiver:data?.addedes,
      data : {
        type: "text",
        message: value
      }
    });
    setValue("")
  };

  
  return (
    <div className="flex flex-col p-3 h-full absolute top-0 left-0 w-full z-10 bg-white rounded-t-xl">
      <HeaderChat data={data} setConversation={setConversation} />
      {/* BODY */}
      <div ref={refBoxMsg} className="w-full h-full flex flex-col gap-3 overflow-auto px-5">
        {messages?.map(({ emitUserUid, ...message }, idx : number) => (
          <MessageItem key={idx} isSender={user?.uid === emitUserUid} {...message} />
        ))}
      </div>
      {/* INPUT */}
      <span className="relative w-full">
        <input
          onChange={handleChangeInput}
          value={value}
          className="focus:outline-none bg-white h-10 border rounded-lg w-full pr-10 pl-3"
        />
        <button onClick={handleClick}>
          <CheckIcon className="cursor-pointer w-8 h-8 text-white absolute inset-y-0 my-auto right-2 bg-primary rounded-full " />
        </button>
      </span>
    </div>
  );
};

const HeaderChat: FC<propsModuleChat> = ({ data, setConversation }) => {
  const { user } = AuthContextProvider();
  const { socket } = SocketContextProvider();
  const [isOnline, setOnline] = useState<boolean>(data?.onLine?.status ?? false);
  const [latestConnection, setLatestConnection] = useState<number | null>(
    data?.onLine?.dateConection ?? null
  );

  const handleSocket = (data: { status: boolean; dateConection: number }) => {
    setOnline(data?.status);
    setLatestConnection(data?.dateConection);
  }
  useEffect(() => {
    socket?.on(
      `${data?.addedes[0]?.userUid}`, handleSocket);
      return () => {
        socket?.off(`${data?.addedes[0]?.userUid}`, handleSocket)
      }
  }, [socket, data?.addedes]);
  return (
    <div className="p-2 border-b border-color-base mb-3 w-full flex items-center justify-between">
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

interface propsMessageItem extends messageChat {
  isSender?: boolean;
}

const MessageItem: FC<Partial<propsMessageItem>> = ({
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
      className={`flex flex-col gap-[0.2rem] relative ${
        isSender ? "items-end" : "items-start"
      }`}
    >
      <p
        className={`p-2 ${
          isSender ? "bg-primary" : "bg-gray-400"
        } rounded-md text-xs w-max text-white cursor-pointer`}
        onClick={handleClick}
      >
        {message}
      </p>

      <small
        className={`${
          dateView ? "opacity-100" : "opacity-0"
        } text-[0.65rem] text-gray-600  absolute -bottom-0.5 transform translate-y-full transition-all`}
      >
        {/* {createdAt && getRelativeTime(createdAt)} */}
      </small>
    </div>
  );
};
