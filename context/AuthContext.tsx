import { User } from "@firebase/auth";
import { createContext, FC, useState } from "react";

export interface UserMax extends User {
  city?: string;
  country?: string;
  weddingDate?: Date;
  role?: string;
}

type Context = {
  user: Partial<UserMax>;
  setUser: (user: UserMax) => void;
};

const initialContext: Context = {
  user: {},
  setUser: () => null,
};

const AuthContext = createContext<Context>(initialContext);

const AuthContextProvider: FC = ({ children }): JSX.Element => {
  const [user, setUser] = useState<Partial<UserMax>>({});

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
