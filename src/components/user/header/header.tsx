import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown, Offcanvas, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/axios/redux/slices/user/userLoginAuthSlice";
import { clearToken } from "../../../features/axios/redux/slices/user/tokenSlice";
import { toast } from 'react-toastify'
import { auth } from "../../../../firebase/firebase";
import "./headers.css";
import { BiSolidUserCircle } from "react-icons/bi";
import { RootState } from "../../../features/axios/redux/reducers/reducer";
import { tokenInterface } from "../../../types/payloadInterface";
import { jwtDecode } from "jwt-decode";
import { findOneUser } from "../../../features/axios/api/admin/adminUser";

const UserHeader = () => {

  const [profilePicture, setProfilePicture] = useState('')
  const token =  useSelector((root: RootState)=>root.token.token) ?? ''
  console.log("token : ", token)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let userId: string;
  
  if (token) {
    try {
      const userDecode: tokenInterface = jwtDecode(token);
      userId = userDecode.payload;
    } catch (error) {
      console.error("Invalid token", error);
      navigate('/');
    }
  }

  

  useEffect(() => {
    if (token) {
      const findUser = async () => {
        try {
          const user = await findOneUser(userId);
          console.log("User found: ", user);
          setProfilePicture(user.profilePic); 
        } catch (error) {
          console.error("Failed to fetch user profile", error);
        }
      };
      findUser();
    } else {
      navigate('/');
    }
  }, [token, navigate]);

  const handleLogout = ()=>{
    dispatch(logout())
    setProfilePicture('')
    dispatch(clearToken())
    auth.signOut()
    .then(()=>{
      console.log("signout success")
      toast.success('signOut success')
    })
    .catch((error:any)=>{
      console.log(error)
      toast.error(error.message)
    })
  navigate('/')
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{position:"fixed", width:'100%', zIndex:'1000'}}>
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
            {
              token ? (
                <Nav className="justify-content-md-between align-items-center me-auto ms-5">
                  <Nav.Link className="button-Header-user me-4" as={Link} to="/">Home</Nav.Link>
                  <Nav.Link className="button-Header-user me-4" as={Link} to={'/aboutUs'}>about Us</Nav.Link>
                  <Nav.Link className="button-Header-user me-4" href="/BookedCars">Your Deals</Nav.Link>
                  <Nav.Link className="custom-nav-link button-Header-user me-3" as={Link} to="/PartnerUI">Become Partner</Nav.Link>
                </Nav>
              ) : (
                <Nav className="justify-content-md-between align-items-center me-auto ms-5">
                  <Nav.Link className="button-Header-user me-4" as={Link} to="/">Home</Nav.Link>
                  <Nav.Link className="button-Header-user me-4" as={Link} to={'/aboutUs'}>about Us</Nav.Link>
                  <Nav.Link className="custom-nav-link button-Header-user me-3" as={Link} to="/PartnerUI">Become Partner</Nav.Link>
                </Nav>
              )
            }
            
            <img
              src="/assets/Logos/CompanyLogo/[removal.ai]_4ca5cd5b-8c5e-4a2a-b090-63d31c75e6a6-qcoku1709465106.png"
              alt="Company Logo"
              style={{ height: "71px", width: "73px", marginRight:'7rem' }}
            />
            <Nav className="d-flex align-items-center ms-auto me-5">
            <div className="nav-link-container me-3">
            <Nav.Link as={Link} to={"/getInTouch"} className="custom-nav-link">Get In Touch</Nav.Link>
            </div>
            <div className="nav-link-container me-3">
              {
                token ? (
                  <Nav.Link className="custom-nav-link " onClick={handleLogout}>SignOut</Nav.Link>
                )
                :
                <Nav.Link as={Link} to={'/signIn'} className="custom-nav-link ">SignUp/SignIn</Nav.Link>
              }
              
            </div>
            {
              token && (
                <Nav.Link as={Link} to={'/profile'} className="custom-nav-link">
                  {profilePicture ? (
                    <img src={profilePicture} alt="User Profile" style={{ width: '42px', height: '42px', borderRadius: '50%' }} />
                  ) : (
                    <BiSolidUserCircle style={{ fontSize: '42px' }} />
                  )}
                </Nav.Link>
              )
            }

            
            </Nav>

          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default UserHeader;
