import React from "react";
import Dashboard from "../../components/admin/dashBoard/dashBoard";
import AdminLayout from "../../components/adminLayout/adminLayout";

const AdminDashBoard = ()=>{
    return(
        <>
        <AdminLayout>
            <Dashboard/>
        </AdminLayout>
        </>
    )
}

export default AdminDashBoard