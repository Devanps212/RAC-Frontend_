import React from "react";
import './aboutUs.css';
import CollaboratedPartners from "../../commonComponent/partners/partners";

const AboutUs = () => {
    return (
        <div className="container-fluid">
            <div className="row d-flex flex-column justify-content-center align-items-center">
                <div className="col-12">
                    <div className="image-content">
                    <div className="image-container">
                        <img
                            className="banner-aboutUs"
                            src="/assets/user/medium-shot-colleagues-celebrating-transformed.jpeg"
                            alt="About Us Banner"
                        />
                        </div>
                        <div className="overlay">
                        <div className="text-container">
                            <span className="animated-text">About Us</span>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 mb-5">
                <div>
                    <h4 className="text-center mt-5" style={{fontFamily:'Orbitron'}}>Welcome to Rent A Car!</h4>
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-5 m-3">
                                <div className="card flex-fill custom-card">
                                    <div className="card-body custom-card-body">
                                        <p className="card-text text-justify">
                                            At EasyRentACar, we strive to provide you with the best car rental experience possible. Our mission is to make renting a car as easy and convenient as possible, whether you’re traveling for business, leisure, or any other reason. We understand that your time is valuable, and our goal is to provide a seamless, hassle-free rental process from start to finish. Our online booking system is user-friendly, allowing you to reserve your vehicle in just a few clicks. Additionally, our flexible rental periods cater to all your needs, be it a short-term rental or a long-term lease.
                                        </p>
                                        <p className="card-text text-justify">
                                            Our team is dedicated to ensuring that you find the perfect vehicle for your needs. We offer a wide selection of cars ranging from compact city cars to spacious SUVs and luxury vehicles. No matter your preference or budget, we have the ideal car for you. Each vehicle in our fleet is regularly maintained and thoroughly inspected to guarantee the highest standards of safety and performance. Whether you need a car for a business trip, a family vacation, or a weekend getaway, EasyRentACar has got you covered.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-5 m-3">
                                <div className="card flex-fill custom-card">
                                    <div className="card-body custom-card-body">
                                        <p className="card-text text-justify">
                                            We understand that your journey begins the moment you step into one of our cars. That's why we maintain our fleet meticulously, ensuring every vehicle is clean, reliable, and equipped with the latest features. Your safety and comfort are our top priorities. We provide a range of additional services and accessories, such as GPS navigation systems, child seats, and more, to enhance your driving experience and meet your specific needs.
                                        </p>
                                        <p className="card-text text-justify">
                                            Booking with EasyRentACar is simple and straightforward. Our user-friendly website allows you to browse our fleet, compare prices, and make a reservation in just a few clicks. We also offer flexible rental periods and competitive pricing to accommodate all your travel plans. Our transparent pricing policy means no hidden fees or surprises. What you see is what you get. Our customer service team is available 24/7 to assist you with any questions or concerns you may have. Whether you need help with your reservation, have a question about your rental, or require roadside assistance, we're here to support you every step of the way.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                <h4 className="text-center" style={{fontFamily:'Orbitron'}}>Our Executives</h4>
                    <div className="row justify-content-center mt-5">
                        <div className="col-lg-3 mb-4">
                            <div className="card emp-card text-center">
                                <img src="/assets/user/executives/black-professional-4334648_1280.jpg" className="card-img-top rounded-circle mx-auto mt-3" style={{ width: '100px', height: '100px', objectFit: 'cover' }} alt="Profile 1" />
                                <div className="card-body">
                                    <h5 className="card-title">John Doe</h5>
                                    <p className="card-text">Manager</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 mb-4">
                            <div className="card emp-card text-center">
                                <img src="assets/user/executives/man-3135030_1280.jpg" className="card-img-top rounded-circle mx-auto mt-3" style={{ width: '100px', height: '100px', objectFit: 'cover' }} alt="Profile 2" />
                                <div className="card-body">
                                    <h5 className="card-title">Jane Smith</h5>
                                    <p className="card-text">Sales Executive</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 mb-4">
                            <div className="card emp-card text-center">
                                <img src="/assets/user/executives/pexels-olly-3771807.jpg" className="card-img-top rounded-circle mx-auto mt-3" style={{ width: '100px', height: '100px', objectFit: 'cover' }} alt="Profile 3" />
                                <div className="card-body">
                                    <h5 className="card-title">Michael Johnson</h5>
                                    <p className="card-text">Developer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <CollaboratedPartners/>
            </div>
        </div>
    );
}

export default AboutUs;
