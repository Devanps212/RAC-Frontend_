import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { categorySingle,editCategory } from "../../../../features/axios/api/category/category";
import './editCategory.css'
import { toast } from "react-toastify";


const EditCategory = ()=>{

    const navigate = useNavigate()

    const [data, setData] = useState({
        _id:'',
        name:'',
        description:''
    })
    
    const { categoryId } = useParams<{ categoryId: string }>();
    console.log(categoryId);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryData = await categorySingle(undefined,categoryId);

                console.log("category data :", categoryData.categoryExist)
            
                setData(categoryData.categoryExist)
            } catch (error) {
                console.error("Error fetching category data:", error);
            }
        };

        fetchData();
    }, [categoryId]);

    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault()
        console.log("data: ",data)
        editCategory(data)
        .then((response)=>{
            console.log("response taken: ",response.message)
            toast.success(response.message)
            navigate('/admin/manageCategory')
        })
        .catch((error:any)=>{
            console.log(error)
        })

    }


    return(
        <div>
            <Form className="edit-category-form" onSubmit={handleSubmit}>
            <h3 className="mb-5">Edit Category</h3>
            <Form.Group controlId="formCategoryName">
                <Form.Label className="form-label">Category Name</Form.Label>
                <Form.Control
                type="text"
                placeholder="Enter category name"
                name="name"
                value={data.name}
                className="form-control"
                onChange={(e)=>setData({...data, name:e.target.value})}
                />
            </Form.Group>

            <Form.Group controlId="formCategoryDescription">
                <Form.Label className="form-label">Category Description</Form.Label>
                <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter category description"
                name="description"
                value={data.description}
                className="form-control"
                onChange={(e)=>setData({...data, description: e.target.value})}
                />
            </Form.Group>

            <Button variant="primary" type="submit" className="btn-save">
                Save Changes
            </Button>
        </Form>
        </div>
        
    )
}
export default EditCategory