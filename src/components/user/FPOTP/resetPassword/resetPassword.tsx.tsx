import React from 'react';
import './resetPassword.css.css'
import { UserfindOneUser, passwordReset } from '../../../../features/axios/api/user/user';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FloatingLabel, Form } from 'react-bootstrap';
import { FormikHelpers, FormikProvider, Field, ErrorMessage } from 'formik';
import { passwordOnSubmit, passwordForm, passwordInterface } from '../../../../Validators/userValidator.ts/passwordValidator';
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../features/axios/redux/reducers/reducer';
import { tokenInterface } from '../../../../types/payloadInterface';


const ResetPassword = () => {

  const { userEmail, userId } = useParams<{userEmail: string, userId: string}>()
  const decodedEmail = userEmail ? atob(userEmail) : '';
  const decodedUserId = userId ? atob(userId) : '';
  const navigate = useNavigate();

  const handleSubmit: passwordOnSubmit = async (values: passwordInterface, formikHelpers: FormikHelpers<passwordInterface>) => {
    formikHelpers.setSubmitting(true);
    try {
      console.log("submitting")
      const updatePassword = await passwordReset(values.password, decodedUserId as string);
      console.log("updated detail : ", updatePassword)
      if (updatePassword) {
        toast.success(updatePassword.message);
        navigate('/signIn');
      } else {
        toast.error("No user found");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  const formik = passwordForm(handleSubmit);

  return (
    <div className="container-fluid fpotp-Backg">
      <div className="row justify-content-center align-items-center min-vh-100 bg-gray-200 py-5 pt-5">
        <div className="col-md-8" style={{ backgroundColor: "#fff" }}>
          <div className="row shadow" style={{ marginRight: "-24px" }}>
            <div className="col-md-6 rounded-l-md bg-white p-4" style={{ maxWidth: '450px' }}>
              <h1 className="text-xl font-semibold">Reset Password</h1>

              <FormikProvider value={formik}>
                <form className="mt-4" onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                      <Field
                        as={Form.Control}
                        style={{height:'69px'}}
                        type="password"
                        name="password"
                        placeholder="Enter password"
                      />
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password" className="mb-3">
                      <Field
                        as={Form.Control}
                        style={{height:'69px'}}
                        type="password"
                        name="confirmPassword"
                        placeholder="Enter password"
                      />
                      <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                    </FloatingLabel>
                  </div>

                  <div className='text-center'>
                    <button className='buttonSub' type='submit' disabled={formik.isSubmitting}>Submit</button>
                  </div>
                  <br />
                </form>
              </FormikProvider>
            </div>

            <div className="banner col-md-6 rounded-r-md position-relative">
              <img
                className="h-100 object-cover rounded-r-md"
                src="/assets/admin/FPOTP/kahl-orr-ZdLFPE0AZBU-unsplash.jpg"
                alt="Login banner"
                style={{ objectFit: 'cover', width: '109%' }}
              />
              <div className="position-absolute top-0 start-50 translate-middle-x">
                <p className="quote text-center py-3">Chase Your Vision</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
