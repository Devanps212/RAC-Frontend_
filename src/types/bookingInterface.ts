export interface bookingInterface {
    pickupLocation: string;
    dropOffLocation: string;
    startDate: Date;
    endDate: Date;
    pickupTime: string;
    dropOffTime: string
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