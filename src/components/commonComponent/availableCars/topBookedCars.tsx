import React, { useEffect, useState } from "react";
import CarCards from "../cards/NormalCards/normalCards";
import { showCarInterface } from "../../../types/carAdminInterface";
import { topbookedCars } from "../../../features/axios/api/car/carAxios";
import "./bookedCars.css"

const TopBookedCars = () => {
    const [cars, setCars] = useState<showCarInterface[]>([]);

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
            <div className="horizontal-scroll-wrapper mt-4">
                <div className="horizontal-scroll-container">
                    {cars.length > 0 ? (
                        cars.map((car, index) => (
                            <div key={index} className="card-wrapper">
                                <CarCards cars={[car]} bookings={null} />
                            </div>
                        ))
                    ) : (
                        <p>No cars available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopBookedCars;
