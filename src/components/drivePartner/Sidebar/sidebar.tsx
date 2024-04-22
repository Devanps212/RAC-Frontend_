import React from "react";
import { BsCart, BsGrid1X2Fill, BsBoundingBoxCircles, BsCardList, BsPerson, BsGrid3X3, BsFileText } from 'react-icons/bs';
import './sidebar.css';
import { NavDropdown } from "react-bootstrap";

const PartnerSideBar = () => {
    return (
        <aside id="sidebar" className="sidebar">
            <div className="sidebar-title">
                <div className="sidebar-brand">
                    <BsCart className="icons_header"/> <span>SHOP</span>
                </div>
            </div>
            <ul className="sidebar-list">
                <li className="sidebar-list-item">
                    <a href="#">
                        <BsGrid1X2Fill className="icon" /> <span>Dashboard</span>
                    </a>
                </li>
                <li className="sidebar-list-item">
                    <a href="#">
                        <BsBoundingBoxCircles className="icon" /> <span>User</span>
                    </a>
                </li>
                <li className="sidebar-list-item">
                    <NavDropdown title={<span><BsCardList className="icon" /> <span>Products</span></span>}>
                        <NavDropdown.Item href="/partner/addCar">Add Car</NavDropdown.Item>
                        <NavDropdown.Item href="/partner/manageCar">Manage Car</NavDropdown.Item>
                    </NavDropdown>
                    
                </li>
                <li className="sidebar-list-item">
                    <a href="#">
                        <BsPerson className="icon" /> <span>User</span>
                    </a>
                </li>
                <li className="sidebar-list-item">
                    <a href="#">
                        <BsGrid3X3 className="icon" /> <span>Banner</span>
                    </a>
                </li>
                <li className="sidebar-list-item">
                    <a href="#">
                        <BsFileText className="icon" /> <span>Category</span>
                    </a>
                </li>
                <li className="sidebar-list-item">
                    <a href="#">
                        <BsFileText className="icon" /> <span>Booking</span>
                    </a>
                </li>
            </ul>
        </aside>
    );
};

export default PartnerSideBar;
