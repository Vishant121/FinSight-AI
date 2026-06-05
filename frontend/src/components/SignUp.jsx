import React from 'react'
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md overflow-hidden flex">
        {/* Login Section */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
          <p className="text-gray-600 mb-8">
            To keep connected with us please login with your personal info
          </p>
          
          <Link
      to="/sign-in" 
      className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded-md transition duration-300 mb-8 inline-block text-center"
    >
      SIGN IN
    </Link>
        </div>
        
        {/* Divider */}
        <div className="w-px bg-gray-200"></div>
        
        {/* Signup Section */}
        <div className="w-1/2 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Account</h1>
          
          {/* Social Icons */}
          <div className="flex space-x-4 mb-6">
            <button className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white">
              <span className="font-bold">f</span>
            </button>
            <button className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white">
              <span className="font-bold">G+</span>
            </button>
            <button className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <span className="font-bold">in</span>
            </button>
          </div>
          
          <p className="text-gray-600 mb-6">or use your email for registration</p>
          
          {/* Form */}
          <div className="space-y-4 mb-6">
            <div className="border-b border-gray-300 py-2">
              <input 
                type="text" 
                placeholder="Name" 
                className="w-full outline-none"
              />
            </div>
            <div className="border-b border-gray-300 py-2">
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full outline-none"
              />
            </div>
            <div className="border-b border-gray-300 py-2">
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full outline-none"
              />
            </div>
          </div>
          
          <Link
      to="/dashboard"  
      className="w-full bg-transparent border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md transition duration-300 inline-flex justify-center items-center"
    >
      SIGN UP
    </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp
