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
    <Navbar bg="light" expand="lg">
      <Container style={{ minHeight: '57px' }}>
        <Navbar.Brand>
          <img
            src="./2a-b090-63d31c75e6a6-qcoku1709465106.svg"
            height='30px'
            width='25px'
            alt="Logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle id="navbar-contents" />

        <Navbar.Collapse className='justify-content-end' id='navbar-contents'>
          <Nav className="ml-auto">
            <Nav.Link href='#'>Dashboard</Nav.Link>
            <Nav.Link href='#'>Profile</Nav.Link>
            <Nav.Link href='#'>Sales Report</Nav.Link>

            <NavDropdown title="Management" id="basic-nav-dropdown" className='management'>
            {/* Nested NavDropdown for Car Management */}
            <NavDropdown title="Car Management" id="car-management-submenu" drop='start' className='nested-dropdown'>
              <NavDropdown.Item href='#'>Add Car</NavDropdown.Item>
              <NavDropdown.Item href='#'>Manage Car</NavDropdown.Item>
            </NavDropdown>

            {/* Other NavDropdown items */}
            <NavDropdown title="User Management" id="user-management-submenu" drop='start' className='nested-dropdown'>
              <NavDropdown.Item href='#'>Add User</NavDropdown.Item>
              <NavDropdown.Item href='#'>Manage User</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Banner Management" id="banner-management-submenu" drop='start' className='nested-dropdown'>
              <NavDropdown.Item href='#'>Add Banner</NavDropdown.Item>
              <NavDropdown.Item href='#'>Manage Banner</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Booking Management" id="booking-management-submenu" drop='start' className='nested-dropdown'>
              <NavDropdown.Item href='#'>Add Booking</NavDropdown.Item>
              <NavDropdown.Item href='#'>Manage Booking</NavDropdown.Item>
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
