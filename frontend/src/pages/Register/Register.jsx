import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setLoading } from '../../store/features/common';
import { registerAPI } from '../../api/authentication';
import GoogleSignIn from '../../components/Buttons/GoogleSignIn'
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import VerifyCode from './VerifyCode';

const Register = () => {

  const [values, setValues]= useState({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    phone:''

  });

  const [error, setError]= useState('')
  const dispatch = useDispatch();
  const [enableVerify, setEnableVerify]= useState(false);

  const onSubmit= useCallback((e)=>{
    e.preventDefault();
    setError('')
    dispatch(setLoading(true))
    registerAPI(values).then(res=>{
      if(res?.code===200){
        setEnableVerify(true)
      }
    }).catch(err=>{
      setError("Invalid credentials or Email already exist")
    }).finally(()=>{
      dispatch(setLoading(false))
  })
  },[dispatch,values])

  const handleOnChange = useCallback((e)=>{
    e.persist();
    setValues(values=>({
      ...values,
      [e.target.name]:e.target?.value,
    }))
  },[]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      
      {!enableVerify && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8"
        >
          <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>

          <GoogleSignIn />

          <div className="flex items-center gap-2 my-4">
            <div className="flex-1 h-px bg-gray-300" />
            <p className="text-gray-500 text-sm">OR</p>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <form onSubmit={onSubmit} autoComplete="off" className="space-y-4">

            <div>
              <label className="text-sm font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                value={values?.email}
                onChange={handleOnChange}
                placeholder="Email address"
                required
                autoComplete="off"
                className="h-12 w-full border border-gray-300 p-3 rounded-lg
                           mt-1 focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={values?.password}
                onChange={handleOnChange}
                placeholder="Password"
                required
                autoComplete="new-password"
                className="h-12 w-full border border-gray-300 p-3 rounded-lg
                           mt-1 focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white h-12 rounded-lg
                         mt-4 hover:opacity-80 transition"
            >
              Sign Up
            </button>
          </form>

          {error && (
            <p className="text-lg text-red-600 mt-3 text-center">{error}</p>
          )}

          <p className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/api/auth/login"
              className="underline hover:text-black"
            >
              Log in
            </Link>
          </p>
        </motion.div>
      )}

      {enableVerify && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-md"
        >
          <VerifyCode email={values?.email} />
        </motion.div>
      )}
    </div>
  );
}

export default Register
