import axios, {AxiosRequestConfig} from "axios";
import { carInterface } from "../../../../types/carAdminInterface";
import apiConfig from "../../../../utils/apiConfig";
import { setAdminInterceptor, setPartnerInterceptor, setUserInterceptor } from "../../axios_Interceptor/Interceptor";

const setInterceptor = (role:string)=>{
    if(role === 'admin')
    {
        setAdminInterceptor()
    }
    else if(role ==='partner')
    {
        setPartnerInterceptor()
    }
    else if(role ==='user')
    {
        setUserInterceptor()
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
        console.log(role)
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

export const editCar = async(carData: any, role: string)=>{
    try
    {
        setInterceptor(role)
        console.log("formData in edit car :",carData)
        const editCarConfig : AxiosRequestConfig = {
            url: `${apiConfig.editCar}`,
            method:"patch",
            data : carData,
        } 
        const response  = await axios(editCarConfig)
        console.log(response)
        return response.data
    }
    catch(error: any)
    {
        console.log(error)
        throw new Error(error.message)
    }
}