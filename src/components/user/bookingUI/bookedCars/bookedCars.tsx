import React, { ChangeEvent, useEffect, useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import './bookedCars.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PaymentFlow from "../../../paymentLoader/paymetnLoader"; // Adjust import path as necessary
import { FaArrowRight, FaCalendarTimes, FaCar, FaChair, FaGasPump, FaLocationArrow } from "react-icons/fa";
import { Button, Form, Modal } from "react-bootstrap";
import { BiSolidLocationPlus } from "react-icons/bi";
import { BookingDetail, bookingInterfaceReschedule, detailBooking } from "../../../../types/bookingInterface";
import { bookingFindingBasedOnRole, bookingRescheduler, bookingUpdater } from "../../../../features/axios/api/booking/booking";
import { toast } from "react-toastify";
import { showCarInterface } from "../../../../types/carAdminInterface";
import { decodeToken } from "../../../../utils/tokenUtil";
import { RefundDetailsInterface } from "../../../../types/bookingInterface";
import DateDetailForm, { BookingOnSubmitType } from "../../../../Validators/userValidator.ts/bookingValidator";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const BookedCars = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [bookingInfo, setBookingInfo] = useState<detailBooking[] | detailBooking | null>(null);
    const [filteredBookingInfo, setFilteredBookingInfo] = useState<detailBooking[] | detailBooking | null>(null);
    const [car, setCar] = useState<showCarInterface[] | showCarInterface | null>(null);
    const [currentBooking, setCurrentBoking] = useState<detailBooking | null>(null)
    const [showRefundModal, setRefundShowModal] = useState(false)
    const [additionalCharge, setAdditionalCharge] = useState<string>('0.00')
    const [singleBooking, setSingleBooking] = useState<Partial<detailBooking> | null>(null);
    const [refundDetails, setRefundDetails] = useState<RefundDetailsInterface | null>(null)
    const [showReSchedule, setReschedule] = useState(false)
    const [message, setSuccessMessage] = useState('')
    const [paymentLoader, setPaymentLoader] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const currentDate = new Date().toISOString().split('T')[0];
    const token = localStorage.getItem('token') ?? '';
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit: BookingOnSubmitType = async(values) => {
        console.log(values);

        const token = localStorage.getItem('token') ?? ''
        const userId = await decodeToken(token).payload
        const data : Partial<bookingInterfaceReschedule> = {
            bookingId: currentBooking?._id,
            carId:currentBooking?.carId,
            startDate :  new Date(values.start),
            endDate: new Date(values.end),
            total: parseInt(additionalCharge),
        }
        const scheduleDate = await bookingRescheduler(data, userId)
        const stripe = await loadStripe('pk_test_51PDiVJSFg3h3pm8hFZ9xw2Duq8djIUTp0t5I6M5yMguU8KpIdUnUt0epBFvTkOx0jWV3NWOQkE402iZat4c2JX8P00Hl0S8Igy');
        console.log("received session id : ", scheduleDate.sessionId)
        const result = await stripe?.redirectToCheckout({
            sessionId: scheduleDate.sessionId
        });
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const message = searchParams.get('message');
        const status = searchParams.get('status');
        console.log(message)
    
        if (message) {
          setSuccessMessage(message);
          toast.success(message)
          
          const timer = setTimeout(() => {

            setSuccessMessage('');
            searchParams.delete('message');
            navigate({ search: searchParams.toString() }, { replace: true });
          }, 3000); 
    
          return () => clearTimeout(timer);
        } else {
          setSuccessMessage('');
        }
    
        console.log('Message:', message);
        console.log('Status:', status);
      }, [location.search, navigate]);

    const rescheduleBooking = (booking : detailBooking)=>{
        console.log("currentBookings : ", booking)
        setCurrentBoking(booking)
        setReschedule(true)
    }
    

    const formik = DateDetailForm(handleSubmit)

    
    
    const fetchBookingDetail = async () => {
        const userId = await decodeToken(token).payload;
        const partialDetail: Partial<detailBooking> = { userId: userId };
        const response = await bookingFindingBasedOnRole(partialDetail);
        let car;
        if (Array.isArray(response.data.data)) {
            car = response.data.data.map((carData: detailBooking) => carData.carId);
        } else {
            car = response.data.data.carId;
        }
        console.log("car found : ",car)
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
        const calculateAmount = () => {
            if (currentBooking) {
                const startDate = new Date(formik.values.start);
                const endDate = new Date(formik.values.end);
                const currentStartDate = new Date(currentBooking.date.start);
                const currentEndDate = new Date(currentBooking.date.end);

                const newDateDifference = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
                const currentDateDifference = (currentEndDate.getTime() - currentStartDate.getTime()) / (1000 * 60 * 60 * 24);

                let newAmount = currentBooking.transaction.amount || 0;

                if (newDateDifference > currentDateDifference) {
                    const additionalDays = newDateDifference - currentDateDifference;
                    let ChargePerDay: number;

                    if (Array.isArray(car)) {
                        const matchedCar = car.find((cars) => cars._id === currentBooking.carId._id);
                        ChargePerDay = matchedCar ? matchedCar.rentPricePerDay ?? 0 : 0;
                    } else {
                        ChargePerDay = car?.rentPricePerDay ?? 0;
                    }

                    const additionalChargePerDay = ChargePerDay;
                    newAmount += additionalDays * additionalChargePerDay;
                }

                
                if (newAmount > parseFloat(additionalCharge)) {
                    setAdditionalCharge(newAmount.toFixed(2));
                } else {
                    setAdditionalCharge('0.00');
                }
            }
        };

        calculateAmount();
    }, [formik.values.start, formik.values.end, currentBooking, car]);


    useEffect(() => {
        fetchBookingDetail();
    }, []);

    //Date Setting

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


    //Cancel Booking

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
                                console.log("detail recieved : ", response.data)
                                setRefundDetails(response.data)
                                console.log("bookingInfo : ",bookingInfo)
                            }, 3000)
                            
                            
                            
                        } catch (error: any) {
                            setPaymentLoader(false)
                            console.log('Error deleting car:', error);
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
    // const paymentLoading = (value: boolean)=>{
    //     setPaymentLoader(value)
    // }

    return (
        <>
            {paymentLoader && <PaymentFlow />}
            <div className="container-fluid" style={{ paddingTop: '8rem' }}>
                <div className="mains-contents">
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
                            {bookingInfo &&  (
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
                                                        {
                                                            bookings.status === 'Cancelled' ? (
                                                                <>
                                                                </>
                                                            ) : (
                                                                <>
                                                                <Button className="ms-5" onClick={() => setShowModal(true)}>
                                                                    Report an issue
                                                                </Button>
                                                                <Button variant="danger" onClick={() => handleBookingCancel(bookings._id, bookings.carId.name, bookings.transaction.amount || 0)} className="ms-5 mt-4">
                                                                    Cancel booking
                                                                </Button>
                                                                <Button variant="dark" onClick={()=>rescheduleBooking(bookings)} className="ms-5 mt-2">
                                                                    ReSechdule Date
                                                                </Button>
                                                                </>
                                                            )
                                                        }
                                                                
                                                               
                        
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

                                            <Modal show={showReSchedule} onHide={() => setReschedule(false)} className="animated-modal">
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Reschedule Booking</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <div className="d-flex justify-content-center align-items-center">
                                                    <Form onSubmit={formik.handleSubmit} className="form-submission">
                                                        <h5 className="mb-2">Select Start Date :</h5>
                                                        <div className="Reschedule-calendar mb-1">
                                                        <input
                                                            type="date"
                                                            min={currentDate}
                                                            onChange={(e) => {
                                                                const dateString = e.target.value;
                                                                const dateValue = dateString ? new Date(dateString) : null;
                                                                formik.setFieldValue("start", dateValue?.toISOString().split('T')[0]);
                                                            }}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.start}
                                                        />
                                                        {formik.touched.start && formik.errors.start && (
                                                                <div style={{ color: 'red' }}>{formik.errors.start}</div>
                                                            )}
                                                        </div>
                                                        <h5 className="mt-4">Select End Date :</h5>
                                                        <div className="Reschedule-calendar mb-1">
                                                        <input
                                                            type="date"
                                                            min={currentDate}
                                                            onChange={(e) => {
                                                                const dateString = e.target.value;
                                                                const dateValue = dateString ? new Date(dateString) : null;
                                                                formik.setFieldValue("end", dateValue?.toISOString().split('T')[0]);
                                                            }}
                                                            
                                                            value={formik.values.end}
                                                        />
                                                        {formik.touched.end && formik.errors.end && (
                                                                <div style={{ color: 'red' }}>{formik.errors.end}</div>
                                                            )}
                                                        </div>
                                                        <div className="mt-2">Amount :{additionalCharge}</div>
                                                        <Button className="mt-3" type="submit">
                                                        Submit
                                                        </Button>
                                                    </Form>
                                                    </div>
                                                </Modal.Body>
                                            </Modal>
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
                                                <div className="buttons-items d-flex flex-column justify-content-center align-items-center">
                                               {
                                                bookingInfo.status === 'Cancelled' ? (
                                                    <>
                                                    </>
                                                ) : (
                                                  <>
                                                    <Button className="ms-5" onClick={() => setShowModal(true)}>
                                                        Report an issue
                                                    </Button>
                                                    <Button variant="danger" onClick={() => handleBookingCancel(bookingInfo._id, bookingInfo.carId.name, bookingInfo.transaction.amount || 0)} className="ms-5 mt-2">
                                                        Cancel booking
                                                    </Button>
                                                    <Button variant="dark" onClick={()=>rescheduleBooking(bookingInfo)} className="ms-5 mt-2">
                                                        ReSechdule Date
                                                    </Button>
                                                  </>  
                                                )
                                               }
                                                                
                                                                
                                                                
                                                             
                                                    {/* <Button className="ms-5" onClick={() => setShowModal(true)}>
                                                        Report an issue
                                                    </Button>
                                                    <Button variant="danger" onClick={() => handleBookingCancel(bookingInfo._id, bookingInfo.carId.name, bookingInfo.transaction.amount)} className="ms-5 mt-3">
                                                        Cancel booking
                                                    </Button> */}
                                                    <div className="status-container ms-5 mt-2">
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
                                        <Modal show={showReSchedule} onHide={() => {setReschedule(false)
                                            formik.resetForm()
                                            setAdditionalCharge('0')
                                        }} className="animated-modal">
                                            <Modal.Header closeButton>
                                                <Modal.Title>Reschedule Booking</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body className="modal-body">
                                                <div className="d-flex justify-content-center align-items-center">
                                                <Form onSubmit={formik.handleSubmit} className="form-submission mt-3">
                                                    <h5 className="mb-2">Select Start Date :</h5>
                                                    <div className="Reschedule-calendar mb-1">
                                                    <input
                                                        type="date"
                                                        min={currentDate}
                                                        onChange={(e) => {
                                                            const dateString = e.target.value;
                                                            const dateValue = dateString ? new Date(dateString) : null;
                                                            formik.setFieldValue("start", dateValue?.toISOString().split('T')[0]);
                                                        }}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.start}
                                                    />
                                                    {formik.touched.start && formik.errors.start && (
                                                            <div style={{ color: 'red' }}>{formik.errors.start}</div>
                                                        )}
                                                    </div>
                                                    <h5 className="mt-4">Select End Date :</h5>
                                                    <div className="Reschedule-calendar mb-1">
                                                    <input
                                                        type="date"
                                                        min={currentDate}
                                                        onChange={(e) => {
                                                            const dateString = e.target.value;
                                                            const dateValue = dateString ? new Date(dateString) : null;
                                                            formik.setFieldValue("end", dateValue?.toISOString().split('T')[0]);
                                                        }}
                                                        
                                                        value={formik.values.end}
                                                    />
                                                    {formik.touched.end && formik.errors.end && (
                                                            <div style={{ color: 'red' }}>{formik.errors.end}</div>
                                                        )}
                                                    </div>
                                                    <div className="mt-3">
                                                        Paid Amount : ₹{bookingInfo.transaction.amount}
                                                    </div>
                                                    <div className="mt-3" style={{fontFamily:'Kanit', fontSize: 'large'}}>
                                                        Additional Amount : ₹ {additionalCharge}
                                                    </div>
                                                    <Button className="mt-3" type="submit">
                                                    Proceed To Pay
                                                    </Button>
                                                </Form>
                                                </div>
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                )
                            )}

                            {
                                (Array.isArray(bookingInfo) && bookingInfo.length === 0) ||
                                (bookingInfo && typeof bookingInfo === 'object' && !Array.isArray(bookingInfo) && (!bookingInfo._id || !bookingInfo.transaction._id)) ? (
                                    <h1>No booking Found</h1>
                                ) : (
                                    <>
                                    </>
                                )
                            }
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
                                    <p><strong>Transaction ID:</strong> {refundDetails.transaction.transactionId}</p>
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
