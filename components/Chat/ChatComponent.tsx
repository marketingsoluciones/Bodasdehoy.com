import { ArrowIcon, CheckIcon, ExitIcon, MessageIcon } from "../Icons";
import {
  useState,
  FC,
  MouseEventHandler,
  useEffect,
  useCallback,
  useRef,
  MutableRefObject,
  createRef,
  Dispatch,
} from "react";
import { ImageProfile } from "./ImageProfile";
import { SearchIcon } from "../Icons/index";
import { Tooltip } from "../Tooltip";
import {
  SocketContextProvider,
  AuthContextProvider,
  ChatContextProvider,
} from "../../context";
import useFetch from "../../hooks/useFetch";
import { queries, fetchApi } from "../../utils/Fetching";
import { Chat, messageChat } from "../../interfaces";
import { LoadingItem } from "../Loading/index";
import EmptyComponent from "../Surface/EmptyComponent";
import { getRelativeTime } from "../../utils/FormatTime";
import { createURL } from "../../utils/UrlImage";
import { SetStateAction } from "react";

const useOutsideSetShow = (ref: any, setShow: any) => {
  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShow(false)
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
};

const initialState = { state: false, data: null };

const SearchChat: FC<any> = ({ onChange }) => {
  const [value, setValue] = useState("");
  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <div className="w-full h-10">
      <input
        placeholder="Buscar chat"
        value={value}
        onChange={handleChange}
        className="pl-4 text-sm py-2 w-full rounded-md focus:outline-none border-b border-color-base"
      />
    </div>
  );
};

const ChatComponent = () => {
  const { user } = AuthContextProvider();

  const { conversation, setConversation, show, setShow } = ChatContextProvider();

  const wrapperRef = useRef(null);
  useOutsideSetShow(wrapperRef, setShow);
  return (
    user && (
      <>
        <div ref={wrapperRef}
          className={`sm:w-96 sm:h-96 w-full h-full chat bottom-0 sm:block bg-white shadow-lg fixed sm:right-5 z-40 sm:sm:rounded-t-xl ${show ? "translate-y-0" : "sm:translate-y-[90%] translate-y-[100%]"} transition duration-500`}
        >
          <div className="w-full h-[87%] md:h-full relative sm:rounded-t-xl">
            <div
              className="bg-primary p-3 w-full h-10 flex justify-between cursor-pointer sm:rounded-t-xl z-40 "
              onClick={() => setShow(!show)}
            >
              <div className="flex items-center text-white text-sm gap-2">
                <MessageIcon className="w-6 h-6" />
                <p>Mensajería</p>
              </div>

              <ArrowIcon
                className={`w-4 h-4 text-white transform ${show ? "rotate-90" : "-rotate-90"
                  }`}
              />
            </div>

            {!conversation?.state ? (
              <ListChats show={show} setShow={setShow} />
            ) : (
              <ModuleChat
                data={conversation.data}
                setConversation={setConversation}
              />
            )}
          </div>
        </div>
        <style jsx>
          {`
          @media (max-width: 639px) {
            .chat {
              top: 0
            }
          }
         `}
        </style>
      </>
    )
  );
};

export default ChatComponent;

interface propsListChats {
  show: boolean | undefined;
  setShow: Dispatch<SetStateAction<boolean>>;
}
const ListChats: FC<propsListChats> = ({ show, setShow }) => {
  const { user } = AuthContextProvider();
  const {
    loadingChats,
    chats,
    setChats,
    conversation,
    setConversation,
    fetch,
    fetchy,
  } = ChatContextProvider();

  useEffect(() => {
    if (conversation?.state) {
      setShow(true);
    }
  }, [conversation?.state]);

  useEffect(() => {
    show && fetch();
  }, [show]);

  const handleChangeSearch = (value: string) => {
    fetchy({
      query: queries.getChats,
      variables: { uid: user?.uid, text: value, skip: 0, limit: 5 },
    });
  };
  return (
    <>
      <SearchChat onChange={(value: string) => handleChangeSearch(value)} />
      {!loadingChats ? (
        <div
          id={"listConversation"}
          className="flex flex-col overflow-auto h-[19rem] no-scrollbar"
        >
          {chats?.results?.length > 0 ? chats?.results?.map((item: Chat, idx: number) => (
            <ConversationItem
              key={idx}
              {...item}
              onClick={() =>
                setConversation({
                  state: true,
                  data: item,
                })
              }
            />
          ))
            : (
              <div className="text-primary h-full w-full flex items-center justify-center top-0 left-0 bg-white">
                <EmptyComponent text={"No hay chats"} />
              </div>
            )}
        </div>
      ) : (
        <div className="text-primary h-full w-full flex items-center justify-center top-0 left-0 bg-white">
          <LoadingItem size="small" text="Cargando chats" />
        </div>
      )}
    </>
  );
};

interface propsConversationItem extends Chat {
  onClick: MouseEventHandler;
}
const ConversationItem: FC<propsConversationItem> = ({ onClick, ...props }) => {
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

interface propsModuleChat {
  setConversation: any;
  data: Chat | null;
}
const ModuleChat: FC<propsModuleChat> = ({ setConversation, data }) => {
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

const HeaderChat: FC<propsModuleChat> = ({ data, setConversation }) => {
  const { user } = AuthContextProvider();
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
      className={`flex flex-col gap-[0.2rem] relative ${isSender ? "items-end" : "items-start"
        }`}
    >
      <p
        className={`p-2 ${isSender ? "bg-primary" : "bg-gray-400"
          } rounded-md text-xs text-white cursor-pointer`}
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
