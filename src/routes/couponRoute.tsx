import React from "react";
import { Routes, Route } from "react-router-dom";
import GenerateCoupon from "../pages/admin/couponGeneration";


const CouponRoute = ()=>{
    return(
        <Routes>
            <Route path="/generate" element={<GenerateCoupon/>}/>
        </Routes>
    )
}

export default CouponRoute