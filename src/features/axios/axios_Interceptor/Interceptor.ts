import axios, {InternalAxiosRequestConfig} from "axios";

export const setAdminInterceptor = ()=>{

    const token = localStorage.getItem('admintoken') ?? ''
    axios.interceptors.request.use(
        (config:InternalAxiosRequestConfig<any>)=>{
            if(token)
            {
                config.headers.Authorization = `Bearer ${token}`
            }
            else
            {
                console.log("no token found")
            }
            return config
        },
        (error:any)=>{
            throw new Error(error.message)
        }
    )

}

export const setPartnerInterceptor = ()=>{

    const token = localStorage.getItem('partnerToken') ?? ''
    axios.interceptors.request.use(
        (config : InternalAxiosRequestConfig<any>)=>{
            if(token)
            {
                config.headers.Authorization = `Bearer ${token}`
            }
            else
            {
                console.log("no token found")
            }
            return config
        },
        (error:any)=>{
            throw new Error(error.message)
        }
    )
}