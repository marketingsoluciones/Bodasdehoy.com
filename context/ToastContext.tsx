import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

type Toast = {
    message : string,
    route : string
}


type Context = {
    toasts : Toast[]
    setToast : Dispatch<SetStateAction<Context>>
}

const initialContext : Context = {
    toasts: [],
    setToast: () => null,
}

const ToastContext = createContext<Context>(initialContext);

const ToastContextProvider : FC = ({ children }): JSX.Element => {
    const [toasts, setToast] = useState<Context>(initialContext);
  
    return (
      <ToastContext.Provider value={{ ...toasts, setToast }}>
        {children}
      </ToastContext.Provider>
    );
  };

  export { ToastContext, ToastContextProvider };