import React, { ChangeEvent, useEffect, useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import './bookedCars.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PaymentFlow from "../../../paymentLoader/paymetnLoader"; // Adjust import path as necessary
import { FaArrowRight, FaCalendarTimes, FaCar, FaChair, FaGasPump, FaLocationArrow } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import { BiSolidLocationPlus } from "react-icons/bi";
import { detailBooking } from "../../../../types/bookingInterface";
import { bookingFindingBasedOnRole, bookingUpdater } from "../../../../features/axios/api/booking/booking";
import { toast } from "react-toastify";
import { showCarInterface } from "../../../../types/carAdminInterface";
import { decodeToken } from "../../../../utils/tokenUtil";
import { RefundDetailsInterface } from "../../../../types/bookingInterface";

const BookedCars = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [bookingInfo, setBookingInfo] = useState<detailBooking[] | detailBooking | null>(null);
    const [filteredBookingInfo, setFilteredBookingInfo] = useState<detailBooking[] | detailBooking | null>(null);
    const [car, setCar] = useState<showCarInterface[] | null>(null);
    const [showRefundModal, setRefundShowModal] = useState(false)
    const [singleBooking, setSingleBooking] = useState<Partial<detailBooking> | null>(null);
    const [refundDetails, setRefundDetails] = useState<RefundDetailsInterface | null>(null)
    const [paymentLoader, setPaymentLoader] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const token = localStorage.getItem('token') ?? '';

    const fetchBookingDetail = async () => {
        const userId = await decodeToken(token).payload;
        const partialDetail: Partial<detailBooking> = { userId: userId };
        const response = await bookingFindingBasedOnRole(partialDetail);
        let car;
        if (Array.isArray(response.data.data)) {
            car = response.data.data.map((carData: detailBooking) => carData.carId);
        } else {
            car = response.data.data;
        }
        setCar(car);
        setBookingInfo(response.data.data);
        setFilteredBookingInfo(response.data.data);
    };

    const handleChange = async (e: ChangeEvent<HTMLTextAreaElement>) => {
        const updateValues = e.target.value;
        setSingleBooking((prevState) => ({
            ...prevState,
            issues: updateValues,
        }));
    };

    const submitIssue = async (bookingId: string) => {
        setSingleBooking(PrevState => ({
            ...PrevState,
            _id: bookingId
        }));
        if (singleBooking && singleBooking.issues && singleBooking._id) {
            const response = await bookingUpdater(singleBooking);
            if (response && 'message' in response) {
                toast.error(response.message);
            } else {
                toast.success("Booking issue successfully submitted! We will get back to you");
            }
            setSingleBooking(null);
        }
    };

    useEffect(() => {
        fetchBookingDetail();
    }, []);

    const handleDate = (date: Date | null) => {
        setSelectedDate(date);
        if (date && Array.isArray(bookingInfo) && filteredBookingInfo !== null) {
            let filteredData: detailBooking[];
            if (Array.isArray(filteredBookingInfo)) {
                filteredData = filteredBookingInfo.filter((data: detailBooking) => {
                    const bookingStartDate = new Date(data.date.start);
                    return bookingStartDate.toDateString() === date.toDateString();
                });
            } else {
                filteredData = [filteredBookingInfo].filter((data: detailBooking) => {
                    const bookingStartDate = new Date(data.date.start);
                    return bookingStartDate.toDateString() === date.toDateString();
                });
            }
            setBookingInfo(filteredData);
        }
    };

    const handleBookingCancel = async (id: string, carName: string, totalAmount: number) => {
        const data: Partial<detailBooking> = { _id: id, status: 'Cancelled' };
        confirmAlert({
            title: 'Confirm Cancellation and Refund',
            message: `You are about to cancel the booking for the car "${carName}". A refund of INR ${totalAmount} will be processed to the account used for this booking. Are you sure you want to proceed?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            setPaymentLoader(true)
                            
                            const response = await bookingUpdater(data);
                            setTimeout(()=>{
                                toast.success(response.message);
                                setPaymentLoader(false)
                                setRefundShowModal(true)
                                setRefundDetails(response.data)
                            }, 3000)
                            
                            
                            
                        } catch (error: any) {
                            setPaymentLoader(false)
                            console.error('Error deleting car:', error);
                            toast.error(error.message);
                        }
                    },
                },
                {
                    label: 'No',
                    onClick: () => {
                        console.log('Deletion canceled by user');
                    },
                },
            ],
        });
    };
    const paymentLoading = (value: boolean)=>{
        setPaymentLoader(value)
    }

    return (
        <>
            {paymentLoader && <PaymentFlow />}
            <div className="container-fluid" style={{ paddingTop: '8rem' }}>
                <div className="main-contents">
                    <div className="row">
                        <div className="col-4">
                            <div className="left-side-contents d-flex flex-column align-items-center">
                                <h3 className="mb-4" style={{ fontSize: "x-large" }}>Check bookings</h3>
                                <div className="mt-4 datePicker">
                                    <h4 className="font-text">Check by date</h4>
                                    <div className="calender">
                                        <DatePicker
                                            selected={selectedDate}
                                            onChange={date => handleDate(date)}
                                            dateFormat="dd/MM/yyyy"
                                            className="form-control-input"
                                            minDate={new Date()}
                                            inline
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-8" style={{ maxHeight: '488px', overflowY: 'auto' }}>
                            {bookingInfo && (
                                Array.isArray(bookingInfo) ? (
                                    bookingInfo.map((bookings) => (
                                        <div className="right-side-contents mb-3" key={bookings._id}>
                                            <div className="row d-flex justify-content-center align-items-center">
                                                <div className="col-4">
                                                    <div className="image">
                                                        <img src={bookings.carId.thumbnailImg} style={{ width: '100%', height: 'auto' }} alt="Car" />
                                                    </div>
                                                </div>
                                                <div className="col-5">
                                                    <strong>{bookings.carId.name}</strong>
                                                    <div className="mt-2 row d-flex justify-content-center align-items-center">
                                                        <div className="col-4">
                                                            <div className="small-specs text-center">
                                                                <FaChair />
                                                                <small>{bookings.carId.seats}Seats</small>
                                                            </div>
                                                        </div>
                                                        <div className="col-4">
                                                            <div className="ms-2 small-specs text-center">
                                                                <FaGasPump />
                                                                <small>{bookings.carId.fuelType}</small>
                                                            </div>
                                                        </div>
                                                        <div className="col-4">
                                                            <div className="ms-4 small-specs text-center">
                                                                <FaCar />
                                                                <small>Luxury</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-6">
                                                            <div style={{ width: 'max-content' }}>
                                                                <p className="mb-1">
                                                                    <FaLocationArrow className="me-2" />
                                                                    From:
                                                                </p>
                                                                <p className="mb-1">
                                                                    <BiSolidLocationPlus className="me-2" />
                                                                    {bookings.location.start}
                                                                </p>
                                                                <small>
                                                                    <FaCalendarTimes className="me-2" />
                                                                    {new Date(bookings.date.start).toLocaleString()}, {bookings.time.start}
                                                                </small>
                                                            </div>
                                                        </div>
                                                        <div className="col-1">
                                                            <div>
                                                                <FaArrowRight />
                                                            </div>
                                                        </div>
                                                        <div className="col-5 mr-3">
                                                            <div style={{ width: 'max-content' }}>
                                                                <p className="mb-1">To:</p>
                                                                <p className="mb-1">{bookings.location.end}</p>
                                                                <small>
                                                                    {new Date(bookings.date.end).toLocaleString()}, {bookings.time.end}
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="buttons d-flex flex-column justify-content-center align-items-center">
                                                        <Button className="ms-5" onClick={() => setShowModal(true)}>
                                                            Report an issue
                                                        </Button>
                                                        <Button variant="info" onClick={() => handleBookingCancel(bookings._id, bookings.carId.name, bookings.transaction.amount)} className="ms-5 mt-4">
                                                            View More
                                                        </Button>
                                                        <div className="status-container ms-5 mt-4">
                                                            <p className={`status ${bookings.status.replace(/\s+/g, '-').toLowerCase()}`}>
                                                                {bookings.status}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {showModal && (
                                                <Modal show={showModal} onHide={() => setShowModal(false)}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title id="modal-title">Report An Issue</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <p id="modal-description">What's the problem you are facing?</p>
                                                        <textarea
                                                            value={singleBooking?.issues || ''}
                                                            onChange={handleChange}
                                                            placeholder="Write here"
                                                            aria-label="Issue description"
                                                            className="issue-detail"
                                                        />
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button onClick={() => submitIssue(bookings._id)} type="submit">
                                                            Submit
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="right-side-contents mb-3" key={bookingInfo._id}>
                                        <div className="row d-flex justify-content-center align-items-center">
                                            <div className="col-4">
                                                <div className="image">
                                                    <img src={bookingInfo.carId.thumbnailImg} style={{ width: '100%', height: 'auto' }} alt="Car" />
                                                </div>
                                            </div>
                                            <div className="col-5">
                                                <strong>{bookingInfo.carId.name}</strong>
                                                <div className="mt-2 row d-flex justify-content-center align-items-center">
                                                    <div className="col-4">
                                                        <div className="small-specs text-center">
                                                            <FaChair />
                                                            <small>{bookingInfo.carId.seats}Seats</small>
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="ms-2 small-specs text-center">
                                                            <FaGasPump />
                                                            <small>{bookingInfo.carId.fuelType}</small>
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="ms-4 small-specs text-center">
                                                            <FaCar />
                                                            <small>Luxury</small>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-6">
                                                        <div style={{ width: 'max-content' }}>
                                                            <p className="mb-1">
                                                                <FaLocationArrow className="me-2" />
                                                                From:
                                                            </p>
                                                            <p className="mb-1">
                                                                <BiSolidLocationPlus className="me-2" />
                                                                {bookingInfo.location.start}
                                                            </p>
                                                            <small>
                                                                <FaCalendarTimes className="me-2" />
                                                                {new Date(bookingInfo.date.start).toLocaleString()}, {bookingInfo.time.start}
                                                            </small>
                                                        </div>
                                                    </div>
                                                    <div className="col-1">
                                                        <div>
                                                            <FaArrowRight />
                                                        </div>
                                                    </div>
                                                    <div className="col-5 mr-3">
                                                        <div style={{ width: 'max-content' }}>
                                                            <p className="mb-1">To:</p>
                                                            <p className="mb-1">{bookingInfo.location.end}</p>
                                                            <small>
                                                                {new Date(bookingInfo.date.end).toLocaleString()}, {bookingInfo.time.end}
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="buttons d-flex flex-column justify-content-center align-items-center">
                                                    <Button className="ms-5" onClick={() => setShowModal(true)}>
                                                        Report an issue
                                                    </Button>
                                                    <Button variant="danger" onClick={() => handleBookingCancel(bookingInfo._id, bookingInfo.carId.name, bookingInfo.transaction.amount)} className="ms-5 mt-3">
                                                        Cancel booking
                                                    </Button>
                                                    <div className="status-container ms-5 mt-4">
                                                        <p className={`status ${bookingInfo.status.replace(/\s+/g, '-').toLowerCase()}`}>
                                                            {bookingInfo.status}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {showModal && (
                                            <Modal show={showModal} onHide={() => setShowModal(false)}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title id="modal-title">Report An Issue</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <p id="modal-description">What's the problem you are facing?</p>
                                                    <textarea
                                                        value={singleBooking?.issues || ''}
                                                        onChange={handleChange}
                                                        placeholder="Write here"
                                                        aria-label="Issue description"
                                                        className="issue-detail"
                                                    />
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button onClick={() => submitIssue(bookingInfo._id)} type="submit">
                                                        Submit
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showRefundModal} onHide={()=>setRefundShowModal(false)} className="refund-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Refund Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="refund-details">
                        {refundDetails ? (
                            <>
                                <div className="thumbnail">
                                    <img src={refundDetails.bookingDetail.thumbnail} alt={refundDetails.bookingDetail.itemName} />
                                </div>
                                <div className="details">
                                    <p><strong>Item Name:</strong> {refundDetails.bookingDetail.itemName}</p>
                                    <p><strong>Amount:</strong> {refundDetails.amount / 100} {refundDetails.currency.toUpperCase()}</p>
                                    <p><strong>Card:</strong> {refundDetails.card.brand} ending in {refundDetails.card.last4}</p>
                                    <p><strong>Expiry:</strong> {refundDetails.card.exp_month}/{refundDetails.card.exp_year}</p>
                                    <p><strong>Status:</strong> {refundDetails.status}</p>
                                    <p><strong>Transaction ID:</strong> {refundDetails.transactionId}</p>
                                    <p><strong>Created:</strong> {new Date(refundDetails.created).toLocaleString()}</p>
                                </div>
                            </>
                        ) : (
                                <p>No detail found</p>
                            )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setRefundShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BookedCars;
