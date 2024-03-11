import React from "react";
import { Route, Routes } from "react-router-dom";
import PartnersLogin from '../../pages/partner/login.jsx'
import HomePartner from "../../pages/partner/Home.js";
import AddCar from "../../pages/partner/addCar.js";

const PartnerRoute = ()=>{
    return(
        <Routes>
            <Route path="/login" element={<PartnersLogin/>}/>
            <Route path="/home" element={<HomePartner/>}/>
            <Route path="/addCar" element={<AddCar/>}/>
        </Routes>
    )
}
export default PartnerRoute