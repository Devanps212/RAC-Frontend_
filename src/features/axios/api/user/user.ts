import axios, { AxiosRequestConfig } from "axios";
import apiConfig from "../../../../utils/apiConfig";
import { userDetailPayload } from "../../../../types/payloadInterface";

export const findUser = async(data:string)=>{
    try{
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