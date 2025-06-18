import React from 'react';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="bg-[#57cc99] p-2 fixed top-0 left-0 w-full ">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left: Logo and Brand Name */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-12 h-12 mr-2"
          />
          <h1 className="text-white text-2xl font-bold">Resolvex</h1>
        </div>

       <div className="flex items-center gap-x-6 mr-10">
      <a
        href="/userdashboard"
        className="text-white font-bold text-base hover:underline"
      >
        Home
      </a>
      <a
        href="/"
        className="text-white font-bold text-base hover:underline"
      >
        Logout
      </a>
  </div>
      </div>
    </nav>
  );
};

export default Navbar;
