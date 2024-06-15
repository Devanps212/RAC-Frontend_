import { bookingInterface, detailBooking } from "../types/bookingInterface";
import { showCarInterface } from "../types/carAdminInterface";

export const bookingHelper = (currentBookingDetail: bookingInterface, fullDetailOfBookings: detailBooking[], carsAvailable: showCarInterface[]) => {
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
                    (currentStart < startDate && currentEnd > endDate) ||
                    ((currentStart > startDate && currentStart < endDate) && currentEnd > endDate) ||
                    ((currentEnd < endDate && currentEnd > startDate) && currentStart <= startDate) ||
                    (currentStart <= endDate && currentEnd >= startDate);

                if (!isOverlapping) {
                    eligibleCarIds.add(booking.carId.toString());
                } else {
                    overlappingCarIds.add(booking.carId.toString());
                }
            }
        });

        const carsWithNoBookings = carsAvailable.filter(car => car._id !== undefined && !overlappingCarIds.has(car._id.toString()) && !eligibleCarIds.has(car._id.toString()));
        const uniqueCars = [...carsWithNoBookings];
        eligibleCarIds.forEach(id => {
            const car = carsAvailable.find(car => car._id !== undefined && car._id.toString() === id);
            if (car) {
                uniqueCars.push(car);
            }
        });

        return uniqueCars;
    } catch (error) {
        console.log(error);
    }
};