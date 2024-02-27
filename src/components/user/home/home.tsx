import React from 'react';
import './home.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../features/axios/redux/slices/user/userLoginAuthSlice';
import { clearToken } from '../../../features/axios/redux/slices/user/tokenSlice';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate()


  const dispatch = useDispatch()
  const handleLogout = ()=>{
    dispatch(logout())
    dispatch(clearToken())
    navigate('/users/signIn')
  }
  return (
    <div className="home">
      <header className="App-header">
        <button onClick={handleLogout}>
          Logout
        </button>
        <h1>Welcome to My React Homepage</h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default Home;
