import React, { useEffect, useState } from "react";
import { Alert, Button, Dropdown } from "react-bootstrap";
import './cars.css';
import { BiSortDown, BiSortUp } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";
import CarCards from "../../commonComponent/cards/NormalCards/normalCards";
import { useLocation } from "react-router-dom";
import { findBookings } from "../../../features/axios/api/booking/booking";
import { toast } from "react-toastify";
import { bookingInterface, detailBooking } from "../../../types/bookingInterface";
import { bookingHelper } from "../../../utils/bookingHelper";
import { category, showCarInterface } from "../../../types/carAdminInterface";
import { findAllCars } from "../../../features/axios/api/car/carAxios";
import { locationFinding } from "../../../features/axios/api/user/userAuthentication";
import { LocationSuggestion } from "../../../types/bookingInterface";
import { FaExclamationTriangle, FaLocationArrow } from "react-icons/fa";
import { categoryInterface } from "../../../types/categoryInterface";
import { findAllCategory } from "../../../features/axios/api/category/category";

const Cars: React.FC = () => {
    const [suggestions, setSuggestions] = useState<LocationSuggestion[] | null>(null);
    const [bookingDetails, setBookingDetails] = useState<bookingInterface | null>(null);
    const [detailedBooking, setDetailedBooking] = useState<detailBooking[] | null>(null);
    const [selectedRatings, setSelectedRatings] = useState<number | null>(null); // Changed from Set<number> to number
    const [selectedCars, setSelectedCars] = useState<showCarInterface[]>([]);
    const [filteredCars, setFilteredCars] = useState<showCarInterface[]>([]);
    const [category, setCategory] = useState<categoryInterface[]>([]);
    const [seats, setSeats] = useState<Set<number>>(new Set());
    const [pickUpvalue, setpickUpValue] = useState('');
    const [dropOffvalue, setdropOffValue] = useState('');
    const currentDate = new Date().toISOString().split('T')[0];
    const [filterdCateg, setFilteredCateg] = useState<categoryInterface[]>([])
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const bookingDataParams = searchParams.get("bookingData");
    

    useEffect(()=>{
        const fetchCars = async()=>{
            const response : showCarInterface[] = await findAllCars('all', 'user')
            setSelectedCars(response)
            

            const carSeatsAvailable  = new Set<number>()
            response.forEach((car)=>{
                const seatString = car.seats ? car.seats?.toString() : ''
                const numberSeat = parseInt(seatString)
                if(!isNaN(numberSeat)){
                    carSeatsAvailable.add(numberSeat)
                }

            })


            setSeats(carSeatsAvailable)

            if (bookingDataParams) {
                const parsedData = JSON.parse(bookingDataParams);
                setBookingDetails(parsedData);
            }
        }
        fetchCars()
    },[bookingDataParams])

    useEffect(()=>{
        const fetchBookings = async()=>{
            try{
                const response = await findBookings('all')
                const data : detailBooking[] = response.data
                const validBooking = data.filter((booking)=>booking.status !== 'Cancelled')
                if(validBooking.length === 0){
                    setDetailedBooking(null)
                } else {
                    setDetailedBooking(response.data)
                }
                
            }
            catch(error: any){
                toast.error(error.messsage)
            }
        }
        
        fetchBookings()
        
    }, [])

    useEffect(() => {
        const findCategories = async () => {
            try {
                const response: categoryInterface[] = await findAllCategory();
    
                const carsCategoryIds: string[] = selectedCars
                    .map(car => (car.category as categoryInterface)?._id)
                    .filter(id => id !== null)
                    .map(id => id as string);
    
                const filteredCategories = response.filter(categ => categ._id && carsCategoryIds.includes(categ._id));
                const combinedCategories = [...category, ...filteredCategories];

                const uniqueCategories = Array.from(new Set(combinedCategories.map(category => category?._id)))
                    .map(id => combinedCategories.find(category => category?._id === id))
                    .filter(category => category !== undefined) as categoryInterface[];
    
                    
                setCategory(uniqueCategories);
            } catch (error: any) {
                toast.error(error.message);
            }
        };
    
        findCategories();
    }, [selectedCars]);
    

    useEffect(()=>{
        const helper = async()=>{
            if(bookingDetails && detailedBooking){
                const response = await bookingHelper(bookingDetails, detailedBooking, selectedCars)
                if(response){
                    
                    setSelectedCars(response)
                    setFilteredCars(response)
                }
            }else{
                
                setFilteredCars(selectedCars)
            }
            
        }
        helper()
    },[bookingDetails, detailedBooking])

    const locationFindings = async(value : string, mode: string)=>{
        const response = await locationFinding(value)
                const data : LocationSuggestion[] = response.data
                setSuggestions(data)
        if(mode ==='pickup')
            {
                setBookingDetails(PrevState=>({
                    ...PrevState,
                    pickupLocation:value
                }))
                setpickUpValue(value)
                
                
            } else {
                setBookingDetails(PrevState=>({
                    ...PrevState,
                    dropOffLocation:value
                }))
                setdropOffValue(value)
            }
    }


    const handleRatingChange = (rating: number) => {
        setSelectedRatings(prevRating => prevRating === rating ? null : rating);
    };

    const handleRatingFilter = () => {
        if (selectedRatings === null) {
            setSelectedCars(filteredCars);
        } else {
            const filteredCarsByRating = filteredCars.filter((car) => {
                const carRating = car.rating;
                if (carRating) {
                    return carRating >= selectedRatings;
                }
                return false;
            });
            setSelectedCars(filteredCarsByRating);
        }
    };
    

    useEffect(() => {
        handleRatingFilter();
    }, [selectedRatings]);
    

    const handleClick = (value: string, mode:string)=>{
        if(mode ==='pickup')
            {
                setBookingDetails(PrevState=>({
                    ...PrevState,
                    pickupLocation:value
                }))
                setpickUpValue('')
                setSuggestions([])
            } else {
                setBookingDetails(PrevState=>({
                    ...PrevState,
                    dropOffLocation:value
                }))
                setdropOffValue('')
                setSuggestions([])
            }
    }

    const categoryFilter = (categoryId: string) => {
        
        const filteredData = filteredCars.filter((car) => {
            if (car.category && typeof car.category === 'object' && '_id' in car.category && car.category._id?.toString() === categoryId) {
                return true;
            }
            return false;
        });
    
        setSelectedCars(filteredData);
    };

    const handleSeats = (num: number)=>{
        const filteredData = filteredCars.filter(car=>car.seats === num)
        setSelectedCars(filteredData)
    };
    const handleLH = () => {
        const sortedData = [...selectedCars].sort((a, b) => (a.rentPricePerDay ?? 0) - (b.rentPricePerDay ?? 0));
        setSelectedCars(sortedData);
    };

    const handleHL = ()=>{
        const sortedData = [...selectedCars].sort((a, b)=> (b.rentPricePerDay ?? 0) - (a.rentPricePerDay ?? 0))
        setSelectedCars(sortedData)
    };
    
    

    return (
        <div className="container-fluid full-container">
            <div className="contents">
                <div className="row" style={{marginTop:'4rem'}}>
                    <div className="col-lg-4 col-md-12" style={{padding:'12px'}}>
                        <div className="left-contents">
                            <div className="row d-flex flex-column justify-content-center align-items-center">
                                <div className="col-12">
                                    <p className="font-text">Sort by Price :</p>
                                    <div className="d-flex justify-content-start align-items-start">
                                        <Button onClick={handleLH} style={{height: '36px', width:'10rem'}}>
                                            <BiSortUp className="me-1" /> Low to High
                                        </Button>
                                        <Button onClick={handleHL} className="ms-2">
                                            High to Low <BiSortDown className="ms-1" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="col-12 mt-2">
                                    <p className="font-text">Sort by Rating :</p>
                                    <div className="d-flex flex-column justify-content-start align-items-start">
                                    {[1, 2, 3, 4, 5].map((star, index) => (
                                        <div key={index} className="d-flex align-items-center mb-2">
                                            <input
                                            type="radio"
                                            className="me-2"
                                            checked={selectedRatings === star}
                                            onChange={() => handleRatingChange(star)}
                                            />
                                            {[...Array(star)].map((_, starIndex) => (
                                            <BsStarFill key={starIndex} />
                                            ))}
                                        </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-12 mt-2">
                                    <p className="font-text">sort by Category :</p>
                                    <div className="d-flex justify-content-start align-items-start">
                                        {category && category !== null && category.map((categories, index) => (
                                            <div key={index}>
                                                <Button onClick={() => categoryFilter(categories._id ? categories._id : '')} value={categories._id} variant="link">
                                                    {categories.name}
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-12 mt-2">
                                    <p className="font-text">Sort by Seats :</p>
                                    <div className="d-flex justify-content-start align-items-start">
                                        <div>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="light" id="dropdown-basic">
                                                    Select Seats
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    {[...seats].map((num) => (
                                                        <Dropdown.Item key={num} onClick={() => handleSeats(num)}>
                                                            {num} Seater
                                                        </Dropdown.Item>
                                                    ))}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-12">
                        <div className="row">
                            <div className="rightSide-content">
                                <div className="col-12">
                                    <div className="right-top-contents d-flex justify-content-center align-items-center">
                                        <div className="col-4 col-md-2 d-flex justify-content-center pickup-date">
                                            <input
                                                type="date"
                                                value={bookingDetails?.startDate ? new Date(bookingDetails.startDate).toISOString().split('T')[0] : currentDate}
                                                min={currentDate}
                                                onChange={(e) => {
                                                    const selectedDate = new Date(e.target.value)
                                                    setBookingDetails({ ...bookingDetails, startDate: selectedDate })
                                                }}
                                            />

                                        </div>
                                        <div className="col-2 d-flex justify-content-center dropOffDate">
                                            <input
                                                type="date"
                                                value={bookingDetails?.endDate ? new Date(bookingDetails.endDate).toISOString().split('T')[0] : currentDate}
                                                min={currentDate}
                                                onChange={(e) => {
                                                    const selectedDate = new Date(e.target.value)
                                                    setBookingDetails({ ...bookingDetails, endDate: selectedDate })
                                                }}
                                            />
                                        </div>
                                        <div className="col-1 d-flex justify-content-center pickup-time">
                                            <input
                                                type="time"
                                                value={bookingDetails?.pickupTime}
                                                onChange={(e) => {
                                                    const inputValue = e.target.value;
                                                    const [hours, minutes] = inputValue.split(':');
                                                    const formattedTime = `${hours}:${minutes || '00'}`;
                                                    setBookingDetails({ ...bookingDetails, pickupTime: formattedTime })
                                                }}
                                            />
                                        </div>
                                        <div className="col-1 d-flex justify-content-center dropOfTime">
                                            <input
                                                type="time"
                                                value={bookingDetails?.dropOffTime}
                                                onChange={(e) => {
                                                    const inputValue = e.target.value;
                                                    const [hours, minutes] = inputValue.split(':');
                                                    const formattedTime = `${hours}:${minutes || '00'}`;
                                                    setBookingDetails({ ...bookingDetails, dropOffTime: formattedTime })
                                                }}
                                            />
                                        </div>
                                        <div className="col-3 d-flex justify-content-center position-relative">
                                            <input
                                                type="text"
                                                style={{ width: '120px' }}
                                                placeholder="select Starting"
                                                value={bookingDetails?.pickupLocation}
                                                onChange={(e) => locationFindings(e.target.value, 'pickup')}
                                            />
                                            {pickUpvalue && (
                                                <ul className="suggestion-list">
                                                    {Array.isArray(suggestions) && suggestions.map((place, index) => (
                                                        <li key={index} className="suggestion-item" onClick={() => handleClick(place.name, 'pickup')}>
                                                            <span className="suggestion-text">{place.name}<strong>{place.name}</strong>
                                                                <br />
                                                                <small>{place.place_formatted}</small>
                                                            </span>
                                                            <FaLocationArrow className="suggestion-icon" />
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        <div className="col-1 d-flex justify-content-center position-relative dropOff-val">
                                            <input
                                                type="text"
                                                style={{ width: '120px' }}
                                                placeholder="select ending"
                                                value={bookingDetails?.dropOffLocation}
                                                onChange={(e) => locationFindings(e.target.value, 'dropoff')}
                                            />
                                            {dropOffvalue && (
                                                <ul className="suggestion-list">
                                                    {Array.isArray(suggestions) && suggestions.map((place, index) => (
                                                        <li key={index} className="suggestion-item" onClick={() => handleClick(place.name, 'dropoff')}>
                                                            <span className="suggestion-text">{place.name}<strong>{place.name}</strong>
                                                                <br />
                                                                <small>{place.place_formatted}</small>
                                                            </span>
                                                            <FaLocationArrow className="suggestion-icon" />
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 mt-4">
                                    <h5>Cars</h5>
                                    <div className="right-bottom-contents">
                                        {selectedCars.length > 0 ? (
                                            <CarCards cars={selectedCars} bookings={bookingDetails}/>
                                        ) : (
                                            <div className="alert-container d-flex flex-column justify-content-center align-items-center mt-5">
                                                <FaExclamationTriangle className="exclamation-icon" style={{ width: '30%', height: 'auto' }} />
                                                <Alert variant="warning" className="alert-message">No cars found. But don't worry, we're still looking!</Alert>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Cars;

