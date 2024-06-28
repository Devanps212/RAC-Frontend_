import React, { useEffect, useState } from "react"
import { confirmAlert } from 'react-confirm-alert';
import { Table, Button, FormControl, Form, Modal, Row, Col } from "react-bootstrap"
import { FaTrash, FaEdit, FaInfoCircle } from 'react-icons/fa';
import { carAdminInterface, category, showCarInterface } from "../../../../types/carAdminInterface";
import { findAllCars } from "../../../../features/axios/api/car/carAxios";
import './carManage.css'
import { deleteCar } from "../../../../features/axios/api/car/carAxios";
import { getStatus } from "../../../../utils/statuUtils";
import Loading from "../../../loading/loading";
import { toast } from "react-toastify";
import SearchOne from "../../../commonComponent/search/search";
import Pagination from "../../../commonComponent/pagination/pagination";
import { useNavigate } from "react-router-dom";


const PartnerCarManagement = ()=>{

    const [formData, setFormData] = useState<carAdminInterface[]>([])
    const [load, setLoad] = useState(true)
    const [search, setSearch] = useState('')
    const [carFullData, setCarFullData] = useState<showCarInterface[] | null>(null)
    const [filteredData, setFilteredData]= useState<carAdminInterface[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [CarData, setCarData] = useState<showCarInterface | null >(null)
    const [showModal, setShowModal] = useState(false)
    


    const ItemsperPage = 5
    const totalPages = Math.ceil(filteredData.length/ ItemsperPage)
    console.log("filtered data length : ", totalPages)
    const navigate = useNavigate()

    useEffect(() => {
        let mounted = true;
      
        const fetchData = async () => {
          try {
            const response = await findAllCars('partnerCars', 'partner');
            if (mounted) {
              console.log('data received:', response);
              setFormData(response);
              setCarFullData(response)
              setFilteredData(response)
              
              setLoad(false);
            }
          } 
          catch(error:any) 
          {
            if (mounted)
            {
              toast.error(error.message);
              setLoad(false);
            }
          }
        };
      
        fetchData();
      
        return () => {
          mounted = false;
        };
      }, []);


      useEffect(()=>{
        handleSearch(search)
      }, [search])

      const onPageChange = (page: number)=>{
        setCurrentPage(page)
        console.log("page number recieved :", page)
        console.log(currentPage)
      }

      const handleSearch = (value:string)=>{
        console.log("filtered Data : ", filteredData)
        if(value.trim() !== "")
          {
            console.log(value)
            setSearch(value)
            const regexp = new RegExp(`^${value}`, "i")
            const data = filteredData.filter(data=> regexp.test(data.name))
           console.log("data found : ", data)
           setFilteredData(data)
           console.log("filtered Data : ", filteredData)
          }
          else
          {
            setFilteredData(formData)
          }
      }

    const handleDelete = (carId:string, index:number)=> (event:React.MouseEvent<HTMLButtonElement>)=>{
        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Are you sure you want to delete this car?',
            buttons: [
              {
                label: 'Yes',
                onClick: async () => {
                  try {
                    console.log('delete id:', carId);
                    const response = await deleteCar(carId, 'partner');
                    console.log('delete response:', response.message);
        
                    setFormData((prevState) => prevState.filter((car, i) => i !== index));
        
                    toast.success('Car deleted successfully');
                    window.location.reload()
                  } catch (error) {
                    console.error('Error deleting car:', error);

                    toast.error('Error deleting car. Please try again.');
                  }
                },
              },
              {
                label: 'No',
                onClick: () => {
                  console.log('Deletion canceled by user');
                },
              },
            ],
          });

    }


    const handleEdit = (id:string)=>{
      navigate(`/partner/editsPartnerCar`, {state:{id}})
    }

    const lastIndexOfItems = currentPage * ItemsperPage
    const firstIndexOfItems = lastIndexOfItems - ItemsperPage
    const currentItems = filteredData.slice(firstIndexOfItems, lastIndexOfItems)
    console.log("last:", lastIndexOfItems, "first:", firstIndexOfItems, "current:", currentItems)

    const handleInfo = (carId : string)=>{
      console.log("handle car working with id :", carId)
      if(carFullData)
        {
          const selectedCar = carFullData.find(cars=> cars._id === carId)
          if(selectedCar)setCarData(selectedCar)
          setShowModal(true)
        }
    }


    return(
        <div className="table-body">
            <h3 className="mb-5">Car Management</h3>
            {load && <Loading/>}
            <SearchOne onSearch={handleSearch}/>
            <Table responsive striped hover className="custom-table">
                <thead className="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Car name</th>
                        <th>Image</th>
                        <th>Owner</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (currentItems.map((carData, index)=>(
                        <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{carData.name}</td>
                        <td>{carData.exterior && (<img src={carData.exterior[0]} style={{width:'70px', height:'70px'}}/>)}</td>
                        <td>{carData.owner}</td>
                        <td>{carData.category?.name}</td>
                        <td className={getStatus(carData.status)}>{carData.status}</td>
                        <td>
                        <Button variant="danger" size="sm" onClick={handleDelete(carData._id, index)}>
                            <FaTrash /> Remove
                        </Button>
                        {' '}
                        {' '}
                        <Button onClick={()=>handleEdit(carData._id)} variant="primary" size="sm">
                            <FaEdit /> Edit
                        </Button>
                        {' '}
                        {' '}
                        <Button variant="success" size="sm" onClick={()=>handleInfo(carData._id)}>
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
               <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}/>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Car Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {CarData && (
                    <>
                        <Row>
                          <Col sm={6}>
                          {CarData.interior && CarData.interior.length > 0 && (
                                    <div>
                                        <h5>Interior Images:</h5>
                                        {CarData.interior.map((image, index) => (
                                            <img key={index} src={image} alt={`Interior ${index + 1}`} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                                        ))}
                                    </div>
                                )}
                          </Col>
                          <Col sm={6}>
                          {CarData.exterior && CarData.exterior.length > 0 && (
                                    <div>
                                        <h5>Exterior Images:</h5>
                                        {CarData.exterior.map((image, index) => (
                                            <img key={index} src={image} alt={`Exterior ${index + 1}`} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                                        ))}
                                    </div>
                                )}
                          </Col>
                        </Row>
                        <p><strong>Name:</strong> {CarData.name}</p>
                        <p><strong>Owner:</strong> {CarData.owner}</p>
                        <p><strong>Category:</strong> {(CarData.category as category)?.name}</p>
                        <p><strong>Price:</strong> {CarData.price}</p>
                        <p><strong>Mileage:</strong> {CarData.mileage}</p>
                        <p><strong>Engine:</strong> {CarData.engine}</p>
                        <p><strong>Rating:</strong> {CarData.rating}</p>
                        <p><strong>Transmission:</strong> {CarData.transmission}</p>
                        <p><strong>Fuel Type:</strong> {CarData.fuelType}</p>
                        <p><strong>Status:</strong> {CarData.status}</p>
                        <p><strong>Description:</strong> {CarData.description}</p>
                        <p><strong>Vehicle Number:</strong> {CarData.vehicleNumber}</p>
                        <p><strong>Rent Price Per Week:</strong> {CarData.rentPricePerWeek}</p>
                        <p><strong>Rent Price Per Day:</strong> {CarData.rentPricePerDay}</p>
                        <p><strong>Insurance Details:</strong> {CarData.insuranceDetails}</p>
                        <p><strong>Added By:</strong> {CarData.addedBy}</p>
                    </>
                )}

              </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            </Modal.Footer>
        </Modal>

            
        </div>
    )
}
export default PartnerCarManagement