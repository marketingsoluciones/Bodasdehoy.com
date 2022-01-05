import axios, { AxiosInstance, AxiosResponse } from 'axios'



type Fetching = {
    graphql : CallableFunction
}


const instance : AxiosInstance = axios.create({baseURL: process.env.NEXT_PUBLIC_BASE_URL})

const config = {
    onUploadProgress: (progressEvent : ProgressEvent) => console.log(progressEvent.loaded)
}

export const api : Fetching = {
    graphql : async (data: object) : Promise<AxiosResponse> => {
        return await instance.post("/graphql", data, config)
    }
}



