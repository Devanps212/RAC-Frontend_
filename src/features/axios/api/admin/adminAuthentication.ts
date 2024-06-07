import axios, {Axios, AxiosRequestConfig} from "axios";
import { signInPayload } from "../../../../types/payloadInterface";
import apiConfig from "../../../../utils/apiConfig";
import { toast } from "react-toastify";
import { userAdminInterface } from "../../../../types/userInterface";
import { setAdminInterceptor } from "../../axios_Interceptor/Interceptor";

export const adminLogin = async(formData : signInPayload)=>{
    console.log("formData recieved : ", formData)
    try
    {
        const loginConfig : AxiosRequestConfig = {
            url:apiConfig.adminLogin,
            method:"post",
            data:formData
        }
        
        const result  = await axios(loginConfig)
        console.log(result.data.response)
        return result.data
    }
    catch(error:any)
    {
        console.log("error :",error.response.data)
        toast.error(error.response.data.message)
        throw new Error(error.message)
    }
    
}

export const findOneAdmin = async(data:string)=>{
    try{
        setAdminInterceptor()
        const adminConfig : AxiosRequestConfig = {
            url:`${apiConfig.findOneAdmin}?adminId=${data}`,
            method:'get'
        }

        const response = await axios(adminConfig)
        return response.data.data

    } catch(error: any){
        throw new Error(error.message)
    }
}

export const updateAdmin = async (data: Partial<userAdminInterface> | FormData): Promise<any> => {
    try {
        setAdminInterceptor(); 

        let headers: Record<string, string> = {}; 

        if (data instanceof FormData) {
            
            headers = {
                'Content-Type': 'multipart/form-data'
            };
        }

        const updateConfig: AxiosRequestConfig = {
            url: apiConfig.adminUpdate,
            method: 'patch',
            data: data,
            headers: headers 
        };

        const response = await axios(updateConfig);
        return response.data.data; 
    } catch (error:any) {
        console.log(error)
        throw new Error(error);
    }
};