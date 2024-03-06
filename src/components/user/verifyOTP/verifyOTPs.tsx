import React from 'react';
import { useEffect, useState } from 'react';
import './verifyOTPs.css'
import { otpGenerate } from '../../../features/axios/api/user/userAuthentication';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../../../features/axios/api/user/userAuthentication';
import { toast } from 'react-toastify';
import { setToken } from '../../../features/axios/redux/slices/user/tokenSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../features/axios/redux/reducers/reducer';
import { loginSuccess } from '../../../features/axios/redux/slices/user/userLoginAuthSlice';
import { CheckPurpose, fetchOTP } from '../../../services/otpService';

const Votp = () => {
  const navigate = useNavigate();
  const [otp, setOTP] = useState('');
  const [totp, setTotp] = useState(sessionStorage.getItem('otp'));
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState('');
  const token = sessionStorage.getItem('token')
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state:RootState)=>state.userAuth.isLoggedIn)

    useEffect(() => {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);

      return () => {
        clearInterval(intervalId);
        if (timer === 0) {
          setTotp(null);
        }
      };
    }, [timer]);
    useEffect(()=>{
      if(token)
      {
        dispatch(loginSuccess())
      }
      if(isLoggedIn == true)
      {
        navigate('/users/home')
      }
    }, [])
  

    const fetchNewOTP = async () => {
      try {
        const response = await fetchOTP()
        console.log("response from fetchingOtp : ", response)
        if(response.OTP)
        {
          console.log("otp : ",response.OTP)
          setTotp(response.OTP)
          console.log(typeof totp)
          console.log(typeof otp)
        }
      } catch (error:any) {
        console.error('Error generating OTP:', error.message);
        toast.error(error.message);
      }
    };

    const ResetTimer = () => {
      setTimer(60);
      fetchNewOTP();
    };

    const otpVerify = async (e: React.FormEvent) => {
      try {
        
        e.preventDefault();
        console.log(timer)
        if(timer == 0)
        {
          setTotp(null)
          return toast.error('Otp is invalid')
        }
        console.log('otp passing');
        console.log('otp', otp);
        console.log('totp', totp)
        if(totp != null)
        {
          console.log()
          const onetime = totp.replace(/[^0-9]/g, '');

          if (onetime === otp) 
          {
            toast.success('OTP is valid');

            const result = await CheckPurpose()
            console.log(result)
            if(result)
            {
              if(result && 'token' in result)
              {
                if(result.message == "Login success")
                {
                  sessionStorage.removeItem('otp')
                  const token = result.token

                  console.log("token : ", token)
                  dispatch(setToken(token))
                  dispatch(loginSuccess())
                  toast.success('login success')
                  setTimeout(()=>{
                    navigate('/users/home')
                  }, 1000)
                }
              }
              else if (result.message === 'signUp success')
              {
                toast.success(result.message)
                navigate('/users/signIn')
              }
              else
              {
                console.log(result.message)
                toast.warning(result.error)
              }
            }
          } 
          else 
          {
            toast.error('Incorrect OTP');
          }
        }
      } catch (error:any) {
        console.error('Error verifying OTP:', error.message);
        toast.error(error.message);
      }
    };

  

  return (
    <>
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center min-vh-100 bg-gray-200 py-5 pt-5">
        <div className="col-md-8" style={{backgroundColor:"#fff"}}>
          <div className="row shadow" style={{marginRight:"-24px"}}>
            {/* Login form */}
            <div className="col-md-6 rounded-l-md bg-white p-4" style={{ maxWidth: '450px' }}>
              <h1 className="text-xl font-semibold text-center">Verify OTP</h1>
              <div className='text-center'>
              <small className="text-dark-400">Enter the OTP code send to devanps@gmail.com</small>
              </div>

              <form className="mt-4" onSubmit={otpVerify}>
                <div className="mb-3">
                  <label className="mb-2 block text-xs font-semibold">OTP</label>
                  <input
                    type="number"
                    placeholder="Enter your OTP"
                    value={otp}
                    className="form-control rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                    style={{boxShadow:"inset 2px 2px 7px -3px grey" }}
                    onChange={(e)=>setOTP(e.target.value)}
                  />
                  {timer > 0 ? 
                  (<p className='text-center text-danger'>OTP Valid till: {timer} seconds</p>):
                  (<p className='text-center text-success'>OTP Timeout</p>)}

                </div>
                { timer == 0 &&
                <div className="text-center">
                    <span className="text-xs text-gray-400 font-semibold">Didnt Get any OTP ?</span>
                    <a href="#" className="text-xs font-semibold text-purple-700" onClick={ResetTimer}>Resend OTP</a>
                </div>
                }
                <br/>
                {error && <p className="text-center text-danger">{error}</p>}
                
                <div className='text-center'>
                  <button className='buttonSub' type='submit'>Verify</button>
                </div>
                <br/>
              </form>
            </div>

            {/* Login banner */}
            <div className="banner col-md-6 rounded-r-md position-relative">
                <img
                    className="h-100 object-cover rounded-r-md"
                    src="/src/assets/admin/verifyOTP/242954.jpg"
                    alt="Login banner"
                    style={{ objectFit: 'cover', width: '109%' }}
                />
                <div className="position-absolute top-0 start-50 translate-middle-x">
                    <p className="quote text-center py-3">Roam Free And Wild</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Votp;
