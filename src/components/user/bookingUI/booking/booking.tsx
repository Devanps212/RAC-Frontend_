import React, { useState, useEffect } from "react"
import './booking.css'
import { City, IState, ICity }  from 'country-state-city';
import DatePicker from 'react-datepicker'; 
import { Button, Dropdown } from "react-bootstrap"
import { getAllStates } from "country-state-city/lib/state";
import { toast } from "react-toastify";
import { FaCalendar } from "react-icons/fa";


const BookingUI = ()=>{

    const [states, setStates] = useState<IState>()
    const [city, setCity] = useState<ICity[]>([])
    const [selectedCity, setSelectedCityName] = useState<ICity>()
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null)

    const state = getAllStates()
    const cities = City.getAllCities()

    const IndianStates = state.filter(state=>state.countryCode ==='IN')
    

    const handleState = (stateName : IState, stateCode: string)=>{
        setStates(stateName)
        if(states)
            {
                const selectedStateCity = cities.filter(city=> city.stateCode === stateCode)
                setCity(selectedStateCity)
            }
    }

    const handleCity = (city: ICity)=>{
        setSelectedCityName(city)
    }

    useEffect(() => {
        if (states) {
          const selectedStateCity = cities.filter(
            (city) => city.stateCode === states.isoCode
          );
          setCity(selectedStateCity);
        } else {
          setCity([]);
        }
      }, [states]);

    const handleStartDate = (date : Date)=>{
        setSelectedDate(date)
        }

    const handleEndDateChange = (date : Date) => {
        if(selectedDate){
            console.log(selectedDate)
            if(date < selectedDate){
                console.log("greater")
                    toast.error("Please select a valid date")
                    setSelectedEndDate(null)
                    return
                }else{
                    console.log(date + "<" + selectedDate)
                    setSelectedEndDate(date)
                }
        }else{
            toast.error("Please select starting date")
            return
        }
    };

    

    
    
    
    
    return(
        <>
        <div className="container T-container d-flex justify-content-center align-items-center">
            <div className="time-Date " style={{width: "53rem"}}>
                    <div className="TD-title text-center mb-5 pt03">
                        Book Your Car
                    </div>
                    <div className="row">
                        <div className="col-4">
                        <label className="mb-2">Select starting Date :</label>
                            <div className="Time-start" style={{width: "7rem"}}>
                               <DatePicker
                               selected={selectedDate}
                               onChange={handleStartDate}
                               dateFormat="yyyy-MM-dd"
                               placeholderText="yyyy-mm-dd"
                               className="Starting-Time"
                               minDate={new Date()}
                               />
                            </div>
                        </div>
                        <div className="col-4">
                        <label className="mb-2">Select ending Date :</label>
                            <div className="Time-ends">
                            <DatePicker
                            selected={selectedEndDate}
                            onChange={handleEndDateChange}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="yyyy-mm-dd"
                            className="Ending-Time"
                            minDate={new Date()}
                            />
                            </div>
                        </div>
                        <div className="col-4">
                        <label className="mb-2">Select ending Location :</label>
                            <div className="end-location">
                                <Dropdown>
                                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                        {states? states.name : "select State"}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="scrollable-menu">
                                        {
                                            IndianStates.map((states,index)=>(
                                                <Dropdown.Item key={index} onClick={()=>handleState(states, states.isoCode)}>
                                                    {states.name}
                                                </Dropdown.Item>
                                            ))
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                                {
                                        city && (
                                            <Dropdown>
                                                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                                    {selectedCity ? selectedCity.name :"Select City"}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="scrollable-menu">
                                                    {
                                                        city.map(cities=>(
                                                            <Dropdown.Item onClick={()=>handleCity(cities)}>
                                                                {cities.name}
                                                            </Dropdown.Item>
                                                        ))
                                                    }
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        )
                                    }
                                    
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-5" >
                        <Button>submit</Button>
                    </div>
                
            </div>
        </div>
        </>
    )
}

export default BookingUI