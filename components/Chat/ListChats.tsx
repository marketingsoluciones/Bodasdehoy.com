import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { AuthContextProvider, ChatContextProvider } from "../../context";
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
  const { user } = AuthContextProvider();
  const {
    loadingChats,
    chats,
    setChats,
    conversation,
    setConversation,
    fetch,
    fetchy,
  } = ChatContextProvider();

  useEffect(() => {
    if (conversation?.state) {
      setShow(true);
    }
  }, [conversation?.state]);

  useEffect(() => {
    show && fetch();
  }, [show]);

  const handleChangeSearch = (value: string) => {
    fetchy({
      query: queries.getChats,
      variables: { uid: user?.uid, text: value, skip: 0, limit: 5 },
    });
  };
  return (
    <>
      <SearchChat onChange={(value: string) => handleChangeSearch(value)} />
      {!loadingChats ? (
        <div
          id={"listConversation"}
          className="flex flex-col overflow-auto h-[19rem] no-scrollbar"
        >
          {chats?.results?.length > 0 ? chats?.results?.map((item: Chat, idx: number) => (
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
            )}
        </div>
      ) : (
        <div className="text-primary h-full w-full flex items-center justify-center top-0 left-0 bg-white">
          <LoadingItem size="small" text="Cargando chats" />
        </div>
      )}
    </>
  );
};
