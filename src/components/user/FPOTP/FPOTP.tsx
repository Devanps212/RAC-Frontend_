import React from 'react';
import { useEffect, useState } from 'react';
import './FPOTP.css'

const Fpotp = () => {

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e:React.FormEvent)=>{

    e.preventDefault()
    let isValid = true
    if(!email || email.trim() == '')
    {
      isValid = false
      setError('Please Enter a valid email') 
    }

    if(isValid)
    {
       console.log("email accepted")
    }

  }

  useEffect(()=>{
    console.log(`mail: ${email}`)
  },[email])

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center min-vh-100 bg-gray-200 py-5 pt-5">
        <div className="col-md-8" style={{backgroundColor:"#fff"}}>
          <div className="row shadow" style={{marginRight:"-24px"}}>
            {/* Login form */}
            <div className="col-md-6 rounded-l-md bg-white p-4" style={{ maxWidth: '450px' }}>
              <h1 className="text-xl font-semibold">Forgot Password</h1>
              <div className='text-center'>
              <small className="text-dark-400">Enter your email below.</small>
              </div>

              <form className="mt-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="mb-2 block text-xs font-semibold">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    className={`form-control rounded-md border ${error ? 'border-danger' : 'border-gray-300'} focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500`}
                    style={{boxShadow:"inset 2px 2px 7px -3px grey" }}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                  {error && (
                        <p className="text-danger text-xs mt-2">{error}</p>
                      )}
                </div>

                <div className="mb-3 form-check text-center">
                  <p className="text-xs font-semibold text-purple-700 ml-auto">We will send a one-time password to this email for verification purposes.</p>
                </div>
                
                <div className='text-center'>
                  <button className='buttonSub' type='submit'>Sumbit</button>
                </div>
                <br/>
              </form>
            </div>

            {/* Login banner */}
            <div className="banner col-md-6 rounded-r-md position-relative">
                <img
                    className="h-100 object-cover rounded-r-md"
                    src="/src/assets/admin/FPOTP/kahl-orr-ZdLFPE0AZBU-unsplash.jpg"
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

export default Fpotp;
