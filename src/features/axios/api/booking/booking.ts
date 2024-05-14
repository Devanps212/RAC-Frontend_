import axios, { AxiosRequestConfig } from "axios";
import { backendBooking, bookingInterface, detailBooking } from "../../../../types/bookingInterface";
import apiConfig from "../../../../utils/apiConfig";

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
        console.log(response)
    }
    catch(error: any)
    {
        console.log(error)
        throw new Error(error)
    }
}

export const findBookings = async(bookingData : string)=>{
    try{
        console.log("data to pass : ", bookingData)
        const findingBookingConfig : AxiosRequestConfig = {
            url:`${apiConfig.findBookings}?bookingData=${bookingData}`,
            method:'get'
        }
        const response = await axios(findingBookingConfig)
        return response.data
    }
    catch(error:any){
        console.log(error)
        throw new Error(error)
    }
}
export const bookingPaymentUI = async(bookingDetail : bookingInterface | null, carId: string | undefined, userId: string)=>{
    try{
        console.log(bookingDetail)
        const dataString = JSON.stringify(bookingDetail)
        console.log(dataString, carId)
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
        console.log("response : ", response)
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


export const bookingUpdater = async(data: Partial<detailBooking>)=>{
    try {
        const updaterConfig : AxiosRequestConfig = {
            url:apiConfig.bookingUpdater,
            method:'patch',
            data: {
                data
            }
        }
        const response = await axios(updaterConfig)
        console.log("response from frontend : ", response.data)
        return response.data
    } catch(error: any){
        console.log("error: ", error.response.data)
        throw new Error(error.response.data.message)
    }
}