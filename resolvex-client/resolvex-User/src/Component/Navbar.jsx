import React, { useEffect, useState } from 'react';
import logo from "../../../assets/logo.png";

const Navbar = () => {
 

  return (
    <div className="flex items-center justify-between bg-[#57c999] px-6 py-4  mb-6">
      <div className="flex items-center space-x-4">
        <img src={logo} alt="Logo" className="h-8 w-auto" />
        <span className="text-white font-semibold text-lg">ResolveX</span>
      </div>

      <div className="flex space-x-6">
        <a href="/" className="text-white font-bold text-base hover:underline">Home</a>
        <a href="/complaintform" className="text-white font-bold text-base hover:underline">Submit Complaint</a>
        <a href="/track-complaint" className="text-white font-bold text-base hover:underline">Track Complaint</a>
      </div>
    </div>
  );
};

export default Navbar;
