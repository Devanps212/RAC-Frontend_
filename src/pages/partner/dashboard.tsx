import React from "react";
import PartnerLayout from "../../components/drivePartner/partnerLayout.tsx/layout";
import PartnerDashboard from "../../components/drivePartner/dashboard/dashboard";


const DashboardPartner = ()=>{
    return(
        <PartnerLayout>
            <PartnerDashboard/>
        </PartnerLayout>
    )
}

export default DashboardPartner