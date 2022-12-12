import { ArrowIcon, MessageIcon } from "../Icons";
import { useEffect, useRef, } from "react";
import { AuthContextProvider, ChatContextProvider } from "../../context";
import { ListChats } from "./ListChats";
import { ModuleChat } from "./ModuleChat";

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


const ChatComponent = () => {
  const { user } = AuthContextProvider();

  const { conversation, setConversation, show, setShow } = ChatContextProvider();

  const wrapperRef = useRef(null);
  useOutsideSetShow(wrapperRef, setShow);
  return (
    // user && (
    <>
      <div ref={wrapperRef}
        className={`sm:w-96 sm:h-96 w-full h-full chat bottom-0 sm:block bg-white shadow-lg fixed sm:right-5 z-40 sm:sm:rounded-t-xl ${show ? "translate-y-0" : "sm:translate-y-[90%] translate-y-[100%]"} transition duration-500`}
      >
        <div className="w-full h-[87%] md:h-full relative sm:rounded-t-xl">
          <div
            className="bg-primary p-3 w-full h-10 flex justify-between cursor-pointer sm:rounded-t-xl z-40 "
            onClick={() => { setShow(!show) }}
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
    // )
  );
};

export default ChatComponent;






