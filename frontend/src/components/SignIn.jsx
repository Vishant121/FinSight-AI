import React from 'react'
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sign-In Form Section */}
      <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Sign in</h1>
          
          {/* LinkedIn Button */}
          <button className="hover:bg-orange-500 w-full flex items-center justify-center space-x-2 bg-orange-400 text-white py-2 px-4 rounded-md mb-6">
            <span className="font-bold">in</span>
            <span>Sign in with LinkedIn</span>
          </button>
          
          <div className="flex items-center mb-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">or use your account</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          
          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          
          {/* Forgot Password */}
          <div className="mb-6 text-right">
            <a href="#" className=" text-blue-600 hover:underline">Forgot your password?</a>
          </div>
          
          {/* Sign In Button */}
          <Link 
      to="/dashboard" 
      className=" hover:bg-orange-500 w-full bg-orange-400  text-white font-semibold py-2 px-4 rounded-md transition duration-300 mb-6 inline-block text-center"
    >
      SIGN IN
    </Link>
        </div>
      </div>
      
      {/* Welcome Section */}
      <div className="hidden md:flex md:w-1/2 bg-orange-400 flex-col items-center justify-center p-8 text-white">
        <h1 className="text-3xl font-bold mb-4">Hello, Friend!</h1>
        <p className="text-xl mb-8 text-center max-w-md">
          Enter your personal details and start journey with us
        </p>
        <Link
      to="/sign-up"  
      className="border-2 border-white text-white font-semibold py-2 px-8 rounded-full hover:bg-white hover:text-orange-600 transition duration-300 inline-block text-center"
    >
      SIGN UP
    </Link>
      </div>
    </div>
  )
}

export default SignIn
