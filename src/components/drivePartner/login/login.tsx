import React, { useEffect } from 'react';
import { useState } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isPartnerLogin } from '../../../features/axios/redux/slices/partner/partnerLogin';
import { setPartnerToken } from '../../../features/axios/redux/slices/partner/tokenSlice';
import { RootState } from '../../../features/axios/redux/reducers/reducer';
import { partnerLogin } from '../../../features/axios/api/partner/partner';
import Loading from '../../loading/loading';
import './driverlogin.css'
import { toast } from 'react-toastify';

const PartnerLogin = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((root: RootState)=>root.partnerToken.partnerToken)
  const state = useSelector((state:RootState)=>state.partnerLogin.isLoggedIn)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (token) {
      dispatch(isPartnerLogin());
    }

    console.log("state : ", state)
    // if (state) {
    //   console.log("partner is not logged out");
    //   navigate('/partner/Dashboard');
    // }
  }, [dispatch, navigate, token, state]);
    const [formData, setFormdata] = useState({
      email:'',
      password:'',
    })
    const [errors, setErrors] = useState({
        email:'',
        password:''
    })
    const handleSubmit = (e:React.FormEvent)=>{
        try{
          console.log("checking form datas")
          e.preventDefault()
          
          let isValid = true
          console.log(isValid)
          const{email, password} = formData
          //email Validation
          const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          const pass = emailRegexp.test(email)
          console.log("checking email")
          if(!pass || email.trim() == '')
          {
              isValid = false
              console.log("email",isValid)
              
              setErrors((prevState)=>({
                  ...prevState,
                  email:"Please enter a valid email"
              }))
              console.log("failed email")
              return
          }

          //Password Validation
          const passRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/;
          const passCheck = passRegexp.test(password)
          console.log("passCheck", passCheck)
          console.log("checking password")
          if(!password || password.trim() == '')
          {
              isValid = false
              console.log("password First", isValid)
              setErrors((prevState)=>({
                  ...prevState,
                  password:'Please enter a valid password'
              }))
              console.log("failed password")
              return
          }
          else if(!passCheck)
          {
              isValid = false
              console.log("passcheck contain rules: ",isValid)
              const hasLowerCase = /[a-z]/.test(password)
              const hasCapitalCase = /[A-Z]/.test(password)
              const hasDigits = /\d/.test(password)
              const hasSpecialCharacter = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password);

              const hasValidDigits = password.length > 7

              if(!hasLowerCase || !hasCapitalCase || !hasValidDigits || !hasDigits || !hasSpecialCharacter)
              {
                  let errorMessage = "Password must "

                  errorMessage+= hasLowerCase?'': 'contain at least one lowercase letter, ';
                  errorMessage+= hasCapitalCase? '' : 'contain at least one uppercase letter, ';
                  errorMessage+= hasDigits?'' : 'contain at least one digit, ';
                  errorMessage+= hasValidDigits? '' : 'be at least 8 characters long';
                  errorMessage+= hasSpecialCharacter?'': 'Contain atleast one special Character'
                  
                  setErrors((prevState)=>({
                      ...prevState,
                      password:errorMessage
                  }))
                  console.log("failed password")
                  return
              }
              return 
          }
            console.log("form validated")
            console.log(isValid)
            console.log(errors)
            if(isValid)
            {
              setIsLoading(true)
                console.log("form submitted")
                partnerLogin(formData)
                .then((response)=>{
                  console.log(response.token)
                  dispatch(setPartnerToken(response.token))
                  dispatch(isPartnerLogin())
                  toast.success(response.message)
                  setIsLoading(false)
                  console.log("logging into dashboard")
                  navigate('/partner/Dashboard')
                })
                .catch((error:any)=>{
                  console.log(error.message)
                  setIsLoading(false)
                  toast.warning(error.message)
                })
            }

      }
      catch(error){
        console.log(error)
      }

    }

  return (
    <div className="container-fluid backG">
      {isLoading && <Loading/>}
    <Row className="justify-content-center align-items-center min-vh-100 bg-gray-200 py-5 pt-5">
      <Col md={8} style={{ backgroundColor: '#fff' }}>
        <Row className="shadow" style={{ marginRight: '-24px' }}>
          {/* Login form */}
          <Col md={6} className="rounded-l-md bg-white p-4" style={{ maxWidth: '450px' }}>
            <h1 className="text-xl font-semibold">Partner SignIn</h1>
            <small className="text-gray-400">Enter your details below.</small>

            <Form className="mt-4" onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="mb-2 block text-xs font-semibold">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  className={`form-control rounded-md border ${errors.email ? 'border-danger' : 'border-gray-300'} focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500`}
                  style={{ boxShadow: 'inset 2px 2px 7px -3px grey' }}
                  onChange={(e) => setFormdata({ ...formData, email: e.target.value })}
                />
                {errors.email && <p className="text-danger text-xs mt-2">{errors.email}</p>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="mb-2 block text-xs font-semibold">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="*****"
                  value={formData.password}
                  className={`form-control rounded-md border ${errors.password ? 'border-danger' : 'border-gray-300'} focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500`}
                  style={{ boxShadow: 'inset 2px 2px 7px -3px grey' }}
                  onChange={(e) => setFormdata({ ...formData, password: e.target.value })}
                />
                {errors.password && <p className="text-danger text-xs mt-2">{errors.password}</p>}
              </Form.Group>

              <div className="mb-3 form-check p-0">
                <a href="#" className="text-xs font-semibold text-purple-700 ml-auto">
                  Forgot password?
                </a>
              </div>

              <div className="text-center">
                <Button variant='dark' className="buttonSub" type="submit">
                  Submit
                </Button>
              </div>
              <br />

              
            </Form>

          </Col>

          {/* Login banner */}
          <Col md={6} className="banner rounded-r-md position-relative">
            <img
              className="h-100 object-cover rounded-r-md"
              src="/assets/admin/login/Wallpapers World Cars Wallpapers Full HD 1080p (1).jpg"
              alt="Login banner"
              style={{ objectFit: 'cover', width: '105%' }}
            />
            <div className="position-absolute top-0 start-50 translate-middle-x">
              <p className="quote text-center py-3">Just Drive Your Dream</p>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
  );
};

export default PartnerLogin;
