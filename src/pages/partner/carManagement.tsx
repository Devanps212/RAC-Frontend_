import React from "react";
import PartnerLayout from "../../components/drivePartner/partnerLayout.tsx/layout";
import PartnerCarManagement from "../../components/drivePartner/car/manageCars/carManagement";

const CarManagePartner = ()=>{
    return(
        <PartnerLayout>
            <PartnerCarManagement/>
        </PartnerLayout>
    )
}

export default CarManagePartner