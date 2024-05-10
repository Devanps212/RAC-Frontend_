import React from "react";
import UserTransactionPage from "../../components/user/bookingUI/bookingSuccess/success";
import UserHeader from "../../components/user/header/header";
import Footer from "../../components/drivePartner/footer/footer";

const SuccessfullTransaction = ()=>{
    return(
        <>
        <UserHeader/>
        <UserTransactionPage/>
        <Footer/>
        </>
    )
}

export default SuccessfullTransaction