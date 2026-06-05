import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      {/* Left section: Logo + Company name */}
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <img
          src="/logo.png"  // Replace with actual logo path or emoji
          alt="Logo"
          className="h-10 w-10 object-cover"
        />
        {/* Company Name */}
        <span className="text-2xl font-bold text-gray-800">FinSight AI</span>
      </div>

      {/* Right section: Login + SignUp */}
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
};

export default Header;
