import axios, { AxiosRequestConfig, HttpStatusCode } from "axios";
import apiConfig from "../../../../utils/apiConfig";
import { couponInterface } from "../../../../types/couponInterface";

export const generator = async(price: number, expiry: string)=>{
    try{
        const couponConfig : AxiosRequestConfig = {
            url:apiConfig.couponGenerator,
            method:'post',
            data: {price,
                expiry
            }
        }
        const response = await axios(couponConfig)
        console.log(response.data.data)
        return response.data.data
    } catch(error: any){
        console.log(error.response.data.message)
        throw new Error(error.response.data.message)
        
    }
}

export const findAll = async(data: string)=>{
    try{
        const couponConfig : AxiosRequestConfig = {
            url:`${apiConfig.findAllCoupon}?data=${data}`,
            method:'get',
        }
        const response = await axios(couponConfig)
        console.log("response :", response)
        console.log(response.data.data)
        return response.data.data
    } catch(error: any){
        console.log(error.response.data.message)
        throw new Error(error.response.data.message)
        
    }
}

export const UpdateCoupon = async(data: Partial<couponInterface>)=>{
    try{
        const couponConfig : AxiosRequestConfig = {
            url:apiConfig.updateCoupon,
            method:'patch',
            data:{data}
        }
        const response = await axios(couponConfig)
        console.log(response.data.data)
        return response.data.data
    } catch(error: any){
        console.log(error.response.data.message)
        throw new Error(error.response.data.message)
        
    }
}

export const applyCoupon = async(couponCode: string, userId : string)=>{
    try{

        const applyConfig : AxiosRequestConfig = {
            url:apiConfig.applcoupon,
            method: 'post',
            data:{
                couponCode,
                userId
            }
        }

        const response = await axios(applyConfig)
        return response.data
    } catch(error: any){
        console.log(error)
        throw new Error(error.response.data.message)
    }
}