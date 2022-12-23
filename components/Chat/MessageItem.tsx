import { Interweave } from "interweave";
import { HashtagMatcher, UrlMatcher } from "interweave-autolink";
import { FC, useEffect, useRef, useState } from "react";
import { number } from "yup/lib/locale";
import { AuthContextProvider } from "../../context";
import { messageChat } from "../../interfaces";
import { MessageTime } from "./MessageTime";

interface propsMessageItem {
  message: messageChat
  setCount: any
}

export const MessageItem: FC<propsMessageItem> = ({ message, setCount }) => {
  const imgRef = useRef<HTMLElement>(null);
  const { user } = AuthContextProvider();
  const isSender: boolean = user?.uid === message?.emitUserUid
  const [dateView, setDateView] = useState(false);
  const [single, setSingle] = useState(message?.type === "text");
  const [sizeX, setSizeX] = useState(240);
  const [multimedia, setMultimedia] = useState(message?.video || message.image || message.audio);
  const [singleMultimedia, setSingleMultimedia] = useState(!message.message);
  const [linkUrl, setLinkUrl] = useState(true);


  const handleClick = () => {
    setDateView(!dateView);
  };

  useEffect(() => {
    setCount((old: number) => old + 1)
  }, [])


  useEffect(() => {
    if (message?.image) {
      const myImage = new Image()
      myImage.src = message?.image ?? ""
      imgRef.current?.appendChild(myImage)
      setTimeout(() => {
        const x: number | undefined = imgRef.current?.clientWidth
        const y: number | undefined = imgRef.current?.clientHeight
        if (x && y && y * 100 / x > 120) {
          //es horizontal
          setSizeX(175)
        }
      }, 2000);
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
                  <a href={message?.url} rel="nofollow noreferrer noopener" target="_blank" className="sizeX  break-words">
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
              <div className={`p-2 pb-4 min-w-[100px] ${!single && `sizeX pt-1`} break-words ${isSender ? "bg-primary" : "bg-gray-400"} rounded-b-md ${single && "rounded-t-md"} text-xs text-white`} onClick={handleClick}>
                <Interweave
                  content={message?.message}
                  matchers={[new UrlMatcher('url'), new HashtagMatcher('hashtag')]}
                />
                {/* {message?.message} */}
              </div>
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
