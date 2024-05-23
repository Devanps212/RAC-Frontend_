import React from "react";
import { Route, Routes } from "react-router-dom";
import PartnersLogin from '../../pages/partner/login.jsx'
import HomePartner from "../../pages/partner/Home.js";
import AddCar from "../../pages/partner/addCar.js";
import UIpartner from "../../pages/partner/partnerUI.js";
import CarManagePartner from "../../pages/partner/carManagement.js";
import CarEditPartner from "../../pages/partner/editCar.js";
import TransactionComplete from "../../pages/partner/transactionComplete.js";
import DashboardPartner from "../../pages/partner/dashboard.js";


const PartnerRoute = ()=>{
    return(
        <Routes>
            <Route path="/login" element={<PartnersLogin/>}/>
            <Route path="/home" element={<HomePartner/>}/>
            <Route path="/addCar" element={<AddCar/>}/>
            <Route path="/PartnerUI" element={<UIpartner/>}/>
            <Route path="/manageCar" element={<CarManagePartner/>}/>
            <Route path="/editsPartnerCar" element={<CarEditPartner/>}/>
            <Route path="/success/:transactionId/:userId" element={<TransactionComplete/>}/>
            <Route path="/Dashboard" element={<DashboardPartner/>}/>
        </Routes>
    )
}
export default PartnerRoute