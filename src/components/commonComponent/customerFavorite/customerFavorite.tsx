import React from "react";
import './customerFavourite.css';
import { FaUser, FaUserTie } from "react-icons/fa";

const CustomerFav: React.FC = () => {
    return (
        <>
            <div className="container">
                <h1 className="head mt-5">Customer Talks</h1>
                <div className="row d-flex justify-content-center align-items-center mt-5">
                    <div className="customer col-12 col-md-5">
                        <FaUser style={{ fontSize: '70px' }} />
                        <br />
                        <strong className="heading">Name</strong>
                        <p className="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
                            ex ea commodo consequat. Duis aute irure dolor 
                            in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                    <div className="customer col-12 col-md-5 ms-3">
                        <FaUserTie style={{ fontSize: '70px' }} />
                        <br />
                        <strong className="heading">Name</strong>
                        <p className="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
                            ex ea commodo consequat. Duis aute irure dolor 
                            in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomerFav;
