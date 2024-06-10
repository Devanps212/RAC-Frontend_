// import React, { useEffect, useState } from "react";
// import { Button, Modal, Table } from "react-bootstrap";
// import { FaInfoCircle } from "react-icons/fa";
// import { detailBooking } from "../../../../types/bookingInterface";
// import { BiSolidMessage } from "react-icons/bi";
// import { Link } from "react-router-dom";
// import { bookingFindingBasedOnRole } from "../../../../features/axios/api/booking/booking";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../../features/axios/redux/reducers/reducer";
// import { jwtDecode } from "jwt-decode";
// import { tokenInterface } from "../../../../types/payloadInterface";

// const PartnerBookingHistory: React.FC = () => {
//     const [AllBooking, setBookings] = useState<detailBooking[] | detailBooking | null>(null);
//     const [showModal, setShowModal] = useState(false);
//     const [bookingData, setBookingData] = useState<detailBooking | null>(null);
//     const token = useSelector((root: RootState) => root.partnerToken.partnerToken) ?? '';
//     const decode: tokenInterface = jwtDecode(token);
//     const partnerId = decode.payload;

//     const fetchPartnerBooking = async () => {
//         const data: Partial<detailBooking> = {
//             owner: partnerId,
//             status: 'Completed' || 'Cancelled'
//         };
//         const response = await bookingFindingBasedOnRole(data);
//         console.log(response);
//         console.log("booked data  : ", response.data.data);
//         setBookings(response.data.data);
//     };

//     useEffect(() => {
//         fetchPartnerBooking();
//     }, []);

//     const showTheModal = (bookingId: string) => {
//         if (Array.isArray(AllBooking)) {
//             const selectedBooking = AllBooking.find((booking: detailBooking) => booking._id === bookingId);
//             if (selectedBooking) {
//                 setBookingData(selectedBooking);
//                 setShowModal(true);
//             }
//         } else if (AllBooking && AllBooking._id === bookingId) {
//             setBookingData(AllBooking);
//             setShowModal(true);
//         }
//     };

//     return (
//         <div className="table-body">
//             <h3 className="mb-5">Booking History</h3>
//             <Table responsive striped hover className="custom-table">
//                 <thead className="thead-dark">
//                     <tr>
//                         <th>#</th>
//                         <th>Car Name</th>
//                         <th>Image</th>
//                         <th>From</th>
//                         <th>To</th>
//                         <th>Status</th>
//                         <th>Total</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {Array.isArray(AllBooking) && AllBooking.length > 0 ? (
//                         AllBooking.map((booking: detailBooking, index: number) => (
//                             <tr key={index}>
//                                 <td>{index + 1}</td>
//                                 <td>{booking.carId.name}</td>
//                                 <td>
//                                     {booking.carId.thumbnailImg && (
//                                         <img src={booking.carId.thumbnailImg} alt="Car Thumbnail" style={{ width: '70px', height: '70px' }} />
//                                     )}
//                                 </td>
//                                 <td>
//                                     <p className="mb-0 location">{booking.location.start}</p>
//                                     {' '}
//                                     <small>{new Date(booking.date.start).toLocaleString()}, {booking.time.start}</small>
//                                 </td>
//                                 <td>
//                                     <p className="mb-0 location">{booking.location.end}</p>
//                                     {' '}
//                                     <small>{new Date(booking.date.end).toLocaleString()}, {booking.time.end}</small>
//                                 </td>
//                                 <td>Booking {booking.status}</td>
//                                 <td> ₹ {booking.transaction.amount}</td>
//                                 <td>
//                                     <Link to={`/admin/booking/BookingMessages?bookingId=${booking._id}`}>
//                                         <Button variant="primary" size="sm">
//                                             <BiSolidMessage /> Messages
//                                         </Button>
//                                     </Link>
//                                     {' '}
//                                     <Button className="mt-1" onClick={() => showTheModal(booking._id)} variant="success" size="sm" style={{ width: "60%" }}>
//                                         <FaInfoCircle /> Info
//                                     </Button>
//                                 </td>
//                             </tr>
//                         ))
//                     ) : AllBooking && !Array.isArray(AllBooking) ? (
//                         <tr>
//                             <td>1</td>
//                             <td>{AllBooking.carId.name}</td>
//                             <td>
//                                 {AllBooking.carId.thumbnailImg && (
//                                     <img src={AllBooking.carId.thumbnailImg} alt="Car Thumbnail" style={{ width: '70px', height: '70px' }} />
//                                 )}
//                             </td>
//                             <td>
//                                 <p className="mb-0 location">{AllBooking.location.start}</p>
//                                 {' '}
//                                 <small>{new Date(AllBooking.date.start).toLocaleString()}, {AllBooking.time.start}</small>
//                             </td>
//                             <td>
//                                 <p className="mb-0 location">{AllBooking.location.end}</p>
//                                 {' '}
//                                 <small>{new Date(AllBooking.date.end).toLocaleString()}, {AllBooking.time.end}</small>
//                             </td>
//                             <td>Booking {AllBooking.status}</td>
//                             <td> ₹ {AllBooking.transaction.amount}</td>
//                             <td>
//                                 <Link to={`/admin/booking/BookingMessages?bookingId=${AllBooking._id}`}>
//                                     <Button variant="primary" size="sm">
//                                         <BiSolidMessage /> Messages
//                                     </Button>
//                                 </Link>
//                                 {' '}
//                                 <Button className="mt-1" onClick={() => showTheModal(AllBooking._id)} variant="success" size="sm" style={{ width: "60%" }}>
//                                     <FaInfoCircle /> Info
//                                 </Button>
//                             </td>
//                         </tr>
//                     ) : (
//                         <tr>
//                             <td colSpan={8} className="no-data-cell">No Completed Booking Found</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </Table>

//             <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Booking Details</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {bookingData && (
//                         <>
//                             <p><strong>Booking ID:</strong> {bookingData._id}</p>
//                             <p><strong>Car Name:</strong> {bookingData.carId.name}</p>
//                             <p>
//                                 <strong>Car Image:</strong>{" "}
//                                 {bookingData.carId.thumbnailImg && (
//                                     <img src={bookingData.carId.thumbnailImg} alt="Car Thumbnail" style={{ width: "70px", height: "70px" }} />
//                                 )}
//                             </p>
//                             <p><strong>User ID:</strong> {bookingData.userId}</p>
//                             <p><strong>Owner:</strong> {bookingData.owner}</p>
//                             <p><strong>Status:</strong> {bookingData.status}</p>
//                             <p><strong>Date Range:</strong> {new Date(bookingData.date.start).toLocaleString()} - {new Date(bookingData.date.end).toLocaleString()}</p>
//                             <p><strong>Time Range:</strong> {bookingData.time.start} - {bookingData.time.end}</p>
//                             <p><strong>Location:</strong> {bookingData.location.start} - {bookingData.location.end}</p>
//                             <p><strong>Transaction Amount:</strong> ₹ {bookingData.transaction.amount}</p>
//                             {bookingData.discount && (
//                                 <p><strong>Discount:</strong> ₹ {bookingData.discount}</p>
//                             )}
//                             {bookingData.total && (
//                                 <p><strong>Total:</strong> ₹ {bookingData.total}</p>
//                             )}
//                         </>
//                     )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowModal(false)}>
//                         Close
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default PartnerBookingHistory;
