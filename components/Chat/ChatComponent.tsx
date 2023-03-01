import { ArrowIcon, MessageIcon } from "../Icons";
import { ComponentType, Dispatch, useEffect, useRef, useState, } from "react";
import { ChatContextProvider, AuthContextProvider, SocketContextProvider } from "../../context";
import { ListChats } from "./ListChats";
import { ModuleChat } from "./ModuleChat";
import dynamic from "next/dynamic";
import { AppProps, ResultChats, SendMessage, ThemeChat } from "chat-component-library/dist"
import { fetchApi, queries } from "../../utils/Fetching";
import { api } from "../../api";
import { HandleSendMessage } from "../../handles";

const ChatApp: ComponentType<AppProps> = dynamic(
  () => import('chat-component-library/dist').then((mode) => {
    return mode.App
  }),
  {
    ssr: false,
  }
);

const themeChat: ThemeChat = {
  primaryColor: "#F7628C",
  secondaryColor: "#87F3B5",
  tertiaryColor: "#49516F",
  baseColor: "#F2F2F2",
}

const contacts = {
  results: [],
  total: 0
}
const events = {
  results: [],
  total: 0
}
const portals = {
  results: [],
  total: 0
}
const token: string = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImNlOWI4ODBmODE4MmRkYTU1N2Y3YzcwZTIwZTRlMzcwZTNkMTI3NDciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQm9kYXNkZWhveS5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9hcGkuYm9kYXNkZWhveS5jb20vdXBsb2Fkcy8zY2RjMzYva2lzc3BuZy10dXhlZG8tcGVuZ3Vpbi1kZXNrdG9wLXdhbGxwYXBlci1saW51eC10dXgtNWIzZDNmNjRjNmQ2OTMuMjc1NjQ3MzMxNTMwNzQwNTgwODE0NS1pNjQwLndlYnAiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9kYXNkZWhveS0xMDYzIiwiYXVkIjoiYm9kYXNkZWhveS0xMDYzIiwiYXV0aF90aW1lIjoxNjczMzYwOTQxLCJ1c2VyX2lkIjoiZHJxcnJrTjBMU2ZPNGs3T3VpalpBdnRGTjgxMyIsInN1YiI6ImRycXJya04wTFNmTzRrN091aWpaQXZ0Rk44MTMiLCJpYXQiOjE2NzMzNjA5NDEsImV4cCI6MTY3MzM2NDU0MSwiZW1haWwiOiJmZWJtZXJsaWJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTMzMDE5ODIwOTM5MzM0NDI4MTQiXSwiZW1haWwiOlsiZmVibWVybGliQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.QpB0Amwv3wbwaCVmHl9T-BhTbDJZs4jIt6__N5xknSr2fccKtkYXmJvQXxKO-zOePEavdZVBZ2uAHDchWK1JvwRj0z8BIxpr2pc1YrJiJv5_V0Ia5w7N2u_tpgpPrZ5JZR-7mDVLM4sEGrDE-9PxxqFHD6KN3yXGzaEHzR8k3DC7ZMzEx-9oI1VcSJ3-gV3mEchNcGHqqok8PWqatL-zRIAh_bYgVFIjNoOJ2zYhfiIsZ78YkShPHkBali97BpzoYwxO4xg_st7jh73ygyDPq0PxpCSca-FySi0nQnDw5NhrrogdcDdTJsgspmKgkvDlOr4weYqUo2vDivobbK8WWA"



const useOutsideSetShow = (ref: any, setShow: any) => {
  console.log(1234544478, ref?.current)
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


const getScraperMetaData = async (url: string): Promise<any> => {
  return await fetchApi({ query: queries.getScraperMetaData, variables: { url: url } })
}




const ChatComponent = () => {

  const { conversation, setConversation, chats, setChats, show, setShow } = ChatContextProvider();
  const { user } = AuthContextProvider();
  const { socket } = SocketContextProvider();
  const [chat, setChat] = useState(null)

  useEffect(() => {
    console.log(124578, user)
  }, [user])

  // const sendMessage: Dispatch<SendMessage> = ({ chat, message, type }) => {
  //   const variable = {
  //     type: type,
  //     message: message
  //   }
  //   console.log(888, chat, message, type, variable)
  //   socket?.emit(`chat:message`, {
  //     chatID: chat?._id,
  //     receiver: chat?.addedes,
  //     data: variable
  //   })
  // }

  const sendMessage: Dispatch<any> = ({ chat, message, type }) => {
    console.log(888, chat, message)
    HandleSendMessage({
      messageSend: message,
      chat: chat,
      userUid: user?.uid ? user.uid : "",
      setChats: setChats,
      setChat: setChat,
      socket: socket,
    })
  }

  const wrapperRef = useRef(null);
  useOutsideSetShow(wrapperRef, setShow);
  return (
    // user && (
    <>
      <div ref={wrapperRef} className={`sm:w-[352px] sm:h-[580px] w-full h-full chat bottom-0 sm:block bg-white shadow-lg fixed sm:right-5 z-40 sm:rounded-t-xl ${show ? "translate-y-0" : "sm:translate-y-[93%] translate-y-[100%]"} transition duration-500`}>
        <div className="bg-blue-500 w-full h-[87%] sm:h-full relative sm:rounded-t-xl">
          <div className="bg-primary w-full h-[7%] flex justify-between cursor-pointer sm:rounded-t-xl z-40 " onClick={() => { setShow(!show) }}>
            <div className="flex items-center text-white text-sm gap-2 ml-4">
              <MessageIcon className="w-6 h-6" />
              <p>Mensajería</p>
            </div>

            <ArrowIcon
              className={`w-6 h-6 text-white mr-4 mt-2 transform ${show ? "rotate-90" : "-rotate-90"
                }`}
            />
          </div>
          <div className="*ml-4 *mr-4 h-[93%]">
            <ChatApp label="MovilDemo: " token={token} theme={themeChat} chats={chats} contacts={contacts} events={events} portals={portals} notifications={[]} userUid={user?.uid ? user.uid : ""} sendMessage={sendMessage} getScraperMetaData={getScraperMetaData} />
          </div>


          {/* {!conversation?.state ? (
            <ListChats show={show} setShow={setShow} />
          ) : (
            <ModuleChat
              data={conversation.data}
              setConversation={setConversation}
            />
          )} */}
        </div>
      </div>
      {/* <style jsx> */}
      <style >
        {`
          @media (max-width: 639px) {
            .chat {
              top: 0
            }
          }
         `}
      </style>
    </>
    // )
  );
};

export default ChatComponent;






