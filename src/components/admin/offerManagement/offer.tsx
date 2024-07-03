import React, { useEffect, useState } from "react";
import './offer.css';
import { Button, Table, Modal, Form } from "react-bootstrap";
import { carBasedOnRole, carUpdateBasedOnRole, editCar } from "../../../features/axios/api/car/carAxios";
import { showCarInterface } from "../../../types/carAdminInterface";
import { toast } from "react-toastify";

const OfferManagement = () => {
    const [cars, setCars] = useState<showCarInterface[] | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [offerPercentage, setOfferPercentage] = useState('');
    const [selectedCar, setSelectedCar] = useState<showCarInterface | null>(null);

    const AdminCars = async () => {
        try {
            const carsData: showCarInterface[] = await carBasedOnRole('Admin');
            setCars(carsData);
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    useEffect(() => {
        AdminCars();
    }, []);

    const handleApplyOffer = (car: showCarInterface) => {
        setSelectedCar(car);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setOfferPercentage('');
        setSelectedCar(null);
    };

    const handleOfferSubmit = async() => {
        console.log("handling data")
        if (selectedCar && cars) {

            if (selectedCar.rentPricePerDay && selectedCar.rentPricePerWeek) {
                const updatedPricePerDay = parseFloat((selectedCar.rentPricePerDay * (1 - parseInt(offerPercentage) / 100)).toFixed(2));
                const updatedPricePerWeek = parseFloat((selectedCar.rentPricePerWeek * (1 - parseInt(offerPercentage) / 100)).toFixed(2));

                const updatedCar : showCarInterface = {
                    ...selectedCar,
                    offer:{
                        discount: parseInt(offerPercentage),
                        price: updatedPricePerDay
                    }, 
                    rentPricePerDay: updatedPricePerDay,
                    rentPricePerWeek: updatedPricePerWeek
                };
                console.log(updatedCar)
                try{
                    const response = await carUpdateBasedOnRole(updatedCar, 'Admin')
                    console.log("response : ", response)
                    if(response !== null){
                        toast.success("offer Price Updated")
                    }
                    

                    const updatedCars = cars.map(car => car._id === updatedCar._id ? updatedCar : car);
                    setCars(updatedCars);
                

                    handleCloseModal();
                } catch (error: any) {
                    console.log(error)
                    toast.error(error.message)
                }
                
            }
        }
    };

    const handleOfferPercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 100))) {
            setOfferPercentage(value);
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="table-body">
                    <h3>Offer Management</h3>
                    <Table responsive striped hover className="custom-table">
                        <thead className="thead-dark">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Price Per Week</th>
                                <th>Price per Day</th>
                                <th>Offer Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars && cars.map((car, index) => (
                                <tr key={car._id}>
                                    <td>{index + 1}</td>
                                    <td>{car.name}</td>
                                    <td><img src={car.thumbnailImg} style={{ width: '9rem' }} alt="Car Thumbnail" /></td>
                                    <td>₹{car.rentPricePerWeek}</td>
                                    <td>₹{car.rentPricePerDay}</td>
                                    <td>₹{car.offer?.price ? car.offer.price : 0}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => handleApplyOffer(car)}>Apply Offer</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>

            {/* Modal for entering offer percentage */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Apply Offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Enter Offer Percentage:</Form.Label>
                        <Form.Control
                            type="text"
                            value={offerPercentage}
                            onChange={handleOfferPercentageChange}
                            placeholder="Enter percentage"
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleOfferSubmit}>
                        Apply
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default OfferManagement;
