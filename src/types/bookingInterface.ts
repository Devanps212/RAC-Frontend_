import { showCarInterface } from "./carAdminInterface";

export interface bookingInterface {
    pickupLocation?: string;
    dropOffLocation?: string;
    startDate?: Date;
    endDate?: Date;
    pickupTime?: string;
    dropOffTime?: string
    amount?:number
    discount?:number
    total?:number
}

export interface LocationSuggestion {
    name: string,
    address: string;
    place_formatted: string;
    context: {
        country: {
            name: string;
        };
        place: {
            name: string;
        };
    };
}

export interface detailBooking {
    _id: string
    carId: showCarInterface;
    userId: string;
    owner: string;
    status: string;
    date: DateRange;
    time: TimeRange;
    location: Location;
    transaction: Transaction;
    amount?:number
    discount?:number
    total?:number,
    issues?:string
}

export interface backendBooking { 
    transactionId: string,
    carId: string,
    userId: string,
    amount: number,
    currency: string,
}

export interface DateRange {
    start: Date;
    end: Date;
  }
  
  interface TimeRange {
    start: string;
    end: string;
  }
  
  interface Location {
    start: string;
    end: string;
  }
  
  interface Transaction {
    _id: string
    transaction: string;
    amount: number;
  }
