import { bookingInterface } from "../../types/bookingInterface";

export const bookingValidator = (data: bookingInterface) => {
    const error: any = {};
    let gotError = false;

    if (data.pickupLocation?.trim() === '' || !data.pickupLocation) {
        error.pickupLocation = "Please submit a proper PickupLocation";
        gotError = true;
    }

    if (data.dropOffLocation?.trim() === '' || !data.dropOffLocation) {
        error.dropOffLocation = "Please submit a proper DropoffLocation";
        gotError = true;
    }

    if (!data?.startDate || isNaN(new Date(data?.startDate).getTime())) {
        error.pickupDate = "Please submit a valid pickUpTime";
        gotError = true;
    }

    if (!data?.endDate || isNaN(new Date(data?.endDate).getTime())) {
        error.dropOffDate = "Please submit a valid DropOffDate";
        gotError = true;
    }

    if (!data.pickupTime || data.pickupTime.trim() === '') {
        error.pickupTime = "Please submit a valid pickUp time";
        gotError = true;
    }

    if (!data.dropOffTime || data.dropOffTime.trim() === '') {
        error.dropOffTime = "Please submit a valid DropOff Time";
        gotError = true;
    }

    if (gotError === true) {
        console.log("error:", error)
        return error; // Return the error object instead of gotError
    }

    return null; // Return null if no errors
};
