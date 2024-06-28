import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { Types } from 'mongoose';
import { BsPencil, BsTrash, BsList } from 'react-icons/bs';
import { getCategory, unList, List } from '../../../../features/axios/api/category/category';
import { categoryInterface } from '../../../../types/categoryInterface';
import './categoryManage.css'
import { toast } from 'react-toastify';


const ManageCategory = ()=>{

    const [data, setData] = useState<categoryInterface[]>([])
    

    const getCategories = ()=>{
        getCategory()
        .then((response)=>{
            if(response.status === "success")
            {
                console.log("categories fetched")
                console.log("datss :", response.allData)
                setData(response.allData)
                console.log("state stored :",data)
            }
            else
            {
                toast.error("failed to retreive the data")
            }
        })
        .catch((error:any)=>{
            console.log(error.message)
            toast.error(error.message)
        })
    }
    useEffect(()=>{
        getCategories()
    },[])

    const handleList = (categoryId:string)=>{
        console.log("entering to list")
            List(categoryId)
            .then((response)=>{
                console.log(response.message)
                getCategories()
            })
            .catch((error:any)=>{
                console.log(error.message)
                toast.error(error.message)
            })
    }

    const handleUnlist = (categoryId:string)=>{
        unList(categoryId)
            .then((response)=>{
                console.log(response.message)
                getCategories()
            })
            .catch((error:any)=>{
                console.log(error.message)
                toast.error(error.message)
            })
    }
    

    return(
        <div className='table-spce'>
        <h3>Manage Category</h3>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((category, index)=>(
                    <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{category.name}</td>
                    <td style={{width:"67%"}}>{category.description}</td>
                    <td>
                        <Button variant="info" size="sm">
                            <Link to={`/admin/editCategory/${category._id}`} style={{color:"#343434"}}><BsPencil /> Edit</Link>
                        </Button>
                        {' '}
                        {' '}
                        <Button variant={category.isListed ? 'success' : 'danger'} size="sm" onClick={()=>(category.isListed ? handleUnlist(category._id!) : handleList(category._id!))}>
                            <BsList /> {category.isListed ? 'Listed' : 'Unlisted'}
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

export default ManageCategory