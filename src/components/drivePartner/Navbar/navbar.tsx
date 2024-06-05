import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import './nav.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { BiSolidMessage } from 'react-icons/bi';
import { useSocketContext } from '../../../context/socketContext';
import { clearPartnerToken } from '../../../features/axios/redux/slices/partner/tokenSlice';
import { RootState } from '../../../features/axios/redux/reducers/reducer';
import { partnerLogout } from '../../../features/axios/redux/slices/partner/partnerLogin';

const PartnerHeader: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { socket } = useSocketContext();
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const partnerToken = useSelector((state: RootState) => state.partnerToken.partnerToken);

  const handleLogout = () => {
    dispatch(partnerLogout())
    dispatch(clearPartnerToken());
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (messageData: any) => {
      console.log("Message received for partner: ", messageData);
      setUnreadMessages(prevState => prevState + 1);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket]);

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
            <Nav.Link href='#' className='nav-link'>
              <FaUserAlt className='icon' /> Profile
            </Nav.Link>
            <Nav.Link href="#" className="nav-link">
              <BiSolidMessage className="partnerMessage" /> Messages{' '}
              {unreadMessages > 0 && `(${unreadMessages})`}
            </Nav.Link>
            <Button id='logout' variant="outline-dark" onClick={handleLogout} className='nav-button'>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PartnerHeader;
