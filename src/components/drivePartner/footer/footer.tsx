import React from "react"
import './footer.css'
import { Row, Col, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FaHome, FaEnvelope, FaPhone, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa"

const Footer = ()=>{
    return(
        <Container fluid className="bg-dark text-light py-5 mt-5 p-0 m-0">
        <footer>
                <Row className="mx-0">
                    <Col md={3}>
                        <h3>About Us</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultrices mattis odio. Integer ullamcorper nulla sed consectetur id ipsum aliquam.</p>
                        <Link to='#' className="btn btn-primary">Learn More</Link>
                    </Col>
                    <Col md={3}>
                        <h3>Contact Us</h3>
                        <ul className="footer-Lists">
                            <li><FaHome className="F-list-items" />123 Main Street, Anytown, USA</li>
                            <li><FaEnvelope className="F-list-items" />info@yourcompany.com</li>
                            <li><FaPhone className="F-list-items" />0484-235511</li>
                        </ul>
                    </Col>
                    <Col md={2}>
                        <h3>Social Media</h3>
                        <Link to='#'><FaInstagram className="text-light FLinks"/></Link>
                        <Link to='#'><FaFacebook className="text-light FLinks"/></Link>
                        <Link to='#'><FaTwitter className="text-light FLinks"/></Link>
                    </Col>
                    <Col md={2}>
                        <h3>Resources</h3>
                        <ul className="footer-Lists">
                            <li>
                                <p className="text-light">Bootstrap</p>
                            </li>
                        </ul>
                    </Col>
                    <Col md={2}>
                        <h3>Legal</h3>
                        <ul className="footer-Lists">
                            <li>
                                <Link to='#' className="text-light">Terms & Conditions</Link>
                            </li>
                            <li>
                                <Link to='#' className="text-light">Privacy Policy</Link>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Row className="mt-4 mx-0">
                    <Col className="text-center">
                    <p>&copy; 2024 Your Company Name. All Rights Reserved.</p>
                    </Col>
                </Row>
            </footer>
            </Container>
    )
}

export default Footer