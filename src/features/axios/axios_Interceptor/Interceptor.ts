import axios, {InternalAxiosRequestConfig} from "axios";

export const setAdminInterceptor = ()=>{

    console.log('adminInterceptor working')
    const token = localStorage.getItem('admintoken') ?? ''
    console.log(token)
    axios.interceptors.request.use(
        (config:InternalAxiosRequestConfig<any>)=>{
            console.log("setting admin header")
            if(token)
            {
                console.log("setted admin token :", token)
                config.headers.Authorization = `Bearer ${token}`
                console.log(config.headers)
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

    console.log('partnerInterceptor working')
    const token = localStorage.getItem('partnerToken') ?? ''
    axios.interceptors.request.use(
        (config : InternalAxiosRequestConfig<any>)=>{
            console.log("setting partner header")
            if(token)
            {
                console.log(" setted partner token : ", token)
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