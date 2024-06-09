import React from "react";
import PartnerLayout from "../../components/drivePartner/partnerLayout.tsx/layout";
import PartnerNegotiate from "../../components/drivePartner/negotiation/partnerNegotiation";

const PartnerChat = ()=>{
    return(
        <>
        <PartnerLayout>
            <PartnerNegotiate/>
        </PartnerLayout>
        </>
    )
}

export default PartnerChat