export interface signInPayload{
    email:string,
    password:string,
}

export interface signUpPayload extends signInPayload{
    name:string,
    Cpassword?:string,
}
export interface userDetailPayload extends Address{
    name:string,
    email:string,
    mobile:number,
    password:string,
    profilePic:string,
    DL:string,
    DOB:Date,
    address:Address[],
    isActive:boolean,
    isGoogleUser:boolean,
    createdAt:Date,
}

export interface Address{
    country?:string,
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
    phone?: string;
    alternateNumber?: string;
    landmark?: string;
}