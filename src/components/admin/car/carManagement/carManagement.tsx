import React, { useEffect, useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import { Table, Button, Dropdown, Modal, Row, Col } from "react-bootstrap";
import { FaTrash, FaEdit, FaInfoCircle } from 'react-icons/fa';
import { carAdminInterface, showCarInterface } from "../../../../types/carAdminInterface";
import { carPagination, deleteCar } from "../../../../features/axios/api/car/carAxios";
import './carManage.css';
import { getStatus } from "../../../../utils/statuUtils";
import Loading from "../../../loading/loading";
import { toast } from "react-toastify";
import SearchOne from "../../../commonComponent/search/search";
import Pagination from "../../../commonComponent/pagination/pagination";
import { useNavigate } from "react-router-dom";
import { categoryInterface } from "../../../../types/categoryInterface";



const CarManagement = () => {
    const [formData, setFormData] = useState<carAdminInterface[]>([]);
    const [load, setLoad] = useState(true);
    const [search, setSearch] = useState('');
    const [carFullData, setCarFullData] = useState<showCarInterface[] | null>(null);
    const [filteredData, setFilteredData] = useState<carAdminInterface[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [CarData, setCarData] = useState<showCarInterface | null>(null);
    const [totalPage, setTotalPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [category, setCategory] = useState<string[]>([]);
    const [totalItems, setTotalItems] = useState(0);

    const ItemsperPage = 4; // Items per page

    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            try {
                const response = await carPagination(currentPage, ItemsperPage, 'admin');
                if (mounted) {
                    const categoryData: categoryInterface[] = response.cars.map((categ: showCarInterface) => categ.category);
                    const uniqueCategoryNames: string[] = Array.from(new Set(categoryData.map((car: categoryInterface) => car.name)))
                        .filter((name: string | undefined) => typeof name === 'string')
                        .map((name: string | undefined) => name!);
                        console.log("category : ", response.cars)
                    setCategory(uniqueCategoryNames);
                    console.log("category : ", uniqueCategoryNames)
                    setFormData(response.cars);
                    setFilteredData(response.cars);
                    setCarFullData(response.cars);
                    setTotalItems(response.totalCount);
                    setTotalPage(Math.ceil(response.totalCount / ItemsperPage));
                    setLoad(false);
                }
            } catch (error: any) {
                if (mounted) {
                    toast.error(error.message);
                    setLoad(false);
                }
            }
        };

        fetchData();

        return () => {
            mounted = false;
        };
    }, [currentPage]);

    useEffect(() => {
        handleSearch(search);
    }, [search]);

    const handleSearch = (value: string) => {
        if (value.trim() !== "") {
            setSearch(value);
            const regexp = new RegExp(`^${value}`, "i");
            const data = formData.filter(data => regexp.test(data.name));
            setFilteredData(data);
            setTotalPage(Math.ceil(data.length / ItemsperPage));
            setCurrentPage(1);
        } else {
            setFilteredData(formData);
            setTotalPage(Math.ceil(totalItems / ItemsperPage)); 
        }
    };

    const onPageChange = (page: number) => {
        setCurrentPage(page); 
    };

    const handleDelete = (carId: string, index: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Are you sure you want to delete this car?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            await deleteCar(carId, 'admin');
                            
                            setFormData((prevState) => prevState.filter((car, i) => i !== index));
                            toast.success('Car deleted successfully');
                            window.location.reload()
                        } catch (error) {
                            toast.error('Error deleting car. Please try again.');
                        }
                    },
                },
                {
                    label: 'No',
                    onClick: () => { },
                },
            ],
        });
    };

    const handleLowtoHigh = () => {
        const LowHigh = [...filteredData].sort((a, b) => (a.rentPricePerDay ?? 0) - (b.rentPricePerDay ?? 0));
        setFilteredData(LowHigh);
    };

    const handleHightoLow = () => {
        const HighLow = [...filteredData].sort((a, b) => (b.rentPricePerDay ?? 0) - (a.rentPricePerDay ?? 0));
        setFilteredData(HighLow);
    };

    const handleSorting = (categ: string) => {
        const filterData = formData.filter((car) => car.category?.name === categ);
        setFilteredData(filterData);
        setTotalPage(Math.ceil(filterData.length / ItemsperPage));
        setCurrentPage(1);
    };

    const handleEdit = (id: string) => {
        navigate(`/admin/car/editCars`, { state: { id } });
    };

    const handleInfo = (carId: string) => {
        if (carFullData) {
            const selectedCar = carFullData.find(cars => cars._id === carId);
            if (selectedCar) setCarData(selectedCar);
            setShowModal(true);
        }
    };

    return (
        <div className="table-body">
            <h3 className="mb-5">Car Management</h3>
            {load && <Loading />}
            <div className="d-flex justify-content-end align-items-end mb-4">
                <Dropdown className="me-2">
                    <Dropdown.Toggle variant="info">
                        Select Price
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleLowtoHigh}>
                            Low to High
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleHightoLow}>
                            High to Low
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle variant="info">
                        Filter by Category
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {category && category.map((categ, index) => (
                            <Dropdown.Item key={index} onClick={() => handleSorting(categ)}>{categ}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <SearchOne onSearch={handleSearch} /> {/* Search component */}
            <Table responsive striped hover className="custom-table">
                <thead className="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Car Name</th>
                        <th>Image</th>
                        <th>Owner</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Render rows based on filteredData */}
                    {filteredData.length > 0 ? (filteredData.map((carData, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{carData.name}</td>
                            <td>{carData.exterior && (<img src={carData.exterior[0]} style={{ width: '70px', height: '70px' }} alt={`car-${index}`} />)}</td>
                            <td>{carData.owner}</td>
                            <td>{carData.category?.name}</td>
                            <td className={getStatus(carData.status)}>{carData.status}</td>
                            <td>
                                {/* Buttons for actions */}
                                <Button variant="danger" size="sm" onClick={handleDelete(carData._id,index)}>
                                    <FaTrash /> Remove
                                </Button>
                                {' '}
                                <Button onClick={() => handleEdit(carData._id)} variant="primary" size="sm">
                                    <FaEdit /> Edit
                                </Button>
                                {' '}
                                <Button variant="success" size="sm" onClick={() => handleInfo(carData._id)}>
                                    <FaInfoCircle /> Info
                                </Button>
                            </td>
                        </tr>
                    )))
                        : (<tr>
                            <td colSpan={7} className="no-data-cell">No data Found</td>
                        </tr>)}
                </tbody>
            </Table>
            <div className="d-flex justify-content-center align-items-center">
                <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={onPageChange} />
            </div>
            {CarData && (
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Car Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div>
                            {/* Display car information */}
                            <p><strong>Car Name:</strong> {CarData.name}</p>
                            <p><strong>Owner:</strong> {CarData.owner}</p>
                            <p><strong>Status:</strong> {CarData.status}</p>
                            <p><strong>Rent Price Per Day:</strong> {CarData.rentPricePerDay}</p>
                            <p><strong>Rating:</strong> {CarData.rating}</p>
                            <p><strong>Description:</strong> {CarData.description}</p>
                            <Row>
                                {/* Display car images */}
                                {CarData.exterior && CarData.exterior.length > 0 && CarData.exterior.map((img, index) => (
                                    <Col key={index}>
                                        <img src={img} alt={`car-exterior-${index}`} style={{ width: "100%" }} />
                                    </Col>
                                ))}
                            </Row>
                            <Row>
                                {CarData.interior && CarData.interior.length > 0 && CarData.interior.map((img, index) => (
                                    <Col key={index}>
                                        <img src={img} alt={`car-exterior-${index}`} style={{ width: "100%" }} />
                                    </Col>
                                ))}
                            </Row>
                            <Row>
                              {CarData.thumbnailImg && 
                              <Col>
                                <img src={CarData.thumbnailImg} alt="thumbnail" style={{ width: "100%" }} />
                            </Col>
                              }
                            </Row>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default CarManagement;

                       
