import React, { ChangeEvent, useEffect, useState } from "react";
import './bookedCars.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaArrowRight, FaCalendarTimes, FaCar, FaChair, FaGasPump, FaLocationArrow, FaPlaceOfWorship } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import { BiSolidLocationPlus } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { detailBooking } from "../../../../types/bookingInterface";
import { bookingFindingBasedOnRole, bookingUpdater } from "../../../../features/axios/api/booking/booking";
import { toast } from "react-toastify";
import { findAllCars } from "../../../../features/axios/api/car/carAxios";
import { showCarInterface } from "../../../../types/carAdminInterface";
import { decodeToken } from "../../../../utils/tokenUtil";


const BookedCars = () => {

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [bookingInfo, setBookingInfo] = useState<detailBooking[] | detailBooking | null>(null)
    const [car, setCar] = useState<showCarInterface[] | null>(null)
    const [singleBooking, setSingleBooking]= useState<Partial<detailBooking> | null>(null)
    const [showModal, setShowModal] = useState(false)
    const {bookingId} = useParams<{bookingId: string}>()
    const token = localStorage.getItem('token') ?? ''
    console.log(bookingId)

    const fetchBookingDetail = async()=>{
        if(bookingId){
            const userId = await decodeToken(token).payload
            const partialDetail : Partial<detailBooking> = {
                userId: userId
            }
            const response = await bookingFindingBasedOnRole(partialDetail)
            console.log(response.data.data)
            let car;
            if(Array.isArray(response.data.data)){
                car = response.data.data.map((carData: detailBooking)=>carData.carId)
            }else{
                car = response.data.data
            }
            
            console.log("Recieved cars : ", car)
            setCar(car)
            setBookingInfo(response.data.data)
        } else {
            toast.error("no bookingId found")
        }        
    }
    
    const handleChange = async(e: ChangeEvent<HTMLTextAreaElement>)=>{
        const updateValues = e.target.value
        setSingleBooking((prevState)=>({
            ...prevState,
            issues: updateValues,
        }))
    }

    const submitIssue = async(bookingId: string)=>{
        setSingleBooking(PrevState=>({
            ...PrevState,
            _id: bookingId
        }))
        console.log("passing to backend")
        console.log(singleBooking)
        if(singleBooking && singleBooking.issues && singleBooking._id){
            const response = await bookingUpdater(singleBooking)
            if(response && 'message' in response)
                {
                    toast.error(response.message)
                } else {
                    toast.success("Booking issue successfully submitted! We will get back to you");
                }
                setSingleBooking(null)
        }
        console.log("no data found")
    }

    useEffect(()=>{
        fetchBookingDetail()
    }, [bookingId])
    
    return (
        <div className="container-fluid" style={{ paddingTop: '8rem' }}>
            <div className="main-contents">
                <div className="row">
                    <div className="col-4">
                        <div className="left-side-contents d-flex flex-column align-items-center">
                            <h3 className="mb-4" style={{ fontSize: "x-large" }}>Check bookings</h3>
                            <div className="timePickerContainer">
                                <h4 className="mb-3 font-text">Check by time</h4>
                                <div className="row">
                                    <div className="col-6">
                                        <input
                                            type='time'
                                            className="form-control-input"
                                        />
                                    </div>
                                    <div className="col-6">
                                        <input
                                            type='time'
                                            className="form-control-input"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 datePicker">
                                <h4 className="font-text">Check by date</h4>
                                <div className="calender">
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={date => setSelectedDate(date)}
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
                        {bookingInfo &&
                            (Array.isArray(bookingInfo) ? (
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
                                                    <Button variant="info" className="ms-5 mt-4">
                                                        view more
                                                    </Button>
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
                                                <Button variant="info" className="ms-5 mt-4">
                                                    view more
                                                </Button>
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

                            ))}
                    </div>

                </div>
            </div>
        </div>
        
    );
};

export default BookedCars;
