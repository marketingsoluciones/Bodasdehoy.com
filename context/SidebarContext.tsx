import { useRouter } from "next/router";
import { createContext, FC, useState, Dispatch, SetStateAction, useContext, useEffect } from "react";
import { Sidebar } from "../components/Surface";

type Context = {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
  showButtons: boolean;
  setShowButtons: Dispatch<SetStateAction<boolean>>;
};

const initialContext: Context = {
  showSidebar: false,
  setShowSidebar: () => { },
  showButtons: false,
  setShowButtons: () => { },
};

const SidebarContext = createContext<Context>(initialContext);

const SidebarProvider: FC = ({ children }): JSX.Element => {
  const [showSidebar, setShowSidebar] = useState<boolean>(initialContext.showSidebar);
  const [showButtons, setShowButtons] = useState<boolean>(initialContext.showSidebar);

  const router = useRouter()

  useEffect(() => {
    setShowSidebar(false)
  }, [router])

  return (
    <SidebarContext.Provider value={{ showSidebar, setShowSidebar, showButtons, setShowButtons }}>
      <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      {children}
    </SidebarContext.Provider>
  );
};

const SidebarContextProvider = () => useContext(SidebarContext);

export { SidebarProvider, SidebarContextProvider };
