import configKeys from "./api"

const apiConfig = {
    userSignUp: `${configKeys.API_URL}user-auth/signup`,
    userSignIn: `${configKeys.API_URL}user-auth/login`,
    otpGenerate:`${configKeys.API_URL}user-auth/VOTP`,
    otpVerify:`${configKeys.API_URL}user-auth/VerifyOTP`,
    userFind:`${configKeys.API_URL}user-auth/findUser`,
    saveUserData:`${configKeys.API_URL}user-auth/saveUser`,
    mongoUsers:`${configKeys.API_URL}user-auth/getAll`,
    findUserThroghtEmail: `${configKeys.API_URL}user-auth/userEmail`,
    passwordReset: `${configKeys.API_URL}user-auth/resetPassword`,
    

    googleVerification: `${configKeys.API_URL}user-auth/Google-SignIn-Up`,
    adminLogin : `${configKeys.API_URL}admin-auth/login`,
    findOneAdmin : `${configKeys.API_URL}admin-auth/findOne`,
    adminUpdate:`${configKeys.API_URL}admin-auth/updateAdmin`,

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
    carUpdatePartial:`${configKeys.API_URL}cars/partialUpdate`,
    carRatingUpdater:`${configKeys.API_URL}cars/updateRating`,
    carPaginations:`${configKeys.API_URL}cars/carPage`,
    basedOnInterface:`${configKeys.API_URL}cars/basedOnInterface`,

    getAllUsers:`${configKeys.API_URL}admin/allUsers`,
    UBuser:`${configKeys.API_URL}admin/UBUser`,
    findOneUser:`${configKeys.API_URL}admin/userFind`,
    

    partnerLogin:`${configKeys.API_URL}partner/login`,
    PartneraddCar:`${configKeys.API_URL}partner/addCar`,
    PartnerSignUp:`${configKeys.API_URL}partner/SignUp`,
    partnerAll:`${configKeys.API_URL}partner/All`,
    partnerOne : `${configKeys.API_URL}partner/findOne`,
    userForConversation : `${configKeys.API_URL}partner/getUserForConversation`,
    getPartnerCategory:`${configKeys.API_URL}partner/getCategory`,

    locationFinding: `${configKeys.API_URL}user-auth/location`,

    FilterForBooking: `${configKeys.API_URL}booking/filterForBooking`,
    findBookings : `${configKeys.API_URL}booking/findBookings`,
    bookingPaymentURI:`${configKeys.API_URL}booking/payment`,
    bookingCompletion:`${configKeys.API_URL}booking/completion`,
    bookingBasedOnRole:`${configKeys.API_URL}booking/BasedOnRole`,
    bookingUpdater:`${configKeys.API_URL}booking/updater`,
    bookingRescheduler: `${configKeys.API_URL}booking/rescheduler`,
    bookingReportHandler:`${configKeys.API_URL}booking/bookCarReport`,
    topBookedCars:`${configKeys.API_URL}booking/topBookedCars`,
    bookingPagination:`${configKeys.API_URL}booking/pagination`,

    couponGenerator:`${configKeys.API_URL}coupon/Generate`,
    findAllCoupon:`${configKeys.API_URL}coupon/findAll`,
    updateCoupon:`${configKeys.API_URL}coupon/updateCoupon`,
    applcoupon:`${configKeys.API_URL}coupon/applyCoupon`,
    // findUserCoupon:`${configKeys.API_URL}coupon/userCoupon`,

    getConversations:`${configKeys.API_URL}messenger-conversation/send`,
    getMessages: `${configKeys.API_URL}messenger-conversation`,
    
}

export default apiConfig