export interface signInPayload{
    email?:string,
    password?:string,
    purpose?: string
}

export interface signUpPayload extends signInPayload{
    name:string,
    Cpassword?:string,
}
export interface userDetailPayload{
    _id?:string
    name:string,
    email:string,
    mobile:number,
    password:string,
    profilePic:string,
    DL:string,
    gender:'Male' | 'Female';
    address:string,
    isActive:boolean,
    isGoogleUser:boolean,
    createdAt:Date,
    city: string
}

export interface tokenInterface {
    payload: string,
    exp: number,
}