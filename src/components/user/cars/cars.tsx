import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import './cars.css';
import { BiSortDown, BiSortUp } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";
import CarCards from "../../commonComponent/cards/NormalCards/normalCards";
import { useLocation } from "react-router-dom";
import { bookingInterface } from "../../../types/bookingInterface";
import { findBookings } from "../../../features/axios/api/booking/booking";
import { toast } from "react-toastify";
import { detailBooking } from "../../../types/bookingInterface";
import { bookingHelper } from "../../../utils/bookingHelper";
import { showCarInterface } from "../../../types/carAdminInterface";
import { findAllCars } from "../../../features/axios/api/car/carAxios";
import { locationFinding } from "../../../features/axios/api/user/userAuthentication";
import { LocationSuggestion } from "../../../types/bookingInterface";
import { FaLocationArrow } from "react-icons/fa";
import { categoryInterface } from "../../../types/categoryInterface";
import { findAllCategory } from "../../../features/axios/api/category/category";


const Cars: React.FC = () => {

    const [suggestions, setSuggestions] = useState<LocationSuggestion[] | null>(null)
    const [bookingDetails, setBookingDetails] = useState<bookingInterface | null>(null)
    const [detailedBooking, setDetailedBooking] = useState<detailBooking[] | null>(null)
    const [selectedCars, setSelectedCars] = useState<showCarInterface[]>([])
    const [category, setCategory] = useState<categoryInterface[]>([])
    const [pickUpvalue, setpickUpValue] = useState('')
    const [dropOffvalue, setdropOffValue] = useState('')
    const currentDate = new Date().toISOString().split('T')[0];

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const bookingDataParams = searchParams.get("bookingData");
    // console.log(bookingDataParams)
    

    useEffect(()=>{
        const fetchCars = async()=>{
            const response : showCarInterface[] = await findAllCars('all', 'user')
            console.log("cars :",response)
            setSelectedCars(response)

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
                console.log("fetched data from backend : ", response.data)
                setDetailedBooking(response.data)
            }
            catch(error: any){
                toast.error(error.messsage)
            }
        }
        const findCategories = async()=>{
            try{
                const response = await findAllCategory()
                console.log("recieved response : ", response )
                setCategory(response)
            } catch(error){

            }
        }
        fetchBookings()
        findCategories()
    }, [])

    useEffect(()=>{
        console.log("helper running")
        const helper = async()=>{
            console.log(bookingDetails, detailedBooking)
            if(bookingDetails && detailedBooking){
                console.log("detailed booking : ", detailedBooking)
                const response = await bookingHelper(bookingDetails, detailedBooking, selectedCars)
                console.log("filtered Cars : ", response)
                if(response)setSelectedCars(response)
            }else{
        console.log("receiving details")
            }
            
        }
        helper()
    },[bookingDetails, detailedBooking])

    const locationFindings = async(value : string, mode: string)=>{
        const response = await locationFinding(value)
                const data : LocationSuggestion[] = response.data
                console.log("Map data : ", data)
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
        const filteredData = selectedCars.filter((car) => {
            if (car.category && typeof car.category === 'object' && '_id' in car.category && car.category._id?.toString() === categoryId) {
                return true;
            }
            return false;
        });
        console.log("filteredData : ", filteredData)
    
        setSelectedCars(filteredData); // start from here 
    };
    

    return (
        <div className="container-fluid full-container">
            <div className="contents">
                <div className="row">
                    <div className="col-4" style={{padding:'12px'}}>
                        <div className="left-contents">
                            <div className="row d-flex flex-column justify-content-center align-items-center">
                                <div className="col-12">
                                    <p className="font-text">Sort by Price :</p>
                                    <div className="d-flex justify-content-start align-items-start">
                                        <Button style={{height: '36px', width:'10rem'}}>
                                            <BiSortUp className="me-1" /> Low to High
                                        </Button>
                                        <Button className="ms-2">
                                            High to Low <BiSortDown className="ms-1" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="col-12 mt-2">
                                    <p className="font-text">Sort by Rating :</p>
                                    <div className="d-flex flex-column justify-content-start align-items-start">
                                        <div className="d-flex align-items-center mb-2">
                                            <input type="checkbox" className="me-2"/>
                                            <BsStarFill />
                                        </div>
                                        <div className="d-flex align-items-center mb-2">
                                            <input type="checkbox" className="me-2"/>
                                            <BsStarFill />
                                            <BsStarFill />
                                        </div>
                                        <div className="d-flex align-items-center mb-2">
                                            <input type="checkbox" className="me-2"/>
                                            <BsStarFill />
                                            <BsStarFill />
                                            <BsStarFill />
                                        </div>
                                        <div className="d-flex align-items-center mb-2">
                                            <input type="checkbox" className="me-2"/>
                                            <BsStarFill />
                                            <BsStarFill />
                                            <BsStarFill />
                                            <BsStarFill />
                                        </div>
                                        <div className="d-flex align-items-center mb-2">
                                            <input type="checkbox" className="me-2"/>
                                            <BsStarFill />
                                            <BsStarFill />
                                            <BsStarFill />
                                            <BsStarFill />
                                            <BsStarFill />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 mt-2">
                                    <p className="font-text">sort by Category :</p>
                                    <div className="d-flex justify-content-start align-items-start">
                                        {
                                            category && category!==null && category.map((categories)=>(
                                                <div>
                                                    <Button onClick={()=>categoryFilter(categories._id ? categories._id :'')} value={categories._id} variant="link">
                                                        {categories.name}
                                                    </Button>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="col-12 mt-2">
                                    <p className="font-text">Sort by Brand :</p>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="d-flex justify-content-start align-items-start">
                                                <Button variant="light" style={{width: "25%"}}>
                                                    Dodge
                                                </Button>
                                                <Button variant="light ms-3" style={{width: "25%"}}>
                                                    Dodge
                                                </Button>
                                                <Button variant="light ms-3" style={{width: "25%"}}>
                                                    Dodge
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 mt-2">
                                    <p className="font-text">Sort by Seats :</p>
                                    <div className="d-flex justify-content-start align-items-start">
                                        <div>
                                            <Button className="me-2" variant="light">
                                                1 Seater
                                            </Button>
                                            <Button className="me-2" variant="light">
                                                2 Seater
                                            </Button>
                                            <Button variant="light">
                                                3 Seater
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <div className="rightSide-content">
                            <div className="col-12">
                                <div className="right-top-contents d-flex justify-content-center align-items-center">
                                    <div className="col-2 d-flex justify-content-center">
                                        <input 
                                            type="date"
                                            value={bookingDetails?.startDate ? new Date(bookingDetails.startDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}       
                                            min={currentDate}
                                            onChange={(e)=>{const selectedDate = new Date(e.target.value)
                                                setBookingDetails({...bookingDetails, startDate: selectedDate})}}
                                        />
                                    </div>
                                    <div className="col-2 d-flex justify-content-center">
                                        <input 
                                            type="date"
                                            value={bookingDetails?.endDate ? new Date(bookingDetails.endDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                                            min={currentDate}
                                            onChange={(e)=>{const selectedDate = new Date(e.target.value)
                                                setBookingDetails({...bookingDetails, endDate: selectedDate})}}
                                        />
                                    </div>
                                    <div className="col-1 d-flex justify-content-center">
                                        <input 
                                            type="time" 
                                            value={bookingDetails?.pickupTime}
                                            onChange={(e)=>{
                                                const inputValue = e.target.value;
                                                const [hours, minutes] = inputValue.split(':'); 
                                                const formattedTime = `${hours}:${minutes || '00'}`;
                                                setBookingDetails({...bookingDetails, pickupTime: formattedTime})}}
                                        />
                                    </div>
                                    <div className="col-1 d-flex justify-content-center">
                                        <input 
                                            type="time"
                                            value={bookingDetails?.dropOffTime}
                                            onChange={(e)=>{
                                                const inputValue = e.target.value;
                                                const [hours, minutes] = inputValue.split(':');
                                                const formattedTime = `${hours}:${minutes || '00'}`;
                                                setBookingDetails({...bookingDetails, dropOffTime: formattedTime})}}
                                        />
                                    </div>
                                    <div className="col-3 d-flex justify-content-center position-relative">
                                        <input 
                                            type="text" 
                                            style={{ width: '120px' }} 
                                            placeholder="select Starting"
                                            value={bookingDetails?.pickupLocation}
                                            onChange={(e)=>locationFindings(e.target.value, 'pickup')}
                                        />
                                        {
                                            pickUpvalue && (
                                                <ul className="suggestion-list">
                                                    { Array.isArray(suggestions) && suggestions.map((place, index) => (
                                                        <li key={index} className="suggestion-item" onClick={()=>handleClick(place.name, 'pickup')}>
                                                            <span className="suggestion-text">{place.name}<strong>{place.name}</strong>
                                                            <br />
                                                            <small>{place.place_formatted}</small>
                                                            </span>
                                                            <FaLocationArrow className="suggestion-icon" />
                                                        </li>
                                                    ))}
                                                </ul>
                                            )
                                        }
                                    </div>

                                    <div className="col-1 d-flex justify-content-center position-relative">
                                        <input 
                                            type="text" 
                                            style={{ width: '120px' }} 
                                            placeholder="select ending"
                                            value={bookingDetails?.dropOffLocation}
                                            onChange={(e)=>locationFindings(e.target.value, 'dropoff')}
                                        />
                                        {
                                            dropOffvalue && (
                                                <ul className="suggestion-list">
                                                { Array.isArray(suggestions) && suggestions.map((place, index) => (
                                                    <li key={index} className="suggestion-item" onClick={()=>handleClick(place.name, 'dropoff')}>
                                                        <span className="suggestion-text">{place.name}<strong>{place.name}</strong>
                                                        <br />
                                                        <small>{place.place_formatted}</small>
                                                        </span>
                                                        <FaLocationArrow className="suggestion-icon" />
                                                    </li>
                                                ))}
                                            </ul>
                                            )
                                        }
                                    </div>
                                    {/* <div className="col-1 d-flex justify-content-center">
                                        <button onClick={handleSubmit} type="submit" className="btn btn-dark" style={{ width: '80px' }}>Submit</button>
                                    </div> */}
                                </div>
                            </div>

                                <div className="col-12 mt-4">
                                    <h5>Cars</h5>
                                    <div className="right-bottom-contents">
                                        <CarCards cars={selectedCars} bookings={bookingDetails}/>
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
