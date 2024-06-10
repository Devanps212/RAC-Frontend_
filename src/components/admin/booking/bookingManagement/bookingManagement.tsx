import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Badge } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";
import './bookingManagement.css'
import { detailBooking } from "../../../../types/bookingInterface";
import { bookingFindingBasedOnRole, findBookings } from "../../../../features/axios/api/booking/booking";
import { BiSolidMessage } from "react-icons/bi";
import { Link } from "react-router-dom";

const BookingManagementTable = () => {
    const [allBookings, setAllBookings] = useState<detailBooking[] | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [bookingData, setBookingData] = useState<detailBooking | null>(null);

    useEffect(() => {
        fetchAllBookings();
    }, []);

    const fetchAllBookings = async () => {
        try {
            const data : Partial<detailBooking> = {
                ownerRole : 'Admin'
            }
            const response = await bookingFindingBasedOnRole(data);
            setAllBookings(response.data.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const showDetailsModal = (bookingId: string) => {
        const selectedBooking = allBookings?.find((booking) => booking._id === bookingId);
        if (selectedBooking) {
            setBookingData(selectedBooking);
            setShowModal(true);
        }
    };

    const countMessages = (bookingId: string) => {
        const bookingForCalc = allBookings?.find(booking => booking._id === bookingId);
        
        console.log(bookingForCalc)

        let messagesCount: number;
        if(bookingForCalc && bookingForCalc?.issues){
            messagesCount = 1;
            return messagesCount
        }

        messagesCount = 0;
        return messagesCount;
    };

    return (
        <div className="table-body">
            <h3 className="mb-5">Booking Management</h3>
            <Table responsive striped hover className="custom-table">
                <thead className="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Car Name</th>
                        <th>Image</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allBookings && allBookings.length > 0 ? (
                        allBookings.map((booking, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{booking.carId.name}</td>
                                <td>
                                    {booking.carId.thumbnailImg && (
                                        <img src={booking.carId.thumbnailImg} alt="Car Thumbnail" style={{ width: '70px', height: '70px' }} />
                                    )}
                                </td>
                                <td>
                                    <p className="mb-0 location">{booking.location.start}</p>
                                    <small>{new Date(booking.date.start).toLocaleString()}, {booking.time.start}</small>
                                </td>
                                <td>
                                    <p className="mb-0 location">{booking.location.end}</p>
                                    <small>{new Date(booking.date.end).toLocaleString()}, {booking.time.end}</small>
                                </td>
                                <td>Booking {booking.status}</td>
                                <td>₹ {booking.transaction.amount}</td>
                                <td>
                                <Link to={`/admin/booking/BookingMessages?bookingId=${booking._id}`}>
                                    <div style={{ position: 'relative' }}>
                                        <Button variant="primary" size="sm">
                                        <BiSolidMessage /> Message
                                        </Button>
                                        {countMessages(booking._id) > 0 && (
                                        <Badge className="message-icon bg-danger">
                                            {countMessages(booking._id)}
                                        </Badge>
                                        )}
                                    </div>
                                </Link>
                                    {' '}
                                    <Button className="mt-1" onClick={() => showDetailsModal(booking._id)} variant="success" size="sm" style={{width:"94%"}}>
                                        <FaInfoCircle /> Info
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} className="no-data-cell">No data Found</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Booking Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {bookingData && (
                        <>
                            <p><strong>Booking ID:</strong> {bookingData._id}</p>
                            <p><strong>Car Name:</strong> {bookingData.carId.name}</p>
                            <p>
                                <strong>Car Image:</strong>{" "}
                                {bookingData.carId.thumbnailImg && (
                                    <img src={bookingData.carId.thumbnailImg} alt="Car Thumbnail" style={{ width: "70px", height: "70px" }} />
                                )}
                            </p>
                            <p><strong>User ID:</strong> {bookingData.userId}</p>
                            <p><strong>Owner:</strong> {bookingData.owner}</p>
                            <p><strong>Status:</strong> {bookingData.status}</p>
                            <p><strong>Date Range:</strong> {new Date(bookingData.date.start).toLocaleString()} - {new Date(bookingData.date.end).toLocaleString()}</p>
                            <p><strong>Time Range:</strong> {bookingData.time.start} - {bookingData.time.end}</p>
                            <p><strong>Location:</strong> {bookingData.location.start} - {bookingData.location.end}</p>
                            <p><strong>Transaction Amount:</strong> ₹ {bookingData.transaction.amount}</p>
                            {bookingData.discount && <p><strong>Discount:</strong> ₹ {bookingData.discount}</p>}
                            {bookingData.total && <p><strong>Total:</strong> ₹ {bookingData.total}</p>}
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BookingManagementTable;
