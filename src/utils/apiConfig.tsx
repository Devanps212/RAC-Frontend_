import configKeys from "./api"

const apiConfig = {
    userSignUp: `${configKeys.API_URL}user-auth/signup`,
    userSignIn: `${configKeys.API_URL}user-auth/login`,
    otpGenerate:`${configKeys.API_URL}user-auth/VOTP`,
    otpVerify:`${configKeys.API_URL}user-auth/VerifyOTP`,
    userFind:`${configKeys.API_URL}user-auth/findUser`,
    saveUserData:`${configKeys.API_URL}user-auth/saveUser`,
    mongoUsers:`${configKeys.API_URL}user-auth/getAll` ,

    googleVerification: `${configKeys.API_URL}user-auth/Google-SignIn-Up`,
    adminLogin : `${configKeys.API_URL}admin-auth/login`,

    createCategory :`${configKeys.API_URL}category/createCateg`,
    findAllCategory :`${configKeys.API_URL}category/findAllCategory`, 
    getCategories: `${configKeys.API_URL}category/getCategoryAll`,
    unlistCategory: `${configKeys.API_URL}category/unlistCateg`,
    listCategory: `${configKeys.API_URL}category/listCateg`,
    singleCateg:`${configKeys.API_URL}category/categoryOne`,
    editCateg: `${configKeys.API_URL}category/editCateg`,

    createCar: `${configKeys.API_URL}cars/addCar`,
    findCars:`${configKeys.API_URL}cars/getCars`,
    deleteCar: `${configKeys.API_URL}cars/deleteCar`,
    editCar : `${configKeys.API_URL}cars/editCar`,
    carBasedOnrole: `${configKeys.API_URL}cars/CarsFromRole`,
    carUpdatePartial:`${configKeys.API_URL}cars/partialUpdate`
,
    getAllUsers:`${configKeys.API_URL}admin/allUsers`,
    UBuser:`${configKeys.API_URL}admin/UBUser`,
    findOneUser:`${configKeys.API_URL}admin/userFind`,

    partnerLogin:`${configKeys.API_URL}partner/login`,
    PartneraddCar:`${configKeys.API_URL}partner/addCar`,
    PartnerSignUp:`${configKeys.API_URL}partner/SignUp`,
    partnerAll:`${configKeys.API_URL}partner/All`,
    partnerOne : `${configKeys.API_URL}partner/findOne`,

    locationFinding: `${configKeys.API_URL}user-auth/location`,

    FilterForBooking: `${configKeys.API_URL}booking/filterForBooking`,
    findBookings : `${configKeys.API_URL}booking/findBookings`,
    bookingPaymentURI:`${configKeys.API_URL}booking/payment`,
    bookingCompletion:`${configKeys.API_URL}booking/completion`,
    bookingBasedOnRole:`${configKeys.API_URL}booking/BasedOnRole`,
    bookingUpdater:`${configKeys.API_URL}booking/updater`,
    bookingRescheduler: `${configKeys.API_URL}booking/rescheduler`,

    couponGenerator:`${configKeys.API_URL}coupon/Generate`,
    findAllCoupon:`${configKeys.API_URL}coupon/findAll`,
    updateCoupon:`${configKeys.API_URL}coupon/updateCoupon`,
    applcoupon:`${configKeys.API_URL}coupon/applyCoupon`,

    getConversations:`${configKeys.API_URL}messenger-conversation/send`,
    getMessages: `${configKeys.API_URL}messenger-conversation`,
    
}

export default apiConfig