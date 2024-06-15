import React, { useEffect, useState } from 'react';
import './otp.css'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FloatingLabel, Form } from 'react-bootstrap';
import { fetchOTP } from '../../../../services/otpService';
import { otpGenerate } from '../../../../features/axios/api/user/userAuthentication';

const OTPverify = () => {

  const navigate = useNavigate();
  const { userEmail, userId } = useParams<{userEmail: string, userId: string}>() ?? ''
  const [otp, setOtp] = useState('');
  const [existingOtp, setExistingOtp] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const decodedEmail = userEmail ? atob(userEmail) : '';

  useEffect(() => {
    const savedOtp = sessionStorage.getItem('userOtp');
    setExistingOtp(savedOtp);

    return () => {
      sessionStorage.removeItem('userOtp');
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(intervalId);
      if (timer === 0) {
        setExistingOtp(null);
      }
    };
  }, [timer]);

  const fetchNewOTP = async () => {
    try {
      console.log(userEmail)
      const response = await otpGenerate(decodedEmail, 'FPOTP');
      console.log("otp got : ", response.OTP)
      if (response.OTP) {
        setExistingOtp(response.OTP);
        sessionStorage.setItem('userOtp', response.OTP);
      }
    } catch (error: any) {
      console.error('Error generating OTP:', error.message);
      toast.error(error.message);
    }
  };

  const ResetTimer = () => {
    setTimer(60);
    fetchNewOTP();
  };

  
  useEffect(()=>{
    fetchNewOTP()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    if (!otp || otp !== existingOtp) {
      isValid = false;
      setError('Please enter a valid OTP');
    }

    if (isValid) {
      navigate(`/resetPassword/${userEmail}/${userId}`);
    }
  };

  return (
    <div className="container-fluid fpotp-Backg">
      <div className="row justify-content-center align-items-center min-vh-100 bg-gray-200 py-5 pt-5">
        <div className="col-md-8" style={{ backgroundColor: "#fff" }}>
          <div className="row shadow" style={{ marginRight: "-24px" }}>
            <div className="col-md-6 rounded-l-md bg-white p-4" style={{ maxWidth: '450px' }}>
              <h1 className="text-xl font-semibold">OTP verification</h1>
              <div className='text-center'>
                <small className="text-dark-400">Enter OTP below</small>
              </div>

              <form className="mt-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="OTP"
                    className="mb-3">
                    <Form.Control type="text"
                      value={otp}
                      style={{height:'69px'}}
                      className={`form-control rounded-md border ${error ? 'border-danger' : 'border-gray-300'} focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500`}
                      placeholder="Enter your OTP"
                      onChange={(e) => setOtp(e.target.value)} />
                  </FloatingLabel>
                  {error && (
                    <p className="text-danger text-xs mt-2">{error}</p>
                  )}
                </div>
                {timer > 0 ?
                  (<p className='text-center text-danger'>OTP Valid till: {timer} seconds</p>) :
                  (<p className='text-center text-success'>OTP Timeout</p>)}

                {timer === 0 &&
                  <div className="text-center">
                    <span className="text-xs text-gray-400 font-semibold">Didn't get any OTP?</span>
                    <a href="#" className="text-xs font-semibold text-purple-700" onClick={ResetTimer}>Resend OTP</a>
                  </div>
                }

                <div className='text-center'>
                  <button className='buttonSub' type='submit'>Submit</button>
                </div>
                <br />
              </form>
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

export default OTPverify;
