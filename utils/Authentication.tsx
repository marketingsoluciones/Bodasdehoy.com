import { useCallback } from "react";
import { signInWithPopup, UserCredential, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, OAuthProvider, signInWithPhoneNumber, getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
import { LoadingContextProvider, AuthContextProvider } from "../context";
import { fetchApi, queries } from "./Fetching";
import { useToast } from "../hooks/useToast";
import { PhoneNumberUtil } from 'google-libphonenumber';

export const phoneUtil = PhoneNumberUtil.getInstance();


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

  const signIn = useCallback(
    async (type: keyof typeof types, payload, verificationId?) => {
      console.log(8444, type)
      /*
          ### Login por primera vez
          1.- Verificar tipo de login y tomar del diccionario el metodo
          2.- Obtener el tokenID del usuario
          3.- Enviar tokenID a API para recibir la sessionCookie
          4.- Almacenar en una cookie el token de la sessionCookie
          5.- Mutar el contexto User de React con los datos de Firebase + MoreInfo (API BODAS)
      */


      const types = {
        provider: async () => {
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
        credentials: async () => await signInWithEmailAndPassword(getAuth(), payload.identifier, payload.password),
        phone: async () => {
          console.log("verificationId", verificationId)
          const authCredential = PhoneAuthProvider.credential(verificationId, payload?.password ?? "");
          console.log(55544411, "authCredential", authCredential)
          const userCredential = await signInWithCredential(getAuth(), authCredential);
          console.log(userCredential)
          return userCredential
        }
      };

      // Autenticar con firebase
      try {
        const res: UserCredential | void = await types[type]();
        console.log("***/////-----", res?.user?.uid)
        if (res) {
          // Solicitar datos adicionales del usuario
          fetchApi({
            query: queries.getUser,
            variables: { uid: res.user.uid },
          }).then(async (moreInfo: any) => {

            console.log("***/////-----1", moreInfo)
            if (moreInfo?.status) {
              const token = (await res?.user?.getIdTokenResult())?.token;
              const sessionCookie = await getSessionCookie(token)
              if (sessionCookie) { }
              // Actualizar estado con los dos datos
              setUser({ ...res.user, ...moreInfo });
              console.log(4001, router?.query?.end)
              /////// REDIRECIONES ///////
              if (router?.query?.end) {
                router.push(`${router?.query?.end}`)
                toast("success", `Inicio sesión con exito`)
              } else {
                if (router?.query?.d == "info-empresa" && moreInfo.role.includes("empresa")) {
                  const path = window.origin.includes("://test.") ? process.env.NEXT_PUBLIC_CMS?.replace("//", "//test") : process.env.NEXT_PUBLIC_CMS
                  router.push(path ?? "")
                  toast("success", `Inicio de sesión de empresa con exito`)
                }
                if (router?.query?.d == "info-empresa" && !moreInfo.role.includes("empresa")) {
                  router.push("/info-empresa")
                  toast("warning", `Inicio sesión con una cuenta que no es de empresa`)
                }
                if (router?.query?.d !== "info-empresa") {
                  router.push(redirect ? redirect : "/")
                  toast("success", `Inicio sesión con exito`)
                }
              }
              ///////////////////////////
            } else {
              toast("error", "aun no está registrado");
              //verificar que firebase me devuelva un correo del usuario
              if (res?.user?.email) {
                //seteo usuario temporal pasar nombre y apellido de firebase a formulario de registro
                setUserTemp({ ...res.user });
                toast("success", "Seleccione quien eres y luego completa el formulario");
                return false
              } else {
                toast("error", "usted debe tener asociado un correo a su cuenta de proveedor");
                return false
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
    Cookies.remove("idToken", { domain: process.env.NEXT_PUBLIC_DOMINIO ?? "" });
    signOut(getAuth());
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
