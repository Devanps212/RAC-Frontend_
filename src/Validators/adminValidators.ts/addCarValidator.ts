import { carInterface } from "../../types/carAdminInterface";

export const carValidator = (formData: carInterface) => {
  const errors: Record<string, string> = {};

  let isValid = true;

  if (formData.name === "" || formData.name === undefined) {
    isValid = false;
    errors.name = "Please enter the car name";
  }

  if (formData.owner === "" || formData.owner === undefined) {
    isValid = false;
    errors.owner = "Please enter the car owner";
  }
  
  console.log("entering engine")
  if (formData.engine == '' || formData.engine === undefined) {
    isValid = false
    console.log("engine is empty")
    errors.engine = "Please enter engine type"
  }


  if (formData.addedBy === "" || formData.addedBy === undefined) {
    isValid = false;
    errors.addedBy = "Please enter the admin name who is adding the car";
  }

  if (formData.price <= 0) {
    isValid = false;
    errors.price = "Please enter a valid price";
  }

  if (formData.vehicleNumber == '' || formData.vehicleNumber === undefined) {
    isValid = false
    errors.vehicleNumber = "Please enter vehicle number"
  }

  if (formData.mileage == undefined || formData.mileage === 0) {
    isValid = false;
    errors.mileage = "Mileage cannot be negative";
  }

  console.log(formData.rentPricePerDay)
  if (formData.rentPricePerWeek == undefined || formData.rentPricePerWeek === 0) {
    isValid = false;
    errors.rentPricePerWeek = "Rent price per week cannot be negative";
  }

  console.log(formData.rentPricePerWeek)
  if (formData.rentPricePerDay == undefined || formData.rentPricePerDay === 0) {
    isValid = false;
    errors.rentPricePerDay = "Rent price per day cannot be negative";
  }

  if (formData.transmission === "" || formData.transmission === undefined) {
    isValid = false;
    errors.transmission = "Please enter the transmission type";
  }

  if (formData.fuelType === "" || formData.fuelType === undefined) {
    isValid = false;
    errors.fuelType = "Please enter the fuel type";
  }

  console.log("interior :",formData.interior)
  if (!formData.interior || formData.interior.length === 0) {
    isValid = false;
    errors.interior = "Please select at least one interior feature";
  }

  if (formData.insuranceDetails === "" || formData.insuranceDetails === undefined ) {
    isValid = false
    errors.insuranceDetails = "Please enter a valid insurance number"
  }

  console.log("exterior :",formData.exterior)
  if (!formData.exterior || formData.exterior.length === 0) {
    isValid = false;
    errors.exterior = "Please select at least one exterior feature";
  }

  return errors;
};

export type validateType = typeof carValidator