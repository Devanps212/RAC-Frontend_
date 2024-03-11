import React, { useEffect, useState } from 'react';
import './login.css';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminToken } from '../../../features/axios/redux/slices/admin/tokenSlice';
import { isAdminLogin } from '../../../features/axios/redux/slices/admin/adminLogin';
import { RootState } from '../../../features/axios/redux/reducers/reducer';
import { adminLogin } from '../../../features/axios/api/admin/adminAuthentication';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const token = localStorage.getItem('admintoken')
  console.log(token)
  const dispatch = useDispatch()
  const AdminLogin = useSelector((state: RootState)=>state.adminAuth.isLoggedIn)
  const navigate = useNavigate()


  useEffect(() => {
    const checkAdminLoginStatus = async () => {
      if (token) 
      {
        try 
        {
          await dispatch(isAdminLogin());

          if (AdminLogin) {
            console.log("Admin is not logged out");
            navigate('/admin/home');
          }
        } 
        catch (error) 
        {
          console.error("Error checking admin login status:", error);
        }
      }
    };

    checkAdminLoginStatus();
  }, [token, dispatch, AdminLogin, navigate]);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password : ''
})

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async(e:React.FormEvent)=>
  {
    try
    {
      e.preventDefault()
      const {email, password} = formData
      console.log(password, email)

      if(email == '' || password.trim() == '')
      {
        toast.warning('please fill the form')
      }
      else
      {
        const response = await adminLogin(formData)
        console.log("admin Response : ", response)
        if(response.status == 'success')
        {
          console.log(response.message)
          console.log(response.token)
          dispatch(setAdminToken(response.token))
          dispatch(isAdminLogin())
          toast.success(response.message)
          navigate('/admin/home')
        }
      }
    }
    catch(error:any)
    {
      console.log("errors ocurred :", error)
    }
  }

  return (
    <div className="box bg-img" style={{width:'100%'}}>
      <div className="content">
        <h2>
          Sign<span> In</span>
        </h2>

        <form onSubmit={handleSubmit}>
        <div className="forms">
          <div className="user-input">  
            <input
              type="email"
              className="login-input"
              placeholder="admin email"
              id="name"
              value={formData.email}
              onChange={(e)=>setFormData({...formData, email:e.target.value})}
              required
            />
            <span role="img" aria-label="user-icon">
              👤
            </span>
          </div>

          <div className="pass-input">
            <input
              type={showPassword ? 'text' : 'password'}
              className="login-input"
              placeholder="password"
              id="my-password"
              value={formData.password}
              onChange={(e)=>setFormData({...formData,password:e.target.value})}
              required
            />

            <span className="eye" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <span role="img" aria-label="hide-password">
                  🙈
                </span>
              ) : (
                <span role="img" aria-label="show-password">
                  🙉
                </span>
              )}
            </span>
          </div>
        </div>

        <button type='submit' className="login-btn">Sign In</button>

        <p className="new-account">
          Not a member? <a href="#">Sign Up now!</a>
        </p>

        <br />

        <p className="f-pass">
          <a href="#">forget password?</a>
        </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
