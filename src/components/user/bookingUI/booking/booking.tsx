import React from "react";
import './booking.css';
import { FaArrowRight, FaCalendarAlt, FaCar, FaCarBattery, FaChair, FaCog, FaCogs, FaGasPump, FaMapMarkerAlt, FaTimes, FaTimesCircle } from "react-icons/fa";
import { BiCategory, BiTime } from "react-icons/bi";
import { Button } from "react-bootstrap";


const BookingUI = () => {
    return (
        <div className="container-fluid main-container" style={{ padding: "0px" }}>
            <div className="main-contents">
                <div className="row d-flex flex-column justify-content-center align-items-center">
                    <div className="col-12 position-relative" style={{padding:'0'}}>
                        <img
                            src="https://res.cloudinary.com/dlkrxem40/image/upload/v1714982583/Assets/page%20banners/wlgead61omjt2dx37xdz.png"
                            style={{ width: '100%', height: '34rem' }}
                            alt="Booking Banner"
                        />
                        <div className="overlay"></div>
                        <div className="text-overlay">
                            <h1 className="car-heading">Book Your Car</h1>
                            <p className="car-text">Explore our wide range of cars and find the perfect one for your next adventure.</p>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="contents">
                            <div className="row d-flex justify-content-center align-items-center">
                                <div className="col-6">
                                    <div className="left-contents">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <h4>Booking Details</h4>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                            <div className="image-content mt-4">
                                                <img
                                                src="https://res.cloudinary.com/dlkrxem40/image/upload/v1714982583/Assets/page%20banners/wlgead61omjt2dx37xdz.png"
                                                style={{ width: '100%', height: 'auto' }}
                                                alt="Car"
                                                />
                                            </div>
                                            </div>
                                            <div className="col-6">
                                            <div className="right-detail-content">
                                                <p className="text-center" style={{ fontFamily: 'Archivo', fontWeight: 'bolder' }}>Car name</p>
                                            </div>
                                            <div className="cars-details d-flex align-items-center">
                                                <div className="div-cars">
                                                <FaChair /> <strong>5 seater</strong>
                                                </div>
                                                <div className="div-cars">
                                                <BiCategory /> <strong>Category</strong>
                                                </div>
                                            </div>
                                                <div className="cars-details d-flex align-items-center mt-3">
                                                    <div className="div-cars">
                                                    <FaCar /> <strong>Brand</strong>
                                                    </div>
                                                    <div className="div-cars">
                                                    <FaGasPump /><strong>Fuel</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-4">
                                            <h5>Details</h5>
                                            <div className="col-md-12">
                                                <div className="d-flex justify-content-start align-items-start">
                                                    <p>Rating</p>: <strong>4.5</strong>
                                                </div>
                                                <div className="d-flex justify-content-center align-items-start">
                                            <div className="col-6">
                                                <strong>From</strong>
                                                <p>Pickup Location</p>
                                                <small>Date, Time</small>
                                            </div>
                                            <div className="col-6">
                                                <strong>To</strong>
                                                <p>Drop-off Location</p>
                                                <small>Date, Time</small>
                                            </div>
                                        </div>
                                            </div>
                                        </div>

                                        </div>

                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="rigth-contents">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="rightside-contents">
                                                <div>
                                                    <h4>Payment Details</h4>
                                                </div>
                                                <div className="row">
                                                <div className="contents d-flex flex-column align-items-center justify-content-center">
                                                        <strong>Price Summary</strong>
                                                        <div className="col-12 d-flex justify-content-between align-items-center mt-4">
                                                            <strong>Rent price:</strong> <span>price</span>
                                                        </div>
                                                        <div className="col-12 d-flex justify-content-between align-items-center mt-4">
                                                            <strong>Discount:</strong> <span>price %</span>
                                                        </div>
                                                        <hr className="col-12 mt-1" />
                                                        <div className="col-12 d-flex justify-content-between align-items-center mt-4">
                                                            <strong>Total :</strong> <span>Total Amount</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="rigth-contents">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="rightside-contents">
                                                <div>
                                                    <h4>Online Payment</h4>
                                                </div>
                                                <div className="row">
                                                <div className="contents d-flex flex-column align-items-center justify-content-center">  
                                                        <div className="col-12">
                                                            <img src="https://res.cloudinary.com/dlkrxem40/image/upload/v1715002718/others/t4tzk737jgilgpbb53mt.png" style={{width:'100%'}}/>
                                                        </div>
                                                        <div className="col-12 mt-4">
                                                            <p style={{fontSize:'12px', fontWeight:'500'}}>At RAC, we offer a seamless and secure online payment process to make booking your rental car hassle-free. With our encrypted payment gateway, you can confidently complete your transaction knowing that your personal and financial information is protected.</p>
                                                        </div>
                                                        <div className="col-12 mt-2">
                                                            <Button style={{width: '100%'}}>
                                                                Pay now
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingUI;
