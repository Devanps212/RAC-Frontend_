import axios, {AxiosRequestConfig} from "axios";
import { carInterface } from "../../../../types/carAdminInterface";
import apiConfig from "../../../../utils/apiConfig";
import { setAdminInterceptor, setPartnerInterceptor } from "../../axios_Interceptor/Interceptor";

const setInterceptor = (role:string)=>{
    if(role === 'admin')
    {
        console.log("passing to toadminInterceptor")
        setAdminInterceptor()
    }
    else if(role ==='partner')
    {
        console.log("passing to toadminInterceptor")
        setPartnerInterceptor()
    }
    else
    {
        throw new Error('Un-Recognized role')
    }
}


export const createCar = async(carData:any, role:string)=>{
    try
    {
        setInterceptor(role)
        console.log("formData in create Car: ", carData)

        const carCreateConfig : AxiosRequestConfig = {
            url:apiConfig.createCar,
            method:'post',
            data:carData
        }

        const response = await axios(carCreateConfig)
        console.log("response : ",response.data)
        return response.data
    }
    catch(error:any)
    {
        console.log(error)
        const message = error.response.data.message
        throw new Error(message)
    }
}

export const findAllCars = async(carData:string, role:string)=>{
    try
    {
        setInterceptor(role)
        console.log("carData : ", carData)
        
        const findConfig: AxiosRequestConfig = {
            url:`${apiConfig.findCars}?carData=${carData}`,
            method:'get',
        }

        const response = await axios(findConfig)
        console.log("response  :", response.data.response)
        return response.data.response
    }
    catch(error:any)
    {
        console.log("error: ",error.response.data.message)
        throw new Error(error.response.data.message)
    }
}

export const deleteCar = async(carId: string, role: string)=>{
    try
    {
        setInterceptor(role)
        console.log(role)
        console.log("carId :", carId)
        
        const carDeleteConfig: AxiosRequestConfig = {
            url:apiConfig.deleteCar,
            method:"delete",
            headers:{'X-Car-Id': carId}
        }
        const response = await axios(carDeleteConfig)
        console.log(response.data)
        return response.data
    }
    catch(error:any){
        console.log(error.message)
        throw new Error(error.message)
    }
}