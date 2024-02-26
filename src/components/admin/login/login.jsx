import { useState } from 'react';
import './login.css'

const Login = () => {

  const [formData, setFormdata] = useState({
    email:'',
    password:'',
})
const [errors, setErrors] = useState({
    email:'',
    password:''
})
const handleSubmit = (e)=>{
    try{
        console.log("checking form datas")
        e.preventDefault()
        let isValid = true
        const{email, password} = formData
        
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

        //Password Validation
        const passRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
        }
        if(isValid)
        {
            console.log("form submitted")
        }

  }
  catch(error){
    console.log(error)
  }

}

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center min-vh-100 bg-gray-200 py-5 pt-5">
        <div className="col-md-8" style={{backgroundColor:"#fff"}}>
          <div className="row shadow" style={{marginRight:"-24px"}}>
            {/* Login form */}
            <div className="col-md-6 rounded-l-md bg-white p-4" style={{ maxWidth: '450px' }}>
              <h1 className="text-xl font-semibold">Admin SignIn</h1>
              <small className="text-gray-400">Enter your admin credentials below.</small>

              <form className="mt-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="mb-2 block text-xs font-semibold">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    className={`form-control rounded-md border ${errors.email ? 'border-danger' : 'border-gray-300'} focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500`}
                    style={{boxShadow:"inset 2px 2px 7px -3px grey" }}
                    onChange={(e)=>setFormdata({...formData, email:e.target.value})}
                  />
                  {errors.email && (
                        <p className="text-danger text-xs mt-2">{errors.email}</p>
                      )}
                </div>

                <div className="mb-3">
                  <label className="mb-2 block text-xs font-semibold">Password</label>
                  <input
                    type="password"
                    placeholder="*****"
                    value={formData.password}
                    className={`form-control rounded-md border ${errors.password ? 'border-danger' : 'border-gray-300'} focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500`}
                    style={{boxShadow:"inset 2px 2px 7px -3px grey" }}
                    onChange={(e)=>setFormdata({...formData, password:e.target.value})}
                  />
                  {errors.password && (
                        <p className="text-danger text-xs mt-2">{errors.password}</p>
                      )}
                </div>

                <div className="mb-3 form-check">
                  <a href="#" className="text-xs font-semibold text-purple-700 ml-auto">Forgot password?</a>
                </div>
                
                <div className='text-center'>
                  <button className='buttonSub' type='submit'>Sumbit</button>
                </div>
                <br/>

                <div className="mb-3">
                  <button className="buttn btn btn-block btn-outline-secondary d-flex justify-content-center align-items-center" style={{width:'53%'}}>
                    <img className="google w-5 mr-2" src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="Google Icon" style={{width:'25%'}}/>
                    Sign in with Google
                  </button>
                </div>
              </form>

              <div className="text-center">
                <span className="text-xs text-gray-400 font-semibold">Dont have an account?</span>
                <a href="#" className="text-xs font-semibold text-purple-700">Sign up</a>
              </div>
            </div>

            {/* Login banner */}
            <div className="banner col-md-6 rounded-r-md position-relative">
                <img
                    className="h-100 object-cover rounded-r-md"
                    src="/src/assets/admin/login/Wallpapers World Cars Wallpapers Full HD 1080p (1).jpg"
                    alt="Login banner"
                    style={{ objectFit: 'cover', width: '105%' }}
                />
                <div className="position-absolute top-0 start-50 translate-middle-x">
                    <p className="quote text-center py-3">Just Drive Your Dream</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
