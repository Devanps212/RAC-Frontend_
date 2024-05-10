import React from "react";
import BookedCars from "../../components/user/bookingUI/bookedCars/bookedCars";
import UserHeader from "../../components/user/header/header";
import Footer from "../../components/drivePartner/footer/footer";

const CarsBooked = ()=>{
    return(
        <>
        <UserHeader/>
        <BookedCars/>
        <Footer/>
        </>
    )
}

export default CarsBooked