import { Route, Routes } from 'react-router-dom';
import UsersLogins from '../pages/user/login';
import UserSignUp from '../pages/user/signUp';
import VerifyOTP from '../pages/user/VOTP';
import Home from '../pages/user/Home';

const UserRouter = () => {
  return (
    <>
    <Routes>
      <Route path="/signIn" element={<UsersLogins />} />
      <Route path="/signUp" element={<UserSignUp/>}/>
      <Route path="/OTP" element={<VerifyOTP/>}/>
      <Route path="/home" element={<Home/>}/>
    </Routes>
    </>
  );
};

export default UserRouter;
