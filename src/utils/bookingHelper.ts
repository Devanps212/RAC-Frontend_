import { bookingInterface, detailBooking } from "../types/bookingInterface";
import { showCarInterface } from "../types/carAdminInterface";

export const bookingHelper = (
    currentBookingDetail: bookingInterface, 
    fullDetailOfBookings: detailBooking[], 
    carsAvailable: showCarInterface[]
) => {
    try {
        const overlappingCarIds: Set<string> = new Set();

        fullDetailOfBookings.forEach((booking) => {
            const startDate = new Date(booking.date.start).getTime();
            const endDate = new Date(booking.date.end).getTime();

            if (currentBookingDetail.startDate && currentBookingDetail.endDate) {
                const currentStart = new Date(currentBookingDetail.startDate).getTime();
                const currentEnd = new Date(currentBookingDetail.endDate).getTime();

                const isOverlapping =
                    (currentStart >= startDate && currentStart <= endDate) ||
                    (currentEnd >= startDate && currentEnd <= endDate) ||
                    (currentStart <= startDate && currentEnd >= endDate);

                if (isOverlapping) {
                    console.log(`Overlapping car: ${booking.carId.name}`);
                    overlappingCarIds.add(booking.carId.toString());
                }
            }
        });

        const uniqueCars = carsAvailable.filter(car => 
            car._id !== undefined && 
            !overlappingCarIds.has(car._id.toString())
        );

        console.log("Unique cars:", uniqueCars);
        return uniqueCars;
    } catch (error) {
        console.log(error);
    }
};
