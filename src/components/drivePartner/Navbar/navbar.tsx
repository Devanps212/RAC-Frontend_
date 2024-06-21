import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { BiSolidMessage } from 'react-icons/bi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { clearPartnerToken } from '../../../features/axios/redux/slices/partner/tokenSlice';
import { RootState } from '../../../features/axios/redux/reducers/reducer';
import { partnerLogout } from '../../../features/axios/redux/slices/partner/partnerLogin';
import { findOnePartner } from '../../../features/axios/api/partner/partner';
import { jwtDecode } from 'jwt-decode';
import { tokenInterface, userDetailPayload } from '../../../types/payloadInterface';
import './nav.css';

interface ProfileIconProps {
  partnerData?: userDetailPayload;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ partnerData }) => {
  if (!partnerData) {
    return <Skeleton circle={true} height={32} width={32} />;
  }

  return partnerData.profilePic ? (
    <img
      src={partnerData.profilePic}
      style={{ width: "32px", height: '32px', borderRadius: '20px' }}
      alt="User Profile"
    />
  ) : (
    <FaUserCircle style={{ color: 'black', fontSize: '23px' }} />
  );
};

const PartnerHeader: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [partnerData, setPartnerData] = useState<userDetailPayload | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const partnerToken = useSelector((state: RootState) => state.partnerToken.partnerToken) ?? '';
  const userDecode: tokenInterface = jwtDecode(partnerToken);
  const partnerId = userDecode.payload;

  const handleLogout = () => {
    dispatch(partnerLogout());
    dispatch(clearPartnerToken());
    navigate('/partner/login');
  };

  useEffect(() => {
    const fetchPartnerData = async () => {
      try {
        const partner = await findOnePartner(partnerId);
        setPartnerData(partner);
      } catch (error) {
        console.error("Error fetching partner data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartnerData();
  }, [partnerId]);

  useEffect(() => {
    if (!partnerToken) {
      navigate('/partner/login');
    }
  }, [partnerToken, navigate]);

  return (
    <Navbar bg="light" expand="lg">
      <Container style={{ minHeight: '57px' }}>
        <Navbar.Brand>
          <img
            src="/assets/Logos/CompanyLogo/[removal.ai]_4ca5cd5b-8c5e-4a2a-b090-63d31c75e6a6-qcoku1709465106.png"
            height='60px'
            width='60px'
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle id="navbar-contents" />
        <Navbar.Collapse className='justify-content-end' id='navbar-contents'>
          <Nav className="ml-auto">
            <Nav.Link href="/partner/negotiate" className="nav-link">
              <BiSolidMessage className="partnerMessage" style={{ fontSize: '23px' }} />
              {unreadMessages > 0 && `(${unreadMessages})`}
            </Nav.Link>
            <OverlayTrigger
              placement='bottom'
              overlay={
                <Tooltip id={`tooltip-bottom`}>
                  <strong>{partnerData?.name}</strong>
                </Tooltip>
              }>
              <div className='icon-container d-flex justify-content-center align-items-center ms-3'>
                <ProfileIcon partnerData={isLoading ? undefined : partnerData} />
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
