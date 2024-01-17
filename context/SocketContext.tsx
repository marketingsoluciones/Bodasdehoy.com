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
      setSocket(api.socketIO({ token }))
    }
    if (!token && socket) {
      socket.disconnect();
    }
  }, [user])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

const SocketContextProvider = () => useContext(SocketContext)

export { SocketProvider, SocketContextProvider };
