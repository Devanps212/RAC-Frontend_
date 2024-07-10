import axios, { Axios, AxiosRequestConfig, AxiosResponse } from 'axios'
import { signInPayload, signUpPayload } from '../../../../types/payloadInterface'
import apiConfig from '../../../../utils/apiConfig'
import { setUserInterceptor } from '../../axios_Interceptor/Interceptor'
import { toast } from 'react-toastify'



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
export const otpGenerate = async(input : signInPayload | string, purpose = 'nothing')=>{
    try{
        console.log("sending request")
        let payload : Partial<signInPayload>
        if(typeof input === 'string')
        {
            payload = {email : input, password : '', purpose : ''}
            console.log(payload)
        }
        else
        {
            payload = input
            console.log(payload)
        }

        if(purpose === 'FPOTP'){
            payload.purpose = purpose
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
        toast.error(error.response.data.message)
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
        console.log("error occured : ",error.response.data.message)
        throw new Error(error.response.data.message)
    }
} 


export const locationFinding = async(location: string)=>{
    try
    {
        setUserInterceptor()
        console.log("This is location ==>",location)
        const locationConfig :  AxiosRequestConfig = {
            url: apiConfig.locationFinding,
            method:'post',
            data:{location}
        }

        const response = await axios(locationConfig)
        console.log(response)
        return response.data
    }
    catch(error:any)
    {
        console.log("errror : ", error)
        throw new Error(error.data.message)
    }
}

