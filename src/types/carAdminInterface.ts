import { Types } from "mongoose";
import { categoryInterface } from "./categoryInterface";
export interface carAdminInterface {
    _id:string,
    name:string,
    exterior?: string[],
    owner:string,
    category?:categoryInterface,
    status:string,
}


export interface carInterface {
    _id?:string
    name: string;
    owner: string;
    category?: Types.ObjectId | string | category;
    price: number;
    mileage?: number;
    engine?: string;
    rating?: number;
    transmission?: string;
    fuelType?: string;
    interior?:File[];
    exterior?: File[];
    status?: 'available' | 'maintenance' | 'booked' | 'not available';
    description?: string;
    vehicleNumber?: string;
    rentPricePerWeek?: number;
    rentPricePerDay?: number;
    insuranceDetails?: string;
    addedBy?: string;
    addedById?:Types.ObjectId | string
}

export interface showCarInterface {
    _id?:string;
    name: string;
    owner: string;
    category?: Types.ObjectId | category | string;
    price: number;
    mileage?: number;
    engine?: string;
    rating?: number;
    transmission?: string;
    fuelType?: string;
    interior?:string[];
    exterior?: string[];
    status?: 'available' | 'maintenance' | 'booked' | 'not available';
    description?: string;
    vehicleNumber?: string;
    rentPricePerWeek?: number;
    rentPricePerDay?: number;
    insuranceDetails?: string;
    addedBy?: string;
}

export interface category {
    _id?:Types.ObjectId,
    name:string,
    description:string,
}