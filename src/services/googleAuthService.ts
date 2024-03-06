import { auth } from "../../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { GoogleVerification } from "../features/axios/api/user/userAuthentication";import { toast } from "react-toastify";


export const Gverify = async() =>{
    try{
        const provider = await new GoogleAuthProvider()
        const signInUp = await signInWithPopup(auth, provider)
        if(signInUp.user)
        {
            const {operationType} = signInUp

            console.log("operationType : ", operationType)
            console.log("userSignedIn : ", signInUp.user)
            const idTokenResult = await signInUp.user.getIdTokenResult()
            const accessToken = idTokenResult.token 
            console.log("accessToken : ",accessToken)
            const result = await GoogleVerification(accessToken)
            return result

        }
    }
    catch(error:any)
    {
        console.log("error :", error.message)
        throw new Error(error.message)
    }
}