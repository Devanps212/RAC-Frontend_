import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { RootState } from '../../features/axios/redux/reducers/reducer';
import { bookingFindingBasedOnRole } from '../../features/axios/api/booking/booking';
import { detailBooking, DateRange } from '../../types/bookingInterface';
import { toast } from 'react-toastify';

const BookingEndCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const userToken = useSelector((state: RootState) => state.token.token) ?? '';

    useEffect(() => {
        const checkBookingEndDate = async () => {
            console.log("checking booking")
            try {
                if (!userToken) {
                    throw new Error('User token not found');
                }

                const decodedToken: any = jwtDecode(userToken);
                console.log('Decoded token:', decodedToken.payload);

                const data: Partial<detailBooking> = {
                    userId: decodedToken.payload
                };

                const userBooking = await bookingFindingBasedOnRole(data);
                

                if (Array.isArray(userBooking.data.data)) {
                    userBooking.data.data.forEach((booking: detailBooking) => {
                        checkBookingEndDateForBooking(booking.date.end);
                    });
                } else {
                    checkBookingEndDateForBooking(userBooking.data.data.date.end);
                    console.log(checkBookingEndDateForBooking(userBooking.data.data.date.end))
                    console.log("single booking")
                }

                console.log("checked")

            } catch (error: any) {
                console.error('Error checking booking status:', error);
                toast.error(error.message)
                
            }
        };

        checkBookingEndDate();
    }, [userToken]);

    const checkBookingEndDateForBooking = (endDate: Date) => {
        const currentTime = new Date();
        const endDateTime = new Date(endDate);
        const timeDifference = endDateTime.getTime() - currentTime.getTime();

        console.log("time difference :", timeDifference)
        const remainingTime = timeDifference > 0 ? timeDifference : 0;

        const remainingMinutes = Math.ceil(remainingTime / (1000 * 60));
        
        console.log("remianing time :", remainingTime)
        console.log("remeining minutes : ", remainingMinutes)
        if (remainingMinutes <= 30) {
            console.log(`Booking ${endDate} is ending soon. Remaining time: ${remainingMinutes} minutes.`);
            return {message: `Booking ${endDate} is ending soon. Remaining time: ${remainingMinutes} minutes.`}
        }
    };

    return <>{children}</>;
};

export default BookingEndCheck;
