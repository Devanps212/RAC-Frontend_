import axios, {AxiosRequestConfig} from "axios";
import apiConfig from "../../../../utils/apiConfig";
import { setAdminInterceptor } from "../../axios_Interceptor/Interceptor";
import { categoryInterface } from "../../../../types/categoryInterface";
import { toast } from "react-toastify";




export const createCategory = async(name: string, description : string)=>{
    try
    {
        setAdminInterceptor()
        const categConfig: AxiosRequestConfig= {
            url:apiConfig.createCategory,
            method:"post",
            data:{name, description}
        }

        const response = await axios(categConfig)
        return response.data
    }
    catch(error:any)
    {
        console.log("error : ", error.response.data)
        return error.response.data
    }
}

export const getCategory = async()=>{
    try
    {
        setAdminInterceptor()
        const categConfig:AxiosRequestConfig = {
            url:apiConfig.getCategories,
            method:"get"
        }

        const response = await axios(categConfig)
        console.log(response.data)
        return response.data
    }
    catch(error:any)
    {
        console.log(error.response)
        throw new Error(error.response)
    }
}

export const unList = async(categoryId : string)=>{
    try
    {
        setAdminInterceptor()
        console.log("categoryId : ", categoryId)

        const listConfig : AxiosRequestConfig = {
            url:apiConfig.unlistCategory,
            method:"patch",
            data:{categoryId}
        }
        const response = await axios(listConfig)
        console.log("response :", response.data)
        return response.data
    }
    catch(error:any)
    {
        console.log(error.message)
        throw new Error(error.message)
    }
}

export const List = async(categoryId :string)=>{
    try
    {
        setAdminInterceptor()
        console.log("categoryId : ", categoryId)

        const listConfig : AxiosRequestConfig = {
            url:apiConfig.listCategory,
            method:"patch",
            data:{categoryId}
        }
        const response = await axios(listConfig)
        console.log("response :", response.data)
        return response.data
    }
    catch(error:any)
    {
        console.log(error.message)
        throw new Error(error.message)
    }
}

export const categorySingle = async(name?:string, categoryId?:string)=>{
    try
    {
        setAdminInterceptor()
        console.log("name :",name,"categoryId :", categoryId)

        const categConfig : AxiosRequestConfig = {
            url:apiConfig.singleCateg,
            method:"get",
            params:{name, categoryId}
        }

        const response = await axios(categConfig)
        console.log(response)
        return response.data
        
    }
    catch(error:any)
    {
        console.log(error)
        throw new Error(error.message)
    }
}

export const editCategory = async(formData: categoryInterface)=>{
    try
    {
        setAdminInterceptor()
        console.log("formdata :", formData)

        const editConfig : AxiosRequestConfig = {
            url:apiConfig.editCateg,
            method:'put',
            data:{formData}
        }
        const response = await axios(editConfig)
        console.log("response :",response.data)
        return response.data
    }
    catch(error:any)
    {
        console.log("error : ",error.response.data)
        toast.error(error.response.data.message)
        throw new Error(error.response.data)
    }
}