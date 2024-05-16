import React from "react";
import './userprofile.css'
import { FaAddressBook, FaCarAlt, FaCity, FaFemale, FaMale, FaUser } from "react-icons/fa";
import { BiSolidUserBadge } from "react-icons/bi";

const UserProfile = () => {
    return (
        <>
            <div className="container-fluid" style={{ paddingTop: '5rem' }}>
                <div className="row d-flex flex-column justify-content-center align-items-center min-vw100">
                    <div className="contents mt-5">
                        <div className="col-12">
                            <div className="d-flex justify-content-center">
                                <img
                                    src="/assets/Logos/CompanyLogo/[removal.ai]_4ca5cd5b-8c5e-4a2a-b090-63d31c75e6a6-qcoku1709465106.png"
                                    className="profile-img"
                                    alt="Profile"
                                />
                            </div>
                            <div className="text-center">
                                <p className="mb-0 user-name">Devan.P.S</p>
                                <p className="mb-0 user-email">devanps212@gmail.com</p>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="d-flex justify-content-center align-items-center stats">
                                <div className="px-3">
                                    <h5 className="text-heading">Cars Booked</h5>
                                    <p className="text-center mt-3">0</p>
                                </div>
                                <div className="px-3">
                                    <h5 className="text-heading">Negotiation Savings</h5>
                                    <p className="text-center mt-3">₹ 0</p>
                                </div>
                                <div className="px-3">
                                    <h5 className="text-heading">Luxury Rentals</h5>
                                    <p className="text-center mt-3">0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-content-center align-items-start mt-5">
                    <div className="col-md-5 px-4">
                        <div className="user-details">
                            <h5 className="text-start">User Details</h5>
                            <div className="col-12">
                                <div className="details d-flex justify-content-between align-items-center">
                                    <div>
                                        <p><FaUser className="icon"/> UserName</p>
                                        <h5>Devan</h5>
                                    </div>
                                    <div>
                                        <p><BiSolidUserBadge className="icon"/> Last Name</p>
                                        <h5>P.S</h5>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="col-12">
                                <div className="details d-flex justify-content-between align-items-center">
                                    <div>
                                        <p><FaAddressBook className="icon"/> Address</p>
                                        <div>
                                            <h5>Sample Street, Aluva, Ernakulam P.O</h5>
                                            <h5>465121</h5>
                                        </div>
                                    </div>
                                    <div>
                                        <p><FaCarAlt className="icon"/> Licence No:</p>
                                        <div>
                                            <h5>kl7665324556543</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="col-12">
                                <div className="details d-flex justify-content-between align-items-center">
                                    <div>
                                        <p><FaMale className="icon"/>/<FaFemale className="icon"/> Gender</p>
                                        <div>
                                            <h5>Male</h5>
                                        </div>
                                    </div>
                                    <div>
                                        <p><FaCity className="icon"/> City</p>
                                        <div>
                                            <h5>Aluva</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 px-4">
                        <div className="right-side-contents">
                            <h4>Favorite Car</h4>
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
