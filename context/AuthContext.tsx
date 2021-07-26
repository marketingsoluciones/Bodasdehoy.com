import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

type Props = {
    children : ReactNode
}

type UserType = {
    confirmed? : boolean,
    blocked? : boolean
    _id : string
    username : string
    email : string
    provider? : string
    createdAt? : string
    updateAt? : string
    __v? : number
    role? : {
        _id : string
        name : string
        description : string
        type: string
        __v : number
        id : string
    }
    id?: string
    
}

type Context = {
    user : UserType
    setUser : Dispatch<SetStateAction<Context>>
}

const initialContext : Context = {
    user: {
        _id : "",
        username : "",
        email : "",
  
    },
    setUser: () => null,
}

const AuthContext = createContext<Context>(initialContext);

const AuthContextProvider = ({ children }: Props): JSX.Element => {
    const [user, setUser] = useState<Context>(initialContext);
  
    return (
      <AuthContext.Provider value={{ ...user, setUser }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export { AuthContext, AuthContextProvider };