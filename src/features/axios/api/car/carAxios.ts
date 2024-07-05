import axios, {AxiosRequestConfig} from "axios";
import { carInterface, showCarInterface } from "../../../../types/carAdminInterface";
import apiConfig from "../../../../utils/apiConfig";
import { setAdminInterceptor, setPartnerInterceptor, setUserInterceptor } from "../../axios_Interceptor/Interceptor";
import { reviewInterface } from "../../../../types/reviewInterface";
import { toast } from "react-toastify";

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
        setInterceptor(role)
        
        const findConfig: AxiosRequestConfig = {
            url:`${apiConfig.findCars}?carData=${carData}`,
            method:'get',
        }

        const response = await axios(findConfig)
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
        console.log(carData.offer)
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
        console.log(error.response.data.message)
        throw new Error(error.response.data.message)
    }
}

export const carBasedOnRole = async(role: string)=>{
    try{
        const data = role.toLowerCase()
        setInterceptor(data)
        const carConfig : AxiosRequestConfig = {
            url: `${apiConfig.carBasedOnrole}?role=${role}`,
            method:'get'
        }
        const response = await axios(carConfig)
        return response.data.data
    } catch(error: any) {
        throw new Error(error.message)
    }
}

export const carUpdateBasedOnRole = async(data: Partial<showCarInterface>, role: string)=>{
    try{
        const part = role.toLowerCase()
        setInterceptor(part)
        const carConfig : AxiosRequestConfig = {
            url:apiConfig.carUpdatePartial,
            method:'patch',
            data:data
        }

        const response = await axios(carConfig)
        console.log("data : ", response)
        return response.data.data
    } catch(error: any){
        throw new Error(error.message)
    }
}

export const updateRating = async(data: Partial<reviewInterface>, carId: string, userId: string)=>{
    try{
        setUserInterceptor()
        const carConfig : AxiosRequestConfig = {
            url:apiConfig.carRatingUpdater,
            method:'patch',
            data:{
                data,
                carId, 
                userId
            }
        }

        const response = await axios(carConfig)
        
        return response.data.data
    } catch(error: any){
        toast.error(error.message)
        throw new Error(error.message)
    }
}

export const carPagination = async(page: number, limit: number, role: string)=>{
    try{
        if(role === 'user'){
            setUserInterceptor()
        } else if('admin'){
            setAdminInterceptor()
        } else {
            setPartnerInterceptor()
        }
        const carConfig : AxiosRequestConfig = {
            url:`${apiConfig.carPaginations}?page=${page}&limit=${limit}`,
            method:'get',
        }

        const response = await axios(carConfig)
        console.log("data : ", response.data.data)
        return response.data
    } catch(error: any){
        toast.error(error.message)
        throw new Error(error.message)
    }
}

export const topbookedCars = async()=>{
    try{
        setUserInterceptor()
        const carConfig : AxiosRequestConfig = {
            url:apiConfig.topBookedCars,
            method:'get',
        }

        const response = await axios(carConfig)
        console.log("data : ", response.data.car)
        return response.data.car
    } catch(error: any){
        toast.error(error.message)
        throw new Error(error.message)
    }
}

export const carBasedOnInterface = async(data: Partial<showCarInterface>)=>{
    try{
        setPartnerInterceptor()
        const carConfig : AxiosRequestConfig = {
            url:apiConfig.basedOnInterface,
            method:'post',
            data:data
        }

        const response = await axios(carConfig)
        console.log("data : ", response.data.cars)
        return response.data.cars
    } catch(error: any){
        console.log(error)
        throw new Error(error.response.data.message)
    }
}