import { toast } from "react-toastify";
import { otpGenerate, userLogin, userSignUp } from "../features/axios/api/user/userAuthentication";


export const CheckPurpose = async (): Promise<{ message: string, error?: string } | { message: string, token: string } | null> => {
    console.log("reached checkpurpose")
    const storedData = sessionStorage.getItem('user');
    const formData = storedData ? JSON.parse(storedData) : null;
    const storedUserDetails = sessionStorage.getItem('usersDetails');
    const userDetails = storedUserDetails ? JSON.parse(storedUserDetails) : null;
    console.log("login Details : ", formData)
    console.log("signUp Details : ", userDetails)
  
    if (userDetails && userDetails.purpose === 'signup') 
    {
      const { otp, purpose, ...userDatas } = userDetails
      console.log(" signup details ", userDatas)
      try 
      {
        const response = await userSignUp(userDatas);
        console.log("response from signup", response)
        if (response.status === "success") 
        {
          sessionStorage.removeItem('usersDetails')
          return { message: 'signUp success', token: response.token }
        }
      } 
      catch (error:any) 
      {
        console.log(error.message)
        return { message: 'error', error: error.message }
      }
    } 
    else if (formData && formData.purpose === 'signin') 
    {
      console.log("login detil checking : ", formData)
      const { purpose, ...userDetails } = formData
      console.log(userDetails)
      try 
      {
        const response = await userLogin(userDetails);
        console.log("response from signin", response)
        if (response.status === 'success') 
        {
          console.log("login success")
          sessionStorage.removeItem('user')
          return { message: 'Login success', token: response.token }
        }
      } catch (error:any) 
      {
        console.log(error)
        return { message: 'error', error: error.message }
      }
    }
  
    toast.warning('no session found')
    return { message: 'error', error: "no session found" }
  }
  

export const fetchOTP = async()=>
{
    const storedData = sessionStorage.getItem('user');
    const formData = storedData ? JSON.parse(storedData) : null;
    const storedUserDetails = sessionStorage.getItem('usersDetails');
    const userDetails = storedUserDetails ? JSON.parse(storedUserDetails) : null;
    console.log("login Details : ",formData)
    console.log("signUp Details : ", userDetails)

    if(userDetails && !formData)
    {
      console.log("reached for otp fetching")
        const otp = await otpGenerate(userDetails.email)
        if(otp)
        {
            if(otp.code === 200)
            {
                console.log("OTP : ", otp)
                return otp
            }
        }
        else
        {
          console.log("no OTP found")
          return null
        }
    }
    else if (formData && !userDetails)
    {
      console.log("reached for otp fetching")
        const {purpose, ...userDetails} = formData
        const otp = await otpGenerate(userDetails)
        if(otp.status === "success")
        {
            return otp
        }
        else
        {
          console.log("no OTP found")
          return null
        }
    }
}