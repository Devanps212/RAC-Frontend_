import { bookingInterface, detailBooking } from "../types/bookingInterface";
import { showCarInterface } from "../types/carAdminInterface";

export const bookingHelper = (currentBookingDetail: bookingInterface, fullDetailOfBookings: detailBooking[], carsAvailable: showCarInterface[]) => {
    try {
        console.log("booking setting ");
        console.log("full :", fullDetailOfBookings);
        const eligibleCarIds: showCarInterface[] = [];


        const fulldetail = Array.from(fullDetailOfBookings)
        fulldetail.forEach((booking) => {

            const isOverlapping = booking.date.some((dates) => {
                const start = new Date(dates.start).getTime();
                const end = new Date(dates.end).getTime();
                const currentStart = new Date(currentBookingDetail.startDate).getTime();
                const currentEnd = new Date(currentBookingDetail.endDate).getTime();

                return (
                    // (currentStart >= start && currentEnd <= end) ||
                    // (currentStart < start && currentEnd <= end) ||
                    // (currentEnd > end && currentStart >= start) ||
                    // (currentStart >= end && currentEnd <= start)
                    (currentStart < start && currentEnd > end) ||
                    ((currentStart > start && currentStart < end) && currentEnd > end) ||
                    ((currentEnd < end && currentEnd > start ) && currentStart <= start) ||
                    (currentStart <= end && currentEnd >= start)
                );
            });

            if (isOverlapping) {
                eligibleCarIds.push(booking.carId);
            }
        });
        console.log("booking eleible : ", eligibleCarIds)

        const carsWithNoBookings = carsAvailable.filter(car => !eligibleCarIds.some(eligibleCar => eligibleCar._id === car._id));
        eligibleCarIds.push(...carsWithNoBookings);

        console.log("eligible cars :", eligibleCarIds);

        return eligibleCarIds
    } catch (error) {
        console.log(error);
    }
};
