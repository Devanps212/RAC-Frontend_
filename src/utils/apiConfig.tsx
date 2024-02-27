import configKeys from "./api"

const apiConfig = {
    userSignUp: `${configKeys.API_URL}user-auth/signup`,
    userSignIn: `${configKeys.API_URL}user-auth/login`,
    otpGenerate:`${configKeys.API_URL}user-auth/VOTP`,
    otpVerify:`${configKeys.API_URL}user-auth/VerifyOTP`,
}

export default apiConfig