import { showCarInterface } from "./carAdminInterface";

export interface bookingInterface {
    pickupLocation?: string;
    dropOffLocation?: string;
    startDate?: Date;
    endDate?: Date;
    pickupTime?: string;
    dropOffTime?: string
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
    date: DateRange[];
    time: TimeRange[];
    location: Location[];
    transaction: Transaction[];
}

interface DateRange {
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
    transaction: string;
    amount: number;
  }