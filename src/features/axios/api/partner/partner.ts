import axios, {AxiosRequestConfig} from "axios";
import { partnerLoginInterface } from "../../../../types/partnerInterface";
import apiConfig from "../../../../utils/apiConfig";


export const partnerLogin = async(formData: partnerLoginInterface)=>{
    try
    {
        console.log(formData)
        const loginConfig : AxiosRequestConfig = {
            url:apiConfig.partnerLogin,
            method:"post",
            data:{formData}
        }

        const response  = await axios(loginConfig)
        console.log(response.data)
        return response.data
    }
    catch(error:any)
    {
        console.log(error)
        throw new Error(error.response.data.message)
    }
}