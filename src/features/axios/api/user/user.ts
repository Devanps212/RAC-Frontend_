import axios, { AxiosRequestConfig } from "axios";
import apiConfig from "../../../../utils/apiConfig";
import { userDetailPayload } from "../../../../types/payloadInterface";
import { setPartnerInterceptor, setUserInterceptor } from "../../axios_Interceptor/Interceptor";

export const findUser = async(data:string)=>{
    try{
      setUserInterceptor()
        console.log(data)
        const userConfig : AxiosRequestConfig = {
            url:`${apiConfig.userFind}?data=${data}`,
            method:'get',
        }

        const response = await axios(userConfig)

        return response.data
    }
    catch(error: any){
        throw new Error(error.message)
    }
}

export const saveUserDetails = async (data: Partial<userDetailPayload> | FormData) => {
    try {
      setUserInterceptor()
      if (data instanceof FormData) {
        const name = data.get('name');
        const profilePic = data.get('profilePic');
        const id = data.get('_id')
        console.log("id : ",id)
  
        const formData = new FormData();
  
        if (name !== null) {
          formData.append('name', name);
        }
  
        if (profilePic !== null) {
          formData.append('profilePic', profilePic);
        }
        if(id !== null){
            formData.append('_id', id)
        }
  
        const saveConfig: AxiosRequestConfig = {
          url: `${apiConfig.saveUserData}`,
          method: 'post',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        };
  
        console.log(saveConfig);
  
        const response = await axios(saveConfig);
        return response;
      } else {
        console.log("data : ", data)
        const saveConfig: AxiosRequestConfig = {
          url: `${apiConfig.saveUserData}`,
          method: 'post',
          data: data,
        };
  
        const response = await axios(saveConfig);
        return response;
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  export const findAllUsers = async()=>{
    try{
      setUserInterceptor()
      const userConfig : AxiosRequestConfig = {
        url : apiConfig.mongoUsers,
        method:'get'
      }

      const response = await axios(userConfig)
      return response.data.data
    } catch(error: any){
      throw new Error(error.message)
    }
  }

  export const findUsersforConversation = async(userId: string)=>{
    try{

      setPartnerInterceptor()
      const userConfig : AxiosRequestConfig = {
        url : `${apiConfig.userForConversation}?userId=${userId}`,
        method:'get'
      }

      const response = await axios(userConfig)
      return response.data.data
    } catch(error: any){
      throw new Error(error.message)
    }
  }

  export const UserfindOneUser = async(email:string)=>{
    try
    {
        const userFindConfig : AxiosRequestConfig = {
            url:apiConfig.findUserThroghtEmail,
            method:'get',
            headers:{
                'x-user-email': email
            }
        }

        const response = await axios(userFindConfig)
        return response.data.user
    }
    catch(error:any)
    {
        console.log(error.message)
        throw new Error(error.response.data.message)
    }
}


export const passwordReset = async(password:string, userId : string)=>{
  try
  {
      const userFindConfig : AxiosRequestConfig = {
          url:apiConfig.passwordReset,
          method:'post',
          data:{ 
            password,
            userId
           }
      }

      const response = await axios(userFindConfig)
      return response.data
  }
  catch(error:any)
  {
      console.log(error.message)
      throw new Error(error.response.data.message)
  }
}
