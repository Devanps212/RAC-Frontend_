import React, {Suspense, lazy} from "react";
import { Routes, Route } from "react-router-dom";
import CarManage from "../pages/admin/carManagement";
import CarAdd from "../pages/admin/addCar";
import CarEdit from "../pages/admin/carEdit";

const CarRoutes = ()=>{
    return(
        <Routes>
            <Route path="/carManagement" element={<CarManage/>}/>
            <Route path="/addCar" element={<CarAdd/>}/>
            <Route path="/editCars" element={<CarEdit/>}/>
        </Routes>
    )
}

export default CarRoutes