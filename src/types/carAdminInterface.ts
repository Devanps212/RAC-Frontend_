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
    rentPricePerDay?:number
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
    seats?:number,
    offer: Offer
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
    seats?:number;
    offer?: Offer
    addedById?:string
    
}

interface Offer {
    discount: number;
    price?: number | null;
}
export interface category {
    _id?:Types.ObjectId,
    name:string,
    description:string,
    isListed?:boolean
}

interface commentsInterface {
    userId: userAdminInterface,
    comment: string,
    userRating: number
}

export interface imageInterface{
    thumbnailImg?: string
    exterior: string[]
    interior: string[]
}

export interface images{
    bigImg:string
    smallImg: string[]
}