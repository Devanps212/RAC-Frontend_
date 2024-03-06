import { signInPayload } from "../../types/payloadInterface"

export const LoginValidation = (formData: signInPayload)=>{
    console.log(formData)
    const errors : Partial<Record<keyof signInPayload, string>> = {}
    const {email, password} = formData

    let isValid = true
    const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const pass = emailRegexp.test(email)
    if(!pass || email.trim() == '')
    {
        isValid = false
        errors.email = "Please enter a valid email"
        console.log("failed email")
    }

    const passRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/;
    const passCheck = passRegexp.test(password)
    
    if(!password || password.trim() == '')
    {
        isValid = false
        errors.password = "Please enter a valid password"
        console.log("failed password")
    }
    else if(!passCheck)
    {
        isValid = false
        const hasLowerCase = /[a-z]/.test(password)
        const hasCapitalCase = /[A-Z]/.test(password)
        const hasDigits = /\d/.test(password)
        const hasValidDigits = password.length > 7
        const hasSpecialCharacter = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password);

        if(!hasLowerCase || !hasCapitalCase || !hasValidDigits || !hasDigits || !hasSpecialCharacter)
        {
            errors.password = "Password must "

            errors.password+= hasLowerCase?'': 'contain at least one lowercase letter, ';
            errors.password+= hasCapitalCase? '' : 'contain at least one uppercase letter, ';
            errors.password+= hasDigits?'' : 'contain at least one digit, ';
            errors.password+= hasValidDigits? '' : 'be at least 8 characters long';
            errors.password+= hasSpecialCharacter?'':'containt atleast one special character'
            console.log("failed password")
        }
    }
    return errors
}