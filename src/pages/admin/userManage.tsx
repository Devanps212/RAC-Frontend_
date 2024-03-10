import React from "react"
import UserManagement from "../../components/admin/userManagement/userManagement"
import AdminLayout from "../../components/adminLayout/adminLayout"

const UserManage = ()=>{
    return(
        <AdminLayout>
            <UserManagement/>
        </AdminLayout>
    )
}

export default UserManage