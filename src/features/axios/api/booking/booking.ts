import axios, { AxiosRequestConfig } from "axios";
import { backendBooking, bookingInterface, bookingInterfaceReschedule, detailBooking } from "../../../../types/bookingInterface";
import apiConfig from "../../../../utils/apiConfig";
import { showCarInterface } from "../../../../types/carAdminInterface";
import { toast } from "react-toastify";

export const filterCarsBooking = async(Data: bookingInterface)=>{
    try
    {
        console.log("Data: ", Data)
        const bookingFilterConfig : AxiosRequestConfig = {
            url : apiConfig.FilterForBooking,
            method : "get",
            params: Data
        }

        const response = await axios(bookingFilterConfig)
        
    }
    catch(error: any)
    {
        console.log(error)
        throw new Error(error)
    }
}

export const findBookings = async(bookingData : string)=>{
    try{
        
        const findingBookingConfig : AxiosRequestConfig = {
            url:`${apiConfig.findBookings}?bookingData=${bookingData}`,
            method:'get'
        }
        const response = await axios(findingBookingConfig)
        return response.data
    }
    catch(error:any){
        console.log("error : ", error)
        throw new Error(error)
    }
}
export const bookingPaymentUI = async(bookingDetail : bookingInterface | null, carId: string | undefined, userId: string)=>{
    try{
        
        const dataString = JSON.stringify(bookingDetail)
        
        const paymentUIConfig : AxiosRequestConfig = {
            url: apiConfig.bookingPaymentURI,
            method:'post',
            headers: {
                "Content-Type": "application/json"
            },
            data:{
                dataString,
                carId, 
                userId
            }
        }
        const response = await axios(paymentUIConfig)
        return response.data.sessionId
    } catch (error:any) {
        console.log(error)
    }
}

export const bookingCompletion = async(paymentDetail: backendBooking )=>{
    try{

        const bookingData = JSON.stringify(paymentDetail)
        const bookingCompletion : AxiosRequestConfig = {
            url:apiConfig.bookingCompletion,
            method:'post',
            data: {
                bookingData
            }
        }

        const response = await axios(bookingCompletion)
        
    }catch(error: any){
        return error.message
    }
}

export const bookingFindingBasedOnRole = async(bookingData:Partial<detailBooking>)=>{
    try{
        const bookingConfig :AxiosRequestConfig = {
            url:apiConfig.bookingBasedOnRole,
            method:'post',
            data:{
                bookingData
            }
        }

        const response = await axios(bookingConfig)
        return response
        
    } catch(error:any) {
        console.log(error)
        throw new Error(error.message)
    }
}


export const bookingUpdater = async(data: Partial<detailBooking>, purpose: string='nothing')=>{
    try {
        const updaterConfig : AxiosRequestConfig = {
            url:apiConfig.bookingUpdater,
            method:'patch',
            data: {
                data, 
                purpose
            }
        }
        const response = await axios(updaterConfig)
        return response.data
    } catch(error: any){
        console.log("errorMessage: ", error.response.data)
        throw new Error(error.response.data)
    }
}

export const bookingRescheduler = async(data: Partial<bookingInterfaceReschedule>, userId : string)=>{
    try{
        const reschedularConfig : AxiosRequestConfig = {
            url: apiConfig.bookingRescheduler,
            method: 'patch',
            data:{data, userId}
        }

        const response = await axios(reschedularConfig)
        
        return response.data
    } catch (error: any) {
        console.log(error.message)
        throw new Error(error.message)
    }
}

export const carReportHandle = async(data: Partial<showCarInterface>, bookingId : string)=>{
    try{
        console.log("data reSchedule : ", data)
        const reschedularConfig : AxiosRequestConfig = {
            url: apiConfig.bookingReportHandler,
            method: 'patch',
            data:{data, bookingId}
        }

        const response = await axios(reschedularConfig)
        
        return response.data
    } catch (error: any) {
        console.log("error found :", error)
        toast.error(error.response.data.message)
        throw new Error(error.message)
    }
}

export const BookingPagination = async(data: Partial<detailBooking> | string, page: number, limit: number)=>{
    try{
        let encodedURL: string;

        if (typeof data === 'object') {
            const jsonString = JSON.stringify(data);
            encodedURL = encodeURIComponent(jsonString);
        } else{
            encodedURL = encodeURIComponent(data);
        }
        const PaginationConfig : AxiosRequestConfig = {
            url: `${apiConfig.bookingPagination}?data=${encodedURL}&page=${page}&limit=${limit}`,
            method: 'get',
        }
        const response = await axios(PaginationConfig)
        console.log(response)
        return response.data

    } catch(error: any){
        console.error(error)
        throw new Error(error.response.data.message)
    }
}