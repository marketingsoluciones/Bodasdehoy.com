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

  const fetch = async (url: string) => {
    console.log("haciendo fetch")
    const resp = await fetchApi({ query: queries.getScraperMetaData, variables: { url: url } })
    setMessage({ ...message, ...resp })
  }
  useEffect(() => {
    console.log(message)
  }, [message])


  useEffect(() => {
    if (mount) {
      setMessage({ message: value })
      const valueSplit = value.split(" ")
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
    setValue(e.target.value);
    setMessage({ message: e.target.value })
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
          type: type,
          ...message
        },
      });
      setValue("");
    }
  };

  return (
    <>
      <form className="relative w-full mt-2" onSubmit={handleClick}>
        <input
          onChange={handleChangeInput}
          //onKeyUp={processChange}
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
    </>
  )
}


