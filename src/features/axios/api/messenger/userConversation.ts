import axios, { AxiosRequestConfig } from "axios";
import apiConfig from "../../../../utils/apiConfig";
import setupAxiosInterceptors from "../../axios_Interceptor/userInterceptor";
import { toast } from "react-toastify";
import { setPartnerInterceptor, setUserInterceptor } from "../../axios_Interceptor/Interceptor";


const userApi = setupAxiosInterceptors()

export const getUserConversations = async(recieverId: string, senderId:string, message: string): Promise<any> => {
    try {
        console.log("recieverid :", recieverId)
        const config: AxiosRequestConfig = {
            url: `${apiConfig.getConversations}/${recieverId}`,
            method: 'post',
            data:{
                senderId,
                message
            }
        }
        console.log("config : ", config)
        const res = await userApi(config);
        console.log("data get user api : ", res.data)
        return res.data;
    } catch (error: any) {
        toast.error(error.response.data.message)
        console.log("error found  :",error)
        throw new Error('Error while getting user conversations');
    }
}

export const getUserMessages = async(recvId:string, role: string): Promise<any> => {
    try {
        if(role==='user'){
            setUserInterceptor()
        } else {
            setPartnerInterceptor()
        }
        
        const config: AxiosRequestConfig = {
            url: `${apiConfig.getMessages}/${recvId}`,
            method: 'get'
        }
        const res = await axios(config);
        console.log("data : ", res.data)
        return res.data;
    } catch (error: any) {
        console.log("error i n getMessage : ", error)
        toast.warning(error.response.data.message)
        throw new Error('Error while getting user messages');
    }
}