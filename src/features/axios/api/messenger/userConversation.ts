import axios, { AxiosRequestConfig } from "axios";
import apiConfig from "../../../../utils/apiConfig";
import setupAxiosInterceptors from "../../axios_Interceptor/userInterceptor";
import { toast } from "react-toastify";
import { setUserInterceptor } from "../../axios_Interceptor/Interceptor";


const userApi = setupAxiosInterceptors()

export const getUserConversations = async(partnerId: string, userId:string, message: string): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.getConversations}/${partnerId}`,
            method: 'post',
            data:{
                userId,
                message
            }
        }
        const res = await userApi(config);
        console.log("data get user api : ", res.data)
        return res.data;
    } catch (error: any) {
        toast.error(error.response.data.message)
        console.log("error found  :",error)
        throw new Error('Error while getting user conversations');
    }
}

export const getUserMessages = async(recvId:string): Promise<any> => {
    try {
        setUserInterceptor()
        const config: AxiosRequestConfig = {
            url: `${apiConfig.getMessages}/${recvId}`,
            method: 'get'
        }
        const res = await axios(config);
        console.log("data : ", res.data)
        return res.data;
    } catch (error: any) {
        console.log("error i n getMessage : ", error)
        toast.error(error.response.data.message)
        throw new Error('Error while getting user messages');
    }
}