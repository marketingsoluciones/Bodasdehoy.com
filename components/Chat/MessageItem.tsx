import { FC, useEffect, useState } from "react";
import { messageChat } from "../../interfaces";
import { getRelativeTime } from "../../utils/FormatTime";
import { MessageTime } from "./MessageTime";

interface propsMessageItem extends messageChat {
  isSender?: boolean
  sizeX?: string
}

export const MessageItem: FC<Partial<propsMessageItem>> = ({ isSender = true, message, createdAt, sizeX = "240px" }) => {
  const [dateView, setDateView] = useState(false);
  const [single, setSingle] = useState(false);
  //const [sizeX, setSizeX] = useState(0);
  //const [sizeY, setSizeY] = useState(0);
  const [multimedia, setMultimedia] = useState(true);
  const [singleMultimedia, setSingleMultimedia] = useState(false);
  const [linkUrl, setLinkUrl] = useState(true);

  const handleClick = () => {
    setDateView(!dateView);
  };

  // useEffect(() => {
  //   setSizeX(240)
  //   console.log(sizeX)
  // }, [])


  return (
    <>
      <div className="mt-1">
        <div className={`flex flex-col relative ${isSender ? "items-end" : "items-start"}`}>
          {multimedia && (
            <>
              <div className={`${isSender ? "bg-primary" : "bg-gray-400"} pr-2 pl-2 pt-1 w-full text-sm ${!single && `w-[240px]`} rounded-t-md ${singleMultimedia && "rounded-b-md pb-4"}`}>
                image o video horizontal, vertical o cuadrado
              </div>
              {linkUrl && (
                <div className={`${isSender ? "bg-primary" : "bg-gray-400"} w-fullm flex justify-center ${!single && `w-[240px]`}`} >
                  <div className={`${isSender ? "bg-[#fa9db7]" : "bg-gray-200"} pr-1 pl-1 rounded-sm text-[0.7rem] ${!single && `w-[calc(240px-8px)]`}`}>
                    <a href="http://youtu.be/Ujvy-DEA-UM" rel="nofollow noreferrer noopener" target="_blank">
                      <span className="block text-[13px] leading-[14px] pt-[2px]">7 tendencias de bodas que desapareceran</span>
                      <span className="block text-[11px] leading-[14px] truncate">Siempre pensamos en las nuevas tendencias de bodas, en la moda y en las más recientes propuestas, lo que nos lleva a dejar</span>
                      <span className="block text-[10px] leading-[14px]">https://www.hiberus.com/crecemos-contigo/que-es-la-relacion-de-aspecto-en-tus-fotografias-y-videos-y-cuales-son-las-mas-comunes/</span>
                    </a>
                  </div>
                </div>
              )}
              {singleMultimedia && (<MessageTime createdAt={createdAt} />)}
            </>
          )}

          {!singleMultimedia && (
            <>
              <p className={`p-2 pb-4 min-w-[100px] ${!single && `w-[240px] pt-1`} break-words ${isSender ? "bg-primary" : "bg-gray-400"} rounded-b-md ${single && "rounded-t-md"} text-xs text-white`} onClick={handleClick}>
                {message}
              </p>
              <MessageTime createdAt={createdAt} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
