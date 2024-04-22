import React, { useState } from "react";
import Footer from "../footer/footer";
import './partners.css';
import { Link } from "react-router-dom";
import { Button, Col, Row, Container, Modal } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";
import { partnerSignUpPayment } from "../../../features/axios/api/partner/partner";
import { partnerData } from "../../../types/partnerInterface";

const PartnerUI = () => {
    const [showModal, setShowModal] = useState(false);
    const [subModal, setSubModal] = useState(false)
    const [partnerData, setPartnerData] = useState<partnerData | null>()


    const hideModal = () => setShowModal(false);
    const ShowModal = () => setShowModal(true);

    const handlePayment = async() => {

        const token = localStorage.getItem('token')
        console.log(token)
        setPartnerData((PrevState)=>({
            ...PrevState,
        amount:250,
        token:token??'',
        role:"partner"}))

        const partnerDataToSend = {
            ...partnerData,
            amount: 250,
            token: token ?? '',
            role:"partner"
        };
        if(partnerDataToSend)
            {
                const response = await partnerSignUpPayment(partnerDataToSend)
                console.log("response recieved : ", response.data.data)
                window.location.href = response.data.data  
            }
    }

    return (
        <Container fluid className="FContainer" style={{ margin: '0px', padding: '0px', paddingTop: '7rem' }}>
            <Row className='justify-content-center align-items-center' style={{ width: 'inherit' }}>
                <Col md={6} className='d-flex flex-column justify-content-center align-items-center'>
                    <h1 className='text-left texts' style={{ marginBottom: '12%' }}>Become a Partner</h1>
                    <h4 className='text-left mb-5 texts' style={{ width: 'inherit', textAlign: 'justify', fontSize: '20px' }}>Join our growing community of car owners and start earning passive income by renting out your car through our platform. Sign up today and take the first step towards becoming a partner in our car rental network!</h4>
                    <div className='d-flex justify-content-space-between align-items-center'>
                        <Link to='/partner/login' className="btn btn-primary me-2">Login here</Link>
                        <Button className="btn btn-success text-light me-2" onClick={ShowModal}>Sign Up with Existing Account</Button>
                    </div>
                </Col>
                <Col md={6} className="position-relative mb-3 d-flex justify-content-center" style={{ marginTop: '3%' }}>
                    <img className="imageFooter"
                        src='/assets/drivePartner/SignUp/Screenshot (220) (1).png'
                        alt='sample car'
                    />
                </Col>
            </Row>
            <Footer />

            {/* Modal for payment */}
            <Modal show={showModal} onHide={hideModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Payment for Partner Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src="/assets/Logos/Other_logos/Screenshot (223).png" 
                    width={412} 
                    height={110} 
                    className="d-block mx-auto mb-4"
                    alt="Logo" 
                />
                <p style={{textAlign:"center"}}>Thank you for your interest in becoming a partner!</p>
                    <p>To create a partner account, there is a one-time fee of ₹250. This fee helps us maintain our platform and provide you with the best possible service.</p>
                    <div onClick={()=>setSubModal(true)}>
                    <FaInfoCircle />
                    </div>
                    
                    <p>Would you like to proceed with the payment?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handlePayment}>
                        Proceed (₹250)
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal className="nested-modal" show={subModal} onHide={() => setSubModal(false)} size="sm" style={{marginLeft:'30%', marginTop:'20%'}}>
                <Modal.Body style={{ textAlign: 'left',  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
                    <h4 style={{ marginBottom: '20px' }}>Benefits of Partner Account</h4>
                    <ul style={{ paddingLeft: '20px' }}>
                        <li style={{ marginBottom: '10px' }}>Listing your car on our platform for rental</li>
                        <li style={{ marginBottom: '10px' }}>Earning passive income from rentals</li>
                        <li style={{ marginBottom: '10px' }}>Access to our partner support team for assistance</li>
                    </ul>
                </Modal.Body>
            </Modal>

            
        </Container>
    )
}

export default PartnerUI;
