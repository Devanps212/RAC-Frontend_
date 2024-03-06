import axios, {Axios, AxiosRequestConfig} from "axios";
import { signInPayload } from "../../../../types/payloadInterface";
import apiConfig from "../../../../utils/apiConfig";
import { toast } from "react-toastify";

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