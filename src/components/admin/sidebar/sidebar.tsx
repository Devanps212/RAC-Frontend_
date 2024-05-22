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
                    <Link to="/admin/Dashboard">
                        <BsGrid1X2Fill className="icon" /> <span>Dashboard</span>
                    </Link>
                </li>
                <li className="sidebar-list-item">
                    <Link to="/admin/user/userManagement">
                        <BsGrid3X3 className="icon" /> <span>User</span>
                    </Link>
                </li>
                <li className="sidebar-list-item">
                    <NavDropdown
                        title={
                            <span>
                                <BsCardList className="icon" /> <span>Car</span>
                            </span>
                        }
                        id="nav-dropdown"
                    >
                        <NavDropdown.Item href='/admin/car/addCar'>Add Car</NavDropdown.Item>
                        <NavDropdown.Item href='/admin/car/carManagement'>Manage Car</NavDropdown.Item>
                    </NavDropdown>
                </li>
                <li className="sidebar-list-item">
                    <Link to="/admin/booking/BookingManagement">
                        <BsPerson className="icon" /> <span>Manage Booking</span>
                    </Link>
                </li>
                <li className="sidebar-list-item">
                    <Link to="/admin/banner">
                        <BsGrid3X3 className="icon" /> <span>Banner</span>
                    </Link>
                </li>
                <li className="sidebar-list-item">
                    <NavDropdown
                        title={
                            <span>
                                <BsCardList className="icon" /> <span>Category</span>
                            </span>
                        }
                        id="nav-dropdown"
                    >
                        <NavDropdown.Item href='/admin/addCategory'>Add Category</NavDropdown.Item>
                        <NavDropdown.Item href='/admin/manageCategory'>Manage Category</NavDropdown.Item>
                    </NavDropdown>
                </li>
                <li className="sidebar-list-item">
                    <Link to="/admin/booking">
                        <BsFileText className="icon" /> <span>Booking</span>
                    </Link>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
