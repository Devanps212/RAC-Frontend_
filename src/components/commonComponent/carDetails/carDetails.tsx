import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import './carDetails.css'
import { useLocation } from "react-router-dom";
import { findAllCars } from "../../../features/axios/api/car/carAxios";
import { toast } from "react-toastify";
import { carInterface, showCarInterface } from "../../../types/carAdminInterface";
import { categoryInterface } from "../../../types/categoryInterface";
import ImageSelector from "../ImageSelector/imageSelector";
import { bookingInterface } from "../../../types/bookingInterface";


const CarDetails = () => {

    const [car, setCar] = useState<showCarInterface>()
    const [category , setCategory] = useState<categoryInterface>()
    const [bigImg, setBigImg] = useState('')
    const [smallImg, setSmallImg] = useState<any[]>([])
    const navigate = useNavigate()


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const carId = searchParams.get('carId') ?? '';

    const bookingDetail = searchParams.get('bookingDetail')
    console.log("carId : ", carId)



    useEffect(()=>{
        const fetchCarData = async()=>{
            try
            {
                const response = await findAllCars(carId, 'user')
                setCar(response)
                setCategory(response.category)
                setBigImg(response.thumbnailImg)
                const combinedImages = [...response.exterior, ...response.interior]
                setSmallImg(combinedImages)

                console.log("fetched data : ",response)
            }
            catch(error:any)
            {
                toast.error(error.message)
            }
        }
        if(carId)
        {
            fetchCarData()
        }
    },[carId])

    const handleClick = (bigImg: string, smallestImg: string)=>{
        console.log("function working")
        const smallImgIndex = smallImg.findIndex(img=>img===bigImg)
        console.log("smallIndex : ", smallImgIndex)
        if(smallImgIndex !== -1)
            {
                console.log("smallIndex : ", smallImgIndex)
                setBigImg(bigImg)
                const newSmallImg = [...smallImg]
                newSmallImg[smallImgIndex] = smallestImg
                console.log("newImage : ", newSmallImg)
                setSmallImg(newSmallImg) 
            }
    }

    return (
        <>
        {
            car && (
                <div className="container" style={{ paddingTop: "7rem" }}>
                <div className="row">
                    <div className="col-2">
                        <div className="row d-flex flex-column justify-content-start align-items-start">
                            <div className="col tags">
                                <p>24/7 Service</p>
                            </div>
                            <div className="col tags">
                                <p>Flexible Rental Plans</p>
                            </div>
                            <div className="col tags">
                                <p>Wide Selection of Cars</p>
                            </div>
                            <div className="col tags">
                                <p>Online Booking</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <ImageSelector images={[bigImg, smallImg]} handleClick={handleClick}/>
                    </div>
                    <div className="col-4 d-flex flex-column justify-content-start align-items-start">
                        <h2>{car?.name}</h2>
                        <div className="specs mx-0 py-0">
                            <ul className="list-unstyled pt-3" style={{ textAlign: "start", paddingLeft: "0" }}>
                                <li><div className="star-rating mb-4">★★★★★</div></li>
                                <li className="Detail-List">Engine: <strong>{car?.engine}</strong></li>
                                <li className="Detail-List">Fuel: <strong>{car?.fuelType}</strong></li>
                                <li className="Detail-List">Seats: <strong>5</strong></li>
                                <li className="Detail-List">Transmission:<strong>{car?.transmission}</strong></li>
                                {car.owner && car.owner == 'Admin' ? (<li className="Detail-List">Owner: <strong>RAC(Company)</strong></li>) : (<li className="Detail-List">Owner: <strong>Partner(Third Party)</strong></li>)}
                                <li className="Detail-List">Category: <strong>{category && category.name}</strong></li>
                                <li className="mb-4">Mileage :<strong>{car?.mileage} km/hr</strong></li>
                                <li className="RPW">Rent/Week :<strong>₹ {car?.rentPricePerWeek}</strong></li>
                                <li className="RPD">Rent/Day :<strong>₹ {car?.rentPricePerDay}</strong></li>

                            </ul>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                        <button className="position-relative negotiate me-3" style={{ zIndex: 1 }}>
                            <FaLock className="position-absolute top-50 start-50 translate-middle" style={{ transform: "translate(-50%, -50%)" }} />
                            <span className="position-relative" style={{filter: "blur(1.5px)", zIndex: 2 }}>Negotiate</span>
                        </button>
                        <Link to={`/users/bookingUI?carId=${car._id}&bookingDetail=${bookingDetail}`}>
                        <button className="book-now">Book now</button>
                        </Link>
                            
                        </div>
                    </div>
                </div>
                <div className="row">
                <div className="col-6 detailed-specs mb-4 mt-5">
                    <h2>Description</h2>
                    <p style={{textAlign:"justify"}}>{car?.description}</p>
                </div>
                <div className="col-5 d-flex flex-column mb-5 mt-5 ms-2">
                    {car && car.comments && car.comments.length > 0 ? (<h2>Reviews</h2>) : (<h2>No Reviews</h2>)}
                    {
                        car && car.comments && car.comments.length > 0 ? (
                            car.comments.map((carData, index)=>(
                                <>
                                <div className="review-wrapper" key={index}>
                                <div className="d-flex align-items-center">
                                    {carData.userId.profilePic ? <img src={carData.userId.profilePic} alt="Sample Image" style={{ borderRadius: "10px", width: "4%" }} /> : <img src="https://via.placeholder.com/150" alt="Sample Image" style={{ borderRadius: "10px", width: "10%" }} />}
                                        <div className="col">
                                            <h5 style={{ marginLeft: "10px" }}>{carData.userId.name}</h5>
                                            <strong style={{ marginLeft: "10px" }}>{carData.userRating}</strong>
                                        </div>
                                </div>
                                <div className="col">
                                    <p style={{textAlign:"justify"}}>{carData.comment}</p>
                                </div>
                                </div>
                                </>
                            ))
                        ) : (
                            <>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                            <img
                            src="https://res.cloudinary.com/dlkrxem40/image/upload/v1714048543/Assets/Icons/no-speak_y1prfb.png"
                            alt="No Reviews"
                            style={{ width: "35%", marginTop:"12px" }}
                            />
                            </div>
                            </>
                        )
                    }
                    {
                        car && car.comments && car.comments.length > 0 &&
                        <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "2rem" }}>
                            <button className="hover-border-7 text-decoration-none">View All Reviews</button>
                        </div>
                    }
                        
    
    
                 </div>
               </div>
    
            </div>
            )
        }
        </>
        

    );
}

export default CarDetails;
