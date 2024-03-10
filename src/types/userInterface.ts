import { Types } from "mongoose"

export interface userAdminInterface {
    _id: Types.ObjectId
    name:string,
    email:string,
    mobile:number | undefined,
    profilePic?:string | undefined,
    isActive?:boolean,
}

export interface userInterface {
    _id?: Types.ObjectId,
    name?:string,
    email?:string
    mobile?:number | undefined | null
    password?:string | null
    DL?:string,
    DOB?:Date,
    profilePic?:string,
    isActive?:boolean,
    isGoogleUser?:boolean,
    address?:Array<{
        country?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        pincode?: string | undefined;
        phone?: string | undefined;
        alternateNumber?: string | undefined;
        landmark?: string | undefined;
    }>
}