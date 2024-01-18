import { User, getAuth } from "@firebase/auth";
import { createContext, FC, useState, Dispatch, SetStateAction, useEffect, useContext } from "react";
import { auth } from "../firebase";
import { fetchApi, queries } from "../utils/Fetching";
import Cookies from "js-cookie";


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
    console.log("authContext")
    const currentUser = getAuth().currentUser
    const sessionCookie = Cookies.get("sessionBodas")
    console.log("authContext", currentUser)
    if (!sessionCookie) {
      Cookies.remove("idToken", { domain: process.env.NEXT_PUBLIC_DOMINIO ?? "" });
      if (currentUser) {
        console.log("---------------////////////////---->", 10004)
        getAuth().signOut()
      }
    }
    auth.onAuthStateChanged(async (user: any) => {
      if (!user) {
        setUser(user)
      }
      if (user && window.location.pathname !== "/login") {
        const moreInfo = await fetchApi({
          query: queries.getUser,
          variables: { uid: user?.uid },
        });
        setUser({ ...user, ...moreInfo });
      }
    });
  }, []);

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
