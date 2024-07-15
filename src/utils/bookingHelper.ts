import { bookingInterface, detailBooking } from "../types/bookingInterface";
import { showCarInterface } from "../types/carAdminInterface";

export const bookingHelper = (
    currentBookingDetail: bookingInterface, 
    fullDetailOfBookings: detailBooking[], 
    carsAvailable: showCarInterface[]
) => {
    try {
        const eligibleCarIds: Set<string> = new Set();
        const overlappingCarIds: Set<string> = new Set();

        fullDetailOfBookings.forEach((booking) => {
            const startDate = new Date(booking.date.start).getTime();
            const endDate = new Date(booking.date.end).getTime();

            if (currentBookingDetail.startDate && currentBookingDetail.endDate) {
                const currentStart = new Date(currentBookingDetail.startDate).getTime();
                const currentEnd = new Date(currentBookingDetail.endDate).getTime();

                const isOverlapping =
                    (currentStart < endDate && currentEnd > startDate);

                if (isOverlapping) {
                    overlappingCarIds.add(booking.carId.toString());
                } else {
                    eligibleCarIds.add(booking.carId.toString());
                }
            }
        });

        const uniqueCars = carsAvailable.filter(car => {
            const carId = car._id?.toString();
            return carId && !overlappingCarIds.has(carId);
        });

        console.log("cars available : ", carsAvailable)
        console.log("over lapping :", overlappingCarIds)

        console.log("unique cars :", uniqueCars);
        return uniqueCars;
    } catch (error) {
        console.log(error);
    }
};
