import React from "react";
import { NavDropdown } from "react-bootstrap";
import { BsCart, BsGrid1X2Fill, BsCardList, BsPerson, BsGrid3X3, BsFileText } from 'react-icons/bs';
import './sidebar.css';
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside id="sidebar" className="sidebar">
            <div className="sidebar-titles">
                <div className="sidebar-brand">
                    <BsCart className="icons_header"/> <span id="nameCompany">SHOP</span>
                </div>
            </div>
            <ul className="sidebar-list">
                <li className="sidebar-list-item">
                    <Link to="/admin/Dashboard" className="link-texts">
                        <BsGrid1X2Fill className="icon" /> <span>Dashboard</span>
                    </Link>
                </li>
                <li className="sidebar-list-item">
                    <a href="/admin/user/userManagement" className="link-texts">
                        <BsGrid3X3 className="icon" /> <span>User</span>
                    </a>
                </li>
                <li className="sidebar-list-item">
                    <NavDropdown
                        title={
                            <span>
                                <BsCardList className="icon" style={{color:'white'}} /> <span style={{color:'white'}}>Car</span>
                            </span>
                        }
                        id="nav-dropdown"
                    >
                        <NavDropdown.Item style={{color:'white'}} href='/admin/car/addCar'><span style={{color:"black"}}>Add Car</span></NavDropdown.Item>
                        <NavDropdown.Item style={{color:'white'}} href='/admin/car/carManagement'><span style={{color:"black"}}>Manage Car</span></NavDropdown.Item>
                    </NavDropdown>
                </li>
                <li className="sidebar-list-item">
                    <Link to="/admin/booking/BookingManagement" className="link-texts">
                        <BsPerson className="icon" /> <span>Manage Booking</span>
                    </Link>
                </li>
                <li className="sidebar-list-item">
                    <Link to="/admin/coupon/generate" className="link-texts">
                        <BsGrid3X3 className="icon" /> <span>Coupon Managment</span>
                    </Link>
                </li>
                <li className="sidebar-list-item">
                    <Link to="/admin/OfferManagement" className="link-texts">
                        <BsGrid3X3 className="icon" /> <span>Offer Manage</span>
                    </Link>
                </li>
                <li className="sidebar-list-item">
                    <NavDropdown
                        title={
                            <span>
                                <BsCardList className="icon" style={{color:'white'}} /> <span style={{color:'white'}}>Category</span>
                            </span>
                        }
                        id="nav-dropdown"
                    >
                        <NavDropdown.Item href='/admin/addCategory'>Add Category</NavDropdown.Item>
                        <NavDropdown.Item href='/admin/manageCategory'>Manage Category</NavDropdown.Item>
                    </NavDropdown>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
