import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown, Offcanvas, Button } from "react-bootstrap";
import "./headers.css";

const UserHeader = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{position:"fixed", width:'100%', zIndex:'1'}}>
      <Container fluid>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" className="custom-toggle" style={{ color: 'transparent' }}>
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Offcanvas id="offcanvasNavbar-expand-lg" aria-labelledby="offcanvasNavbarLabel-expand-lg" placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="navbar-offcanvas-body">
            <Nav className="justify-content-md-between align-items-center me-auto ms-5">
              <Nav.Link className="button-Header-user me-3" as={Link} to="/users/home">Home</Nav.Link>
              <Nav.Link className="me-3" href="#about">About Us</Nav.Link>
              <Nav.Link className="me-3" href="#deals">Your Deals</Nav.Link>
              <NavDropdown className="me-2" title="Dropdown" id="offcanvasNavbarDropdown-expand-lg">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <img
              src="/src/assets/Logos/CompanyLogo/[removal.ai]_4ca5cd5b-8c5e-4a2a-b090-63d31c75e6a6-qcoku1709465106.png"
              alt="Company Logo"
              style={{ height: "71px", width: "73px" }} // Adjust height as needed
            />
            <Nav className="d-flex align-items-center ms-auto me-5">
            <Nav.Link className="custom-nav-link me-3" as={Link} to="/partner/PartnerUI">Become Partner</Nav.Link>
            <div className="nav-link-container me-3">
            <Nav.Link className="custom-nav-link">Get In Touch</Nav.Link>
            </div>
            <div className="nav-link-container me-3">
            <Nav.Link className="custom-nav-link">SignUp/SignIn</Nav.Link>
            </div>
            </Nav>

          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default UserHeader;
