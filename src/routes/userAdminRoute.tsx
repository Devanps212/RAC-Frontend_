import React from "react";
import { Route, Routes } from "react-router-dom";
import UserManage from "../pages/admin/userManage";


const UserAdminRouter = ()=>{
    return(
        <Routes>
            <Route path="/userManagement" element={<UserManage/>}/>
        </Routes>
    )
}

export default UserAdminRouter