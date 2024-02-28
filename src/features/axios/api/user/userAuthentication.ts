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
        console.log("error message: ",error.message)
        if(error.message === "Request failed with status code 500")
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
            url: apiConfig.userSignIn,
            method:'post',
            data:payload
        }
        const response = await axios(config)
        return response.data
    }
    catch(error:any){
        console.log(error.message)
        throw new  Error(error.message)
    }
}
export const otpGenerate = async(input : signInPayload | string)=>{
    try{
        console.log("sending request")
        let payload : signInPayload
        if(typeof input === 'string')
        {
            payload = {email : input, password : ''}
            console.log(payload)
        }
        else
        {
            payload = input
            console.log(payload)
        }
        const otp: AxiosRequestConfig = {
            url:apiConfig.otpGenerate,
            method:'post',
            data:payload
        }
        const response:AxiosResponse = await axios(otp)
        console.log("return response = ",response)
        return response.data
    }
    catch(error:any)
    {
        console.log(error)
        console.log("error : ",error.message)
        throw new Error(error.response.data.message)
    }
}
export const otpVer = async(otp:string)=>{

        const storedSecret = sessionStorage.getItem('otpSecret');
        const parsedSecret = storedSecret ? JSON.parse(storedSecret) : null;
    try
    {
        console.log("otp passing :", otp)
        console.log("reached otpVer passing")
        const otpConfig : AxiosRequestConfig = {
            url:apiConfig.otpVerify,
            method:'post',
            data:{otp, secret: parsedSecret}
        }

        console.log(otpConfig)

        const response:AxiosResponse = await axios(otpConfig)
        console.log("Response reurns from otpver",response.data)
        return response.data
    }
    catch(error:any)
    {
        throw new Error(error.message)
    }
}
