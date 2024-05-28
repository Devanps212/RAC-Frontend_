import axios, { AxiosRequestConfig } from "axios";
import apiConfig from "../../../../utils/apiConfig";
import setupAxiosInterceptors from "../../axios_Interceptor/userInterceptor";


const userApi = setupAxiosInterceptors()

export const getUserConversations = async(userId:string): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.getConversations}/${userId}`,
            method: 'get'
        }
        const res = await userApi(config);
        console.log("data get user api : ", res.data)
        return res.data;
    } catch (error) {
        throw new Error('Error while getting user conversations');
    }
}