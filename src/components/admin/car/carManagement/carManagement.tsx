import React, { useEffect, useState } from "react"
import { confirmAlert } from 'react-confirm-alert';
import { Table, Button } from "react-bootstrap"
import { FaTrash, FaEdit, FaInfoCircle } from 'react-icons/fa';
import { carAdminInterface } from "../../../../types/carAdminInterface";
import { findAllCars } from "../../../../features/axios/api/car/carAxios";
import './carManage.css'
import { deleteCar } from "../../../../features/axios/api/car/carAxios";
import { getStatus } from "../../../../utils/statuUtils";
import Loading from "../../../loading/loading";
import { toast } from "react-toastify";

const CarManagement = ()=>{

    const [formData, setFormData] = useState<carAdminInterface[]>([])
    const [load, setLoad] = useState(true)


    useEffect(() => {
        let mounted = true;
      
        const fetchData = async () => {
          try {
            const response = await findAllCars('all', 'admin');
            if (mounted) {
              console.log('data received:', response);
              setFormData(response);
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

    return(
        <div className="table-body">
            <h3 className="mb-5">Car Management</h3>
            {load && <Loading/>}
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
                    { formData.map((carData, index)=>(
                        <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{carData.name}</td>
                        <td>give image here </td>
                        <td>{carData.owner}</td>
                        <td>{carData.category?.name}</td>
                        <td className={getStatus(carData.status)}>{carData.status}</td>
                        <td>
                        <Button variant="danger" size="sm" onClick={handleDelete(carData._id, index)}>
                            <FaTrash /> Remove
                        </Button>
                        {' '}
                        {' '}
                        <Button variant="primary" size="sm">
                            <FaEdit /> Edit
                        </Button>
                        {' '}
                        {' '}
                        <Button variant="success" size="sm">
                            <FaInfoCircle /> Info
                        </Button>
                        </td>
                    </tr>
                    ))
                    }
                </tbody>
            </Table>
        </div>
    )
}
export default CarManagement