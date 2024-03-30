import React from "react"
import Footer from "../footer/footer"
import './partners.css'
import { Link } from "react-router-dom"
import { Button, Col, Row, Container } from "react-bootstrap"

const PartnerUI =()=>{
    return(
        <Container fluid className="FContainer" style={{margin:'0px', padding:'0px', paddingTop:'7rem'}}>
            <Row className='justify-content-center align-items-center'  style={{width:'inherit'}}>
                <Col md={6} className='d-flex flex-column justify-content-center align-items-center'>
                <h1 className='text-left texts' style={{marginBottom:'12%'}}>Become a Partner</h1>
                <h4 className='text-left mb-5 texts' style={{width:'inherit', textAlign:'justify', fontSize:'20px'}}>Join our growing community of car owners and start earning passive income by renting out your car through our platform. Sign up today and take the first step towards becoming a partner in our car rental network!</h4>
                <div className='d-flex justify-content-space-between align-items-center'>
                <a className="btn btn-primary me-2"><Link to='/partner/login' className="text-light">Login here</Link></a>
                <a className="btn btn-primary me-2"><Link to='#' className="text-light">Create a new Account</Link></a>
                <a className="btn btn-success me-2"><Link to='#' className="text-light">SignUp with Existing Account</Link></a>
                
                </div>
                </Col>
                <Col md={6} className="position-relative mb-3 d-flex justify-content-center" style={{marginTop:'3%'}}>
                <img className="imageFooter"
                    src='/src/assets/drivePartner/SignUp/Screenshot (220) (1).png'
                    alt='sample car'
                />
                </Col>
            </Row>
            <Footer/>
        </Container>
    )
}

export default PartnerUI