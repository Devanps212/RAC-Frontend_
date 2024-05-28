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
import { carBasedOnRole, findAllCars } from "../../../features/axios/api/car/carAxios";
import { showCarInterface } from "../../../types/carAdminInterface";


const UserProfile = () => {
    
    const [showEditUser, setShowEditUser] = useState(false);
    const [userData, setUserData] = useState<userDetailPayload | null>(null)
    const [bookings, setBookings] = useState<detailBooking[]>()
    const [showLoad, setShowLoad] = useState(false)
    const [uniqueCars, setUniqueCars] = useState<showCarInterface>()
    const tokenPayload = useSelector((root: RootState)=> root.token.token) ?? ''

    const toggleEditUser = () => {
        setShowEditUser((prevShowEditUser) => !prevShowEditUser);
    };

    const [isOn, setIsOn] = useState(false);

    const toggleSwitch = () => {
        setIsOn(!isOn);
    };


    const findBookings = async()=>{
        try{
            const userId = await decodeToken(tokenPayload).payload

            const data : Partial<detailBooking> = {
                userId:userId
            }
            
            const bookings = await bookingFindingBasedOnRole(data)
            const bookingDetail = bookings.data.data
    
            setBookings(bookingDetail)

            // console.log("settingCar")
            // console.log("carId  :", bookingDetail.carId._id)
            // console.log("car finding")
            // const cars = await carBasedOnRole(bookingDetail.carId._id)
            // console.log(cars)
            
        }catch(error: any){
            toast.error(error)
        }

    }
    const findCars = async()=>{
        try{if (bookings && bookings.length > 0) {

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

    console.log(`Most common car ID: ${mostCommonCarId}, Count: ${maxCount}`);

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
        console.log(userFindings.data)
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
            if (userSave.data.status === "success" && userData && userData.profilePic) {
                userData.profilePic = userSave.data.data.profilePic;
                console.log(userSave.data.data.profilePic)
                setShowLoad(false)
            } else {
                toast.error("Profile picture Upload failed")
            }
            
            console.log("user saved : ", userSave)
        }
    }
    

    useEffect(()=>{
        userFinding()
        findBookings()
    }, [])

    return (
        <>
            <div className="container-fluid" style={{ paddingTop: '5rem' }}>
                <div className="row d-flex flex-column justify-content-center align-items-center min-vw100">
                    <div className="contents mt-5">
                        <div className="col-12">
                        <div className="d-flex justify-content-center position-relative">
                                <div className="profile-img-container">
                                    {showLoad ? (
                                        <div className="loader-container">
                                            <div className="wave-loader"></div>
                                        </div>
                                    ) : (
                                        <img
                                            src={userData?.profilePic === '' ? '/assets/Logos/User_placeholder.png' : userData?.profilePic}
                                            className="profile-img"
                                            alt="Profile"
                                        />
                                    )}
                                    <input
                                        type="file"
                                        id="profilePicUpload"
                                        accept="image/*"
                                        onChange={handleImageUpload}
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
                                    <p className="text-center text-sub mt-3">{bookings && bookings.length}</p>
                                </div>
                                <div className="px-3">
                                    <h5 className="text-heading">Negotiation Savings</h5>
                                    <p className="text-center text-sub mt-3">₹ 100</p>
                                </div>
                                <div className="px-3">
                                    <h5 className="text-heading">Luxury Rentals</h5>
                                    <p className="text-center text-sub mt-3">2</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-content-center align-items-start mt-5">
                    <div className="col-md-5 px-4">
                    <div className="d-flex justify-content-end mb-4">
                        {
                            isUserDataComplete(userData) ? (
                                <>
                                </>
                            ) : (
                                <div className="switch-container" onClick={()=>{
                                    toggleEditUser()
                                    toggleSwitch()
                                    }}>
                                    <div className={`switch ${isOn ? 'on' : 'off'}`}>
                                        <div className="slider"></div>
                                        <span className="switch-text left-text">Detail</span>
                                        <span className="switch-text right-text">Edit</span>
                                    </div>
                                </div>
                            )
                        }
                                
                            </div>
                            {userData ? (
                                isUserDataComplete(userData) ?(
                                    <AddDetails  userDetails={userData} handleSuccess={handleUpdateUserData}/>
                                ) :
                                showEditUser ? (
                                    <EditUser userDetails={userData} handleSuccess={handleUpdateUserData}/>
                                ) : (
                                    <UserDetails userDetails={userData} />
                                )
                            ) : (
                                <p>Loading user data...</p>
                            )}
                        
                    </div>
                    <div className="col-md-5 px-4">
                        <div className="right-side-contents">
                            <h4 className="text-dark">Most Booked Car</h4>
                            <h3 className="text-success">{uniqueCars?.name}</h3>
                            <div className="d-flex justify-content-center align-items-center mt-3">
                                <img
                                    src={uniqueCars?.thumbnailImg}
                                    className="favorite-car-img"
                                    alt="Favorite Car"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile;
