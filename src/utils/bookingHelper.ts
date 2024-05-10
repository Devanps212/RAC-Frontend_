import { bookingInterface, detailBooking } from "../types/bookingInterface";
import { showCarInterface } from "../types/carAdminInterface";

export const bookingHelper = (currentBookingDetail: bookingInterface, fullDetailOfBookings: detailBooking[], carsAvailable: showCarInterface[]) => {
    try {
        console.log("booking setting ");
        console.log("full :", fullDetailOfBookings);
        const eligibleCarIds: showCarInterface[] = [];
        const Overlapping :  showCarInterface[] | showCarInterface = []
        console.log("currentBookimgs : ", currentBookingDetail.startDate)
        console.log("currentBookimgs : ", currentBookingDetail.endDate)



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
        
                console.log("overlapping : ", isOverlapping);
        
                if (!isOverlapping) {
                    eligibleCarIds.push(booking.carId);
                } else {
                    Overlapping.push(booking.carId)
                }
        
                return !isOverlapping;
            }
        
            return false;
        });

        console.log("overlappping : ", Overlapping)

        console.log("eligible : ", eligibleCarIds)

        const carsWithNoBookings = carsAvailable.filter(car => !Overlapping.some(overlappingCar => overlappingCar._id === car._id) && !eligibleCarIds.some(eligibleCar=>eligibleCar._id === car._id) );
        eligibleCarIds.push(...carsWithNoBookings);
        const uniqueCars = Array.from(new Set(eligibleCarIds))

        console.log("eligible cars :", eligibleCarIds);

        return uniqueCars
    } catch (error) {
        console.log(error);
    }
};
