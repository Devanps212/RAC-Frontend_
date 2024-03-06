import configKeys from "./api"

const apiConfig = {
    userSignUp: `${configKeys.API_URL}user-auth/signup`,
    userSignIn: `${configKeys.API_URL}user-auth/login`,
    otpGenerate:`${configKeys.API_URL}user-auth/VOTP`,
    otpVerify:`${configKeys.API_URL}user-auth/VerifyOTP`,

    googleVerification: `${configKeys.API_URL}user-auth/Google-SignIn-Up`,
    adminLogin : `${configKeys.API_URL}admin-auth/login`,

    createCategory :`${configKeys.API_URL}category/createCateg`,
    getCategories: `${configKeys.API_URL}category/getCategoryAll`,
    unlistCategory: `${configKeys.API_URL}category/unlistCateg`,
    listCategory: `${configKeys.API_URL}category/listCateg`,
    singleCateg:`${configKeys.API_URL}category/categoryOne`,
    editCateg: `${configKeys.API_URL}category/editCateg`,

}

export default apiConfig