import React, { useEffect, useState } from "react";
import { Container, Button, Col, Row, Form, Modal } from "react-bootstrap";
import { carInterface, showCarInterface } from "../../../../types/carAdminInterface";
import { getCategory } from "../../../../features/axios/api/category/category";
import { carValidator } from "../../../../Validators/adminValidators.ts/addCarValidator";
import { categoryInterface } from "../../../../types/categoryInterface";
import { createCar } from "../../../../features/axios/api/car/carAxios";
import CarImageComponent from "../../../commonComponent/carImage/carImage";
import Loading from "../../../loading/loading";
import './carAdd.css'
import { toast } from "react-toastify";

const PartnerAddCar = ()=>{

    const [formData, setFormData] = useState<carInterface>({} as carInterface)
    const [category, setCategory] = useState<categoryInterface[]>([])
    const [validationErrors, setValidationErrors] = useState<Partial<Record<string, string>>>({})
    const [SelectedImg, setSelectedImg] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [createdCar, setCreatedCar] = useState<Partial<showCarInterface>>({})
    const [showModal, setShowModal] = useState(false)

    const partnerToken = localStorage.getItem('partnerToken') ?? '';
    console.log("partner token  :", partnerToken)

    useEffect(() => {
        getCategory()
          .then((response) => {
            const categories: categoryInterface[] = response.allData;
            console.log(response);
            setCategory(categories);
            if (categories.length > 0) {
              setFormData({
                ...formData,
                category: categories[0]._id,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
    
        setFormData({
          ...formData,
          status: "available",
          owner:'User'
        });
      }, []);

    const handleDrag = (e:React.DragEvent<HTMLDivElement>, index:number)=>
    {
        e.dataTransfer.setData("index", index.toString())
    }
    const handleDrop = (e:React.DragEvent<HTMLDivElement>, newIndex:number)=>{
        e.preventDefault()
        const oldIndex = parseInt(e.dataTransfer.getData("index"))
        if(!isNaN(oldIndex) && formData.exterior)
        {
            const updateIndex = [...formData.exterior]
            const imageToMove = updateIndex.splice(oldIndex, 1)[0]
            updateIndex.splice(newIndex, 0, imageToMove)
            setFormData({...formData, exterior:updateIndex})
        }
    }

    const handleInterior = (e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault()


        const{name, files} = e.currentTarget

        const imageSizeMB = 1

        if(files && files.length > 0)
        {
            const allowedExtensions = /\.(png|jpg|jpeg)$/i;
            const imageFiles = Array.from(files).every((file)=>
            allowedExtensions.test(file.name) && file.type.startsWith('image/'))
            if(imageFiles)
            {
                const groupSizeMB = Array.from(files).every((file)=> file.size <= imageSizeMB * 1024 * 1024)
                if(!groupSizeMB)
                {
                    window.alert("Upload Image size upto 1MB")
                    return
                }
                console.log(name, files)
                setFormData((prevState)=>({...prevState, [name] : Array.from(files)}))
            }
            else
            {
                window.alert("Please select image files")
                e.currentTarget.value = '';
            }
        }
    }

    const handleExterior = (e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault()

        const{name, files} = e.currentTarget

        let fileSizeMB = 1
        if(files && files.length > 0)
        {
            const allowedExtensions = /\.(png|jpg|jpeg)$/i;
            const imageFiles = Array.from(files).every((file)=>
            allowedExtensions.test(file.name) && file.type.startsWith('image/'))
            if(imageFiles)
            {
                let groupSize = Array.from(files).every((file)=> file.size <= fileSizeMB * 1024 * 1024)
                console.log(groupSize)
                if(!groupSize)
                {
                    window.alert("Upload Image size upto 1MB")
                    return
                }
                console.log("name and files from exterior",name, files)
                setFormData((prevState)=>({...prevState, [name]: Array.from(files)}))
            }
            else
            {
                window.alert("Please select image files and Only PNG, JPG, and JPEG files are allowed.")
                e.currentTarget.value = '';
            }
        }
        
    }

    const deleteImageInterior = (indexs:number)=>{
        let updatedFormData = formData.interior?.filter((files, index)=>index !== indexs)
        setFormData({...formData, interior:updatedFormData})
    }

    const deleteImageExterior = (indexs:number)=>{
        let updatedFormData = formData.exterior?.filter((files, index)=>index !== indexs)
        setFormData({...formData, exterior:updatedFormData})
    }

    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault()
        setIsLoading(true)
        console.log("formData before update:", formData)
        
        setFormData(prevFormdata => {
            return {...prevFormdata, status: 'available', addedById: partnerToken};
        });
        
        setFormData((prevFormData) => {
            console.log("form status : ", prevFormData.status, prevFormData);
            return prevFormData;
          });
          console.log("owner of car :", formData.owner)
          if(formData.status === undefined)
          {
            setFormData({...formData, owner:'User'})
            console.log("owner setted")
          }
          
        console.log("creating car")
        const valid = await carValidator(formData)
        if(Object.keys(valid).length === 0)
        {
            try{
                console.log("formData: ", formData)
                const sendData = new FormData()
                for(let [key, value] of Object.entries(formData))
                {
                    if(key ==='interior' || key=== 'exterior')
                    {
                        if(Array.isArray(value))
                        {
                            for(let item of value)
                            {
                                sendData.append(key, item)
                            }
                        }
                    }
                    else
                    {
                        sendData.append(key, value)
                    }
                }
                const response = await createCar(sendData, 'partner');
                if (response)
                {
                    console.log(response);
                    console.log(response.carCreate)
                    setCreatedCar(response.carCreate)
                    toast.success(response.message)
                    setFormData({} as carInterface)
                    setIsLoading(false)
                    setShowModal(true)
                    return true
                } 
                else 
                {
                    console.log("error");
                    toast.error("Error uploading car")
                    setIsLoading(false)
                    return true
                }
                
            }
            catch(error:any)
            {
                setIsLoading(false)
                console.log("error : ", error.message);
                toast.error(error.message);
            }
        }
        else
        {
            setIsLoading(false)
            console.log("error found")
            console.log(valid) 
            setValidationErrors(valid)
            console.log("validation errors :",validationErrors)
        }
    }


    return(
        <div className="addCar-body">
            {isLoading && <Loading/>}
        <Container className="custom-container">
            <h3 className="mb-5">Add Car</h3>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Row className="mb-3">
                    <Col>
                    <Form.Group controlId="carName">
                        <Form.Label>Car name</Form.Label>
                        <Form.Control
                        type="text" 
                        value={formData.name || ""}
                        className="input-type"
                        onChange={(e)=>setFormData({...formData, name:e.target.value})}/>
                        <Form.Text className="text-danger">{validationErrors.name}</Form.Text>
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="Car Owner">
                        <Form.Label>Car Owner</Form.Label>
                        <Form.Control
                        as='select'
                        defaultValue={formData.owner || ''}
                        className="input-type"
                        onChange={(e)=>setFormData({...formData, owner:e.target.value})}>
                            <option value=''>---select Owner---</option>
                            <option value='Partner'>Partner</option>
                        </Form.Control>
                        <Form.Text className="text-danger">{validationErrors.owner}</Form.Text>
                    </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                    <Form.Group controlId="Car category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control as='select'
                        defaultValue=''
                        onChange={(e)=>setFormData({...formData, category:e.target.value})}>
                            <option value="">---select Category---</option>
                            { category.map((categ, index)=>(
                                <option key={index + 1} value={categ._id}>{categ.name}</option>
                            ))    
                            }
                        </Form.Control>
                        <Form.Text className="text-danger">{validationErrors.category}</Form.Text>
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="Engine Type">
                        <Form.Label>Engine Type</Form.Label>
                        <Form.Control
                        type="text" 
                        value={formData?.engine || ""} 
                        className="input-type"
                        onChange={(e)=>setFormData({...formData, engine:e.target.value})}/>
                        <Form.Text className="text-danger">{validationErrors.engine}</Form.Text>
                    </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                <Col>
                    <Form.Group controlId="transmission">
                    <Form.Label>Transmission</Form.Label>
                    <Form.Control 
                    type="text"
                    value={formData.transmission || ""} 
                    className="input-type" 
                    onChange={(e)=>setFormData({...formData, transmission:e.target.value})}/>
                    <Form.Text className="text-danger">{validationErrors.transmission}</Form.Text>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="fuelType">
                    <Form.Label>Fuel Type</Form.Label>
                    <Form.Control 
                    type="text"
                    value={formData.fuelType || ""} 
                    className="input-type"
                    onChange={(e)=>setFormData({...formData, fuelType:e.target.value})}/>
                    <Form.Text className="text-danger">{validationErrors.fuelType}</Form.Text>
                    </Form.Group>
                </Col>
                </Row>
                <Row className="mb-3">
                <Col>
                    <Form.Group controlId="status">
                    <Form.Label>Status</Form.Label>
                    <Form.Control as='select' value={formData.status?formData.status : ''} onChange={(e)=>setFormData({...formData, status:e.target.value as "available" | "maintenance" | "booked" | "not available"})}>
                        <option value="">---select Status---</option>
                        <option value="available">Available</option>
                        <option value="maintenance">Under Maintenance</option>
                        <option value="booked">Booked</option>
                        <option value="not available">Not available</option>
                    </Form.Control>
                    <Form.Text className="text-danger">{validationErrors.status}</Form.Text>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="addedBy">
                    <Form.Label>Added By</Form.Label>
                        <Form.Control 
                        type="text"
                        value={formData.addedBy || ""} 
                        className="input-type"
                        onChange={(e)=>setFormData({...formData, addedBy:e.target.value})}/>
                        <Form.Text className="text-danger">{validationErrors.addedBy}</Form.Text>
                    </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                <Col>
                    <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                    as="textarea" 
                    rows={3} 
                    placeholder="Enter description" 
                    className="input-type"
                    value={formData.description || ""} 
                    onChange={(e)=>setFormData({...formData, description: e.target.value})}/>
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="Engine Type">
                        <Form.Label>Mileage</Form.Label>
                        <Form.Control
                        type="number" 
                        value={formData?.mileage || ""} 
                        className="input-type"
                        onChange={(e)=>setFormData({...formData, mileage:parseInt(e.target.value)})}/>
                        <Form.Text className="text-danger">{validationErrors.mileage}</Form.Text>
                    </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                <Col>
                    <Form.Group controlId="vehicleNumber">
                    <Form.Label>Vehicle Number</Form.Label>
                    <Form.Control 
                    type="text"
                    value={formData.vehicleNumber || ""} 
                    className="input-type" 
                    onChange={(e)=>setFormData({...formData, vehicleNumber:e.target.value})}/>
                    <Form.Text className="text-danger">{validationErrors.vehicleNumber}</Form.Text>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="rentPricePerWeek">
                    <Form.Label>Rent Price (Per Week)</Form.Label>
                    <Form.Control 
                    type="number"
                    value={formData.rentPricePerWeek || 0} 
                    className="input-type"
                    onChange={(e)=>setFormData({...formData, rentPricePerWeek:parseInt(e.target.value)})}
                     />
                     <Form.Text className="text-danger">{validationErrors.rentPricePerWeek}</Form.Text>
                    </Form.Group>
                </Col>
                </Row>

                <Row className="mb-3">
                <Col>
                    <Form.Group controlId="rentPricePerDay">
                    <Form.Label>Rent Price (Per Day)</Form.Label>
                    <Form.Control 
                    type="number"
                    value={formData.rentPricePerDay || 0} 
                    className="input-type"
                    onChange={(e)=>setFormData({...formData, rentPricePerDay:parseInt(e.target.value)})}/>
                    <Form.Text className="text-danger">{validationErrors.rentPricePerDay}</Form.Text>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="insuranceDetails">
                    <Form.Label>Insurance Number</Form.Label>
                    <Form.Control 
                    type="text"
                    value={formData.insuranceDetails || ""} 
                    className="input-type"
                    onChange={(e)=>setFormData({...formData, insuranceDetails:e.target.value})}/>
                    <Form.Text className="text-danger">{validationErrors.insuranceDetails}</Form.Text>
                    </Form.Group>
                </Col>
                </Row>

                <Row className="mb-3">
                <Col>
                    <Form.Group controlId="interior">
                    <Form.Label>Interior</Form.Label>
                    <Form.Control 
                    type="file" 
                    name="interior"
                    multiple
                    onChange={handleInterior}/>
                    <Form.Text className="text-danger">{validationErrors.interior}</Form.Text>
                    </Form.Group>
                    {formData.interior && 
                    formData.interior.map((file, index)=>(
                        <div key={index}>
                        <img onClick={()=>setSelectedImg(file)}
                        src={URL.createObjectURL(file)}
                        alt={`Uploaded Image ${index}`} 
                        style={{ width: '100px', height: 'auto', margin: '5px' }}/>
                        <Button onClick={()=>deleteImageInterior(index)} variant="danger">Delete</Button>
                        </div>
                    ))
                    }
                </Col>
                <Col>
                    <Form.Group controlId="exterior">
                    <Form.Label>Exterior</Form.Label>
                    <Form.Control 
                    type="file"
                    name="exterior" 
                    multiple
                    onChange={handleExterior}/>
                    <Form.Text className="text-danger">{validationErrors.exterior}</Form.Text>
                    </Form.Group>
                    {formData.exterior && 
                    formData.exterior.map((file, index)=>(
                        <div key={index}>
                        <img onClick={()=>setSelectedImg(file)}
                        src={URL.createObjectURL(file)}
                        alt={`Uploaded Image ${index}`} 
                        style={{ width: '100px', height: 'auto', margin: '5px' }}
                        onDragStart={(e)=>handleDrag(e,index)}
                        onDragOver={(e)=>e.preventDefault()}
                        onDrop={(e)=>handleDrop(e, index)}/>
                        <Button onClick={()=>deleteImageExterior(index)} variant="danger">Delete</Button>
                        </div>
                    ))
                    }
                </Col>
                </Row>

                <Button type="submit" className="mx-0" size="lg">
                    Submit
                </Button>
            </Form>
            <Modal show={!!SelectedImg} onHide={()=>setSelectedImg(null)}>
                <Modal.Body>
                <img alt="Selected Image" src={SelectedImg ?URL.createObjectURL(SelectedImg): "http://www.w3.org/2000/svg"} style={{ width: '100%', height: 'auto' }} />
                </Modal.Body>
            </Modal>
        </Container>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <h4>Car Added successfully</h4>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <CarImageComponent pathImage={createdCar.exterior}/>
                    <Col className="text-right">
                        <div className="d-flex justify-content-center align-items-center">
                            <h3 className="mb-5">{createdCar.name}</h3>
                        </div>
                        <ul className="list-unstyled">
                            {Object.entries(createdCar)
                            .filter(([key]) => key !== "interior" && key !== "exterior")
                            .map(([key, value], index) => (
                                <li key={index} className="d-flex justify-content-between">
                                    <span className="font-weight-bold">{key}</span>
                                    <span>{String(value)}</span>
                                </li>
                            ))}
                        </ul>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>        
        </div>
    )
}

export default PartnerAddCar