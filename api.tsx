import axios, { AxiosInstance, AxiosResponse } from 'axios'



type Fetching = {
    login : CallableFunction
    providers: CallableFunction
}


const instance : AxiosInstance = axios.create({baseURL: process.env.NEXT_PUBLIC_BASE_URL})

type Values = {
    identifier : string
    password : string
}

export const api : Fetching = {

    login : async (values : Values) : Promise<AxiosResponse> =>  {
        return await instance.post("/auth/local", values)
    },

    providers : async (provider: string) :Promise<AxiosResponse> => {
        return await instance.post(`/connect/${provider}`)
    }
}



