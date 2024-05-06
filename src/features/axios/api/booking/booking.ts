import axios, { AxiosRequestConfig } from "axios";
import { bookingInterface, detailBooking } from "../../../../types/bookingInterface";
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