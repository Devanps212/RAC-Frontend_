import { bookingInterface, detailBooking } from "../types/bookingInterface";
import { showCarInterface } from "../types/carAdminInterface";

export const bookingHelper = (currentBookingDetail: bookingInterface, fullDetailOfBookings: detailBooking[], carsAvailable: showCarInterface[]) => {
    try {
        const eligibleCarIds: showCarInterface[] = [];
        const Overlapping :  showCarInterface[] | showCarInterface = []

        fullDetailOfBookings.forEach((booking) => {
            const startDate = new Date(booking.date.start).getTime();
            const endDate = new Date(booking.date.end).getTime();
            
            if(currentBookingDetail.startDate && currentBookingDetail.endDate) {
                const currentStart = new Date(currentBookingDetail.startDate).getTime();
                const currentEnd = new Date(currentBookingDetail.endDate).getTime();
        
                const isOverlapping = 
                    (currentStart < startDate && currentEnd > endDate) ||
                    ((currentStart > startDate && currentStart < endDate) && currentEnd > endDate) ||
                    ((currentEnd < endDate && currentEnd > startDate) && currentStart <= startDate) ||
                    (currentStart <= endDate && currentEnd >= startDate);
        
                if (!isOverlapping) {
                    eligibleCarIds.push(booking.carId);
                } else {
                    Overlapping.push(booking.carId)
                }
        
                return !isOverlapping;
            }
        
            return false;
        });


        const carsWithNoBookings = carsAvailable.filter(car => !Overlapping.some(overlappingCar => overlappingCar._id === car._id) && !eligibleCarIds.some(eligibleCar=>eligibleCar._id === car._id) );
        eligibleCarIds.push(...carsWithNoBookings);
        const uniqueCars = Array.from(new Set(eligibleCarIds))

        return uniqueCars
    } catch (error) {
        console.log(error);
    }
};
