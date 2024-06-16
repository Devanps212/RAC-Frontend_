import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { jwtDecode } from 'jwt-decode';
import Loading from '../components/loading/loading';
import BlockedPage from '../components/commonComponent/blocked';
import { useSelector } from 'react-redux';
import { RootState } from '../features/axios/redux/reducers/reducer';
import BookingEndCheck from './protectedRoutes/bookingEndProtection';
import { BlockedRoutes } from './protectedRoutes/routeProtection';
import FpOTP from '../pages/user/FPOTP';

const UsersLogins = lazy(() => import('../pages/user/login'));
const UserSignUp = lazy(() => import('../pages/user/signUp'));
const VerifyOTP = lazy(() => import('../pages/user/VOTP'));
const HomePage = lazy(() => import('../pages/user/Home'));
const CarDetails = lazy(() => import('../pages/user/carDetails'));
const Bookings = lazy(() => import('../pages/user/TimeSelectionUI'));
const Cars = lazy(() => import('../pages/user/carPage'));
const SuccessfullTransaction = lazy(() => import('../pages/user/successFullTransacrtion'));
const BookedCars = lazy(() => import('../pages/user/bookedCars'));
const Profile = lazy(() => import('../pages/user/profile'));
const Negotiate = lazy(() => import('../pages/user/negotiate'));
const GetInTouch = lazy(() => import('../pages/user/GetInTouch'));
const ForgotPassword = lazy(()=>import('../pages/user/FPOTP'))
const ResetPassword = lazy(()=>import('../pages/user/resetPassword'))
const OTPverification = lazy(()=>import('../pages/user/verifyOtp'))
const UIpartner = lazy(()=>import('../pages/partner/partnerUI'))


const UserRouter = () => {
    const token = useSelector((root: RootState) => root.token.token);
    const valid = token ? jwtDecode(token) : null;

    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/signIn" element={valid ? <BookingEndCheck><Navigate to="/" /></BookingEndCheck> : <UsersLogins />} />
                <Route path="/signUp" element={valid ? <Navigate to="/" /> : <UserSignUp />} />
                <Route path="/OTP" element={<VerifyOTP />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/PartnerUI" element={valid ? <UIpartner/> : <Navigate to={'/signIn'}/>}/>
                <Route path="/UserBlocked" element={<BlockedRoutes><BlockedPage /></BlockedRoutes>} />
                <Route path="/carDetail" element={valid ? <CarDetails /> : <UsersLogins />} />
                <Route path="/bookingUI" element={valid ? <Bookings /> : <UsersLogins />} />
                <Route path="/Allcars" element={valid ? <Cars /> : <UsersLogins />} />
                <Route path="/TransactionSuccess" element={<SuccessfullTransaction />} />
                <Route path="/BookedCars" element={valid ? <BookingEndCheck><BookedCars /></BookingEndCheck> : <UsersLogins />} />
                <Route path="/profile" element={valid ? <Profile /> : <UsersLogins />} />
                <Route path="/negotiate/:userId/:partnerId/:carId" element={valid ? <Negotiate /> : <UsersLogins />} />
                <Route path="/getInTouch" element={<GetInTouch />} />
                <Route path="/forgotPassword" element={valid ? <Navigate to="/" /> : <ForgotPassword/>} />
                <Route path="/verifyOtp/:userEmail/:userId" element={valid ? <Navigate to="/" /> : <OTPverification/>} />
                <Route path="/resetPassword/:userEmail/:userId" element={valid ? <Navigate to="/" /> : <ResetPassword/>} />
            </Routes>
        </Suspense>
    );
};

export default UserRouter;
