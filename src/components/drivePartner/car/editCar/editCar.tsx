import React, { useEffect, useState, useRef } from "react";
import { Container, Button, Col, Row, Form, Modal } from "react-bootstrap";
import { showCarInterface } from "../../../../types/carAdminInterface";
import { getCategory } from "../../../../features/axios/api/category/category";
import { findAllCars, editCar } from "../../../../features/axios/api/car/carAxios";
import { carValidator } from "../../../../Validators/adminValidators.ts/addCarValidator";
import { carInterface } from "../../../../types/carAdminInterface";
import { categoryInterface } from "../../../../types/categoryInterface";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../loading/loading";


const PartnerEditCar = ()=>{

    const exteriorImagesContainerRef = useRef(null);
    const [formData, setFormData] = useState<carInterface>({} as carInterface)
    const [currentData, setCurrentData] = useState<showCarInterface>({} as showCarInterface)
    const [category, setCategory] = useState<categoryInterface[]>([])
    const [validationErrors, setValidationErrors] = useState<Partial<Record<string, string>>>({})
    const [SelectedImg, setSelectedImg] = useState<File | string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [createdCar, setCreatedCar] = useState<Partial<carInterface>>({})
    const [deletedIndex, setDeletedIndex] = useState<{ index: number[]; type: 'interior' | 'exterior' }[]>([]);
    const [showModal, setShowModal] = useState(false)
    const [exteriorImg, setImg] = useState<File[]>([])
    const [interiorImg, setIntImg] = useState<File[]>([])
    const [thumbnail, setThumbnail] = useState<File[]>([])
    const navigate = useNavigate()
    const location = useLocation()
    const {id} = location.state

    let mergedExteriorImages = currentData.exterior ? [...currentData.exterior, ...exteriorImg] : [...exteriorImg];
    const mergedInteriorImages = currentData.interior ? [...currentData.interior, ...interiorImg] : [...interiorImg]
    const mergedThumbnailImages = currentData.thumbnailImg ? [currentData.thumbnailImg, ...thumbnail] : [...thumbnail]
    
    // const partnerToken = localStorage.getItem('partnerToken')
    // console.log("Partner Id is : ",partnerToken)
    // if(partnerToken)setFormData({...formData, addedById: partnerToken})   

    
    useEffect(()=>{
        const findCar = async()=>{
        
            try
            {
                const response = await findAllCars(id,'partner')
    
                if(response)
                {
                    console.log(response)
                    setCurrentData(response)
                }
                else
                {
                    console.log("no response found")
                }
            }
            catch(error:any)
            {
                console.log(error.message)
            }
        }
        findCar()
    }, [id])

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCategory();
                const categories: categoryInterface[] = response.allData;
                console.log("category  :", response);
                setCategory(categories);
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchData();
    }, []);
 
    const handleInterior = (e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault()


        const{name, files} = e.currentTarget

        if(files && files.length <= 3)
        {
            const imageFiles = Array.from(files).every((file)=>
            file.type.startsWith('image/'))
            if(imageFiles)
            {
                console.log(name, files)
                setIntImg((prevState)=>[...prevState, ...Array.from(files)])
            }
            else
            {
                window.alert("Please select image files")
                e.currentTarget.value = '';
            }
        }
        else
        {
            window.alert('Please select a maximum of three image files')
            e.currentTarget.value = '';
        }
    }

    
    const handleExterior = (e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault()

        const{name, files} = e.currentTarget

        if(files && files.length > 0)
        {
            const imageFiles = Array.from(files).every((file)=>
            file.type.startsWith('image/'))
            if(imageFiles)
            {
                console.log("name and files from exterior",name, files)
                console.log(formData.exterior)
                setImg((prevState)=>[...prevState, ...Array.from(files)])
                
            }
            else
            {
                window.alert("Please select image files")
                e.currentTarget.value = '';
            }
        }
        
    }

    const handleThumbnail = (e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault()
        const {name, files} = e.currentTarget

        console.log("name : ", name, "file : ", files)
        if(files)
        {
            const file = files[0]
            const fileSizeMb = 1
            if(!file.type.startsWith('image/'))
            {
                window.alert('Selected file should be an image')
                e.currentTarget.value = ''
                return
            }

            console.log("files size : ", file.size)
            if(file.size > fileSizeMb * 1024 * 1024)
            {
                window.alert(`Selected file should have the size less than ${fileSizeMb}MB`)
                e.currentTarget.value = ''
                return
            }
            console.log("file length : ", e.target.files?.length)
            if(e.target.files && e.target.files.length > 1)
                {
                    window.alert(`Only single file allowed to upload`)
                    e.currentTarget.value = ''
                    return
                }
                
            setThumbnail((prevState)=>[...prevState, ...Array.from(files)])
            console.log("merged thumbnail : ", mergedThumbnailImages)
            
        }
        
    }
    

    const deleteImageInterior = (indexs:number, deletecurrentData :boolean)=>{

        if(deletecurrentData)
        {
            console.log("delted data found")
            if(currentData && currentData.interior)
            {
                setDeletedIndex(prevState=> [...prevState, {index:[indexs], type: "interior"}])
                console.log("deleted Index :",deletedIndex)
                let updatedInterior = currentData.interior.filter((file, index)=> index !== indexs)
                setCurrentData({...currentData, interior: updatedInterior})
            }
        }
        else
        {
            if(formData && formData.interior)
            {
                console.log("reached delttion fro formData")
                let adjustedIndex = indexs - (currentData.interior ? currentData.interior.length : 0)
                let updatedInterior = formData.interior.filter((file, index)=> index !== adjustedIndex)
                setFormData({...formData, interior : updatedInterior})
            }
        }
    }

    const deleteImageExterior = (indexs:number, deleteCurrentData :boolean)=>{
        console.log(indexs, deleteCurrentData)
        if(deleteCurrentData)
        {
            if(currentData && currentData.exterior)
            {
                setDeletedIndex(prevState=> [...prevState, {index:[indexs], type: "exterior"}])
                console.log("deleted Index :",deletedIndex)
                console.log("deleteing currentData image")
                let updatedCurrentData = currentData.exterior?.filter((files, index)=>index !== indexs)
                setCurrentData({...currentData, exterior : updatedCurrentData })
            }
        }
        else
        {
            if(formData && formData.exterior)
            {
                console.log(formData.exterior)
                console.log("deleteing formData image")
                let AdjustedIndex = indexs - (currentData.exterior ? currentData.exterior.length : 0)
                let updatedFormData = formData.exterior?.filter((files, index)=>index !== AdjustedIndex)
                setFormData({...formData, exterior:updatedFormData})
            }
        }
    }

    const deleteImageThumbnail = (index: number, deleteCurrentData: boolean)=>{
        console.log("reached delete thumbnails")
        console.log(deleteCurrentData)
        if(deleteCurrentData)
        {
            setThumbnail([])   
            if(currentData && currentData.thumbnailImg)
            {
                setCurrentData({...currentData, thumbnailImg:undefined})
                console.log("deleted thumnbail")
                
                
            }
        }
        else
        {
            console.log("formData  : ", formData.thumbnailImg)
            setThumbnail([])
            if(formData && formData.thumbnailImg)
                {
                    console.log("formData  : ", formData.thumbnailImg)
                    setFormData({...formData, thumbnailImg: []})
                    console.log("deleted formData")
                    
                }
        }
    }

   

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setValidationErrors({});
        setFormData(prevFormData => ({
            ...prevFormData,
            ...currentData,
            interior: interiorImg,
            exterior: exteriorImg,
            thumbnailImg: thumbnail
        }));
    };
    
    useEffect(() => {
        const validateFormData = async () => {
            try {
                setIsLoading(true)
                console.log("validation starting")
                const valid = await carValidator(formData, currentData);
                if (Object.keys(valid).length === 0) {
                    const sendData = new FormData();
                    for (let [key, value] of Object.entries(formData)) {
                        if (key === 'interior' || key === 'exterior' || key ==='thumbnailImg') {
                            if (Array.isArray(value)) {
                                for (let item of value) {
                                    sendData.append(key, item);
                                }
                            }
                        }
                        else if (key === 'category' && typeof value === 'object' && value._id){
                            sendData.append('category', value._id);
                        } else {
                            sendData.append(key, value);
                        }
                    }
                    deletedIndex.forEach(({ index, type }) => {
                        sendData.append(`deleted${type.charAt(0).toUpperCase() + type.slice(1)}Index`, index.toString());
                    });                    

                    console.log("send Data  :", sendData)
                
                    const response = await editCar(sendData, 'partner');
                    if (response) {
                        setFormData({} as carInterface);
                        setCreatedCar(response.carCreate);
                        setIsLoading(false)
                        setShowModal(true);
                        toast.success(response.message);
                        navigate('/partner/manageCar')
                    } else {
                        setIsLoading(false)
                        toast.error("Error uploading car");
                    }
                } else {
                    setIsLoading(false)
                    setValidationErrors(valid);
                }
            } catch (error:any) {
                setIsLoading(false)
                console.log("Error:", error.message);
                toast.error(error.message);
            }
        };
    
        if (Object.keys(formData).length > 0) {
            validateFormData();
        }
    }, [formData]);
    
    

    

    return(
        <div className="addCar-body">
        <Container className="custom-container">
            {isLoading && <Loading/>}
            <h3 className="mb-5">Edit Car</h3>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Row className="mb-3">
                    <Col>
                    <Form.Group controlId="carName">
                        <Form.Label>Car name</Form.Label>
                        <Form.Control
                        type="text" 
                        value={currentData.name || ""}
                        className="input-type"
                        onChange={(e)=>setCurrentData({...currentData, name:e.target.value})}/>
                        <Form.Text className="text-danger">{validationErrors.name}</Form.Text>
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="Car Owner">
                        <Form.Label>Car Owner</Form.Label>
                        <Form.Control
                        as='select'
                        value={currentData.owner || ''} 
                        className="input-type"
                        onChange={(e)=>setCurrentData({...currentData, owner:e.target.value})}>
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
                        value={currentData.category?.toString()}
                        onChange={(e)=>setCurrentData({...currentData, category:(e.target.value)})}>
                            <option value=''>---select Category---</option>
                            { category.map((categ, index)=>(
                                <option key={index + 1} value={categ._id}>{categ.name}</option>
                            ))    
                            }
                        </Form.Control>
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="Engine Type">
                        <Form.Label>Engine Type</Form.Label>
                        <Form.Control
                        type="text" 
                        value={currentData?.engine || ""} 
                        className="input-type"
                        onChange={(e)=>setCurrentData({...currentData, engine:e.target.value})}/>
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
                    value={currentData.transmission || ""} 
                    className="input-type" 
                    onChange={(e)=>setCurrentData({...currentData, transmission:e.target.value})}/>
                    <Form.Text className="text-danger">{validationErrors.transmission}</Form.Text>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="fuelType">
                    <Form.Label>Fuel Type</Form.Label>
                    <Form.Control 
                    type="text"
                    value={currentData.fuelType || ""} 
                    className="input-type"
                    onChange={(e)=>setCurrentData({...currentData, fuelType:e.target.value})}/>
                    <Form.Text className="text-danger">{validationErrors.fuelType}</Form.Text>
                    </Form.Group>
                </Col>
                </Row>
                <Row className="mb-3">
                <Col>
                    <Form.Group controlId="status">
                    <Form.Label>Status</Form.Label>
                    <Form.Control as='select' value={currentData.status || ''} onChange={(e)=>setCurrentData({...currentData, status:e.target.value as "available" | "maintenance" | "booked" | "not available"})}>
                        <option value=''>---select Status---</option>
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
                        value={currentData.addedBy || ""} 
                        className="input-type"
                        onChange={(e)=>setCurrentData({...currentData, addedBy:e.target.value})}/>
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
                    value={currentData.description || ""} 
                    onChange={(e)=>setCurrentData({...currentData, description: e.target.value})}/>
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="Engine Type">
                        <Form.Label>Mileage</Form.Label>
                        <Form.Control
                        type="number" 
                        value={currentData?.mileage || ""} 
                        className="input-type"
                        onChange={(e)=>setCurrentData({...currentData, mileage:parseInt(e.target.value)})}/>
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
                    value={currentData.vehicleNumber || ""} 
                    className="input-type" 
                    onChange={(e)=>setCurrentData({...currentData, vehicleNumber:e.target.value})}/>
                    <Form.Text className="text-danger">{validationErrors.vehicleNumber}</Form.Text>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="rentPricePerWeek">
                    <Form.Label>Rent Price (Per Week)</Form.Label>
                    <Form.Control 
                    type="number"
                    value={currentData.rentPricePerWeek || 0} 
                    className="input-type"
                    onChange={(e)=>setCurrentData({...currentData, rentPricePerWeek:parseInt(e.target.value)})}
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
                    value={currentData.rentPricePerDay || 0} 
                    className="input-type"
                    onChange={(e)=>setCurrentData({...currentData, rentPricePerDay:parseInt(e.target.value)})}/>
                    <Form.Text className="text-danger">{validationErrors.rentPricePerDay}</Form.Text>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="insuranceDetails">
                    <Form.Label>Insurance Number</Form.Label>
                    <Form.Control 
                    type="text"
                    value={currentData.insuranceDetails || ""} 
                    className="input-type"
                    onChange={(e)=>setCurrentData({...currentData, insuranceDetails:e.target.value})}/>
                    <Form.Text className="text-danger">{validationErrors.insuranceDetails}</Form.Text>
                    </Form.Group>
                </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                    <Form.Group controlId="Seats">
                        <Form.Label>Seats</Form.Label>
                        <Form.Control 
                        as='select' 
                        value={currentData.seats || ''} 
                        onChange={(e)=>setCurrentData({...currentData, seats :parseInt(e.target.value)})}>
                            <option value="">---select seats</option>
                            <option value="2">2 seater</option>
                            <option value="4">4 seater</option>
                            <option value="5">5 seater</option>
                            <option value="6">6 seater</option>
                            <option value="7">7 seater</option>
                        </Form.Control>
                        <Form.Text className="text-danger">{validationErrors.seats}</Form.Text>
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="Thumbnail">
                        <Form.Label>Thumbnail</Form.Label>
                        <Form.Control
                        type="file"
                        name="thumbnailImg"
                        onChange={handleThumbnail}/>
                        <Form.Text>{validationErrors.thumbnail}</Form.Text>
                    </Form.Group>
                    {mergedThumbnailImages &&
                    mergedThumbnailImages.map((file, index)=>(
                        <div key={index}>
                            {
                                typeof file === 'object' ? (
                                    <>
                                    <img onClick={()=>setSelectedImg(file)}
                                    src={URL.createObjectURL(file)}
                                    alt={`Uploaded Image ${index}`} 
                                    style={{ width: '100px', height: 'auto', margin: '5px' }}
                                    />

                                    <Button onClick={()=>deleteImageThumbnail(index, false)} variant="danger">Delete</Button>
                                    </>
                                ) : (
                                    <>
                                    <img onClick={()=>setSelectedImg(file)}
                                    src={file}
                                    alt={`Uploaded Image ${index}`} 
                                    style={{ width: '100px', height: 'auto', margin: '5px' }}/>

                                    <Button onClick={()=>deleteImageThumbnail(index, true)} variant="danger">Delete</Button>
                                    </>
                                )
                            }
                        </div>
                    ))
                    }

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
                    onChange={handleInterior}
                    className="custom-file-input"/>
                    <Form.Text className="text-danger">{validationErrors.interior}</Form.Text>
                    </Form.Group>
                    {mergedInteriorImages && 
                    mergedInteriorImages.map((file, index)=>(
                        <div key={index}>
                            {
                                typeof file === 'object'?
                                (
                                    <>
                                    <img onClick={()=>setSelectedImg(file)}
                                    src={URL.createObjectURL(file)}
                                    alt={`Uploaded Image ${index}`} 
                                    style={{ width: '100px', height: 'auto', margin: '5px' }}
                                    />

                                    <Button onClick={()=>deleteImageInterior(index, false)} variant="danger">Delete</Button>
                                    </>
                                ) : 
                                (
                                    <>
                                    <img onClick={()=>setSelectedImg(file)}
                                    src={file}
                                    alt={`Uploaded Image ${index}`} 
                                    style={{ width: '100px', height: 'auto', margin: '5px' }}/>

                                    <Button onClick={()=>deleteImageInterior(index, true)} variant="danger">Delete</Button>
                                    </>
                                )
                            }
                            
                        
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
                    {mergedExteriorImages && 
                    mergedExteriorImages.map((file, index)=>(
                        <div key={index}>

                            {
                                typeof file === 'object' ? (
                                    <>
                                    <img onClick={()=>setSelectedImg(file)}
                                    src={URL.createObjectURL(file)}
                                    alt={`Uploaded Image ${index}`} 
                                    style={{ width: '100px', height: 'auto', margin: '5px' }}
                                    // onDragStart={(e) => handleDragStart(e, index)}
                                    // onDragOver={handleDragOver}
                                    // onDrop={(e) => handleDrop(e, index)}
                                    />

                                    <Button onClick={()=>deleteImageExterior(index, false)} variant="danger">Delete</Button>
                                    </>
                                ) :
                                (
                                    <>
                                    <img onClick={()=>setSelectedImg(file)}
                                    src={file}
                                    alt={`Uploaded Image ${index}`} 
                                    style={{ width: '100px', height: 'auto', margin: '5px' }}
                                    // onDragStart={(e) => handleDragStart(e, index)}
                                    // onDragOver={handleDragOver}
                                    // onDrop={(e) => handleDrop(e, index)}
                                    />
                                    
                                    <Button onClick={()=>deleteImageExterior(index, true)} variant="danger">Delete</Button>
                                    </>
                                )
                            }
                        

                        
                        </div>
                    ))
                    }
                    {
                        
                    }
                    <div ref={exteriorImagesContainerRef} id="exterior-images-container">
                    </div>
                </Col>
                </Row>

                <Button type="submit" className="mx-0" size="lg">
                    Submit
                </Button>
            </Form>
            <Modal show={!!SelectedImg} onHide={()=>setSelectedImg(null)}>
                <Modal.Body>
                    {
                        typeof SelectedImg === 'string' ? (
                            <img alt="Selected Image" src={SelectedImg} style={{ width: '100%', height: 'auto' }} />
                        ) : 
                        (
                            <img src={SelectedImg ? URL.createObjectURL(SelectedImg) : "http://www.w3.org/2000/svg"} style={{ width: '100%', height: 'auto' }}/>
                        )
                    }
                        
                </Modal.Body>
            </Modal>
        </Container>
        </div>
    )
}

export default PartnerEditCar