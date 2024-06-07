import { FormikHelpers, useFormik } from "formik";
import * as Yup from 'yup';
import { userAdminInterface } from "../types/userInterface";

const initialValues: userAdminInterface = {
    _id: '',
    name: '',
    email: '',
    profilePic: '',
    mobile: 0
};

export const adminProfileSchema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email('Invalid email format'),
    mobile: Yup.number()
    .typeError('Please provide a valid number')
    .integer('Please provide a valid integer number')
    .positive('Mobile number must be positive')
    .test(
        'maxDigits',
        'Mobile number must not exceed 10 digits',
        (value) => {
          if (typeof value === 'undefined') return false; 
          const stringValue = value.toString();
          return stringValue.length <= 10;
        }
      )
});

export type onSubmitType = (values: userAdminInterface, formikHelpers: FormikHelpers<userAdminInterface>) => void;

const userDetailForm = (onSubmit: onSubmitType, initialValuesOverride?: Partial<userAdminInterface>) => {
    return useFormik({
        initialValues: { ...initialValues, ...initialValuesOverride },
        validationSchema: adminProfileSchema,
        onSubmit,
    });
};

export default userDetailForm;
