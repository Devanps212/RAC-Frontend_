import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

//userDetail

interface EditUserFormValues {
  name: string;
  mobile: string;
  address: string;
  DL: string;
  gender: string;
  city: string;
}

const initialValues: EditUserFormValues = {
  name: '',
  mobile: '',
  address: '',
  DL: '',
  gender: '',
  city: ''
};

const addUserSchema = Yup.object().shape({
  name: Yup.string().required('Please provide a valid username'),
  mobile: Yup.string().matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
  address: Yup.string().required('Please provide a valid address'),
  DL: Yup.string().required('Please give valid Driving License'),
  gender: Yup.string().required('Please select your gender'),
  city: Yup.string().required('Please select your city')
});

export type onSubmitType = (values: EditUserFormValues, formikHelpers: FormikHelpers<EditUserFormValues>) => void;

const userDetailForm = (onSubmit: onSubmitType, initialValuesOverride?: Partial<EditUserFormValues>) => {
  return useFormik({
    initialValues: { ...initialValues, ...initialValuesOverride },
    validationSchema: addUserSchema,
    onSubmit,
  });
};


export default userDetailForm;
