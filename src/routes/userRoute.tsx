import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loading from '../components/loading/loading';
const UsersLogins = lazy(()=> import('../pages/user/login'))
const UserSignUp = lazy(()=> import('../pages/user/signUp'))
const VerifyOTP = lazy(()=> import('../pages/user/VOTP'))
const HomePage = lazy(()=>import('../pages/user/Home'))
import BlockedPage from '../components/commonComponent/blocked';
import { UserRouteProtection, UserSignInSignupProtection, BlockedRoutes } from './protectedRoutes/routeProtection';

const UserRouter = () => {
  return (
    <>
    <Suspense fallback={<Loading/>}>
      <Routes>
        <Route path="/signIn" element={<UserSignInSignupProtection><UsersLogins/></UserSignInSignupProtection>} />
        <Route path="/signUp" element={<UserSignInSignupProtection><UserSignUp/></UserSignInSignupProtection>}/>
        <Route path="/OTP" element={<VerifyOTP/>}/>
        <Route path="/home" element={<UserRouteProtection><HomePage/></UserRouteProtection>}/>
        <Route path="/UserBlocked" element={<BlockedRoutes><BlockedPage/></BlockedRoutes>}/>
      </Routes>
    </Suspense>
    </>
  );
};

export default UserRouter;
