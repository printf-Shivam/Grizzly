import React from 'react'
import Navigation from '../components/navigation/Navigation'
import { Outlet } from "react-router-dom";

const AuthenticationWrapper = () => {
  return (
    <div>
        <Navigation variant="auth"/>
        <Outlet/>
    </div>
  )
}

export default AuthenticationWrapper
