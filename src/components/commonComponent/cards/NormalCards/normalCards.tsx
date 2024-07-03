import React from "react";
import { Carousel, Card, Col, Row, Button } from 'react-bootstrap';
import { FaStar } from "react-icons/fa";
import './normalCards.css';
import { showCarInterface } from "../../../../types/carAdminInterface";
import { bookingInterface } from "../../../../types/bookingInterface";

const CarCards: React.FC<{ cars: showCarInterface[], bookings: bookingInterface | null }> = ({ cars, bookings }) => {
    const parsedBooking = JSON.stringify(bookings)
    console.log("cars: ", cars)
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
                                {
                                    car.offer && car.offer.price ? (
                                        <p className="text-start price-font">
                                            Price: <span>{car.offer.price}₹ /Day</span>
                                        </p>
                                    ) : (
                                        <p className="text-start price-font">
                                            Price: <span>{car.rentPricePerDay}₹ /Day</span>
                                        </p>
                                    )
                                }
                            {
                                bookings !== null ? (
                                    <a href={`/carDetail?carId=${car._id}&bookingDetail=${parsedBooking}`}>
                                        <Button variant="primary" className="viewMore">
                                            View More
                                        </Button>
                                    </a>
                                ) : (
                                    <>
                                    </>
                                )
                            }
                                
                               
                            </div>
                        </Card> 
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default CarCards;
