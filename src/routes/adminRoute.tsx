import React, {Suspense, lazy} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "../components/loading/loading";
const AdminLogin = lazy(()=>import('../pages/admin/login.jsx'))
const Home = lazy(()=>import('../pages/admin/home.js'))
const AddCategory = lazy(()=>import('../pages/admin/addCategory.js'))
const ManageCategory = lazy(()=>import('../pages/admin/CategoryManage.js'))
const EditCategory = lazy(()=>import('../pages/admin/editCategory.js'))
const Profile = lazy(()=>import('../pages/admin/profile'))
import CarRoutes from "./carRoute.js";
import UserAdminRouter from "./userAdminRoute.js";
import BookingRoutes from "./bookingRoutes";
const AdminDashBoard = lazy(()=>import('../pages/admin/dashBoard'))
import AdminOfferManage from "../pages/user/offerMangement";
import CouponRoute from "./couponRoute";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { RootState } from "../features/axios/redux/reducers/reducer";

const AdminRoutes = ()=>{

    const token = useSelector((root: RootState)=>root.adminToken.adminToken)
    const isValid = token ? jwtDecode(token) : null

    return(
        <Suspense fallback={<Loading/>}>
            <Routes>
                {/* <Route path="/signIn" element={<AdminLogin/>}/>
                <Route path="/home" element= {<Home/>}/>
                <Route path="/addCategory" element={<AddCategory/>}/>
                <Route path="/manageCategory" element={<ManageCategory/>}/>
                <Route path="/editCategory/:categoryId" element={<EditCategory/>}/>
                <Route path="/car/*" element={<CarRoutes/>}/>
                <Route path="/user/*" element={<UserAdminRouter/>}/>
                <Route path="/booking/*" element={<BookingRoutes/>}/>
                <Route path="/Dashboard" element={<AdminDashBoard/>}/>
                <Route path="/OfferManagement" element={<AdminOfferManage/>}/>
                <Route path="/coupon/*" element={<CouponRoute/>}/> */}
                <Route path="/signIn" element={<AdminLogin />} />
                <Route
                path="/addCategory"
                element={isValid ? <AddCategory /> : <Navigate to="/admin/signIn" />}
                />
                <Route
                path="/manageCategory"
                element={isValid ? <ManageCategory /> : <Navigate to="/admin/signIn" />}
                />
                <Route
                path="/editCategory/:categoryId"
                element={isValid ? <EditCategory /> : <Navigate to="/admin/signIn" />}
                />
                <Route path="/profile" element={isValid ? <Profile/> : <Navigate to="/admin/signIn" />}/>
                <Route path="/car/*" element={isValid ? <CarRoutes /> : <Navigate to="/admin/signIn" />} />
                <Route path="/user/*" element={isValid ? <UserAdminRouter /> : <Navigate to="/admin/signIn" />} />
                <Route path="/booking/*" element={<BookingRoutes />} />
                <Route path="/Dashboard" element={isValid ? <AdminDashBoard /> : <Navigate to="/admin/signIn" />} />
                <Route path="/OfferManagement" element={isValid ? <AdminOfferManage /> : <Navigate to="/admin/signIn" />} />
                <Route path="/coupon/*" element={<CouponRoute />} />
            </Routes>
        </Suspense>
    )
}

export default AdminRoutes