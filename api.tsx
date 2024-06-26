import axios, { AxiosInstance, AxiosResponse } from 'axios'
import Cookies from 'js-cookie';
import { io, Manager } from "socket.io-client";
import { getAuth } from 'firebase/auth';
import { parseJwt } from './utils/Authentication';


type Fetching = {
    apiBodas: CallableFunction
    apiApp: CallableFunction
    youtube: CallableFunction
    restCountries: CallableFunction
    socketIO: CallableFunction
}

const instance: AxiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL })

export const api: Fetching = {
    apiBodas: async (data: object, token: string): Promise<AxiosResponse> => {
        let idToken = Cookies.get("idTokenV0.1.0")
        try {
            if (getAuth().currentUser) {
                if (!idToken) {
                    idToken = await getAuth().currentUser?.getIdToken(true)
                    const dateExpire = new Date(parseJwt(idToken ?? "").exp * 1000)
                    Cookies.set("idTokenV0.1.0", idToken ?? "", { domain: process.env.NEXT_PUBLIC_DOMINIO ?? "", expires: dateExpire })
                }
            }
        } catch (error) {
            //            
        }
        return await instance.post("/graphql", data, {
            headers: {
                Authorization: `Bearer ${idToken}`,
                Development: "bodasdehoy"
            }
        })
    },
    apiApp: async (data: object, token: string): Promise<AxiosResponse> => {
        let idToken = Cookies.get("idTokenV0.1.0")
        try {
            if (getAuth().currentUser) {
                if (!idToken) {
                    idToken = await getAuth().currentUser?.getIdToken(true)
                    const dateExpire = new Date(parseJwt(idToken ?? "").exp * 1000)
                    Cookies.set("idTokenV0.1.0", idToken ?? "", { domain: process.env.NEXT_PUBLIC_DOMINIO ?? "", expires: dateExpire })
                }
            }
        } catch (error) {
            //            
        }
        return await axios.post('https://apiapp.bodasdehoy.com/graphql', data, {
            headers: {
                Authorization: `Bearer ${idToken}`,
                Development: "bodasdehoy"
            }
        })
    },
    youtube: async (data: any): Promise<AxiosResponse> => {
        return await axios.get("https://www.googleapis.com/youtube/v3/search", {
            params: {
                key: process.env.NEXT_PUBLIC_API_KEY_CONSOLE_GOOGLE,
                part: "id,snippet",
                order: "date",
                channelId: "UCuQNm4bt_zQc5miwSm4WYXA"
            }
        })
    },
    restCountries: async (): Promise<AxiosResponse> => {
        return await axios.get('https://restcountries.com/v3.1/all')
    },

    socketIO: ({ token, origin }: { token: string, origin: string }) => {
        const manager = new Manager(process.env.NEXT_PUBLIC_BASE_URL ?? "", {
            closeOnBeforeunload: true
        })
        const socket = manager.socket("/", {
            auth: {
                token: `Bearer ${token}`,
                development: "bodasdehoy",
                origin
            }
        })
        return socket
    }
}



