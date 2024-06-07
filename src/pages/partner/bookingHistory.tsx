import React from "react";
import PartnerLayout from "../../components/drivePartner/partnerLayout.tsx/layout";
import PartnerBookingHistory from "../../components/drivePartner/booking/BookingHistory/bookingHistory";


const BookingHistory = ()=>{
    return(
        <PartnerLayout>
            <PartnerBookingHistory/>
        </PartnerLayout>
    )
}

export default BookingHistory