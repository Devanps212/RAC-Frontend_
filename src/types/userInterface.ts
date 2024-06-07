import { Types } from "mongoose"
import { couponInterface } from "./couponInterface"
import { Refund } from "./bookingInterface"

export interface userAdminInterface {
    _id: string
    name:string,
    email:string,
    mobile:number | undefined,
    profilePic?:string | File,
    isActive?:boolean,
}

export interface userInterface {
    _id?: Types.ObjectId,
    name?:string,
    email?:string
    mobile?:number | undefined | null
    password?:string | null,
    gender?:string,
    city?:string
    DL?:string,
    DOB?:Date,
    profilePic?:string,
    isActive?:boolean,
    isGoogleUser?:boolean,
    address?:string
    coupons?:string[] | couponInterface[]
    refund?:Refund[]
}