import React from "react";
import { BiMobile, BiSolidUserBadge } from "react-icons/bi";
import { FaAddressBook, FaCarAlt, FaCity, FaFemale, FaMale, FaUser } from "react-icons/fa";
import { userDetailPayload } from "../../../../types/payloadInterface";

const UserDetails: React.FC<{userDetails: userDetailPayload}> = ({userDetails}) => {
    return (
        <div className="user-details">
            <h5 className="text-start">User Details</h5>
            <div className="col-12">
                <div className="details d-flex justify-content-between align-items-center">
                    <div>
                        <p><FaUser className="icon" /> UserName</p>
                        <h5>{userDetails.name}</h5>
                    </div>
                    <div>
                        <p><BiMobile className="icon" /> Mobile</p>
                        <h5>{userDetails.mobile}</h5>
                    </div>
                </div>
            </div>
            <hr />
            <div className="col-12">
                <div className="details d-flex justify-content-between align-items-center">
                    <div>
                        <p><FaAddressBook className="icon" /> Address</p>
                        <div>
                            <h5>{userDetails.address}</h5>
                        </div>
                    </div>
                    <div>
                        <p><FaCarAlt className="icon" /> Licence No:</p>
                        <div>
                            <h5>{userDetails.DL === '' ? <span className="text-danger">Driving License not given</span>: userDetails.DL}</h5>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="col-12">
                <div className="details d-flex justify-content-between align-items-center">
                    <div>
                        <p><FaMale className="icon" />/<FaFemale className="icon" /> Gender</p>
                        <div>
                            <h5>{userDetails.gender}</h5>
                        </div>
                    </div>
                    <div>
                        <p><FaCity className="icon" />City</p>
                        <div>
                            <h5>{userDetails.city}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
