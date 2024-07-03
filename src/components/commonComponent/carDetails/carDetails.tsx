import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaRegStar, FaStar } from "react-icons/fa";
import './carDetails.css'
import Skeleton from "react-loading-skeleton";
import { useLocation } from "react-router-dom";
import { findAllCars } from "../../../features/axios/api/car/carAxios";
import { toast } from "react-toastify";
import { commentsInterface, showCarInterface } from "../../../types/carAdminInterface";
import { categoryInterface } from "../../../types/categoryInterface";
import ImageSelector from "../ImageSelector/imageSelector";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/axios/redux/reducers/reducer";
import { decodeToken } from "../../../utils/tokenUtil";
import { userInterface } from "../../../types/userInterface";
import { findUser } from "../../../features/axios/api/user/user";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";



const CarDetails = () => {

    const [car, setCar] = useState<showCarInterface | null>(null);
    const [user, setUser] = useState<userInterface | null>(null);
    const [category , setCategory] = useState<categoryInterface | null>(null);
    const [bigImg, setBigImg] = useState<string>('');
    const [smallImg, setSmallImg] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const userToken = useSelector((root: RootState)=>root.token.token) ?? '';
    const [fullComment, setFullComment] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const [comments, setComments] = useState<commentsInterface[] | []>([])
    const searchParams = new URLSearchParams(location.search);
    const carId = searchParams.get('carId') ?? '';
    const rating = Array(5).fill(0)

    const placement = 'bottom'

    const bookingDetail = searchParams.get('bookingDetail');


    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const userId = await decodeToken(userToken).payload;
                const findUsers = await findUser(userId);
                setUser(findUsers.data);
                const response = await findAllCars(carId, 'user');
                
                setCar(response);
                setCategory(response.category);
                setComments(response.comments)
                setBigImg(response.thumbnailImg);
                const combinedImages = [...response.exterior, ...response.interior];
                setSmallImg(combinedImages);
                setLoading(false);
            } catch (error: any) {
                toast.error(error.message);
            }
        };

        if (carId) {
            fetchCarData();
        }
    }, [carId, userToken]);


    const handleClick = (bigImg: string, smallestImg: string) => {
        const smallImgIndex = smallImg.findIndex(img => img === bigImg);
        if (smallImgIndex !== -1) {
            setBigImg(bigImg);
            const newSmallImg = [...smallImg];
            newSmallImg[smallImgIndex] = smallestImg;
            setSmallImg(newSmallImg);
        }
    };
    return (
        <>
            {loading ? (
                <div className="container" style={{ paddingTop: "7rem" }}>
                    <div className="row">
                        <div className="col-2">
                            <div className="row d-flex flex-column justify-content-start align-items-start">
                                <div className="col tags">
                                    <Skeleton height={30} />
                                </div>
                                <div className="col tags">
                                    <Skeleton height={30} />
                                </div>
                                <div className="col tags">
                                    <Skeleton height={30} />
                                </div>
                                <div className="col tags">
                                    <Skeleton height={30} />
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <Skeleton height={400} />
                        </div>
                        <div className="col-4 d-flex flex-column justify-content-start align-items-start">
                            <Skeleton height={30} width={200} />
                            <div className="specs mx-0 py-0">
                                <ul className="list-unstyled pt-3" style={{ textAlign: "start", paddingLeft: "0" }}>
                                    <li><Skeleton height={20} width={100} /></li>
                                    <li className="Detail-List"><Skeleton height={20} width={100} /></li>
                                    <li className="Detail-List"><Skeleton height={20} width={100} /></li>
                                    <li className="Detail-List"><Skeleton height={20} width={100} /></li>
                                    <li className="Detail-List"><Skeleton height={20} width={100} /></li>
                                    <li className="Detail-List"><Skeleton height={20} width={100} /></li>
                                    <li className="Detail-List"><Skeleton height={20} width={100} /></li>
                                    <li className="mb-4"><Skeleton height={20} width={100} /></li>
                                    <li className="RPW"><Skeleton height={20} width={100} /></li>
                                    <li className="RPD"><Skeleton height={20} width={100} /></li>
                                </ul>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                                <Skeleton height={40} width={120} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 detailed-specs mb-4 mt-5">
                            <Skeleton height={30} width={200} />
                            <Skeleton count={3} />
                        </div>
                        <div className="col-5 d-flex flex-column mb-5 mt-5 ms-2">
                            <Skeleton height={30} width={200} />
                            <Skeleton count={2} />
                        </div>
                    </div>
                </div>
            ) : (
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
                            <ImageSelector images={[bigImg, smallImg]} handleClick={handleClick} />
                        </div>
                        <div className="col-4 d-flex flex-column justify-content-start align-items-start">
                            <h2>{car?.name}</h2>
                            <div className="specs mx-0 py-0">
                                <ul className="list-unstyled pt-3" style={{ textAlign: "start", paddingLeft: "0" }}>
                                    <li>
                                    <div className="star-rating mb-4">
                                        {car && car.rating !== undefined && rating.map((_, index) => (
                                            <span key={index}>
                                            {index < Number(car.rating) ? <FaStar /> : <FaRegStar/>}
                                            </span>
                                        ))}
                                        </div>
                                    </li>
                                    <li className="Detail-List">Engine: <strong>{car?.engine}</strong></li>
                                    <li className="Detail-List">Fuel: <strong>{car?.fuelType}</strong></li>
                                    <li className="Detail-List">Seats: <strong>5</strong></li>
                                    <li className="Detail-List">Transmission:<strong>{car?.transmission}</strong></li>
                                    {car && car.owner && car.owner === 'Admin' ? (<li className="Detail-List">Owner: <strong>RAC(Company)</strong></li>) : (<li className="Detail-List">Owner: <strong>Partner(Third Party)</strong></li>)}
                                    <li className="Detail-List">Category: <strong>{category?.name}</strong></li>
                                    <li className="mb-4">Mileage :<strong>{car?.mileage} km/hr</strong></li>
                                    <li className="RPW">Rent/Week :<strong>₹ {car?.rentPricePerWeek}</strong></li>
                                    <li className="RPD">Rent/Day :<strong>₹{
                                        car?.offer?.price ? car?.offer?.price : car?.rentPricePerDay
                                    }</strong></li>
                                </ul>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                                {user && user.refund && user.refund.length === 0 ? (
                                    <button className="position-relative negotiate me-3" style={{ zIndex: 1 }}>
                                        <FaLock className="position-absolute top-50 start-50 translate-middle" style={{ transform: "translate(-50%, -50%)" }} />
                                        <span className="position-relative" style={{ filter: "blur(1.5px)", zIndex: 2 }}>Negotiate</span>
                                    </button>
                                ) : (
                                    car && car.owner === 'Admin' ? (
                                        <OverlayTrigger
                                            key={placement}
                                            placement={placement}
                                            overlay={
                                                <Tooltip id={`tooltip-${placement}`}>
                                                    Car owned by Admin. Chat not available.
                                                </Tooltip>
                                            }
                                        >
                                            <button className="position-relative negotiate me-3" style={{ zIndex: 1 }}>
                                                <FaLock className="position-absolute top-50 start-50 translate-middle" style={{ transform: "translate(-50%, -50%)" }} />
                                                <span className="position-relative" style={{ filter: "blur(1.5px)", zIndex: 2 }}>Chat</span>
                                            </button>
                                        </OverlayTrigger>
                                    ) : (
                                        <>
                                            {user && user.refund && user.refund.length === 0 ? (
                                                <OverlayTrigger
                                                    key={placement}
                                                    placement={placement}
                                                    overlay={
                                                        <Tooltip id={`tooltip-${placement}`}>
                                                            Please rent a car first to access Chat.
                                                        </Tooltip>
                                                    }
                                                >
                                                    <button className="negotiate me-3" style={{ zIndex: 1 }}>
                                                        <span className="position-relative">Chat</span>
                                                    </button>
                                                </OverlayTrigger>
                                            ): (
                                                <Link to={`/negotiate/${user?._id}/${car?.addedById}/${car?._id}`} style={{ textDecoration: 'none' }}>
                                                    <button className="negotiate me-3" style={{ zIndex: 1 }}>
                                                        <span className="position-relative">Negotiate</span>
                                                    </button>
                                                </Link>
                                            )}
                                        </>
                                    ))}
                                <Link to={`/bookingUI?carId=${car?._id}&bookingDetail=${bookingDetail}`}>
                                    <button className="book-now">Book now</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 detailed-specs mb-4 mt-5">
                            <h2>Description</h2>
                            <p style={{ textAlign: "justify" }}>{car?.description}</p>
                        </div>
                        <div className="col-5 d-flex flex-column mb-5 mt-5 ms-2">
                            <h2>{car && car.comments && car.comments.length > 0 ? 'Reviews' : 'No Reviews'}</h2>
                            {car && car.comments && car.comments.length > 0 ? (
                                car.comments.slice(0, 2).map((carData, index) => (
                                    <div className="review-wrapper mt-2 mb-2" key={index}>
                                        <div className="d-flex align-items-center">
                                            {carData.userId.profilePic ? <img src={typeof carData.userId.profilePic === 'string' ? carData.userId.profilePic : URL.createObjectURL(carData.userId.profilePic)} alt="Profile" style={{ borderRadius: "10px", width: "8%" }} /> : <img src="https://via.placeholder.com/150" alt="Profile" style={{ borderRadius: "10px", width: "10%" }} />}
                                            <div className="col">
                                                <h5 style={{ marginLeft: "10px" }}>{carData.userId.name}</h5>
                                                <strong style={{ marginLeft: "10px" }}>
                                                {
                                                        Array.from({length: 5}, (_, i)=>(
                                                            <span key={i}>
                                                                {
                                                                    i < carData.userRating ? <FaStar style={{color:'black'}}/> : <FaRegStar/>
                                                                }
                                                            </span>
                                                        ))
                                                    }
                                                </strong>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <p style={{ textAlign: "justify" }}>{carData.comment}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <img
                                        src="https://res.cloudinary.com/dlkrxem40/image/upload/v1714048543/Assets/Icons/no-speak_y1prfb.png"
                                        alt="No Reviews"
                                        style={{ width: "35%", marginTop: "12px" }}
                                    />
                                </div>
                            )}
                            {car && car.comments && car.comments.length > 0 &&
                                <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "2rem" }}>
                                    <button className="hover-border-7 text-decoration-none" onClick={()=>setFullComment(true)}>View All Reviews</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            )}
             <Modal show={fullComment} onHide={()=>setFullComment(false)} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Reviews</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                {comments.map((comment, index) => (
                <div className="review-wrapper mt-2 mb-2" key={index}>
                    <div className="d-flex align-items-center">
                    {comment.userId.profilePic ? (
                        <img
                        src={
                            typeof comment.userId.profilePic === 'string'
                            ? comment.userId.profilePic
                            : URL.createObjectURL(comment.userId.profilePic)
                        }
                        alt="Profile"
                        style={{ borderRadius: '10px', width: '4%' }}
                        />
                    ) : (
                        <img
                        src="https://via.placeholder.com/150"
                        alt="Profile"
                        style={{ borderRadius: '10px', width: '10%' }}
                        />
                    )}
                    <div className="col">
                        <h5 style={{ marginLeft: '10px' }}>{comment.userId.name}</h5>
                        <strong className="star-rating-item" style={{marginLeft:'10px'}}>
                            {
                                Array.from({length: 5}, (_, i)=>(
                                    <span key={i}>
                                        {
                                            i < comment.userRating ? <FaStar style={{color:'black'}}/> : <FaRegStar/>
                                        }
                                    </span>
                                ))
                            }
                        </strong>
                        <br/>
                        <strong style={{ marginLeft: '10px' }}>{comment.comment}</strong>
                    </div>
                    </div>
                </div>
                ))}
            </Modal.Body>
            </Modal>
        </>
    );
}

export default CarDetails;
