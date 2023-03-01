import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { api } from "../../api";
import { AuthContextProvider, ChatContextProvider } from "../../context";
import { ResultFetchChats } from "../../context/ChatContext";
import { Chat } from "../../interfaces";
import { queries } from "../../utils/Fetching";
import { LoadingItem } from "../Loading";
import EmptyComponent from "../Surface/EmptyComponent";
import { ConversationItem } from "./ConversationItem";
import { SearchChat } from "./SearchChat";

interface propsListChats {
  show: boolean | undefined;
  setShow: Dispatch<SetStateAction<boolean>>;
}
export const ListChats: FC<propsListChats> = ({ show, setShow }) => {
  const [activeSearch, setActiveSearch] = useState(false);
  const [dataSearch, setDataSearch] = useState<ResultFetchChats>();
  const { user } = AuthContextProvider();
  const { loadingChats, chats, setChats, conversation, setConversation, fetch, fetchy } = ChatContextProvider();

  useEffect(() => {
    if (conversation?.state) {
      setShow(true);
    }
  }, [conversation?.state]);

  useEffect(() => {
    show && fetch();
  }, [show]);

  useEffect(() => {
    if (!activeSearch) {
      setDataSearch(undefined)
    }
  }, [activeSearch, dataSearch]);


  const handleChangeSearch = async (value: string) => {
    const query = queries.getChats
    const variables = { uid: user?.uid, text: value, skip: 0, limit: 5 }
    const { data: { data } } = await api.graphql({ query, variables })
    console.log(23456789, "ejecuta setDataSearch", "value:", value, "activeSearch", activeSearch)
    setDataSearch(data?.getChats)
    return data?.getChats
  };
  return (
    <>
      <SearchChat onChange={(value: string) => handleChangeSearch(value)} activeSearch={activeSearch} setActiveSearch={setActiveSearch} />
      {!loadingChats ? (
        <div
          id={"listConversation"}
          className="flex flex-col overflow-auto h-[19rem] no-scrollbar"
        >
          {
            !activeSearch ?
              chats?.results?.length > 0 ? chats?.results?.map((item: Chat, idx: number) => (
                <ConversationItem
                  key={idx}
                  {...item}
                  onClick={() =>
                    setConversation({
                      state: true,
                      data: item,
                    })
                  }
                />
              ))
                : (
                  <div className="text-primary h-full w-full flex items-center justify-center top-0 left-0 bg-white">
                    <EmptyComponent text={"No hay chats"} />
                  </div>
                )
              :
              dataSearch && dataSearch?.results?.length > 0 && dataSearch?.results?.map((item: Chat, idx: number) => (
                <ConversationItem
                  key={idx}
                  {...item}
                  onClick={() =>
                    setConversation({
                      state: true,
                      data: item,
                    })
                  }
                />
              ))
          }
        </div>
      ) : (
        <div className="text-primary h-full w-full flex items-center justify-center top-0 left-0 bg-white">
          <LoadingItem size="small" text="Cargando chats" />
        </div>
      )}
    </>
  );
};
