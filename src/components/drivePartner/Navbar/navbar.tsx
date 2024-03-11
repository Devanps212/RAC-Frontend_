import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import './nav.css';
import { partnerLogout } from '../../../features/axios/redux/slices/partner/partnerLogin';
import { clearPartnerToken } from '../../../features/axios/redux/slices/partner/tokenSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';


const PartnerHeader = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleLogout = ()=>{
    dispatch(partnerLogout())
    console.log("clearing token ")
    dispatch(clearPartnerToken())
    console.log("logout :",partnerLogout())
    navigate('/partner/login')

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
            <Nav.Link href='#' className='nav-link'>
              <FaUserAlt className='icon' /> Profile
            </Nav.Link>

              <NavDropdown title="Profile" id="category-management-submenu" drop='down' className='nested-dropdown'>
                <NavDropdown.Item href='#'>Partner Profile</NavDropdown.Item>
                <NavDropdown.Item href='#'>Details</NavDropdown.Item>
              </NavDropdown>

            <Button id='logout' variant="outline-dark" onClick={handleLogout} className='nav-button'>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default PartnerHeader;
