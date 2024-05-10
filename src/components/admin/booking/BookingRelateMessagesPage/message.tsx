import React, { useEffect, useState } from 'react';
import './message.css';
import { detailBooking } from '../../../../types/bookingInterface';
import { findBookings } from '../../../../features/axios/api/booking/booking';
import { FaEnvelope } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

interface BookingMessagesProps {}

const BookingMessages: React.FC<BookingMessagesProps> = () => {
  const [bookings, setBookings] = useState<Partial<detailBooking>[] | null>(
    null
  );

  const fetchAllBooking = async () => {
    const response = await findBookings('all');
    setBookings(response.data);
  };

  useEffect(() => {
    fetchAllBooking();
  }, []);

  return (
    <div className="booking-messages">
      <h2 className='text-center'>Booking Messages</h2>
      <ul className="message-list">
        {bookings &&
          bookings.map((booking) =>
            booking.issues ? (
              <li key={booking._id} className="message-item">
                <p>{booking.userId}</p>
                <div className="message-content">
                  <p>{booking.issues}</p>
                  <time>
                    {booking.date?.start ? new Date(booking.date.start).toLocaleString() : ''}
                    </time>
                </div>
                <Button variant='danger' size='sm'>
                    Take action
                </Button>
              </li>
            ) :<>
            <FaEnvelope style={{width:"100%", fontSize:'320px'}}/> 
            <h5 className='text-center'>No message Found</h5>
            </> 
          )}
      </ul>
    </div>
  );
};

export default BookingMessages;