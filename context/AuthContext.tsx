import { User } from "@firebase/auth";
import {
  createContext,
  FC,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useContext,
} from "react";
import { auth } from "../firebase";
import { setCookie, deleteCookie } from '../utils/Cookies';
import { GraphQL, fetchApi, queries } from '../utils/Fetching';

export interface UserMax extends User {
  city?: string;
  country?: string;
  weddingDate?: Date;
  role?: string;
  accessToken?: string;
  _id? :string
}

type Context = {
  user: Partial<UserMax | null>;
  setUser: Dispatch<SetStateAction<Partial<UserMax | null>>>;
};

const initialContext: Context = {
  user: null,
  setUser: (user) => {},
};

const AuthContext = createContext<Context>(initialContext);

const AuthProvider: FC = ({ children }): JSX.Element => {
  const [user, setUser] = useState<Partial<UserMax | null>>(null);


  useEffect(() => {
    
    auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        const moreInfo = await fetchApi({query: queries.getUser, variables: {uid: user?.uid}});
        setUser({ ...user, ...moreInfo });

        // Setear en localStorage token JWT
        setCookie({nombre: "token-bodas", valor: (await user?.getIdTokenResult())?.token, dias: 1})
      } else {
        // Setear en localStorage token JWT
        deleteCookie("token-bodas")
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthContextProvider = () => useContext(AuthContext)

export { AuthProvider, AuthContextProvider };
