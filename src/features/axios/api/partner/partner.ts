import axios, {AxiosRequestConfig} from "axios";
import { partnerLoginInterface, partnerData } from "../../../../types/partnerInterface";
import apiConfig from "../../../../utils/apiConfig";
import { toast } from "react-toastify";


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
            url: `${apiConfig.PartnerSignUp}`,
            method:'post',
            data:{
                partnerData
            }
        }

        const response = axios(phonePayConfig)
        console.log("response recieved frontend : ",response)
        return response
    }
    catch(error:any)
    {
        toast.error(error.response.data.message)
        console.log("error : ",error.response.data.message)
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

export const findOnePartner = async(data: string)=>{
    try{
        const partnerConfig : AxiosRequestConfig = {
            url:`${apiConfig.partnerOne}?id=${data}`,
            method:'get'
        }

        const response = await axios(partnerConfig)
        
        return response.data
    } catch(error: any){
        console.log(error.response.data)
        throw new Error(error.response.data.message)
    }
}