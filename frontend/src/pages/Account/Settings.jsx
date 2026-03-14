import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../../utils/jwt-helper';

const Settings = () => {

    const navigate = useNavigate();

    const onLogOut = useCallback(()=>{
        logOut();
        navigate("/")
    },[navigate])

  return (
    <div>
      
    </div>
  )
}

export default Settings
