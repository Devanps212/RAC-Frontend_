import React, { useEffect, useState } from "react";
import './userprofile.css'
import UserDetails from "../../commonComponent/profileComponents/userDetails/userDetails";
import EditUser from "../../commonComponent/profileComponents/editUser/editUser";
import AddDetails from "../../commonComponent/profileComponents/addDetails/addDetails";
import { decodeToken } from "../../../utils/tokenUtil";
import { findUser, saveUserDetails } from "../../../features/axios/api/user/user";
import { userDetailPayload } from "../../../types/payloadInterface";
import { toast } from "react-toastify";


const UserProfile = () => {
    
    const [showEditUser, setShowEditUser] = useState(false);
    const [userData, setUserData] = useState<userDetailPayload | null>(null)
    const [showLoad, setShowLoad] = useState(false)

    const toggleEditUser = () => {
        setShowEditUser((prevShowEditUser) => !prevShowEditUser);
    };

    const [isOn, setIsOn] = useState(false);

    const toggleSwitch = () => {
        setIsOn(!isOn);
    };

    const userFinding = async()=>{
        const tokenPayload = localStorage.getItem('token')
        const token = await decodeToken(tokenPayload ?? '').payload
        console.log(token)

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
                                    <p className="text-center text-sub mt-3">4</p>
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
                            <h4>Favourite Car</h4>
                            <div className="d-flex justify-content-center align-items-center mt-3">
                                <img
                                    src="/assets/Logos/User_placeholder/pngwing.com (1).png"
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
