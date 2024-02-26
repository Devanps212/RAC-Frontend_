import React from 'react'
import './signup.css'
import { useState} from 'react'
import { Link } from 'react-router-dom'
import { signUpPayload } from '../../../types/payloadInterface'
import { userSignUp } from '../../../features/axios/api/user/userAuthentication'
import { useNavigate } from 'react-router-dom'

const SignUp = ()=>{
    
  const navigate = useNavigate()
    const [formData, setFormdata] = useState({
        name:'',
        email:'',
        mobile:0,
        password:'',
    })
    const [errors, setErrors] = useState({
        name:'',
        email:'',
        mobile:'',
        password:''
    })

    const handleSubmit = async(e : React.FormEvent)=>{
        try{
            console.log("checking form datas")
            e.preventDefault()
            let isValid = true
            const{name, email, mobile, password} = formData as signUpPayload

            //Name Validation
            if(!name || name.trim() == '')
            {
                isValid = false
                setErrors((prevState)=>({
                    ...prevState, name:"Please enter your name"
                }))
                console.log("failed name")
                return
            }
            
            //email Validation
            const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const pass = emailRegexp.test(email)
            if(!pass || email.trim() == '')
            {
                isValid = false
                setErrors((prevState)=>({
                    ...prevState,
                    email:"Please enter a valid email"
                }))
                console.log("failed email")
                return
            }
            const mobileRegexp = /^\d{10}$/;
            const StringMobile = mobile.toString()
            const isMobileValid = mobileRegexp.test(StringMobile);
            if (!isMobileValid || StringMobile.trim() === '') {
              isValid = false;
              setErrors((prevState) => ({
                ...prevState,
                mobile: 'Please enter a valid mobile number'
              }));
              console.log('failed mobile');
              return;
            }


            //Password Validation
            const passRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/;
            const passCheck = passRegexp.test(password)
            
            if(!password || password.trim() == '')
            {
                isValid = false
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
                const hasLowerCase = /[a-z]/.test(password)
                const hasCapitalCase = /[A-Z]/.test(password)
                const hasDigits = /\d/.test(password)
                const hasValidDigits = password.length > 7
                const hasSpecialCharacter = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password);

                if(!hasLowerCase || !hasCapitalCase || !hasValidDigits || !hasDigits || !hasSpecialCharacter)
                {
                    let errorMessage = "Password must "

                    errorMessage+= hasLowerCase?'': 'contain at least one lowercase letter, ';
                    errorMessage+= hasCapitalCase? '' : 'contain at least one uppercase letter, ';
                    errorMessage+= hasDigits?'' : 'contain at least one digit, ';
                    errorMessage+= hasValidDigits? '' : 'be at least 8 characters long';
                    errorMessage+= hasSpecialCharacter?'':'containt atleast one special character'
                    
                    setErrors((prevState)=>({
                        ...prevState,
                        password:errorMessage
                    }))
                    console.log("failed password")
                    return
                }
            }
            if(isValid)
            {
            await userSignUp(formData)
            .then((response:any)=>{
              console.log("user registered successfully")
              setTimeout(()=>{
                navigate('/users/signIn')
              }, 2000)
            })
            .catch((error:any)=>{
              console.log("not successfull")
            })
          }

          
       }
       catch(error){
        console.log(error)
       }

    }

    return (
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center min-vh-100 bg-gray-200 py-5 pt-5">
            <div className="col-md-8" style={{ backgroundColor: "#fff" }}>
              <div className="row shadow" style={{ marginRight: "-24px" }}>
                {/* Login form */}
                <div className="col-md-6 rounded-l-md bg-white p-4" style={{ maxWidth: '450px' }}>
                  <h1 className="text-xl font-semibold">User SignUp</h1>
                  <small className="text-gray-400">Enter your details below.</small>
      
                  <form className="mt-4" onSubmit={handleSubmit} action=''>
                    <div className="mb-3">
                      <label className="mb-2 block text-xs font-semibold">Name</label>
                      <input
                        type="text"
                        placeholder="name"
                        value={formData.name}
                        className={`form-control rounded-md border ${errors.name ? 'border-danger' : 'border-gray-300'} focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500`}
                        style={{ boxShadow: "inset 2px 2px 7px -3px grey" }}
                        onChange={(e) => setFormdata({ ...formData, name: e.target.value })}
                      />
                      {errors.name && (
                        <p className="text-danger text-xs mt-2">{errors.name}</p>
                      )}
                    </div>
      
                    <div className="mb-3">
                      <label className="mb-2 block text-xs font-semibold">Email</label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        className={`form-control rounded-md border ${errors.email ? 'border-danger' : 'border-gray-300'} focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500`}
                        style={{ boxShadow: "inset 2px 2px 7px -3px grey" }}
                        onChange={(e) => setFormdata({ ...formData, email: e.target.value })}
                      />
                      {errors.email && (
                        <p className="text-danger text-xs mt-2">{errors.email}</p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="mb-2 block text-xs font-semibold">Mobile</label>
                      <input
                        type="number"
                        placeholder="Enter your number"
                        value={formData.mobile}
                        className={`form-control rounded-md border ${errors.mobile ? 'border-danger' : 'border-gray-300'} focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500`}
                        style={{ boxShadow: "inset 2px 2px 7px -3px grey" }}
                        onChange={(e) => setFormdata({ ...formData, mobile: parseInt(e.target.value) })}
                        inputMode='numeric'
                      />
                      {errors.mobile && (
                        <p className="text-danger text-xs mt-2">{errors.mobile}</p>
                      )}
                    </div>
      
                    <div className="mb-3">
                      <label className="mb-2 block text-xs font-semibold">Password</label>
                      <input
                        type="password"
                        placeholder="*****"
                        value={formData.password}
                        className={`form-control rounded-md border ${errors.password ? 'border-danger' : 'border-gray-300'} focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500`}
                        style={{ boxShadow: "inset 2px 2px 7px -3px grey" }}
                        onChange={(e) => setFormdata({ ...formData, password: e.target.value })}
                      />
                      {errors.password && (
                        <p className="text-danger text-xs mt-2">{errors.password}</p>
                      )}
                    </div>
      
                    <div className='text-center'>
                      <button className='buttonSub' type='submit'>Submit</button>
                    </div>
                    <br />
      
                    <div className="mb-3">
                      <button className="buttn btn btn-block btn-outline-secondary d-flex justify-content-center align-items-center" style={{ width: '53%' }}>
                        <img className="google w-5 mr-2" src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="Google Icon" style={{ width: '25%' }} />
                        SignUp with Google
                      </button>
                    </div>
                  </form>
      
                  <div className="text-center">
                    <span className="text-xs text-gray-400 font-semibold">Already Have An Account?</span>
                    <Link to={'/users/signIn'} className="text-xs font-semibold text-purple-700">Sign in</Link>
                  </div>
                </div>
      
                {/* Login banner */}
                <div className="banner col-md-6 rounded-r-md position-relative">
                  <img
                    className="h-100 object-cover rounded-r-md"
                    src="/src/assets/admin/signUp/wp8326408-2021-aston-martin-dbx-wallpapers (3).jpg"
                    alt="Login banner"
                    style={{ objectFit: 'cover', width: '113%' }}
                  />
                  <div className="position-absolute top-0 start-50 translate-middle-x">
                    <p className="quote text-center py-3">Choose Your Vision</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      
}

export default SignUp