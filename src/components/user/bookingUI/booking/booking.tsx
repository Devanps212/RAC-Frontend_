import React, { ChangeEvent, useEffect, useState } from "react";
import './booking.css';
import { FaCar, FaChair, FaGasPump } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { findAllCars } from "../../../../features/axios/api/car/carAxios";
import { showCarInterface } from "../../../../types/carAdminInterface";
import { categoryInterface } from "../../../../types/categoryInterface";
import { bookingInterface } from "../../../../types/bookingInterface";
import { loadStripe } from '@stripe/stripe-js'
import { bookingPaymentUI } from "../../../../features/axios/api/booking/booking";
import { decodeToken } from "../../../../utils/tokenUtil";
import { toast } from "react-toastify";
import { couponInterface } from "../../../../types/couponInterface";
import { useSelector } from "react-redux";
import { RootState } from "../../../../features/axios/redux/reducers/reducer";
import { applyCoupon } from "../../../../features/axios/api/coupon/coupon";

const BookingUI = () => {

    const location = useLocation()
    const [car, setCar] = useState<showCarInterface>({} as showCarInterface)
    const [category, setCategory] = useState<categoryInterface>()
    const [bookings, setBookings] = useState<bookingInterface | null>(null)
    const [coupon, setCoupon] = useState<Partial<couponInterface>| null>(null)
    const [recievedCoupon, setRecievedCoupon] = useState<Partial<couponInterface | null>>(null)
    const searchParams = new URLSearchParams(location.search)
    const carId = searchParams.get('carId')
    const bookingDetail = searchParams.get('bookingDetail')
    let parsedBooking : bookingInterface | null = null;
    const userPayload = useSelector((root: RootState)=>root.token.token)
    if (bookingDetail) {
        try {
        parsedBooking = JSON.parse(bookingDetail);
        console.log(parsedBooking)
        
        } catch (error) {
        console.error('Error parsing booking detail:', error);
        }
    }
    console.log(carId)

    useEffect(() => {
        const fetchCar = async () => {
            if (carId !== null) {
                const response = await findAllCars(carId, 'user');
                console.log(response);
                setCar(response);
                setCategory(response.category);
                if(parsedBooking?.startDate && parsedBooking.endDate && response.rentPricePerDay){
                    const startDate = new Date(parsedBooking.startDate)
                    const endDate = new Date(parsedBooking.endDate)
                    const durationInDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
                    let amount: number;
                    let discount: number;
                    let total : number;
                    let updatedBooking;
                    if(response.offer.price && response.offer.discount){
                        amount = durationInDays * response.offer.price;
                        discount = response.offer.discount
                        total = parseFloat(amount.toFixed(2))
                            
                    } else {
                        amount = durationInDays * response.rentPricePerDay;
                        discount = 0;
                        total = parseFloat(amount.toFixed(2))

                    }
                    updatedBooking = {...parsedBooking, amount, total, discount}

                    setBookings(updatedBooking)

                    
                } else {
                    toast.error("no start date or end date not found")
                }
                
            }
        };
        fetchCar();
    }, []);


    const handlePayNow  = async()=>{
        const stripe = await loadStripe('pk_test_51PDiVJSFg3h3pm8hFZ9xw2Duq8djIUTp0t5I6M5yMguU8KpIdUnUt0epBFvTkOx0jWV3NWOQkE402iZat4c2JX8P00Hl0S8Igy');
        const token = localStorage.getItem('token') ?? ''
        const userId = await decodeToken(token).payload
        const bookingPayment = await bookingPaymentUI(bookings, car._id, userId)
        
        console.log(bookingPayment)
        const result = await stripe?.redirectToCheckout({
            sessionId: bookingPayment
        });
        // if(result){
        //     const bookings = await findAllCars('all', 'user')
        //     console.log(bookings)
        // } else
        // {
        //     toast.success(result)
        // }
    }

    const handleApplyCoupon = async()=>{
        try{
        const userToken = userPayload
        const userId = await decodeToken(userToken as string).payload
        console.log(userId)
        if(coupon && coupon.coupon){
            const apply = await applyCoupon(coupon.coupon, userId)
            if(apply.status === "failed" ){
                toast.error(apply.data.message)
            } else {
                const coupon = apply.data
                if (coupon.length > 0) {
                    const couponObject = coupon[0];
                    setRecievedCoupon(couponObject)
                    const discountAmount = bookings?.amount ? (bookings.amount * (couponObject.discountData.percentage / 100)) : 0;
                    const newTotal = bookings?.amount ? bookings.amount - discountAmount : 0;
                    setBookings({
                        ...bookings,
                        discount: couponObject.discountData.percentage,
                        total: newTotal
                    });
                  } else {
                    toast.error("No data found in apply.data");
                  }
            }
        }
    }catch(error: any){
        console.log(error.message)
        toast.error(error.message)
    }
        
    }

    useEffect(()=>{
        console.log(recievedCoupon)
    }, [recievedCoupon])

    const handleCouponChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCoupon({ ...coupon, coupon: e.target.value });
      };
    
    

    return (
        <div className="container-fluid main-container" style={{ padding: "0px" }}>
            <div className="main-content-parts">
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
                                                src={car.thumbnailImg}
                                                style={{ width: '100%', height: 'auto' }}
                                                alt="Car"
                                                />
                                            </div>
                                            </div>
                                            <div className="col-6">
                                            <div className="right-detail-content">
                                                <p className="text-center" style={{ fontFamily: 'Archivo', fontWeight: 'bolder' }}>{car.name}</p>
                                            </div>
                                            <div className="cars-details d-flex align-items-center">
                                                <div className="div-cars">
                                                <FaChair /> <strong>{car.seats} seater</strong>
                                                </div>
                                                <div className="div-cars">
                                                <BiCategory /> <strong>{category?.name}</strong>
                                                </div>
                                            </div>
                                                <div className="cars-details d-flex align-items-center mt-3">
                                                    <div className="div-cars">
                                                    <FaCar /> <strong>{car.mileage} per ltr</strong>
                                                    </div>
                                                    <div className="div-cars">
                                                    <FaGasPump /><strong>{car.fuelType}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-4">
                                            <h5>Details</h5>
                                            <div className="col-md-12">
                                                <div className="d-flex justify-content-start align-items-start">
                                                    <p>Rating</p>: <strong>{car.rating}</strong>
                                                </div>
                                                <div className="d-flex justify-content-center align-items-start">
                                            <div className="col-6">
                                                <strong>From</strong>
                                                <p>{bookings?.pickupLocation}</p>
                                                <small>{bookings?.startDate ? new Date(bookings.startDate).toISOString().split('T')[0] : ''}, {bookings?.pickupTime}</small>
                                            </div>
                                            <div className="col-6">
                                                <strong>To</strong>
                                                <p>{bookings?.dropOffLocation}n</p>
                                                <small>{bookings?.endDate ? new Date(bookings.endDate).toISOString().split('T')[0] : ''}, {bookings?.dropOffTime}</small>
                                            </div>
                                        </div>
                                            </div>
                                        </div>

                                        </div>

                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="right-contents">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="rightside-contents">
                                                <div>
                                                    <h4>Payment Details</h4>
                                                </div>
                                                <div className="row">
                                                    <div className="contents d-flex flex-column align-items-center justify-content-center">
                                                        <strong>Price Summary</strong>
                                                        <div className="col-12 d-flex justify-content-between align-items-center mt-4">
                                                            <strong>Rent price:</strong> <span>₹ {bookings?.amount}</span>
                                                        </div>
                                                        <div className="col-12 d-flex justify-content-between align-items-center mt-4">
                                                            <strong>Discount:</strong> <span>{bookings?.discount} %</span>
                                                        </div>
                                                        <hr className="col-12 mt-1" />
                                                        <div className="col-12 d-flex justify-content-between align-items-center mt-4">
                                                            <strong>Total :</strong> <span>₹ {bookings?.total}</span>
                                                        </div>
                                                        <div className="col-12 mt-4">
                                                            <input
                                                                type="text"
                                                                placeholder="Enter coupon code"
                                                                value={coupon?.coupon}
                                                                onChange={handleCouponChange}
                                                                className="form-control"
                                                            />
                                                            <Button
                                                                onClick={handleApplyCoupon}
                                                                style={{ width: '100%', marginTop: '10px' }}
                                                            >
                                                                Apply Coupon
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="right-contents">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="rightside-contents">
                                                <div>
                                                    <h4>Online Payment</h4>
                                                </div>
                                                <div className="row">
                                                <div className="contents-parts d-flex flex-column align-items-center justify-content-center">  
                                                        <div className="col-12">
                                                            <img src="https://res.cloudinary.com/dlkrxem40/image/upload/v1715002718/others/t4tzk737jgilgpbb53mt.png" style={{width:'100%'}}/>
                                                        </div>
                                                        <div className="col-12 mt-4">
                                                            <p style={{fontSize:'12px', fontWeight:'500'}}>At RAC, we offer a seamless and secure online payment process to make booking your rental car hassle-free. With our encrypted payment gateway, you can confidently complete your transaction knowing that your personal and financial information is protected.</p>
                                                        </div>
                                                        <div className="col-12 mt-2">
                                                            <Button onClick={handlePayNow} style={{width: '100%'}}>
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
