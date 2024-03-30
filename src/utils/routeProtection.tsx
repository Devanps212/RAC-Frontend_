import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

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

export const UserRouteProtection : React.FC<RouteProtectionProps> =({children})=>{
  if(localStorage.getItem('token'))
  {
    console.log('user exist')
    return <>{children}</>
  }
  else
  {
    return <Navigate to={'/users/signIn'}/>
  }
}

export const UserSignInSignupProtection : React.FC<RouteProtectionProps> = ({children})=>{
  if(!localStorage.getItem('token'))
  {
    return <>{children}</>
  }
  else
  {
    return <Navigate to={'/users/home'}/>
  }
}





