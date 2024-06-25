import axios, { AxiosRequestConfig } from "axios";
import apiConfig from "../../../../utils/apiConfig";
import setupAxiosInterceptors from "../../axios_Interceptor/userInterceptor";
import { toast } from "react-toastify";
import { setPartnerInterceptor, setUserInterceptor } from "../../axios_Interceptor/Interceptor";


const userApi = setupAxiosInterceptors()

export const getUserConversations = async(recieverId: string, senderId:string, message: string): Promise<any> => {
    try {
        
        const config: AxiosRequestConfig = {
            url: `${apiConfig.getConversations}/${recieverId}`,
            method: 'post',
            data:{
                senderId,
                message
            }
        }
       
        const res = await userApi(config);
        
        return res.data;
    } catch (error: any) {
        toast.error(error.response.data.message)
        console.log("error found  :",error)
        throw new Error('Error while getting user conversations');
    }
}

export const getUserMessages = async(recvId:string, senderId: string, role: string): Promise<any> => {
    try {
        if(role==='user'){
            setUserInterceptor()
        } else {
            setPartnerInterceptor()
        }
        
        const config: AxiosRequestConfig = {
            url: `${apiConfig.getMessages}/${recvId}/${senderId}`,
            method: 'get'
        }
        console.log(config)
        const res = await axios(config);
        
        return res.data;
    } catch (error: any) {
        console.error("error i n getMessage : ", error)
        toast.warning(error.response.data.message)
        throw new Error('Error while getting user messages');
    }
}