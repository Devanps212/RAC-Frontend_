import axios, {AxiosRequestConfig} from "axios";
import { carInterface } from "../../../../types/carAdminInterface";
import apiConfig from "../../../../utils/apiConfig";

export const createCar = async(carData:carInterface)=>{
    try
    {
        console.log("formData in create Car: ", carData)

        const carCreateConfig : AxiosRequestConfig = {
            url:apiConfig.createCar,
            method:'post',
            headers: {
                'Content-Type': 'multipart/form-data',
              },
            data:{carData}
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

export const findAllCars = async(carData:string)=>{
    try
    {
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
        console.log(error.message)
        throw new Error(error.message)
    }
}

export const deleteCar = async(carId: string)=>{
    try
    {
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