import axios, {AxiosRequestConfig} from "axios";
import { partnerLoginInterface, partnerData } from "../../../../types/partnerInterface";
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

export const partnerSignUpPayment = async(partnerData: partnerData)=>{
    try
    {
        console.log("partnerData passing : ", partnerData)
        const phonePayConfig : AxiosRequestConfig = {
            url: `${apiConfig.PartnerSignUp}?partnerData=${JSON.stringify(partnerData)}`,
            method:'get',
        }

        const response = axios(phonePayConfig)
        console.log("response recieved frontend : ",response)
        return response
    }
    catch(error:any)
    {
        console.log(error.message)
        throw new Error(error.response.data.message)
    }
    
}

export const findAllPartner = async()=>{
    try{
        const partnerConfig : AxiosRequestConfig = {
            url: apiConfig.partnerAll,
            method: 'get'
        }

        const response = await axios(partnerConfig)
        return response.data.data
    } catch(error: any){
        throw new Error(error.message)
    }
}