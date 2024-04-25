import React, {Dispatch, SetStateAction} from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import './cards.css';
import {showCarInterface } from "../../../types/carAdminInterface";
import "react-multi-carousel/lib/styles.css";


interface groupedCars {
  cars : {[key: string]: showCarInterface[]},
  setSelectedCar: Dispatch<SetStateAction<undefined | string>>; 
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};

const Cards : React.FC<groupedCars> = ({cars, setSelectedCar}) => {

  console.log("cars in cards : ",cars)
  return (
    <>
      {Object.entries(cars).map(([category, car]) => (
        <div key={category}>
          <p className="mt-5 text-start ms-5 mb-5 categ-Head">{category}</p>
          <Carousel
            responsive={responsive}
            swipeable
            draggable
            showDots={false}
            ssr={true} 
            infinite
            autoPlay={false}
            autoPlaySpeed={1000}
            keyBoardControl
            customTransition="transform 500ms ease-in-out"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            className="custom-carousel"
          >

            {car.map((car, index) => (
              <div key={index} className="d-flex justify-content-center align-items-center">
                <Card style={{ width: '21rem', height:'27rem'}}>
                  <Card.Img variant="top" src={car.thumbnailImg ? car.thumbnailImg : 'https://placehold.co/600x400'} style={{ objectFit: 'cover', height: '300px' }} />
                  <div className="detailsCard animatedBackground">
                    <Row>
                      <Col xs={8}>
                        <Card.Body>
                          <Card.Title className="text-start">{car.name}</Card.Title>
                          <Card.Text className="text-start car-specs">
                            {car.transmission} * {car.fuelType} * {car.status}
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
                    <p className="text-start ms-3 price-font-bold">
                      Price: <span>₹ {car.rentPricePerDay}/Day</span>
                    </p>
                    <Button variant="primary" className="viewMore" onClick={()=>setSelectedCar(car._id)}>
                      View More
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </Carousel>
        </div>
      ))}
    </>
  );
  
};

export default Cards;
