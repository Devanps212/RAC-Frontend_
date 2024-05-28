import React, { useEffect, useState } from 'react';
import './home.css';
import Banner from '../../commonComponent/banner/banner';
import Cards from '../../commonComponent/cards/cards';
import { findAllCars } from '../../../features/axios/api/car/carAxios';
import { toast } from 'react-toastify';
import { showCarInterface } from '../../../types/carAdminInterface';
import { useNavigate } from 'react-router-dom';
import { bookingInterface } from '../../../types/bookingInterface';
import { locationFinding } from '../../../features/axios/api/user/userAuthentication';
import { LocationSuggestion } from '../../../types/bookingInterface';
import { bookingValidator } from "../../../Validators/userValidator.ts/bookingValidator";
import CollaboratedPartners from '../../commonComponent/partners/partners';
import CustomerFav from '../../commonComponent/customerFavorite/customerFavorite';
import Footer from '../../drivePartner/footer/footer';


function Home() {

  const [cars, setCars] = useState<{[key:string] : showCarInterface[]}>({})
  const [selectedCar, setSelectedCar] = useState<string | undefined>()
  const [bookingData, setBookingData] = useState<bookingInterface | null>(null)
  const [PickupSuggestions, setPickupSuggestions] = useState<LocationSuggestion[]>([]);
  const [DropOffSuggestions, setDropOffSuggestions] = useState<LocationSuggestion[]>([]);
  const [Pickuplocation, setPickupLocation]= useState('')
  const [DropOffLocation, setDropOffLocation]= useState('')
  const [selectedLocation, setSelectedLocation] = useState<LocationSuggestion>({} as LocationSuggestion)
  const [selectedDropLocation, setSelectedDropLocation] = useState<LocationSuggestion>({} as LocationSuggestion)
  const [pickupTime, setPickupTime] = useState<string>('')
  const [dropOffTime, setDropOffTime] = useState<string>('')
  const [pickUpDate, setPickupDate] = useState<Date>(new Date())
  const [dropOffDate, setDropOffDate] = useState<Date>(new Date())
  const navigate = useNavigate()
  
  const handleSearch = async(locations: string, purpose: string)=>{
    try
    {
      if(purpose === 'pickup')
        {
          setPickupLocation(locations)
          const response = await locationFinding(locations)
          setPickupSuggestions(response.data)
        }
        else
        {
          setDropOffLocation(locations)
          const response = await locationFinding(locations)
          setDropOffSuggestions(response.data)
        }
    }
    catch(error:any)
    {
      if(error.message !== "Cannot read properties of undefined (reading 'message')")
        {
          toast.error(error.message)
        }
    }
  }

  const handleClick = (location: LocationSuggestion, purpose: string)=>{
    if(purpose === 'pickup')
      {
        setPickupLocation(location.name)
        setSelectedLocation(location)
        setPickupSuggestions([])
      }
      else
      {
        setDropOffLocation(location.name)
        setSelectedDropLocation(location)
        setDropOffSuggestions([])
      }
  }

  const setTime = (time: string, purpose: string)=>{
    if(purpose === "pickup"){
        const inputValue = time
        const [hours, minutes] = inputValue.split(':');
        const formattedTime = `${hours}:${minutes || '00'}`
        setPickupTime(formattedTime)
      }else{
        const inputValue = time
        const [hours, minutes] = inputValue.split(':');
        const formattedTime = `${hours}:${minutes || '00'}`
        setDropOffTime(formattedTime)
      }
  }

  const handleDate = (Date: Date, purpose: string)=>
  {
    if(purpose === "pickup"){
        setPickupDate(Date)
      }else{
        setDropOffDate(Date)
      }
  }


  const handleSubMission = async( value: string,
    DropOffValue: string,
    pickUpDate: Date,
    dropOffDate: Date,
    pickupTime: string,
    dropOffTime: string)=>{

      const data = {
        pickupLocation: value,
        dropOffLocation: DropOffValue,
        startDate: pickUpDate,
        endDate: dropOffDate,
        pickupTime: pickupTime,
        dropOffTime: dropOffTime
      }
      const checking = await bookingValidator(data)
      console.log("checking : ",checking)
      if(checking !== null){
        toast.error(Object.values(checking).join(", "));
      }
      else{
        setBookingData(data);
        console.log(bookingData);
      }
      
    }

    useEffect(()=>{
      if(bookingData){
        
        const encodedBookingData = encodeURIComponent(JSON.stringify(bookingData));
        navigate(`/users/Allcars?bookingData=${encodedBookingData}`);
        setBookingData(null)
      }
    }, [bookingData, navigate])




  useEffect(()=>{
    const findCars = async()=>{
      try{
        const response = await findAllCars('all', 'user')
        if(response){
            const groupCars = response.reduce((acc:{[key:string]: showCarInterface[]}, car:showCarInterface)=>{
              let categoryName : string;
              if(car.category && typeof car.category === 'object' && 'name' in car.category){
                  categoryName = car.category.name
                }
                else{
                  categoryName = 'Unrecognized'
                }if(!acc[categoryName]){
                    acc[categoryName] = []
                  }acc[categoryName].push(car)
          
                  return acc
          },{})

            setCars(groupCars)
          } 
      }catch(error:any){
        toast.error(error.message)
      }
    }
    findCars()
  }, [])



  useEffect(()=>{
    if(selectedCar){
      navigate(`/users/carDetail?carId=${selectedCar}`)
    }
  }, [selectedCar])

  
  

  return (
    <div className="home">
      <Banner 
      search={handleSearch} 
      PickupPlaces={PickupSuggestions}
      DropOffPlaces={DropOffSuggestions}
      click={handleClick}
      value={Pickuplocation}
      DropOffValue={DropOffLocation}
      handleTime={setTime}
      pickupTime={pickupTime}
      dropOffTime={dropOffTime}
      handleDate={handleDate}
      pickUpDate={pickUpDate}
      dropOffDate={dropOffDate}
      handleFormSubmission={handleSubMission}/>
      {/* <h1 className='text-center mt-5 mb-3'>Cars</h1> */}
      <CollaboratedPartners/>
      <div className='customerFavour'>
        <CustomerFav/>
      </div>
      <Footer/>
      {/* <Cards 
      cars={cars}
      setSelectedCar={setSelectedCar}/> */}
    </div>
  );
}

export default Home;
