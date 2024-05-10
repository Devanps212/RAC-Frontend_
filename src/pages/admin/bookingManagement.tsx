import React from "react";
import BookingManagementTable from "../../components/admin/booking/bookingManagement/bookingManagement";
import AdminLayout from "../../components/adminLayout/adminLayout";


const ManagementBooking = ()=>{
    return(
        <>
        <AdminLayout>
        <BookingManagementTable/>    
        </AdminLayout>        
        </>
    )
}

export default ManagementBooking