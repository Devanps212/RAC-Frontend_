import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loading from '../components/loading/loading';
const UsersLogins = lazy(()=> import('../pages/user/login'))
const UserSignUp = lazy(()=> import('../pages/user/signUp'))
const VerifyOTP = lazy(()=> import('../pages/user/VOTP'))
const HomePage = lazy(()=>import('../pages/user/Home'))
const CarDetails = lazy(()=>import('../pages/user/carDetails'))
import BlockedPage from '../components/commonComponent/blocked';
const Bookings = lazy(()=>import('../pages/user/TimeSelectionUI'))
const Cars = lazy(()=>import('../pages/user/carPage'))
const SuccessfullTransaction = lazy(()=>import('../pages/user/successFullTransacrtion'))
const BookedCars = lazy(()=>import('../pages/user/bookedCars'))
const Profile = lazy(()=>import('../pages/user/profile'))
const Negotiate = lazy(()=>import('../pages/user/negotiate'))
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
        <Route path='/carDetail' element={<CarDetails/>}/>
        <Route path='/bookingUI' element={<Bookings/>}/>
        <Route path='/Allcars' element={<Cars/>}/>
        <Route path='/TransactionSuccess' element={<SuccessfullTransaction/>}/>
        <Route path='/BookedCars/' element={<BookedCars/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/negotiate/:userId/:partnerId/:carId' element={<Negotiate/>}/>
      </Routes>
    </Suspense>
    </>
  );
};

export default UserRouter;
