import React, { useEffect, useState } from "react";
import CarCards from "../cards/NormalCards/normalCards";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { showCarInterface } from "../../../types/carAdminInterface";
import { topbookedCars } from "../../../features/axios/api/car/carAxios";
import Slider from "react-slick";
import "./bookedCars.css"

const TopBookedCars = () => {
    const [cars, setCars] = useState<showCarInterface[]>([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1203,
                settings: {
                    slidesToShow: 3,
                    arrows: true,
                }
            },
            {
                breakpoint: 990,
                settings: {
                    slidesToShow: 2,
                    arrows: true,
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    arrows: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    arrows: true,
                }
            }
        ]
    };
    
    useEffect(() => {
        const carResult = async () => {
            const car = await topbookedCars();
            setCars(car);
        };

        carResult();
    }, []);

    return (
        <div className="container main-class">
            <h5 style={{fontFamily:'Orbitron', fontSize:'34px'}}>Top Cars</h5>
                    <Slider {...settings}>
                        {cars.length > 0 ? (
                        cars.map((car, index) => (
                            <div key={index} className="card-wrapper">
                                <CarCards cars={[car]} bookings={null} />
                            </div>
                        ))
                    ) : (
                        <p>No cars available</p>
                    )}
                    </Slider>
                </div>
    );
};

export default TopBookedCars;
