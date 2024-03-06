import React from "react";
import { Routes, Route } from "react-router-dom";
import CarManage from "../pages/admin/carManagement";

const CarRoutes = ()=>{
    return(
        <Routes>
            <Route path="/addCategory" element={<CarManage/>}/>
        </Routes>
    )
}

export default CarRoutes