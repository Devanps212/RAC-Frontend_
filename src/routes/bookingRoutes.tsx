import React from "react";
import { Routes, Route } from "react-router-dom";
import ManagementBooking from "../pages/admin/bookingManagement";
import MessagesBooking from "../pages/admin/bookingMessages";

const BookingRoutes = ()=>{
    return(
        <Routes>
            <Route path="/BookingManagement" element={<ManagementBooking/>}/>
            <Route path="/BookingMessages" element={<MessagesBooking/>}/>
        </Routes>
    )
}

export default BookingRoutes