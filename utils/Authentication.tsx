import { useCallback } from "react";
import { signInWithPopup, UserCredential, signInWithEmailAndPassword, sendPasswordResetEmail, getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
import { LoadingContextProvider, AuthContextProvider } from "../context";
import { fetchApi, queries } from "./Fetching";
import { useToast } from "../hooks/useToast";
import { PhoneNumberUtil } from 'google-libphonenumber';

export const phoneUtil = PhoneNumberUtil.getInstance();

export const parseJwt = (token: string) => {
  if (token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
  return {}
}

export const useAuthentication = () => {
  const { setLoading } = LoadingContextProvider();
  const { setUser, setUserTemp, redirect, setRedirect, geoInfo } = AuthContextProvider();
  const toast = useToast();
  const router = useRouter();

  const isPhoneValid = (phone: string) => {
    try {
      if (phone[0] === "0") {
        phone = `+${phoneUtil.getCountryCodeForRegion(geoInfo.ipcountry)}${phone.slice(1, phone.length)}`
      }
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
      return false;
    }
  };

  const getSessionCookie = useCallback(async (tokenID): Promise<string | undefined> => {
    if (tokenID) {
      const authResult = await fetchApi({
        query: queries.auth,
        variables: { idToken: tokenID },
      });
      if (authResult?.sessionCookie) {
        const { sessionCookie } = authResult;
        // Setear en localStorage token JWT
        const dateExpire = new Date(new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000))
        Cookies.set("sessionBodas", sessionCookie, { domain: process.env.NEXT_PUBLIC_DOMINIO ?? "", expires: dateExpire });
        return sessionCookie
      } else {
        console.warn("No se pudo cargar la cookie de sesión por que hubo un problema")
        throw new Error("No se pudo cargar la cookie de sesión por que hubo un problema")
      }
    } else {
      console.warn("No hay tokenID para pedir la cookie de sesion")
      throw new Error("No hay tokenID para pedir la cookie de sesion")
    }

  }, [])

  const types = {
    provider: async (payload: any) => {
      try {
        const asdf = await signInWithPopup(getAuth(), payload)
        return asdf
      } catch (error: any) {
        setLoading(false);
        const er = error.toString().split(".")[0].split(": Error ")[1]
        if (er == "(auth/account-exists-with-different-credential)") {
          toast("error", "El correo asociado a su provedor ya se encuentra registrado en bodasdehoy.com");
        }
      }
    },
    credentials: async (payload: any) => await signInWithEmailAndPassword(getAuth(), payload.identifier, payload.password),
    phone: async (payload: any, verificationId: any) => {
      const authCredential = PhoneAuthProvider.credential(verificationId, payload?.password ?? "");
      const userCredential = await signInWithCredential(getAuth(), authCredential);
      return userCredential
    }
  };

  interface propsSinnIn {
    type: keyof typeof types
    payload: any
    verificationId?: any
    setStage: any
    whoYouAre?: any
  }
  const signIn = useCallback(
    async ({ type, payload, verificationId, setStage, whoYouAre }: propsSinnIn) => {
      /*
          ### Login por primera vez
          1.- Verificar tipo de login y tomar del diccionario el metodo
          2.- Obtener el tokenID del usuario
          3.- Enviar tokenID a API para recibir la sessionCookie
          4.- Almacenar en una cookie el token de la sessionCookie
          5.- Mutar el contexto User de React con los datos de Firebase + MoreInfo (API BODAS)
      */
      try {
        const res: UserCredential | void = await types[type](payload, verificationId);
        if (res) {
          const idToken = await res?.user?.getIdToken()
          const dateExpire = new Date(parseJwt(idToken).exp * 1000)
          Cookies.set("idTokenV0.1.0", idToken, { domain: process.env.NEXT_PUBLIC_DOMINIO ?? "", expires: dateExpire })
          fetchApi({
            query: queries.getUser,
            variables: { uid: res.user.uid },
          }).then(async (moreInfo: any) => {
            if (moreInfo?.status) {
              await getSessionCookie(idToken)
              setUser({ ...res.user, ...moreInfo });
              /////// REDIRECIONES ///////
              if (router?.query?.end) {
                router.push(`${router?.query?.end}`)
                toast("success", `Inicio sesión con éxito`)
              } else {
                if (router?.query?.d == "info-empresa" && moreInfo.role.includes("empresa")) {
                  const path = window.origin.includes("://test.") ? process.env.NEXT_PUBLIC_CMS?.replace("//", "//test") : process.env.NEXT_PUBLIC_CMS
                  router.push(path ?? "")
                  toast("success", `Inicio de sesión de empresa con éxito`)
                }
                if (router?.query?.d == "info-empresa" && !moreInfo.role.includes("empresa")) {
                  router.push("/info-empresa")
                  toast("warning", `Inicio sesión con una cuenta que no es de empresa`)
                }
                if (router?.query?.d !== "info-empresa") {
                  router.push(redirect ? redirect : "/")
                  toast("success", `Inicio sesión con éxito`)
                }
              }
              ///////////////////////////
            } else {
              if (whoYouAre !== "") {
                fetchApi({
                  query: queries.createUser,
                  variables: {
                    uid: res?.user?.uid,
                    role: whoYouAre
                  }
                }).then(async () => {
                  await getSessionCookie(idToken)
                  setUser({ ...res.user, role: [whoYouAre] });
                  /////// REDIRECIONES ///////
                  if (router?.query?.end) {
                    router.push(`${router?.query?.end}`)
                    toast("success", `Registro sesión con éxito`)
                  } else {
                    if (router?.query?.d == "info-empresa" && [whoYouAre].includes("empresa")) {
                      const path = window.origin.includes("://test.") ? process.env.NEXT_PUBLIC_CMS?.replace("//", "//test") : process.env.NEXT_PUBLIC_CMS
                      router.push(path ?? "")
                      toast("success", `Registro de sesión de empresa con éxito`)
                    }
                    if (router?.query?.d == "info-empresa" && ![whoYouAre].includes("empresa")) {
                      router.push("/info-empresa")
                      toast("warning", `Registro sesión con una cuenta que no es de empresa`)
                    }
                    if (router?.query?.d !== "info-empresa") {
                      router.push(redirect ? redirect : "/")
                      toast("success", `Registro sesión con éxito`)
                    }
                  }
                  ///////////////////////////
                })
              } else {
                toast("error", `${res?.user?.email} no está registrado`)
                toast("success", `Haz click en Regístrate`)
              }
            }
          })
        }
      } catch (error) {
        toast("error", "correo o contraseña inválida");
        return false
      }
      setLoading(false);
      return false
    },
    [redirect, getSessionCookie, router, setLoading, setUser, setUserTemp, toast]
  );

  const _signOut = useCallback(async () => {
    await fetchApi({ query: queries.signOut, variables: { sessionCookie: Cookies.get("sessionBodas") } })
    Cookies.remove("sessionBodas", { domain: process.env.NEXT_PUBLIC_DOMINIO ?? "" });
    Cookies.remove("idTokenV0.1.0", { domain: process.env.NEXT_PUBLIC_DOMINIO ?? "" });
    setTimeout(async () => {
      await getAuth().signOut().then(() => {
        console.log("signOut con éxito")
        setUser(null)
      })
        .catch((error) => {
          console.log(error);
        });
    }, 700);
    setUser(null)
    toast("success", "Gracias por su visita")
    router.push("/");
  }, [router, setUser, toast])




  const resetPassword = async (values: any, setStage: any) => {// funcion para conectar con con firebase para enviar el correo 
    if (values?.identifier !== "") {
      try {
        await sendPasswordResetEmail(getAuth(), values?.identifier);
        setStage("login")
        toast("success", "Email enviado correctamente")
      } catch (error) {
        toast("error", "Error, email no encontrado")
        console.log(error);
      }
    } else {
      toast("error", "introduce un correo")
    }
  };

  return { signIn, getSessionCookie, _signOut, resetPassword, isPhoneValid };
};
