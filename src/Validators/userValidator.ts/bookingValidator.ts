import { FormikHelpers, useFormik } from "formik";
import { bookingInterface } from "../../types/bookingInterface";
import { DateRange } from "../../types/bookingInterface";
import * as Yup from 'yup'


export const bookingValidator = (data: bookingInterface) => {
    const error: any = {};
    let gotError = false;

    if (data.pickupLocation?.trim() === '' || !data.pickupLocation) {
        error.pickupLocation = "Please submit a proper PickupLocation";
        gotError = true;
    }

    if (data.dropOffLocation?.trim() === '' || !data.dropOffLocation) {
        error.dropOffLocation = "Please submit a proper DropoffLocation";
        gotError = true;
    }

    if (!data?.startDate || isNaN(new Date(data?.startDate).getTime())) {
        error.pickupDate = "Please submit a valid pickUpTime";
        gotError = true;
    }

    if (!data?.endDate || isNaN(new Date(data?.endDate).getTime())) {
        error.dropOffDate = "Please submit a valid DropOffDate";
        gotError = true;
    }

    if (!data.pickupTime || data.pickupTime.trim() === '') {
        error.pickupTime = "Please submit a valid pickUp time";
        gotError = true;
    }

    if (!data.dropOffTime || data.dropOffTime.trim() === '') {
        error.dropOffTime = "Please submit a valid DropOff Time";
        gotError = true;
    }

    if (gotError === true) {
        console.log("error:", error)
        return error; // Return the error object instead of gotError
    }

    return null; // Return null if no errors
};

interface DateInterface {
    start : string,
    end: string,
}
const initialValue : DateInterface = {
    start: new Date().toISOString(),
    end: new Date().toISOString(),
}

const DateSchema = Yup.object().shape({
    start: Yup.string()
        .required('Please provide a valid start date'),
    end: Yup.string()
        .required('Please provide a valid end date')
        .when('start', ([start], schema) => {
            return schema.test({
                name: 'is-after-start',
                exclusive: false,
                message: 'End date must be after start date',
                test: function (value: string) {
                    if (!start || !value) return true;
                    return Date.parse(value) > Date.parse(start);
                },
            });
        }),
});

export type BookingOnSubmitType = (values : DateInterface, formikHelpers : FormikHelpers<DateInterface>)=>void

const DateDetailForm = (onSubmit: BookingOnSubmitType, initialValuesOverride?: DateInterface) => {
    return useFormik({
        initialValues: {
            start: initialValue.start.split('T')[0], 
            end: initialValue.end.split('T')[0],    
            ...initialValuesOverride,
        },
        validationSchema: DateSchema,
        onSubmit,
    });
};

export default DateDetailForm
