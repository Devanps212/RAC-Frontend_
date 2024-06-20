import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './nav.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaUserCircle } from 'react-icons/fa';
import { BiSolidMessage } from 'react-icons/bi';
import { clearPartnerToken } from '../../../features/axios/redux/slices/partner/tokenSlice';
import { RootState } from '../../../features/axios/redux/reducers/reducer';
import { partnerLogout } from '../../../features/axios/redux/slices/partner/partnerLogin';
import { findOnePartner } from '../../../features/axios/api/partner/partner';
import { jwtDecode } from 'jwt-decode';
import { tokenInterface, userDetailPayload } from '../../../types/payloadInterface';


const PartnerHeader: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { socket } = useSocketContext();
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [partnerData, setPartnerData] = useState<userDetailPayload>()
  const partnerToken = useSelector((state: RootState) => state.partnerToken.partnerToken) ?? ''
  const userDecode : tokenInterface = jwtDecode(partnerToken)
  const partnerId  = userDecode.payload

  const handleLogout = () => {
    dispatch(partnerLogout())
    dispatch(clearPartnerToken());
  };

  useEffect(()=>{
    const partnerData = async()=>{
      const partner = await findOnePartner(partnerId)
      console.log("partner data : ", partner)
      setPartnerData(partner)
    }

    partnerData()
  }, [])

  // useEffect(() => {
  //   if (!socket) return;

  //   socket.on("newMessage", (messageData: any) => {
  //     console.log("Message received for partner: ", messageData);
  //     setUnreadMessages(prevState => prevState + 1);
  //   });

  //   return () => {
  //     socket.off("newMessage");
  //   };
  // }, [socket]);

  useEffect(() => {
    if (partnerToken === null) {
      navigate('/partner/login');
    }
  }, [partnerToken, navigate]);

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
            <Nav.Link href="/partner/negotiate" className="nav-link">
              <BiSolidMessage className="partnerMessage" style={{fontSize:'23px'}} />
              {unreadMessages > 0 && `(${unreadMessages})`}
            </Nav.Link>
            <OverlayTrigger
            placement='bottom'
            overlay={
              <Tooltip id={`tooltip-bottom`}>
                <strong>{partnerData?.name}</strong>.
              </Tooltip>
            }>
                  <div className='icon-container d-flex justify-content-center align-items-center ms-3'>
                        {
                          partnerData && partnerData.profilePic ? (
                            <img
                              src={partnerData && partnerData.profilePic ? partnerData.profilePic : ''}
                              style={{width:"32px", height:'32px', borderRadius: '20px'}}
                              alt="User Profile"
                            />
                          ) : (
                            <FaUserCircle style={{color:'black', fontSize:'23px'}}/>
                          )
                        }
                  </div>
            </OverlayTrigger>
            <Button id='logout' variant="outline-dark" onClick={handleLogout} className='nav-button ms-3'>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PartnerHeader;
