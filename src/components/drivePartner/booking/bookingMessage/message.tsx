import React, { useEffect, useState } from 'react';
import './message.css';
import { detailBooking } from '../../../../types/bookingInterface';
import { carReportHandle, findBookings } from '../../../../features/axios/api/booking/booking';
import { FaEnvelope } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { showCarInterface } from '../../../../types/carAdminInterface';
import { toast } from 'react-toastify';

interface BookingMessagesProps {}

const PartnerBookingMessages: React.FC<BookingMessagesProps> = () => {
  const [bookings, setBookings] = useState<Partial<detailBooking> | null>(null);

  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  console.log("bookingId : ", bookingId)

  const fetchAllBooking = async () => {
    if(bookingId){
      const response = await findBookings(bookingId);
      console.log("data booking : ", response.data.data)
      setBookings(response.data);
    }
    
  };

  const handleReport = async(carId : string)=>{

    console.log("carId : ", carId)
    const data : Partial<showCarInterface> = {
      _id: carId,
      status: 'maintenance',      
    }

    const update = await carReportHandle(data, bookingId!)
    console.log("report handle success : ", update)
    toast.success(update.message)
  }

  useEffect(() => {
    fetchAllBooking();
  }, []);

  return (
    <div className="booking-messages">
      <h2 className='text-center'>Booking Messages</h2>
      <ul className="message-list">
        {bookings &&
            bookings.issues !== '' ? (
              <li key={bookings._id} className="message-item">
                <p>{bookings.userId}</p>
                <div className="message-content">
                  <p>{bookings.issues}</p>
                  <time>
                    {bookings.date?.start ? new Date(bookings.date.start).toLocaleString() : ''}
                    </time>
                </div>
                {
                  !bookings._id
                }
                <Button variant='danger' size='sm' onClick={()=>handleReport(bookings.carId?._id!)}>
                  Schedule maintenance for the car
                </Button>

              </li>
            ) :<>
            <FaEnvelope style={{width:"100%", fontSize:'320px'}}/> 
            <h5 className='text-center'>No message Found</h5>
            </> 
            }
      </ul>
    </div>
  );
};

export default PartnerBookingMessages;