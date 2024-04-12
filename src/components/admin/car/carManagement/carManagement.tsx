import React, { useEffect, useState } from "react"
import { confirmAlert } from 'react-confirm-alert';
import { Table, Button, FormControl, Form, Modal, Row, Col } from "react-bootstrap"
import { FaTrash, FaEdit, FaInfoCircle } from 'react-icons/fa';
import { carAdminInterface } from "../../../../types/carAdminInterface";
import { findAllCars } from "../../../../features/axios/api/car/carAxios";
import './carManage.css'
import { deleteCar } from "../../../../features/axios/api/car/carAxios";
import { getStatus } from "../../../../utils/statuUtils";
import Loading from "../../../loading/loading";
import { toast } from "react-toastify";
import SearchOne from "../../../commonComponent/search/search";
import Pagination from "../../../commonComponent/pagination/pagination";
import { useNavigate } from "react-router-dom";


const CarManagement = ()=>{

    const [formData, setFormData] = useState<carAdminInterface[]>([])
    const [load, setLoad] = useState(true)
    const [search, setSearch] = useState('')
    const [filteredData, setFilteredData]= useState<carAdminInterface[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    


    const ItemsperPage = 5
    const totalPages = Math.ceil(filteredData.length/ ItemsperPage)
    console.log("filtered data length : ", totalPages)
    const navigate = useNavigate()

    useEffect(() => {
        let mounted = true;
      
        const fetchData = async () => {
          try {
            const response = await findAllCars('all', 'admin');
            if (mounted) {
              console.log('data received:', response);
              setFormData(response);
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
                    const response = await deleteCar(carId, 'admin');
                    console.log('delete response:', response.message);
        
                    setFormData((prevState) => prevState.filter((car, i) => i !== index));
        
                    toast.success('Car deleted successfully');
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
      navigate(`/admin/car/editCars`, {state:{id}})
    }

    const lastIndexOfItems = currentPage * ItemsperPage
    const firstIndexOfItems = lastIndexOfItems - ItemsperPage
    const currentItems = filteredData.slice(firstIndexOfItems, lastIndexOfItems)
    console.log("last:", lastIndexOfItems, "first:", firstIndexOfItems, "current:", currentItems)

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
                        <Button variant="success" size="sm">
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

            <Modal>
              <Modal.Body>
                
              </Modal.Body>
            </Modal>
            
        </div>
    )
}
export default CarManagement