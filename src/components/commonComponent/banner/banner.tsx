import React from "react";
import { Button, Carousel, FloatingLabel, Form } from "react-bootstrap";
import "./banner.css";
import { LocationSuggestion } from "../../../types/bookingInterface";
import { FaLocationArrow, FaMapMarkerAlt } from "react-icons/fa";

interface BannerProps {
  search: (location: string, purpose: string) => void;
  PickupPlaces: LocationSuggestion[];
  click: (location: LocationSuggestion, purpose: string) => void;
  value: string;
  DropOffValue: string;
  DropOffPlaces: LocationSuggestion[];
  handleTime: (time: string, purpose: string) => void;
  pickupTime: string;
  dropOffTime: string;
  handleDate: (date: Date, purpose: string) => void;
  pickUpDate: Date;
  dropOffDate: Date;
  handleFormSubmission: (
    value: string,
    DropOffValue: string,
    pickUpDate: Date,
    dropOffDate: Date,
    pickupTime: string,
    dropOffTime: string
  ) => void;
}

const Banner: React.FC<BannerProps> = ({
  search,
  PickupPlaces,
  click,
  value,
  DropOffValue,
  DropOffPlaces,
  handleTime,
  pickupTime,
  dropOffTime,
  handleDate,
  pickUpDate,
  dropOffDate,
  handleFormSubmission,
}) => {
  const currentDate = new Date().toISOString().split("T")[0];

  const handleFunc = (e: any, purpose: string) => {
    search(e.target.value, purpose);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>, purpose: string) => {
    handleTime(e.target.value, purpose);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, purpose: string) => {
    handleDate(new Date(e.target.value), purpose);
  };

  const handleSubmit = () => {
    handleFormSubmission(value, DropOffValue, pickUpDate, dropOffDate, pickupTime, dropOffTime);
  };

  return (
    <Carousel className="Banner with-shadow position-relative" interval={3000} controls={false} indicators={false}>
      <Carousel.Item className="inset-shadow">
        <div className="text-overlay">
          <div className="banner-text">
            <h1>Don't Dream Just Drive</h1>
            <p>Find the perfect vehicle for your journey with our convenient booking system.</p>
          </div>
        </div>
        <img className="bannerImg with-shadow" src="/assets/admin/banner/242725.jpg" alt="banner" />
        <div className="selection-T position-absolute translate-middle-y">
          <div>
            <p className="mb-4" style={{ fontWeight: "bold" }}>
              Select Location and Time
            </p>
          </div>
          <div className="row d-flex flex-column justify-content-center align-items-center">
            <div className="col-9">
              <div className="input-group mb-2">
                <FloatingLabel controlId="floatingInput" label="Pickup location" className="mb-3">
                  <Form.Control
                    type="text"
                    className="input-location"
                    placeholder="Pickup location"
                    onChange={(e) => handleFunc(e, "pickup")}
                    value={value}
                  />
                </FloatingLabel>
                <span className="input-group-text">
                  <FaMapMarkerAlt />
                </span>
                <ul className="suggestion-list" style={{zIndex:'3'}}>
                  {value !== "" &&
                    Array.isArray(PickupPlaces) &&
                    PickupPlaces.map((place, index) => (
                      <li key={index} className="suggestion-item">
                        <span className="suggestion-text" onClick={() => click(place, "pickup")}>
                          <strong>{place.name}</strong>
                          <br />
                          <small>{place.place_formatted}</small>
                        </span>
                        <FaLocationArrow className="suggestion-icon" />
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="col-9">
              <div className="input-group mb-3">
                <FloatingLabel controlId="floatingInputDropOff" label="Drop-Off Location" className="mb-3">
                  <Form.Control
                    type="text"
                    className="input-location form-control"
                    placeholder="Drop-Off location"
                    onChange={(e) => handleFunc(e, "DropOff")}
                    value={DropOffValue}
                  />
                </FloatingLabel>
                <span className="input-group-text">
                  <FaMapMarkerAlt />
                </span>
                <ul className="suggestion-list" style={{zIndex:'3'}}>
                  {DropOffValue !== "" &&
                    Array.isArray(DropOffPlaces) &&
                    DropOffPlaces.map((place, index) => (
                      <li key={index} className="suggestion-item">
                        <span className="suggestion-text" onClick={() => click(place, "DropOff")}>
                          <strong>{place.name}</strong>
                          <br />
                          <small>{place.place_formatted}</small>
                        </span>
                        <FaLocationArrow className="suggestion-icon" />
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="contents-data d-flex justify-content-center align-items-center mb-3">
              <div className="col-6">
                <p>Select Pickup Date :</p>
                <input
                  type="date"
                  value={pickUpDate ? pickUpDate.toISOString().split("T")[0] : ""}
                  className="form-control-input"
                  min={currentDate}
                  onChange={(e) => handleDateChange(e, "pickup")}
                />
              </div>
              <div className="col-6">
                <p>Select DropOff Date :</p>
                <input
                  type="date"
                  value={dropOffDate ? dropOffDate.toISOString().split("T")[0] : ""}
                  className="form-control-input"
                  min={currentDate}
                  onChange={(e) => handleDateChange(e, "DropOff")}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <p>Select Pickup Time :</p>
              <div className="timePickerContainer d-flex justify-content-center">
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => handleTimeChange(e, "pickup")}
                  className="form-control-input"
                />
              </div>
            </div>
            <div className="col-6">
              <p>Select DropOff Time :</p>
              <div className="timePickerContainer d-flex justify-content-center">
                <input
                  type="time"
                  value={dropOffTime}
                  onChange={(e) => handleTimeChange(e, "dropOff")}
                  className="form-control-input"
                />
              </div>
            </div>
          </div>
          <div style={{ zIndex: "500" }} className="d-flex justify-content-center align-items-center m-3">
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default Banner;
