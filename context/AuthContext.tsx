import { User, getAuth } from "@firebase/auth";
import { createContext, FC, useState, Dispatch, SetStateAction, useEffect, useContext } from "react";
import { auth } from "../firebase";
import { fetchApi, fetchApiEventos, queries } from "../utils/Fetching";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { nanoid, customAlphabet, } from 'nanoid'

interface StartLink {
  time: number | null
  idx: number
}

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
  startLink: StartLink
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
  startLink: { time: null, idx: 0 }
};

const AuthContext = createContext<Context>(initialContext);

const AuthProvider: FC = ({ children }): JSX.Element => {
  const [user, setUser] = useState<Partial<UserMax | null>>(null);
  const [userTemp, setUserTemp] = useState<Partial<UserMax | null>>(null);
  const [redirect, setRedirect] = useState<Partial<string | null>>(null);
  const [geoInfo, setGeoInfo] = useState<any>();
  const [link_id, SetLink_id] = useState<string | string[] | null>(null);
  const [preregister, SetPreregister] = useState<any>(null)
  const [linkMedia, SetLinkMedia] = useState<string | string[] | null | undefined>(null)
  const [storage_id, SetStorage_id] = useState<string | null>(null)
  const [WihtProvider, SetWihtProvider] = useState<boolean>(false)
  const [startLink, setStartLink] = useState<StartLink>(initialContext.startLink)

  const router = useRouter()

  useEffect(() => {

    if (!link_id && router?.query?.link) {
      if (!router?.query?._id) {
        const sessionBodas = Cookies.get("sessionBodas")
        if (!sessionBodas) {
          router.push("/login?d=app&q=register")
        }
      }
      if (router?.query?._id) {
        fetchApiEventos({
          query: queries.getPreregister,
          variables: { _id: router?.query?._id }
        }).then((result: any) => {
          //aqui evaluar: si ya esta reristrado devolver null y redireccionar a app
          // y falta el registro de logout
          SetPreregister(JSON.parse(result ?? {}))
        })
      }
      SetLinkMedia(router?.query?.m)
      SetLink_id(router?.query?.link)
      if (router?.query?._id) {
        const sessionBodas = Cookies.get("sessionBodas")
        if (!sessionBodas) {
          router.push("/login?d=app&q=register")
        } else {
          router.push(window.origin.includes("://test.") ? process.env.NEXT_PUBLIC_EVENTSAPP?.replace("//", "//test") ?? "" : process.env.NEXT_PUBLIC_EVENTSAPP ?? "")
        }
      }
      const storage_id = localStorage.getItem("_id")
      if (!storage_id) {
        const _id = customAlphabet('1234567890abcdef', 24)()
        localStorage.setItem("_id", _id)
        SetStorage_id(_id)
      } else {
        SetStorage_id(storage_id)
      }
    }
  }, [router])

  useEffect(() => {
    if (storage_id && link_id) {
      fetchApiEventos({
        query: queries.updateActivityLink,
        variables: {
          args: {
            link_id,
            storage_id,
            activity: "accessed",
            usuario_id: user?.uid,
            name: user?.displayName,
            role: user?.role,
            email: user?.email,
            phoneNumber: user?.phoneNumber,
            navigator: navigator?.userAgentData?.platform,
            mobile: (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
          }
        }
      })
        .then((result: any) => {
          setStartLink({ time: new Date().getTime(), idx: parseInt(result) })
        })
        .catch((error: any) => console.log(90000, error))
    }
  }, [storage_id, link_id, user])

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
    <AuthContext.Provider value={{ user, setUser, userTemp, setUserTemp, redirect, setRedirect, geoInfo, setGeoInfo, link_id, SetLink_id, storage_id, SetStorage_id, linkMedia, SetLinkMedia, preregister, SetPreregister, SetWihtProvider, WihtProvider, startLink }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthContextProvider = () => useContext(AuthContext);

export { AuthProvider, AuthContextProvider };
