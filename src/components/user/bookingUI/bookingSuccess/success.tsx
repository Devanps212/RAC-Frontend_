import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import './success.css'
import { detailBooking } from "../../../../types/bookingInterface";

const UserTransactionPage = () => {
  const {bokingDetail} = useParams()

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const data = params.get('bokingDetail')

  const[info, setInfo] = useState<detailBooking | null>(null)

  useEffect(() => {
    const setting = () => {
        if (data) {
            const parsedData = decodeURIComponent(data);
            const bookingData = JSON.parse(parsedData);
            setInfo(bookingData);
        }
    };

    setting();
}, [data]);


  console.log(bokingDetail)
  return (
    <div className="Container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#eee', paddingTop: '2rem' }}>
      <div className="wrapping">
        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
          <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
      </div>
      <h3 className="text-center mb-3">Booking Successful</h3>
      <p className="text-center mb-2">Your booking was successful</p>
      <p className="text-center mb-2">Transaction completed with ID: <strong>{info?.transaction._id}</strong></p>
      <p className="text-center mb-2">Your account has been charged <strong>₹{info?.transaction.amount}</strong> for this booking.</p>
      <p className="text-center mb-5">Thank you for choosing our service. You can now view your booking details in your account.</p>
      <strong className="text-center mb-2">View Booking Details</strong>
      <Link className="btn btn-light login-success-button" to={`/users/BookedCars/${info?._id}`}>View Bookings</Link>

    </div>
  );
};

export default UserTransactionPage;