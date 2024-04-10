import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { decodeToken } from "../../utils/tokenUtil";


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

  const token = localStorage.getItem('token')
  if(token)
  {
    const userId = decodeToken(token).payload
    console.log("userId : ", userId)
    const userBlock = localStorage.getItem('BlockedUsers')
    console.log("blocked user : ",userBlock)
    if(userBlock)
    {
      const parseblock = JSON.parse(userBlock)
      console.log("", parseblock)
      if(parseblock.includes(userId))
      {
        return <Navigate to={'/users/UserBlocked'}/>
      }
    } 
    console.log(userId)
    console.log('user exist')
    return <>{children}</>
  }
  else
  {
    return <Navigate to={'/users/signIn'}/>
  }
}

export const UserSignInSignupProtection : React.FC<RouteProtectionProps> = ({children})=>{
  const token = localStorage.getItem('token')
  if(token)
  {
    const userId = decodeToken(token).payload
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
    console.log("no blocked user found")
    return <Navigate to={'/users/home'}/>
  }
  else
  {
    console.log("no token found")
    return <>{children}</>
  }
}

export const BlockedRoutes :React.FC<RouteProtectionProps> = ({children})=>{
  try
  {
    const token = localStorage.getItem('token') ?? ''
  const UBuser = localStorage.getItem('BlockedUsers') ?? ''
  if(token && UBuser)
    {
      const ParsedUsers = JSON.parse(UBuser)
      const userId = decodeToken(token).payload
      if(!ParsedUsers.includes(userId))
        {
          return <Navigate to={'/users/home'}/>
        }
        return <>{children}</>
    }
    else
    {
      return <Navigate to={'/users/signIn'}/>
    }
  }
  catch(error:any)
  {
    console.log(error.message)
    throw new Error(error.message)
  }
  
}






