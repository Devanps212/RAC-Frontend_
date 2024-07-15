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
  mobile: Yup.string().matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
          .test('not all zeroes', 'Please enter a valid Mobile number', value=> value!== '0000000000')
          .test('no-invalid-pattern', 'Mobile number cannot contain invalid repetitive patterns', value => !/^(\d)\1*$/.test(value!)),
  address: Yup.string().required('Please provide a valid address'),
  DL: Yup.string().required('Please give valid Driving License')
      .matches(/^[A-Z]{2}[0-9]{2}\s?[0-9]{7}$/, 'Driving license number is not valid'),
  gender: Yup.string().required('Please select your gender'),
  city: Yup.string()
        .trim()
        .min(2, 'City name is too short')
        .max(50, 'City name is too long')
        .matches(/^[a-zA-z\s]*$/, "Invalid city name")
        .required('Please select your city')
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
