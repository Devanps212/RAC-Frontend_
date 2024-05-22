import React from "react";
import { BiSolidUserBadge } from "react-icons/bi";
import { FaAddressBook, FaCarAlt, FaCity, FaFemale, FaMale, FaUser } from "react-icons/fa";
import './editUser.css';
import userDetailForm, { onSubmitType } from "../../../../Validators/userValidator.ts/userDetailValidation";
import { userDetailPayload } from "../../../../types/payloadInterface";
import { saveUserDetails } from "../../../../features/axios/api/user/user";
import { toast } from "react-toastify";
import { decodeToken } from "../../../../utils/tokenUtil";

interface AddDetailsProps {
  userDetails: Partial<userDetailPayload>;
  handleSuccess: (updatedData: Partial<userDetailPayload>) => void;
}

const EditUser: React.FC<AddDetailsProps> = ({userDetails, handleSuccess}) => {
  const onSubmit: onSubmitType = async(values, { setSubmitting, resetForm }) => {
    console.log(values);
    setSubmitting(false);
    const token = localStorage.getItem('token') ?? ''
    const userId = await decodeToken(token).payload
    const data : Partial<userDetailPayload> = {
      ...values,
      _id: userId,
      mobile: parseInt(values.mobile, 10),
      gender: values.gender as 'Male' | 'Female'
  }
    const saveData = await saveUserDetails(data)
    if(saveData.data.status === 'success'){
        toast.success("User Detail updated")
        handleSuccess(data)
    } else {
        toast.error("not successfull")
    }
  };

  const formik = userDetailForm(onSubmit, {
    name: userDetails.name,
    mobile: userDetails.mobile ? userDetails.mobile.toString() : '',
    address: userDetails.address,
    city: userDetails.city,
    DL: userDetails.DL,
    gender: userDetails.gender
  });

  return (
    <div className="user-details p-4">
      <h5 className="text-start mb-4">Edit User</h5>
      
      <form onSubmit={formik.handleSubmit}>
        <div className="detail-section mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div className="w-100 me-3">
              <p className="mb-1"><FaUser className="icon" /> UserName</p>
              <input
                name="name"
                type="text"
                placeholder="Edit User name"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="w-100">
              <p className="mb-1"><BiSolidUserBadge className="icon" /> Mobile</p>
              <input
                type="text"
                name="mobile"
                placeholder="Edit User Mobile number"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mobile}
              />
              {formik.touched.mobile && formik.errors.mobile ? (
                <div className="error">{formik.errors.mobile}</div>
              ) : null}
            </div>
          </div>
        </div>
        <hr />
        <div className="detail-section mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div className="w-100 me-3">
              <p className="mb-1"><FaAddressBook className="icon" /> Address</p>
              <input
                type="text"
                name="address"
                placeholder="Edit Address"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="error">{formik.errors.address}</div>
              ) : null}
            </div>
            <div className="w-100">
              <p className="mb-1"><FaCarAlt className="icon" /> Licence No:</p>
              <input
                type="text"
                name="DL"
                placeholder="Edit Licence No"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.DL}
              />
              {formik.touched.DL && formik.errors.DL ? (
                <div className="error">{formik.errors.DL}</div>
              ) : null}
            </div>
          </div>
        </div>
        <hr />
        <div className="detail-section mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div className="w-100 me-3">
              <p className="mb-1"><FaMale className="icon" />/<FaFemale className="icon" /> Gender</p>
              <select
                name="gender"
                className="form-control"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="" label="Select gender" />
                <option value="Male" label="Male" />
                <option value="Female" label="Female" />
              </select>
              {formik.touched.gender && formik.errors.gender ? (
                <div className="error">{formik.errors.gender}</div>
              ) : null}
            </div>
            <div className="w-100">
              <p className="mb-1"><FaCity className="icon" /> City</p>
              <input
                type="text"
                name="city"
                placeholder="Edit City"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
              />
              {formik.touched.city && formik.errors.city ? (
                <div className="error">{formik.errors.city}</div>
              ) : null}
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditUser;
