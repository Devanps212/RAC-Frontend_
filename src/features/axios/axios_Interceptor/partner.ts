import axios, { InternalAxiosRequestConfig } from "axios";



export const setPartnerInterceptor = ()=>{

    const token = localStorage.getItem('partnerToken') ?? ''

    axios.interceptors.request.use(
        (config : InternalAxiosRequestConfig<any>)=>{
            if(token)
            {
                config.headers = config.headers || {}
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        },
        (error:any)=>{
            throw new Error(error.message)
        }
    )
}