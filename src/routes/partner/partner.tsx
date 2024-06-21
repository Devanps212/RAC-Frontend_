import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PartnersLogin from '../../pages/partner/login.jsx'
import AddCar from "../../pages/partner/addCar.js";
import CarManagePartner from "../../pages/partner/carManagement.js";
import CarEditPartner from "../../pages/partner/editCar.js";
import TransactionComplete from "../../pages/partner/transactionComplete.js";
import DashboardPartner from "../../pages/partner/dashboard.js";
import PartnerChat from "../../pages/partner/partnerChat.js";
import BookingPartner from "../../pages/partner/booking.js";
import PartnerMessageBooking from "../../pages/partner/complaintMessage.js";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { RootState } from "../../features/axios/redux/reducers/reducer.js";


const PartnerRoute = ()=>{

    const token = useSelector((root: RootState)=>root.partnerToken.partnerToken)
    console.log("token found :", token)
    const isValid = token ? jwtDecode(token) : null
    console.log("isValid : ", isValid)

    return(
        <Routes>
            <Route path="/login" element={isValid ? <Navigate to={'/partner/Dashboard'}/> : <PartnersLogin/>}/>
            {/* <Route path="/home" element={isValid ? <HomePartner/> : <Navigate to={'/partner/login'}/>}/> */}
            <Route path="/addCar" element={isValid ? <AddCar/> : <Navigate to={'/partner/login'}/>}/>
            <Route path="/manageCar" element={isValid ? <CarManagePartner/> : <Navigate to={'/partner/login'}/>}/>
            <Route path="/editsPartnerCar" element={isValid ? <CarEditPartner/> : <Navigate to={'/partner/login'}/>}/>
            <Route path="/success/:transactionId/:userId" element={<TransactionComplete/>}/>
            <Route path="/Dashboard" element={isValid ? <DashboardPartner/> : <Navigate to={'/partner/login'}/>}/>
            <Route path="/bookings" element={isValid ? <BookingPartner/> : <Navigate to={'/partner/login'}/>}/>
            {/* <Route path="/bookingHistory" element={isValid ? <BookingHistory/> : <Navigate to={'/partner/login'}/>}/> */}
            <Route path="/negotiate" element={isValid ? <PartnerChat/> : <Navigate to={'/partner/login'}/>}/>
            <Route path="/booking/BookingMessages" element={ isValid ? <PartnerMessageBooking/> : <Navigate to={'/partner/login'}/>}/>
        </Routes>
    )
}
export default PartnerRoute