import { getAuth, User } from "@firebase/auth";
import {
  createContext,
  FC,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useContext,
} from "react";
import { GraphQL, fetchApi, queries } from '../utils/Fetching';

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

const AuthProvider: FC = ({ children }): JSX.Element => {
  const [user, setUser] = useState<Partial<UserMax | null>>(null);


  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        const moreInfo = await fetchApi(queries.getUser,{uid: user?.uid});
        setUser({ ...user, ...moreInfo });

        // Setear en localStorage token JWT
        localStorage.setItem('auth', (await user?.getIdTokenResult())?.token)
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
