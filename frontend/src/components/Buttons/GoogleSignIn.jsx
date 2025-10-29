import React from 'react'
import GoogleLogo from '../../assets/img/google.png'
const GoogleSignIn = () => {

  return (
    <button  className='flex justify-center items-center border w-full rounded border-gray-600 h-[48px] hover:bg-slate-50'>
        <img src={GoogleLogo} alt='google-icon'className="w-5 h-5"  />
        <p className='px-2 text-gray-500'>Continue With Google</p>
    </button>
  )
}

export default GoogleSignIn