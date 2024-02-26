import axios, { Axios, AxiosRequestConfig, AxiosResponse } from 'axios'
import { signInPayload, signUpPayload } from '../../../../types/payloadInterface'
import apiConfig from '../../../../utils/apiConfig'



export const userSignUp = async(payload: signUpPayload) : Promise<any>=>{
    try{
        const config:AxiosRequestConfig = {
            url:`${apiConfig.userSignUp}`,
            method:'post',
            data: payload
        }
        console.log(config.url)
        console.log("Passing data to backend")
        const response = await axios(config)
        console.log("response data recieved : ",response.data)
        return response.data
    }
    catch(error:any)
    {
        if(error.message === "Request failed with status code 409")
        {
            throw new Error("email already exist")
        }
        else
        {
            throw new Error("signUp failed")
        }
    }
}
export const userLogin = async(payload : signInPayload):Promise<any>=>
{
    try{
        const config:AxiosRequestConfig={
            url: apiConfig.otpGenerate,
            method:'post',
            data:payload
        }
        const response = await axios(config)
        return response.data
    }
    catch(error:any){
        console.log(error.message)
    }
}
export const otpGenerate = async()=>{
    try{
        const userData = JSON.parse(sessionStorage.getItem('UserData') || '{}');
        const otp: AxiosRequestConfig = {
            url:apiConfig.otpGenerate,
            method:'post',
            data:userData
        }
        const response:AxiosResponse = await axios(otp)
        console.log("return response = ",response)
        return response.data
    }
    catch(error)
    {
        throw new Error(error.message)
    }
}
export const otpVer = async(otp:string)=>{
    try
    {
        console.log("reached otpVer passing")
        const userData = JSON.parse(sessionStorage.getItem('UserData') || '{}')
        const sample = JSON.parse(sessionStorage.getItem('samp') || '')
        console.log("userData", userData, "sample :", sample)
        const otpConfig : AxiosRequestConfig = {
            url:apiConfig.otpVerify,
            method:'post',
            data:{otp, userData, sample}
        }

        console.log(otpConfig)

        const response:AxiosResponse = await axios(otpConfig)
        console.log("Response reurns from otpver",response.data)
        return response.data
    }
    catch(error)
    {
        throw new Error(error.message)
    }
}
