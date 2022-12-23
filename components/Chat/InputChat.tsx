import { async } from "@firebase/util";
import { FC, useEffect, useState } from "react"
import { SocketContextProvider } from "../../context";
import useDebounce from "../../hooks/useDebounce";
import { fetchApi, queries } from "../../utils/Fetching";


interface propsInputChat {
  value: any
  setValue: any
  data: any
}

type message = {
  language?: string,
  audio?: string,
  video?: string,
  image?: string,
  title?: string,
  description?: string,
  message?: string,
  url?: string
}

export const InputChat: FC<propsInputChat> = ({ value, setValue, data }) => {
  const { socket } = SocketContextProvider();
  const debouncedValue = useDebounce<string>(value, 1000)
  const [mount, setMount] = useState<boolean>(false)
  const [type, setType] = useState<string>("text")
  const [message, setMessage] = useState<message | undefined>(undefined)
  const [rows, setRows] = useState<number>(1)

  const fetch = async (url: string) => {
    console.log("haciendo fetch")
    const resp = await fetchApi({ query: queries.getScraperMetaData, variables: { url: url } })
    setMessage({ ...message, ...resp })
  }

  useEffect(() => {
    const ele = document.getElementById('input');
    ele?.addEventListener('keydown', function (e) {
      const keyCode = e.key || e.code;
      // represents the Enter key
      if (keyCode === "Enter" && !e.shiftKey) {
        // Don't generate a new line
        e.preventDefault();
        // Do something else such as send the message to back-end
        // ...
      }
    });
  }, [])

  useEffect(() => {
    if (mount) {
      setMessage({ message: value })
      const valueReplace = value.replace("\n", " ")
      const valueSplit = valueReplace.split(" ")
      const url = valueSplit.filter((element: any) => element.toLowerCase().includes("https:"))[0]
      const regex = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9-_:/?#=]{0,61}[a-zA-Z0-9]{0,1}\.([a-zA-Z]{2,6}|[a-zA-Z0-9-]{1,30}\.[a-zA-Z]{2,3})/);
      if (regex.test(url)) {
        fetch(url)
      }
    }
    setMount(true)
  }, [debouncedValue])

  // Controlador de input mensaje
  const handleChangeInput = (e: any) => {
    const ele = document.getElementById('input');
    e.target.rows = 1
    if (ele?.clientHeight !== ele?.scrollHeight) {
      const rowT = ele ? (ele?.scrollHeight / 16) - 1 : 1
      e.target.rows = rowT < 5 ? rowT : 4
    }
    setValue(e.target.value);
    setMessage({ message: e.target.value })
  };

  // Al enviar el mensaje
  const handleClick = (e: any) => {
    e.preventDefault();
    //PARA ENVIAR MENSAJES
    console.log("EMIT")
    if (value !== "") {
      socket?.emit(`chat:message`, {
        chatID: data?._id,
        receiver: data?.addedes,
        data: {
          type: type,
          ...message
        },
      });
      setValue("");
      const ele = document.getElementById('input');
      ele?.setAttribute("rows", "1")
    }
  };

  return (
    <>
      <form className="h-8 relative w-full mt-3 flex items-end" onSubmit={handleClick}>
        <div className="bg-white ml-1 mr-1 w-full rounded-lg flex items-end">
          <textarea id="input" name="textarea" rows={rows} autoFocus className="focus:outline-none bg-white rounded-lg w-[calc(100%-45px)] pr-10 pl-3 text-xs" onChange={handleChangeInput} value={value}>
            Write something here
          </textarea>
        </div>
        {/* <input
          onChange={handleChangeInput}
          //onKeyUp={processChange}
          value={value}
          className="focus:outline-none bg-white h-10 border rounded-lg w-full pr-10 pl-3 text-sm"
        /> */}
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
      <style jsx>
        {`
        textarea
          {
            resize: none;
            
          }
        textarea:focus, input:focus, input[type]:focus {
          border-color: rgb(255,255,255);
          box-shadow: 0 0px 0px rgba(229, 103, 23, 0.075)inset, 0 0 0px rgba(255,144,0,0.6);
          outline: rgb(255,255,255);
        }
      `}
      </style>
    </>
  )
}


