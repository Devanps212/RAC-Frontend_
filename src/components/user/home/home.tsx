import React, { useEffect, useState } from 'react';
import './home.css';
import Banner from '../../commonComponent/banner/banner';
import Cards from '../../commonComponent/cards/cards';
import { findAllCars } from '../../../features/axios/api/car/carAxios';
import { toast } from 'react-toastify';
import { showCarInterface } from '../../../types/carAdminInterface';
import { useNavigate } from 'react-router-dom';


function Home() {

  const [cars, setCars] = useState<{[key:string] : showCarInterface[]}>({})
  const [selectedCar, setSelectedCar] = useState<string | undefined>()

  const navigate = useNavigate()


  useEffect(()=>{
    const findCars = async()=>{
      try
      {
        const response = await findAllCars('all', 'user')
        if(response)
          {
            const groupCars = response.reduce((acc:{[key:string]: showCarInterface[]}, car:showCarInterface)=>{
              let categoryName : string;
              if(car.category && typeof car.category === 'object' && 'name' in car.category)
                {
                  categoryName = car.category.name
                }
                else
                {
                  categoryName = 'Unrecognized'
                }
          
                if(!acc[categoryName])
                  {
                    acc[categoryName] = []
                  }
                  acc[categoryName].push(car)
          
                  return acc
          
            },{})

            setCars(groupCars)
          } 
      }
      catch(error:any)
      {
        console.log(error.message)
        toast.error(error.message)
      }
    }
    findCars()
  }, [])


  useEffect(()=>{
    if(selectedCar)
    {
      navigate(`/users/carDetail?carId=${selectedCar}`)
    }
  }, [selectedCar])

  
  

  return (
    <div className="home">
      <Banner/>
      <h1 className='text-center mt-5 mb-3'>Cars</h1>
      <Cards 
      cars={cars}
      setSelectedCar={setSelectedCar}/>
    </div>
  );
}

export default Home;
