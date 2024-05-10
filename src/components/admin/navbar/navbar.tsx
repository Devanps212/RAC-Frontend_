import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import './nav.css';
import { adminLogout } from '../../../features/axios/redux/slices/admin/adminLogin';
import {clearAdminToken } from '../../../features/axios/redux/slices/admin/tokenSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Header = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleLogout = ()=>{
    dispatch(adminLogout())
    console.log("clearing token ")
    dispatch(clearAdminToken())
    console.log("logout :",adminLogout())
    navigate('/admin/signIn')

  }
  return (
    <Navbar className='navbar' bg="light" expand="lg" style={{position:'fixed', width:'100%', zIndex: "1000"}}>
      <Container style={{ minHeight: '57px' }}>

        <Navbar.Toggle id="navbar-contents" />

        <Navbar.Collapse className='justify-content-end' id='navbar-contents'>
          <Nav className="ml-auto">
            <Nav.Link href='#'>Dashboard</Nav.Link>
            <Nav.Link href='#'>Profile</Nav.Link>
            <Nav.Link href='#'>Sales Report</Nav.Link>

            <NavDropdown title="Management" id="basic-nav-dropdown" className='management'>
            {/* Nested NavDropdown for Car Management */}
            <NavDropdown title="Car Management" id="car-management-submenu" drop='start' className='nested-dropdown'>
              <NavDropdown.Item href='/admin/car/addCar'>Add Car</NavDropdown.Item>
              <NavDropdown.Item href='/admin/car/carManagement'>Manage Car</NavDropdown.Item>
            </NavDropdown>

            {/* Other NavDropdown items */}
            <NavDropdown title="User Management" id="user-management-submenu" drop='start' className='nested-dropdown'>
              <NavDropdown.Item href='#'>Add User</NavDropdown.Item>
              <NavDropdown.Item href='/admin/user/userManagement'>Manage User</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Banner Management" id="banner-management-submenu" drop='start' className='nested-dropdown'>
              <NavDropdown.Item href='#'>Add Banner</NavDropdown.Item>
              <NavDropdown.Item href='#'>Manage Banner</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Booking Management" id="booking-management-submenu" drop='start' className='nested-dropdown'>
              <NavDropdown.Item href='#'>Add Booking</NavDropdown.Item>
              <NavDropdown.Item href='/admin/booking/BookingManagement'>Manage Booking</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Category Management" id="category-management-submenu" drop='start' className='nested-dropdown'>
              <NavDropdown.Item href='/admin/addCategory'>Add Category</NavDropdown.Item>
              <NavDropdown.Item href='/admin/manageCategory'>Manage Category</NavDropdown.Item>
            </NavDropdown>
          </NavDropdown>


          <Button id='logout' variant="outline-dark" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
