import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { io } from "socket.io-client";
import { getCookie } from './utils/Cookies';


type Fetching = {
    graphql : CallableFunction
    youtube : CallableFunction
    restCountries : CallableFunction
    socketIO: CallableFunction
    loginAuth: CallableFunction

}



const instance : AxiosInstance = axios.create({baseURL: process.env.NEXT_PUBLIC_BASE_URL})


export const api : Fetching = {
    graphql : async (data: object, config: object, token: string) : Promise<AxiosResponse> => {
        let tokenFinal : string | null = token ?? "No hay token"
        if (typeof window !== "undefined") {
            tokenFinal = getCookie("token-bodas")
        }
            return await instance.post("/graphql", data, {
                headers: {
                    Authorization : `Bearer ${tokenFinal}`
                }
            })
    },
    youtube : async (data: any) : Promise<AxiosResponse> => {
        return await axios.get("https://www.googleapis.com/youtube/v3/search", {
            params: {
                key : process.env.NEXT_PUBLIC_API_KEY_CONSOLE_GOOGLE,
                part : "id,snippet",
                order : "date",
                channelId : "UCuQNm4bt_zQc5miwSm4WYXA"
            }
        })
    },
    restCountries: async () : Promise<AxiosResponse> => {
        return await axios.get('https://restcountries.com/v3.1/all')
    },

    socketIO : ({token} : {token: string}) => {
        const socket = io(`https://api.bodasdehoy.com`, {
            auth:{
                token: `Bearer ${token}`
            }
        })

        return socket
    },
    loginAuth : (idToken : string) : Promise<AxiosResponse<{sessionCookie: string}>> => {
        return axios.post(`http://96.126.110.203:4500/auth`, {idToken}, {
            headers: {
                ["X-Powered-By"] : "Express",
                ["Content-Type"] : "application/json; charset=utf-8",
                ["Content-Length"] : 35,
                ETag : `W/"23-YJh7THQakehyNK8uguaK5LP/0QA"`,
                Connection : "keep-alive",
                ["Keep-Alive"] : "timeout=5"

            }
        })
    }
}



