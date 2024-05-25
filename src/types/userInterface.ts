import { Types } from "mongoose"
import { couponInterface } from "./couponInterface"

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
}