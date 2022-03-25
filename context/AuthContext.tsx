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
import { fetchApi, queries } from "../utils/Fetching";
import Cookies from 'js-cookie'
import { signInWithCustomToken } from "firebase/auth";

export interface UserMax extends User {
  city?: string;
  country?: string;
  weddingDate?: Date;
  role?: string;
  accessToken?: string;
  _id?: string;
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
      const sessionCookie = Cookies.get("sessionBodas");
      console.info("Verificando cookie", sessionCookie);
      if (sessionCookie) {
        console.info("Tengo cookie de sesion");
        if (user) {
          console.info("Tengo user de contexto firebase");
          const moreInfo = await fetchApi({
            query: queries.getUser,
            variables: { uid: user?.uid },
          });
          moreInfo && console.info("Tengo datos de la base de datos");
          setUser({ ...user, ...moreInfo });
          console.info("Guardo datos en contexto react");
        } else {
          console.info("NO tengo user de contexto de firebase");
          const { customToken } = await fetchApi({
            query: queries.authStatus,
            variables: { sessionCookie },
          });
          console.info("Llamo con mi sessionCookie para traerme customToken");
          console.info("Custom token", customToken)
          customToken && signInWithCustomToken(auth, customToken);
          console.info("Hago sesion con el custom token");
        }
      }
    });
  }, []);

  useEffect(() => {
    auth.onIdTokenChanged(async user => {
      if(user){
        Cookies.set("idToken", await user.getIdToken())
      }
    })
  }, [])
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthContextProvider = () => useContext(AuthContext);

export { AuthProvider, AuthContextProvider };
