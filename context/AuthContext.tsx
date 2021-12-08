import { getAuth, User } from "@firebase/auth";
import {
  createContext,
  FC,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { GraphQL } from "../utils/Fetching";

export interface UserMax extends User {
  city?: string;
  country?: string;
  weddingDate?: Date;
  role?: string;
  accessToken?: string;
}

type Context = {
  user: Partial<UserMax | null>;
  setUser: Dispatch<SetStateAction<Partial<UserMax | null>>>;
};

const initialContext: Context = {
  user: {},
  setUser: (user) => {},
};

const AuthContext = createContext<Context>(initialContext);

const AuthContextProvider: FC = ({ children }): JSX.Element => {
  const [user, setUser] = useState<Partial<UserMax | null>>(null);

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        const moreInfo = await GraphQL.getUser(user?.uid);
        setUser({ ...user, ...moreInfo });
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
