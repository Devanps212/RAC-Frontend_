import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { createCategory } from '../../../../features/axios/api/category/category';
import { useNavigate } from 'react-router-dom';
import './category.css'
import { toast } from 'react-toastify';

const AddCategoryPage = () => {

  const navigate = useNavigate()
  const [category, setCategory] = useState({
    name:'',
    description: ''
  })

  const handleSubmit = (e:React.FormEvent)=>{
    e.preventDefault()

    const {name, description} = category
    if(name.trim() == '')
    {
      toast.error("Enter a valid category")
    }
    else
    {
      createCategory(name, description)
      .then((response)=>{
        console.log(response)
        if(response.status === "success")
        {
          toast.success(response.message)
          setCategory({name:'', description:''})
          navigate('/admin/manageCategory')
        }
        else
        {
          console.log("else :", response.message)
          toast.error(response.message || "Unexpected error occured")
        }
      })
      .catch((error:any)=>{
        console.log(error)
        toast.error(error.message)
      })
    }
    

  }

  return (
    <Container className='container-body'>
      <h2 className="mt-3">Add Category</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="categoryName">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category name"
            value={category.name}
            required
            onChange={(e)=>setCategory({...category, name:e.target.value})}
            className='input-text'
          />
        </Form.Group>
        <Form.Group controlId='categoryDescription'>
          <Form.Label>Description</Form.Label>
          <Form.Control
          as='textarea'
          rows={3}
          placeholder='write a description about the category'
          value={category.description}
          onChange={(e)=>setCategory({...category, description:e.target.value})}
          className='input-text'
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Category
        </Button>
      </Form>
    </Container>
  );
};

export default AddCategoryPage;
