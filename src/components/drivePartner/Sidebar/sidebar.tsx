import React from 'react';
import { 
    BsCart, BsGrid1X2Fill, BsBoundingBoxCircles, BsCardList, 
    BsFileText, BsCashStack, BsClipboardData, BsQuestionCircle, 
    BsGear
} from 'react-icons/bs';
import { NavDropdown } from 'react-bootstrap';
import './sidebar.css';
import { Link } from 'react-router-dom';

const PartnerSidebar: React.FC = () => {
    return (
        <aside id="sidebar" className="sidebar">
            <div className="sidebar-title">
                <div className="sidebar-brand">
                    <BsCart className="icons_header" /> <span>Car Rental</span>
                </div>
            </div>
            <ul className="sidebar-list">
                <li className="sidebar-list-item">
                    <Link to={"/partner/Dashboard"} className='text-link-side'>
                        <BsGrid1X2Fill className="icon" /> <span className='text-item-side'>Dashboard</span>
                    </Link>
                </li>
                <li className="sidebar-list-item">
                    <NavDropdown
                        title={
                            <span>
                                <BsCardList className="icon" /> <span className='text-item-side'>Vehicles</span>
                            </span>
                        }
                        id="nav-dropdown"
                    >
                        <NavDropdown.Item href="/partner/addCar">Add Vehicle</NavDropdown.Item>
                        <NavDropdown.Item href="/partner/manageCar">Manage Vehicles</NavDropdown.Item>
                    </NavDropdown>
                </li>
                <li className="sidebar-list-item">
                    <Link to={"/partner/bookings"} className='text-link-side'>
                            <span>
                                <BsFileText className="icon" /> <span className='text-item-side'>Bookings</span>
                            </span>
                    </Link>
                </li>
                {/* <li className="sidebar-list-item">
                    <NavDropdown
                        title={
                            <span>
                                <BsCashStack className="icon" /> <span>Financials</span>
                            </span>
                        }
                        id="nav-dropdown"
                    >
                        <NavDropdown.Item href="/partner/transactions">Transactions</NavDropdown.Item>
                        <NavDropdown.Item href="/partner/invoices">Invoices</NavDropdown.Item>
                        <NavDropdown.Item href="/partner/payments">Payments</NavDropdown.Item>
                    </NavDropdown>
                </li> */}
                {/* <li className="sidebar-list-item">
                    <NavDropdown
                        title={
                            <span>
                                <BsClipboardData className="icon" /> <span>Reports</span>
                            </span>
                        }
                        id="nav-dropdown"
                    >
                        <NavDropdown.Item href="/partner/salesReports">Sales Reports</NavDropdown.Item>
                        <NavDropdown.Item href="/partner/usageReports">Usage Reports</NavDropdown.Item>
                        <NavDropdown.Item href="/partner/customerFeedback">Customer Feedback</NavDropdown.Item>
                    </NavDropdown>
                </li> */}
                {/* <li className="sidebar-list-item">
                    <a href="#">
                        <BsGear className="icon" /> <span>Settings</span>
                    </a>
                </li> */}
                {/* <li className="sidebar-list-item">
                    <a href="#">
                        <BsQuestionCircle className="icon" /> <span>Support</span>
                    </a>
                </li> */}
            </ul>
        </aside>
    );
};

export default PartnerSidebar;
