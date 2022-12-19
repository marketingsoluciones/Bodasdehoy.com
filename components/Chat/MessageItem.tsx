import { FC, useEffect, useRef, useState } from "react";
import { AuthContextProvider } from "../../context";
import { messageChat } from "../../interfaces";
import { MessageTime } from "./MessageTime";

interface propsMessageItem {
  message: messageChat
}

export const MessageItem: FC<propsMessageItem> = ({ message }) => {
  const imgRef = useRef<HTMLElement>(null);
  const { user } = AuthContextProvider();
  const isSender: boolean = user?.uid === message?.emitUserUid
  const [dateView, setDateView] = useState(false);
  const [single, setSingle] = useState(message?.type === "text");
  const [sizeX, setSizeX] = useState(175);
  const [multimedia, setMultimedia] = useState(message?.video || message.image || message.audio);
  const [singleMultimedia, setSingleMultimedia] = useState(!message.message);
  const [linkUrl, setLinkUrl] = useState(true);


  const handleClick = () => {
    setDateView(!dateView);
  };

  useEffect(() => {
    if (message?.image) {
      const img = document.getElementById("img")
      const myImage = new Image();
      myImage.src = message?.image ?? "";
      document.body.appendChild(myImage);
      const x: number = myImage?.clientWidth
      const y: number = myImage?.clientHeight
      if (y * 100 / x < 120) {
        //es horizontal
        setSizeX(240)
      }
      const imgTemp = document.body.childNodes[document.body.childNodes.length - 1]
      imgRef.current?.appendChild(imgTemp);
    }
  }, [message])



  return (
    <>
      <div className="mt-1">
        <div className={`flex flex-col relative ${isSender ? "items-end" : "items-start"}`}>
          {multimedia && (
            <>
              <div ref={imgRef as React.RefObject<HTMLDivElement>} className={`${isSender ? "bg-primary" : "bg-gray-400"} p-1 w-full text-sm sizeX rounded-t-md ${singleMultimedia && "rounded-b-md pb-4"} truncate`}>
              </div>
              {linkUrl && (
                <div className={`${isSender ? "bg-primary" : "bg-gray-400"} w-fullm flex justify-center ${!single && "sizeX"}`} >
                  <a href="http://youtu.be/Ujvy-DEA-UM" rel="nofollow noreferrer noopener" target="_blank" className="sizeX  break-words">
                    <div className={`${isSender ? "bg-[#fa9db7]" : "bg-gray-200"} pr-1 pl-1 rounded-sm text-[0.7rem] ${!single && `ml-1 mr-1`}`}>
                      <span className="block text-[13px] leading-[14px] pt-[2px] line-clamp-3">{message?.title}</span>
                      <span className="block text-[11px] leading-[14px] pl-2 line-clamp-2">{message?.description}</span>
                      <span className="block text-[10px] leading-[14px]">{message?.url}</span>
                    </div>
                  </a>
                </div>
              )}
              {singleMultimedia && (<MessageTime createdAt={message?.createdAt} />)}
            </>
          )}

          {!singleMultimedia && (
            <>
              <p className={`p-2 pb-4 min-w-[100px] ${!single && `sizeX pt-1`} break-words ${isSender ? "bg-primary" : "bg-gray-400"} rounded-b-md ${single && "rounded-t-md"} text-xs text-white`} onClick={handleClick}>
                {message?.message}
              </p>
              <MessageTime createdAt={message?.createdAt} />
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        .sizeX {
          width: ${sizeX}px;
          //overflow: scroll;
        }
      `}</style>
    </>
  );
};
