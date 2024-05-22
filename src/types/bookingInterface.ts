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
  
  export interface TimeRange {
    start: string;
    end: string;
  }
  
  interface Location {
    start: string;
    end: string;
  }
  
  interface Transaction {
    _id?: string
    transactionId?: string;
    amount?: number;
  }

export interface BookingDetail {
    itemName: string;
    thumbnail: string;
}

export interface Card {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
}

export interface RefundDetailsInterface {
    amount: number;
    bookingDetail: BookingDetail;
    card: Card;
    created: number;
    currency: string;
    status: string;
    transaction: Transaction;
}


export interface bookingInterfaceReschedule {
    pickupLocation?: string;
    dropOffLocation?: string;
    startDate?: Date;
    endDate?: Date;
    pickupTime?: string;
    dropOffTime?: string
    amount?:number
    discount?:number
    total?:number
    bookingId?:string,
    carId: showCarInterface
}