import React from "react";
import PartnerLayout from "../../components/drivePartner/partnerLayout.tsx/layout";
import PartnerBooking from "../../components/drivePartner/booking/customerBookings/booking";


const BookingPartner = () =>{
    return(
        <>
        <PartnerLayout>
            <PartnerBooking/>
        </PartnerLayout>
        </>
    )
}

export default BookingPartner