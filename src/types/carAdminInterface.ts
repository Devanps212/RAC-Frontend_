import { Types } from "mongoose";
import { categoryInterface } from "./categoryInterface";
export interface carAdminInterface {
    _id:string,
    name:string,
    // image?:string,
    owner:string,
    category?:categoryInterface,
    status:string,
}


export interface carInterface {
    name: string;
    owner: string;
    category?: Types.ObjectId | string;
    price: number;
    mileage?: number;
    engine?: string;
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
}