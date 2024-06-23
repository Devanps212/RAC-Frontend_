import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { decodeToken } from "../../utils/tokenUtil";
import { tokenInterface } from "../../types/payloadInterface";
import { clearToken } from "../../features/axios/redux/slices/user/tokenSlice";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

interface RouteProtectionProps {
  children: ReactNode;
}

export const AdminRouteProtection: React.FC<RouteProtectionProps> = ({ children }) => {
  if (localStorage.getItem('admintoken')) 
  {
    console.log("admin token already there ")
    return <>{children}</>;
  } 
  else 
  {
    return <Navigate to="/admin/signIn" />;
  }
};

export const UserRouteProtection: React.FC<RouteProtectionProps> = ({ children }) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decodedToken : tokenInterface= jwtDecode(token);
      const userId = decodedToken.payload;
      const expirationTime = decodedToken.exp * 1000;

      console.log('Token expiration time:', new Date(expirationTime));

      
      if (Date.now() >= expirationTime) {
        console.log('Token expired');
        localStorage.removeItem('token');
        toast.error("token expired")
        return <Navigate to={'/signIn'} />;
      }

      const userBlock = localStorage.getItem('BlockedUsers');

      if (userBlock) {
        const parseBlockedUsers = JSON.parse(userBlock);
        console.log('Blocked users:', parseBlockedUsers);

        if (parseBlockedUsers.includes(userId)) {
          return <Navigate to={'/UserBlocked'} />;
        }
      }

      console.log('User authenticated');
      return <>{children}</>;
    } catch (error) {
      console.error('Error decoding token:', error);
      return <Navigate to={'/'} />; 
    }
  } else {
    console.log('No token found');
    return <Navigate to={'/signIn'} />;
  }
};

export const UserSignInSignupProtection : React.FC<RouteProtectionProps> = ({children})=>{
  const token = localStorage.getItem('token')
  if(token)
  {
    const decodedToken : tokenInterface = decodeToken(token)
    if(decodedToken)
    {
      console.log("Token decoded", decodedToken)
      const {exp, payload} = decodedToken
      const userId = payload

      if(Date.now() >= exp * 1000)
        {
          console.log("token exopired message from middleware")
          clearToken()
          return <Navigate to={"/users/signIn"}/>
        }
      const Buser = localStorage.getItem('BlockedUsers')
      if(Buser)
      {
        const parseData = JSON.parse(Buser)
        if(parseData.includes(userId))
        {
          console.log("returning child aka signIn")
          return <>{children}</>
        }
        console.log("user not blocked")
          return <Navigate to={'/users/home'}/>
      }
    }
    console.log("no blocked user found")
    return <Navigate to={'/users/home'}/>
  }
  else
  {
    console.log("no token found in middleware")
    return <>{children}</>
  }
}

export const BlockedRoutes: React.FC<RouteProtectionProps> = ({ children }) => {
  try {
    const token = localStorage.getItem('token') ?? '';
    const UBuser = localStorage.getItem('BlockedUsers') ?? '';

    if (token) {
      const userId = decodeToken(token).payload; 

      if (UBuser) {
        const ParsedUsers = JSON.parse(UBuser);

        if (ParsedUsers.includes(userId)) {
          return <Navigate to={'/UserBlocked'} />;
        }
      }

      return <>{children}</>;
    } else {
      return <Navigate to={'/signIn'} />;
    }
  } catch (error) {
    console.error('Error in BlockedRoutes:', error);
    // Handle error gracefully, possibly redirecting to an error page or logging out the user
    return <Navigate to={'/error'} />; // Example of redirecting to an error page
  }
};






