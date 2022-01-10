import axios, { AxiosInstance, AxiosResponse } from 'axios'



type Fetching = {
    graphql : CallableFunction
    youtube : CallableFunction
}


const instance : AxiosInstance = axios.create({baseURL: process.env.NEXT_PUBLIC_BASE_URL})


export const api : Fetching = {
    graphql : async (data: object, config: object) : Promise<AxiosResponse> => {
        return await instance.post("/graphql", data, config)
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
    }
}



