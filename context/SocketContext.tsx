import { createContext, FC, useState, useEffect, useContext } from "react";
import { Socket } from "socket.io-client";
import { AuthContextProvider } from ".";
import { api } from '../api';
import Cookies from "js-cookie";


type Context = {
  socket: Socket | null;
  //setSocket : Dispatch<SetStateAction<Socket | null>>
};

const initialContext: Context = {
  socket: null,
  //setSocket : () => {}
};

const SocketContext = createContext<Context>(initialContext);

const SocketProvider: FC = ({ children }): JSX.Element => {
  const { user } = AuthContextProvider()
  const [socket, setSocket] = useState<Socket | null>(initialContext.socket);

  useEffect(() => {
    const token = Cookies.get("idToken")
    if (token && !socket?.connected) {
      setSocket(api.socketIO({ token, origin: window.origin }))
    }
    if (!token && socket) {
      console.log(1445411155, "socket.disconnect")
      socket.disconnect();
    }
  }, [user])

  useEffect(() => {
    socket?.on("connect", () => {
      console.log(1445411144, socket)
      console.log(1.00003, "Conectado", new Date().toLocaleString('es-VE', { timeZone: 'america/Caracas' }))
    })
    socket?.on("disconnect", (reason) => {
      console.log(1.00003, "Desconectado", new Date().toLocaleString('es-VE', { timeZone: 'america/Caracas' }),
        reason)
    })
    socket?.on("connect_error", (error) => {
      console.log(1.00003, "Connect_error", new Date().toLocaleString('es-VE', { timeZone: 'america/Caracas' }),
        error)
    })
    socket?.io.on("ping", () => { console.log(1.00003, "ping", new Date().toLocaleString('es-VE', { timeZone: 'america/Caracas' })) })
    socket?.io.on("reconnect", (attempt) => {
      console.log(1.00003, "ping", new Date().toLocaleString('es-VE', { timeZone: 'america/Caracas' }),
        attempt)
    })
    socket?.io.on("reconnect_attempt", (attempt) => {
      console.log(1.00003, "ping", new Date().toLocaleString('es-VE', { timeZone: 'america/Caracas' }),
        attempt)
    })
    socket?.io.on("reconnect_error", (error) => {
      console.log(1.00003, "ping", new Date().toLocaleString('es-VE', { timeZone: 'america/Caracas' }),
        error)
    })
    socket?.io.on("reconnect_failed", () => {
      console.log(1.00003, "ping", new Date().toLocaleString('es-VE', { timeZone: 'america/Caracas' }))
    })
  }, [socket])


  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

const SocketContextProvider = () => useContext(SocketContext)

export { SocketProvider, SocketContextProvider };
