import React from "react";
import PartnerLayout from "../../components/drivePartner/partnerLayout.tsx/layout";
import PartnerEditCar from "../../components/drivePartner/car/editCar/editCar";

const CarEditPartner = ()=>{
    return(
        <PartnerLayout>
            <PartnerEditCar/>
        </PartnerLayout>
    )
}

export default CarEditPartner