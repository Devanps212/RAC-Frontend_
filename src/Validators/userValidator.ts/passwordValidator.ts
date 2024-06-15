import { FormikHelpers, useFormik } from "formik";
import { string } from "prop-types";
import * as Yup from 'yup'

export interface passwordInterface { 
    password: string,
    confirmPassword : string
}

const initialValue :  passwordInterface = {
    password: '',
    confirmPassword : ''
}

const passwordSchema = Yup.object().shape({
    password : Yup.string()
        .required("Please enter a valid Pasword")
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),
    confirmPassword : Yup.string()
        .required("Please enter a valid password")
        .required('Please confirm your password')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
})

export type passwordOnSubmit = (values: passwordInterface, formikHelpers: FormikHelpers<passwordInterface>)=>void

export const passwordForm = (onSubmit: passwordOnSubmit)=>{
    return useFormik({
        initialValues:  initialValue,
        validationSchema: passwordSchema,
        onSubmit
    })
}

