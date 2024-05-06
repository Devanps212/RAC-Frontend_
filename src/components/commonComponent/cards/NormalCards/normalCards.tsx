import React from "react";
import { Carousel, Card, Col, Row, Button } from 'react-bootstrap';
import { FaArrowCircleDown, FaStar } from "react-icons/fa";
import './normalCards.css';
import { showCarInterface } from "../../../../types/carAdminInterface";
import { Link } from "react-router-dom";

const CarCards: React.FC<{ cars: showCarInterface[] }> = ({ cars }) => {
    return (
        <div className="carousel-container">
            <Carousel interval={null} wrap={false} touch={true} pause={false} keyboard={false} indicators={false}>
                {cars.map((car, index) => (
                    <Carousel.Item key={index} className="pt-2">
                        <Card className="card">
                            <Card.Img src={car.thumbnailImg} style={{ objectFit: 'cover', height: '250px' }} />
                            <div className="detailsCard">
                                <Row>
                                    <Col xs={8}>
                                        <Card.Body>
                                            <Card.Title className="text-start">{car.name}</Card.Title>
                                            <Card.Text className="text-start car-specs">
                                                {car.transmission} * {car.seats} * {car.fuelType}
                                            </Card.Text>
                                        </Card.Body>
                                    </Col>
                                    <Col xs={4}>
                                        <div className="circleRating me-2">
                                            <Card.Body>
                                                <FaStar className="fas fa-star fa-lg ratingStar" />
                                                <span className="text-center">Rating</span>
                                                <p>{car.rating}</p>
                                            </Card.Body>
                                        </div>
                                    </Col>
                                </Row>
                                <p className="text-start price-font">
                                    Price: <span>{car.rentPricePerDay}₹ /Day</span>
                                </p>
                                <Link to={`/users/carDetail?carId=${car._id}`}>
                                    <Button variant="primary" className="viewMore">
                                        View More
                                    </Button>
                                </Link>
                               
                            </div>
                        </Card> 
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default CarCards;
