import axios, {AxiosRequestConfig} from "axios";
import apiConfig from "../../../../utils/apiConfig";

export const getAllUsers = async()=>{
    try
    {
        const allUsersConfig : AxiosRequestConfig = {
            url:apiConfig.getAllUsers,
            method:'get',
        }
        const response = await axios(allUsersConfig)
        console.log(response.data)
        return response.data
    }
    catch(error:any)
    {
        throw new Error(error.data.response.message)
    }
}

export const blockUnblockUser = async(userId: string)=>{
    try
    {
        console.log("userId :", userId)

        const UBuserConfig : AxiosRequestConfig = {
            url:apiConfig.UBuser,
            method:'patch',
            headers:{
                'Content-Type': 'application/json',
                'x-user-Id': userId
            }
        }

        const response = await axios(UBuserConfig)
        console.log(response.data)
        return response.data
    }
    catch(error:any)
    {
        console.log(error.response.data.message)
        throw new Error(error.response.data.message)
    }
}

export const findOneUser = async(userId:string)=>{
    try
    {
        const userFindConfig : AxiosRequestConfig = {
            url:apiConfig.findOneUser,
            method:'get',
            headers:{
                'x-user-id': userId
            }
        }

        const response = await axios(userFindConfig)
        console.log(response.data)
        return response.data
    }
    catch(error:any)
    {
        console.log(error.message)
        throw new Error(error.message)
    }
}
