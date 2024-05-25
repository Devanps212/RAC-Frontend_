import React, {Suspense, lazy} from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/loading/loading";
const AdminLogin = lazy(()=>import('../pages/admin/login.jsx'))
const Home = lazy(()=>import('../pages/admin/home.js'))
const AddCategory = lazy(()=>import('../pages/admin/addCategory.js'))
const ManageCategory = lazy(()=>import('../pages/admin/CategoryManage.js'))
const EditCategory = lazy(()=>import('../pages/admin/editCategory.js'))
import {AdminRouteProtection} from "./protectedRoutes/routeProtection.js";
import CarRoutes from "./carRoute.js";
import UserAdminRouter from "./userAdminRoute.js";
import BookingRoutes from "./bookingRoutes";
const AdminDashBoard = lazy(()=>import('../pages/admin/dashBoard'))
import AdminOfferManage from "../pages/user/offerMangement";
import CouponRoute from "./couponRoute";

const AdminRoutes = ()=>{

    return(
        <Suspense fallback={<Loading/>}>
            <Routes>
                <Route path="/signIn" element={<AdminLogin/>}/>
                <Route path="/home" element= {<AdminRouteProtection><Home/></AdminRouteProtection>}/>
                <Route path="/addCategory" element={<AdminRouteProtection><AddCategory/></AdminRouteProtection>}/>
                <Route path="/manageCategory" element={<AdminRouteProtection><ManageCategory/></AdminRouteProtection>}/>
                <Route path="/editCategory/:categoryId" element={<AdminRouteProtection><EditCategory/></AdminRouteProtection>}/>
                <Route path="/car/*" element={<CarRoutes/>}/>
                <Route path="/user/*" element={<UserAdminRouter/>}/>
                <Route path="/booking/*" element={<BookingRoutes/>}/>
                <Route path="/Dashboard" element={<AdminDashBoard/>}/>
                <Route path="/OfferManagement" element={<AdminOfferManage/>}/>
                <Route path="/coupon/*" element={<CouponRoute/>}/>
            </Routes>
        </Suspense>
    )
}

export default AdminRoutes