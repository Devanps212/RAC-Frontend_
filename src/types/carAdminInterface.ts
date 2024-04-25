import { Types } from "mongoose";
import { categoryInterface } from "./categoryInterface";
import { userAdminInterface } from "./userInterface";

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
    addedBy?: string | undefined;
    addedById?:Types.ObjectId | string;
    comments?:commentsInterface[];
    thumbnailImg?:File[];
    seats?:number
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
    comments?:commentsInterface[]
    thumbnailImg?:string;
    seats?:number
}

export interface category {
    _id?:Types.ObjectId,
    name:string,
    description:string,
}

interface commentsInterface {
    userId: userAdminInterface,
    comment: string,
    userRating: number
}