import React from "react"
import { Table, Button } from "react-bootstrap"
import { FaTrash, FaEdit, FaInfoCircle } from 'react-icons/fa';
import './carManage.css'

const CarManagement = ()=>{
    return(
        <div className="table-body">
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
                    <tr>
                        <td>1</td>
                        <td>Lexus</td>
                        <td>give image here </td>
                        <td>Company</td>
                        <td>Luxury</td>
                        <td className="text-success">Available</td>
                        <td>
                        <Button variant="danger" size="sm">
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
                </tbody>
            </Table>
        </div>
    )
}
export default CarManagement