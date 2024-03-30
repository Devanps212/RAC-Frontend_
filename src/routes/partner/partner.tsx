import React from "react";
import { Route, Routes } from "react-router-dom";
import PartnersLogin from '../../pages/partner/login.jsx'
import HomePartner from "../../pages/partner/Home.js";
import AddCar from "../../pages/partner/addCar.js";
import UIpartner from "../../pages/partner/partnerUI.js";

const PartnerRoute = ()=>{
    return(
        <Routes>
            <Route path="/login" element={<PartnersLogin/>}/>
            <Route path="/home" element={<HomePartner/>}/>
            <Route path="/addCar" element={<AddCar/>}/>
            <Route path="/PartnerUI" element={<UIpartner/>}/>
        </Routes>
    )
}
export default PartnerRoute