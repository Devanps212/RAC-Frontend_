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

    createCar: `${configKeys.API_URL}cars/addCar`,
    findCars:`${configKeys.API_URL}cars/getCars`,
    deleteCar: `${configKeys.API_URL}cars/deleteCar`,

    getAllUsers:`${configKeys.API_URL}admin/allUsers`,
    UBuser:`${configKeys.API_URL}admin/UBUser`,
    findOneUser:`${configKeys.API_URL}admin/userFind`,

    partnerLogin:`${configKeys.API_URL}partner/login`,
    PartneraddCar:`${configKeys.API_URL}partner/addCar`

}

export default apiConfig