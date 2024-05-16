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
  link_id?: undefined,
  SetLink_id?: undefined,
  storage_id?: undefined,
  SetStorage_id?: undefined,
  linkMedia?: undefined,
  SetLinkMedia?: undefined,
  preregister?: undefined,
  SetPreregister?: undefined,
  WihtProvider?: undefined,
  SetWihtProvider?: undefined,
}

type Context = {
  user: Partial<UserMax | null>;
  setUser: Dispatch<SetStateAction<Partial<UserMax | null>>>;
  userTemp: Partial<UserMax | null>;
  setUserTemp: Dispatch<SetStateAction<Partial<UserMax | null>>>;
  redirect: string | null;
  setRedirect: Dispatch<SetStateAction<Partial<string | null>>>;
  geoInfo: any
  setGeoInfo: any
  link_id: any
  SetLink_id: any
  storage_id: any
  SetStorage_id: any
  linkMedia: any
  SetLinkMedia: any
  preregister: any
  SetPreregister: any
  WihtProvider: any
  SetWihtProvider: any
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
  link_id: null,
  SetLink_id: () => { },
  storage_id: null,
  SetStorage_id: () => { },
  linkMedia: null,
  SetLinkMedia: () => { },
  preregister: null,
  SetPreregister: () => { },
  WihtProvider: null,
  SetWihtProvider: () => { },
};

const AuthContext = createContext<Context>(initialContext);

const AuthProvider: FC = ({ children }): JSX.Element => {
  const [user, setUser] = useState<Partial<UserMax | null>>(null);
  const [userTemp, setUserTemp] = useState<Partial<UserMax | null>>(null);
  const [redirect, setRedirect] = useState<Partial<string | null>>(null);
  const [geoInfo, setGeoInfo] = useState<any>();
  const [link_id, SetLink_id] = useState<string | string[] | null>(null);
  const [preregister, SetPreregister] = useState<any>(null)
  const [linkMedia, SetLinkMedia] = useState<string | string[] | null>(null)
  const [storage_id, SetStorage_id] = useState<string | null>(null)
  const [WihtProvider, SetWihtProvider] = useState<boolean>(false)

  useEffect(() => {
    auth.onAuthStateChanged(async (user: any) => {
      if (!user) {
        setUser(user)
      }
      const sessionBodas = Cookies.get("sessionBodas")
      if (user && window.location.pathname !== "/login" && sessionBodas) {
        const moreInfo = await fetchApi({
          query: queries.getUser,
          variables: { uid: user?.uid },
        });
        if (moreInfo) {
          setUser({ ...user, ...moreInfo });
        } else {
          Cookies.remove("idTokenV0.1.0", { domain: process.env.NEXT_PUBLIC_DOMINIO ?? "" });
          getAuth().signOut()
        }
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
    <AuthContext.Provider value={{ user, setUser, userTemp, setUserTemp, redirect, setRedirect, geoInfo, setGeoInfo, link_id, SetLink_id, storage_id, SetStorage_id, linkMedia, SetLinkMedia, preregister, SetPreregister, SetWihtProvider, WihtProvider, }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthContextProvider = () => useContext(AuthContext);

export { AuthProvider, AuthContextProvider };
