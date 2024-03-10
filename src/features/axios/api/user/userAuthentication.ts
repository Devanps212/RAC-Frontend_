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
        console.log("formData : ",payload)
        const config:AxiosRequestConfig={
            url: apiConfig.userSignIn,
            method:'post',
            data:payload
        }
        const response = await axios(config)
        console.log("response recieved : ",response)
        return response.data
    }
    catch(error:any){
        console.log(error.response.data.message)
        throw new  Error(error.response.data.message)
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

export const GoogleVerification = async(credentials : string)=>{
    console.log("recieved credentials :", credentials)
    
    try
    {
        const gooogleConfig : AxiosRequestConfig ={
            url: apiConfig.googleVerification,
            method: "post",
            data: {credentials}
        }

        const response = await axios(gooogleConfig)
        console.log("response recieved")
        console.log(response.data)
        return response.data
    }
    catch(error: any)
    {
        console.log(error)
        console.log("error occured : ",error.message)
        throw new Error(error.message)
    }
} 
