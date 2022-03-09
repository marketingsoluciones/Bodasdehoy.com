import { Chat } from '../interfaces/index';
import { SetStateAction, useEffect, useState, useCallback } from 'react';
import { queries } from '../utils/Fetching';
import { AuthContextProvider, SocketContextProvider } from '.';
import {
    createContext,
    FC,
    Dispatch,
    useContext,
  } from "react";
import useFetch from '../hooks/useFetch';
  
  
interface ResultFetchChats {
    total: number | null;
    results: Chat[];
  }

  type Context = {
    chats: ResultFetchChats
    setChats : Dispatch<SetStateAction<ResultFetchChats>>
    loadingChats? : boolean
    errorChats? : boolean
    fetch? : any
    fetchy? : any
    conversation?: stateConversation | null,
    setConversation: Dispatch<SetStateAction<stateConversation>>
  };
  
  const initialContext: Context = {
    chats: {
        total: null,
        results: []
    },
    setChats: () => null,
    loadingChats : false,
    errorChats : false,
    fetch : () => {},
    fetchy : () => {},
    conversation: null,
    setConversation: () => {}

  };
  
  const ChatContext = createContext<Context>(initialContext);
  
  // Verificar si es necesario que este en contexto

  
const initialState = { state: false, data: null };



interface stateConversation {
  state: boolean;
  data: Chat | null;
}
  
  const ChatProvider: FC = ({ children }): JSX.Element => {
    const {user} = AuthContextProvider()
    const { socket } = SocketContextProvider();
    const [limit, setLimit] = useState(5)
    const [skip, setSkip] = useState(0)
    const [conversation, setConversation] =
    useState<stateConversation>(initialState);
    const [chats, setChats, loadingChats, errorChats, fetchy] = useFetch({
        query: queries.getChats,
        variables: { uid: user?.uid, limit, skip },
      });
  
    const fetch = () => {
      fetchy({ query: queries.getChats, variables: { uid: user?.uid, limit, skip } });
     }

   useEffect(() => {
     fetch()
   }, [user?.uid]);

   const handleCreateChat = useCallback((data : Chat) => {
    console.log(data)
    setConversation({state: true, data})
    setChats((old : any) => {
        if(old?.results?.findIndex((item : any) => item._id === data._id) === -1){
          return {
            ...old,
            results: [data,...old?.results ]
          };
        } else {
          return old
        }
      });
    }, [])

  useEffect(() => {
    socket?.on("chatBusiness:create", handleCreateChat );
    return () => {
      socket?.off('chatBusiness:create', handleCreateChat)
    }
  }, [socket, handleCreateChat]);

    return (
      <ChatContext.Provider value={{ chats, setChats, loadingChats, errorChats, fetch, conversation, setConversation, fetchy }}>
        {children}
      </ChatContext.Provider>
    );
  };
  
  const ChatContextProvider = () => useContext(ChatContext);
  
  export { ChatProvider, ChatContextProvider };
  