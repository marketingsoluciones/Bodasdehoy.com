import { ArrowIcon, CheckIcon } from "../Icons";
import { useState, FC, MouseEventHandler } from "react";

const ChatComponent = () => {
  const [show, setShow] = useState(false);
  const initialState = { state: false, data: {client: ""} }
  const [conversation, setConversation] = useState<{state: boolean, data: {client: string}}>(initialState);
  return (
     <>
    <div
      className={`md:w-96 h-96 bg-white pb-10 shadow-lg fixed bottom-0 right-5 z-50 border overflow-hidden rounded-t-xl transform transition chat`}
    >
      <div
        className="bg-primary p-3 w-full h-10 flex justify-between cursor-pointer"
        onClick={() => setShow(!show)}
      >
        {!conversation.state ? (
          <p className="text-white text-sm">Mensajería Instantanea</p>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-white rounded-full" />
            <p className="text-white text-sm">{conversation?.data?.client}</p>
          </div>
        )}
        <ArrowIcon
          className={`w-4 h-4 text-white transform ${
            show ? "rotate-90" : "-rotate-90"
          }`}
        />
      </div>

      {!conversation.state ? (
        <div className="flex flex-col">
          <ConversationItem
            onClick={() =>
              setConversation({
                state: true,
                data: { client: "Hotel Manga Club" },
              })
            }
          />
        </div>
      ) : (
        <div className="flex flex-col p-3 h-full gap-3">
          <button className="flex items-center gap-1 text-xs" onClick={() => setConversation(initialState)}>
            <ArrowIcon className="w-4 h-4 text-gray-900 transform rotate-180" />{" "}
            Atras
          </button>
          <div className="w-full bg-gray-100 h-full rounded-lg"></div>
          <span className="relative w-full">
            <input className="focus:outline-none bg-white h-10 border rounded-lg w-full pr-10 pl-3" />
            <CheckIcon className="w-8 h-8 text-primary absolute inset-y-0 my-auto right-2" />
          </span>
        </div>
      )}
    </div>
    <style jsx>
        {`
        .chat {
            transform : translateY(${show ? "0%" : "90%"})
        }
        `}
    </style>
    </>
  );
};

export default ChatComponent;

interface propsConversationItem {
  onClick : MouseEventHandler
}
const ConversationItem: FC <propsConversationItem> = (props) => {
  return (
    <div
      className="flex items-center gap-2 p-3 hover:bg-gray-100 transition cursor-pointer"
      {...props}
    >
      <div className="w-8 h-8 rounded-full bg-primary" />
      <h2 className="text-sm">Hotel Manga Club</h2>
    </div>
  );
};
