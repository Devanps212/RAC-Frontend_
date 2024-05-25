import React from "react";
import AdminLayout from "../../components/adminLayout/adminLayout";
import CouponGeneration from "../../components/admin/coupon/couponGenerate/couponManage";


const GenerateCoupon = ()=>{
    return(
        <AdminLayout>
            <CouponGeneration/>
        </AdminLayout>
    )
}

export default GenerateCoupon