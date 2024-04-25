import React from "react";
import CarDetails from "../../components/commonComponent/carDetails/carDetails";
import UserHeader from "../../components/user/header/header";
import Footer from "../../components/drivePartner/footer/footer";

const DetailsCar = ()=>{
    return(
        <>
        <UserHeader/>
        <CarDetails/>
        <Footer/>
        </>
    )
}

export default DetailsCar