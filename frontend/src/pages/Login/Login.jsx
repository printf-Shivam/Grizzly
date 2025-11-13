import React, { useCallback, useState } from 'react'
import GoogleSignIn from '../../components/Buttons/GoogleSignIn'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '../../store/features/common';
import { Link } from 'react-router-dom';
import { loginAPI } from '../../api/authentication';
import { motion } from "framer-motion";

const Login = () => {
  const [values, setValues]= useState({
    userName:'',
    password:''
  });

  const [error,setError] =useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit =useCallback((e)=>{
    e.preventDefault();
    setError :'';
    dispatch(setLoading(true));
    loginAPI(values).then(res=>{
      if(res.token){
        navigate("/")
      }
      else{
        setError = 'some error occured'
      }
    }).catch(err=>{
      setError("invalid details")
    }).finally(setLoading(false));
  },[navigate,dispatch,values]);

  const handleOnChange =useCallback((e)=>{
    e.persist();
    setValues(values=>({
      ...values,
      [e.target.name]: e.target?.value
    }))
  },[])


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>

        <GoogleSignIn />

        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-gray-300" />
          <p className="text-gray-500 text-sm">OR</p>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <form onSubmit={onSubmit} className="space-y-5">

          <input
            type="email"
            name="userName"
            value={values?.userName}
            onChange={handleOnChange}
            placeholder="Email address"
            required
            className="h-12 w-full border border-gray-300 p-3 rounded-lg
                       focus:ring-2 focus:ring-black focus:outline-none"
          />

          <input
            type="password"
            name="password"
            value={values?.password}
            onChange={handleOnChange}
            placeholder="Password"
            required
            autoComplete="new-password"
            className="h-12 w-full border border-gray-300 p-3 rounded-lg
                       focus:ring-2 focus:ring-black focus:outline-none"
          />

          <Link
            className="block text-right text-sm text-gray-500 underline hover:text-black"
          >
            Forgot Password?
          </Link>

          <button
            type="submit"
            className="w-full bg-black text-white h-12 rounded-lg
                       hover:opacity-80 transition"
          >
            Sign In
          </button>
        </form>

        {error && (
          <p className="text-lg text-red-600 mt-3 text-center">{error}</p>
        )}

        <p className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/v1/register" className="underline hover:text-black">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login
