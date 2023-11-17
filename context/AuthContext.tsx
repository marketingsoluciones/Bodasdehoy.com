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
import { nanoid } from "nanoid";

export interface UserMax extends User {
  city?: string;
  country?: string;
  weddingDate?: Date;
  role?: string[];
  accessToken?: string;
  _id?: string;
}

type Context = {
  user: Partial<UserMax | null>;
  setUser: Dispatch<SetStateAction<Partial<UserMax | null>>>;
  userTemp: Partial<UserMax | null>;
  setUserTemp: Dispatch<SetStateAction<Partial<UserMax | null>>>;
  redirect: string | null;
  setRedirect: Dispatch<SetStateAction<Partial<string | null>>>;
  geoInfo: any,
  setGeoInfo: any,
};

const initialContext: Context = {
  user: null,
  setUser: (user) => { },
  userTemp: null,
  setUserTemp: (user) => { },
  redirect: null,
  setRedirect: (user) => { },
  geoInfo: null,
  setGeoInfo: () => { },
};

const AuthContext = createContext<Context>(initialContext);

const AuthProvider: FC = ({ children }): JSX.Element => {
  const [user, setUser] = useState<Partial<UserMax | null>>(null);
  const [userTemp, setUserTemp] = useState<Partial<UserMax | null>>(null);
  const [redirect, setRedirect] = useState<Partial<string | null>>(null);
  const [geoInfo, setGeoInfo] = useState<any>();

  useEffect(() => {
    auth.onAuthStateChanged(async (user: any) => {
      setTimeout(async () => {
        const sessionCookie = Cookies.get("sessionBodas");
        console.info("Verificando cookie", sessionCookie);
        if (!sessionCookie) {
          const cookieContent = JSON.parse(Cookies.get("guestbodas") ?? "{}")
          let guestUid = cookieContent?.guestUid
          if (!guestUid) {
            const dateExpire = new Date(new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000))
            guestUid = nanoid(28)
            Cookies.set("guestbodas", JSON.stringify({ guestUid }), { domain: process.env.NEXT_PUBLIC_DOMINIO ?? "", expires: dateExpire })
          }
          setUserTemp({ uid: guestUid, displayName: "guest" })
        }
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
            const result = await fetchApi({
              query: queries.authStatus,
              variables: { sessionCookie },
            });
            console.info("Llamo con mi sessionCookie para traerme customToken");
            console.info("Custom token", result?.customToken)
            result?.customToken && signInWithCustomToken(auth, result.customToken);
            console.info("Hago sesion con el custom token");
          }
        }
      }, 800);
    });
  }, []);

  useEffect(() => {
    auth.onIdTokenChanged(async user => {
      if (user) {
        const dateExpire = new Date(new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000))
        Cookies.set("idToken", await user.getIdToken(), { domain: process.env.NEXT_PUBLIC_DOMINIO ?? "", expires: dateExpire })
      }
    })
  }, [])

  useEffect(() => {
    fetchApi({
      query: queries.getGeoInfo,
      variables: {},
    }).then((geoInfo: any) => setGeoInfo(geoInfo)).catch((err: any) => console.log(err))
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, userTemp, setUserTemp, redirect, setRedirect, geoInfo, setGeoInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthContextProvider = () => useContext(AuthContext);

export { AuthProvider, AuthContextProvider };
