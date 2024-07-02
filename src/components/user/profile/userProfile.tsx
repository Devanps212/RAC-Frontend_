import React, { useEffect, useState } from "react";
import './userprofile.css'
import UserDetails from "../../commonComponent/profileComponents/userDetails/userDetails";
import EditUser from "../../commonComponent/profileComponents/editUser/editUser";
import AddDetails from "../../commonComponent/profileComponents/addDetails/addDetails";
import { decodeToken } from "../../../utils/tokenUtil";
import { findUser, saveUserDetails } from "../../../features/axios/api/user/user";
import { userDetailPayload } from "../../../types/payloadInterface";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/axios/redux/reducers/reducer";
import { detailBooking } from "../../../types/bookingInterface";
import { bookingFindingBasedOnRole } from "../../../features/axios/api/booking/booking";
import { showCarInterface } from "../../../types/carAdminInterface";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { Button } from "react-bootstrap";
import CouponComponent from "../../commonComponent/coupons/coupons";
import { userInterface } from "../../../types/userInterface";
import { couponInterface } from "../../../types/couponInterface";
import { findAllCategory } from "../../../features/axios/api/category/category";
import { categoryInterface } from "../../../types/categoryInterface";
import { Types } from "mongoose";
import ImageCropper from "../../commonComponent/imageCropper/imageCropper";


const UserProfile = () => {
    
    const [showEditUser, setShowEditUser] = useState(false);
    const [userData, setUserData] = useState<userDetailPayload | null>(null)
    const [bookings, setBookings] = useState<detailBooking[]>()
    const [showLoad, setShowLoad] = useState(false)
    const [uniqueCars, setUniqueCars] = useState<showCarInterface>()
    const [userCoupons, setUserCoupons] = useState<couponInterface[] | null>(null);
    const [showComponent, setShowComponent] = useState(true)
    const [luxuryRental, setLuxuryRental] = useState<number>(0)
    const tokenPayload = useSelector((root: RootState)=> root.token.token) ?? ''
    const [image, setImage] = useState<string | null>(null)
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [showCropper, setShowCropper] = useState(false);

    const toggleEditUser = () => {
        setShowEditUser((prevShowEditUser) => !prevShowEditUser);
    };

    const [isOn, setIsOn] = useState(false);

    const toggleSwitch = () => {
        setIsOn(!isOn);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        let files = e.target.files;
        if(files && files.length > 0){
            const reader = new FileReader()
            reader.onload = () => {
                setImage(reader.result as string)
                setShowCropper(true)
            }
            reader.readAsDataURL(files[0])
        }
    }

    const handleCroppedImage = (file : File) => {

        setCroppedImage(URL.createObjectURL(file))
        const event = {
            target: { files: [file] } as unknown as HTMLInputElement, 
        } as React.ChangeEvent<HTMLInputElement>
        handleImageUpload(event);
        setShowCropper(false)
    }


    const findBookings = async()=>{
        try{
            const userId = await decodeToken(tokenPayload).payload

            const data : Partial<detailBooking> = {
                userId:userId
            }
            
            const bookings = await bookingFindingBasedOnRole(data)
            const bookingDetail : detailBooking[] = bookings.data.data
            
            let categ: string[];
            if (Array.isArray(bookingDetail)) {
                categ = bookingDetail.map((booking) => {
                  const category = booking.carId.category;
                  if (typeof category === 'string') {
                    return category;
                  } else if (category instanceof Types.ObjectId) {
                    return category.toString();
                  } else {
                    return '';
                  }
                }).filter(Boolean);
              }
            const findCategory :categoryInterface[] = await findAllCategory()
            const matchedCateg = findCategory.filter((category)=>categ.includes(category._id!))
            const luxuryrentalsLength = matchedCateg.length
            console.log("luxury rental : ", matchedCateg)
            console.log("length : ", luxuryrentalsLength);
            
            setBookings(bookingDetail)
            setLuxuryRental(luxuryrentalsLength)
            
        }catch(error: any){
            toast.error(error)
        }

    }
    const findCoupons = async () => {
        try {
            const userId = await decodeToken(tokenPayload).payload;
            const data = await findUser(userId);

            const user : userInterface = data.data
            
            const coupons = user.coupons?.map(coupon => typeof coupon === 'string' ? { coupon } as couponInterface : coupon) ?? [];
            
            setUserCoupons(coupons);
        } catch (error: any) {
            toast.error(error.message);
        }
    };
    const findCars = async()=>{
        try{
            if (bookings && bookings.length > 0) {

                const carCountMap = bookings.reduce((countMap, booking) => {
                    const carId = booking.carId._id as string;
                    countMap.set(carId, (countMap.get(carId) || 0) + 1);
                    return countMap;
                }, new Map<string, number>());


                let mostCommonCarId = '';
                let maxCount = 0;

                carCountMap.forEach((count, carId) => {
                    if (count > maxCount) {
                        maxCount = count;
                        mostCommonCarId = carId;
                    }
                });

               
                const mostCommonCars = bookings.filter(booking => booking.carId._id === mostCommonCarId);

                const uniqueMostCommonCars = Array.from(new Set(mostCommonCars.map(booking => booking.carId)));
            
                setUniqueCars(uniqueMostCommonCars[0])

            } else {
                console.log('No bookings available or bookings is empty.');
            }

        } catch(error: any){
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        findCars()
    }, [bookings])

    const userFinding = async()=>{
        
        const token = await decodeToken(tokenPayload ?? '').payload

        const userFindings = await findUser(token)
        
        setUserData(userFindings.data)
    }

    const isUserDataComplete = (data: userDetailPayload | null): boolean => {
        if (!data) return false;
        return (
            data.mobile == undefined&&
            (data.DL == undefined || data.DL == '') &&
            data.gender == undefined&&
            (data.address == undefined || data.address == '') &&
            (data.city == undefined || data.city == '')
        );
    };

    const handleUpdateUserData = (updatedData: Partial<userDetailPayload>) => {
        setUserData((prevUserData) => {
            if (!prevUserData) return null;
            return {
                ...prevUserData,
                ...updatedData,
                name: updatedData.name ?? prevUserData.name,
                email: updatedData.email ?? prevUserData.email,
                mobile: updatedData.mobile ?? prevUserData.mobile,
                DL: updatedData.DL ?? prevUserData.DL,
                gender: updatedData.gender ?? prevUserData.gender,
                address: updatedData.address ?? prevUserData.address,
                city: updatedData.city ?? prevUserData.city,
            };
        });
    }
    
    const handleImageUpload = async(e: React.ChangeEvent<HTMLInputElement>)=>{
        setShowLoad(true)
        const file = e.target.files?.[0]
        console.log(file)
        if(file){
            const formData = new FormData()
            formData.append('profilePic', file)
            formData.append('name', userData?.name ?? '')
            formData.append('_id', userData?._id ?? '')
            
            const userSave = await saveUserDetails(formData)
            console.log("profile updated :", userSave)
            if (userSave.data.status === "success" && userData) {
                userData.profilePic = userSave.data.data.profilePic;
                
                toast.success("userProfile updated successfully")
                setShowLoad(false)
            } else {
                toast.error("Profile picture Upload failed")
                setShowLoad(false)
            }
            
            console.log("user saved : ", userSave)
        }
    }
    

    useEffect(()=>{
        userFinding()
        findBookings()
        findCoupons()
    }, [])

    return (
        <>
            <div className="container-fluid" style={{ paddingTop: '5rem' }}>
                {showCropper && (
                    <ImageCropper image={image!} onCrop={handleCroppedImage} onClose={() => setShowCropper(false)}/>
                )}
                <div className="row d-flex flex-column justify-content-center align-items-center min-vw100">
                    <div className="contents mt-5">
                        <div className="col-12">
                        <div className="d-flex justify-content-center position-relative">
                            <div className="profile-img-container">
                                {croppedImage ? (
                                    <img src={croppedImage} className="profile-img" alt="Profile" />
                                ) : (
                                    <img
                                    src={
                                        userData?.profilePic === ''
                                        ? '/assets/Logos/User_placeholder.png'
                                        : userData?.profilePic
                                    }
                                    className="profile-img"
                                    alt="Profile"
                                    />
                                )}
                                <input
                                    type="file"
                                    id="profilePicUpload"
                                    accept="image/*"
                                    onChange={onChange}
                                    className="file-input"
                                />
                                <label htmlFor="profilePicUpload" className="plus-button">
                                    +
                                </label>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="mb-0 user-name">{userData?.name}</p>
                                <p className="mb-0 user-email">{userData?.email}</p>
                            </div>
                        </div>
                        
                        <div className="col-12">
                            <div className="d-flex justify-content-center align-items-center stats">
                                <div className="px-3">
                                    <h5 className="text-heading">Cars Booked</h5>
                                    <p className="text-center text-sub mt-3">{bookings ? bookings.length : 0}</p>
                                </div>
                                <div className="px-3">
                                    <h5 className="text-heading">Luxury Rentals</h5>
                                    <p className="text-center text-sub mt-3">{luxuryRental ? luxuryRental : 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-5">
                            <Button onClick={()=>setShowComponent(true)} style={{borderRadius:'0px'}}>
                                userData
                            </Button>
                            <Button onClick={()=>setShowComponent(false)} style={{borderRadius:'0px'}}>
                                coupon
                            </Button>
                        </div>
                <div className="row d-flex justify-content-center align-items-start mt-5">
                {
                        showComponent? (
                            <div className="col-md-5 px-4">
                            <div className="d-flex justify-content-end mb-4">
                                {isUserDataComplete(userData)? (
                                <></>
                                ) : (
                                <div className="switch-container" onClick={() => {
                                    toggleEditUser();
                                    toggleSwitch();
                                }}>
                                    <div className={`switch ${isOn? 'on' : 'off'}`}>
                                    <div className="slider"></div>
                                    <span className="switch-text left-text">Detail</span>
                                    <span className="switch-text right-text">Edit</span>
                                    </div>
                                </div>
                                )}
                            </div>

                            {userData? (
                                isUserDataComplete(userData)? (
                                <AddDetails userDetails={userData} handleSuccess={handleUpdateUserData} />
                                ) : showEditUser? (
                                <EditUser userDetails={userData} handleSuccess={handleUpdateUserData} />
                                ) : (
                                <UserDetails userDetails={userData} />
                                )
                            ) : (
                                <p>Loading user data...</p>
                            )}
                            </div>
                        ) : (
                            <div className="col-md-5 px-4">
                                <CouponComponent coupons={userCoupons} />
                            </div>
                        )
                    }
                    
                    <div className="col-md-5 px-4">
                        <div className="right-side-contents">
                            <h4 className="text-dark">Most Booked Car</h4>
                            {
                                uniqueCars && uniqueCars.name ? (
                                    <>
                                    <h3 className="text-success">{uniqueCars?.name}</h3>
                                    <div className="d-flex justify-content-center align-items-center mt-3">
                                        <img
                                            src={uniqueCars?.thumbnailImg}
                                            className="favorite-car-img"
                                            alt="Favorite Car"
                                        />
                                    </div>
                                    </>
                                ) : (
                                    <div className="no-car-found">
                                        <BsFillExclamationCircleFill className="no-car-icon" />
                                        <p>No car found</p>
                                    </div>
                                )
                            }
                            
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile;
