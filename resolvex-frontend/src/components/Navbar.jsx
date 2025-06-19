import React from 'react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const role = localStorage.getItem("role"); // Should be "user", "department", or "anonymous"
  const department = localStorage.getItem("department_name") || "mca";

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const renderLinks = () => {
    if (role === "user") {
      return (
        <>
          <a href="/userdashboard" className="text-white font-bold text-base hover:underline">Home</a>
          <a href="/complaintform" className="text-white font-bold text-base hover:underline">Submit Complaint</a>
          <button onClick={handleLogout} className="text-white font-bold text-base hover:underline">Logout</button>
        </>
      );
    } else if (role === "department") {
      return (
        <>
          <a href={`/department/${department.toLowerCase()}`} className="text-white font-bold text-base hover:underline">Home</a>
          <a href={`/department/${department.toLowerCase()}/summary`} className="text-white font-bold text-base hover:underline">Summary</a>
          <button onClick={handleLogout} className="text-white font-bold text-base hover:underline">Logout</button>
        </>
      );
    } else {
      // anonymous or default
      return (
        <>
          <a href="/" className="text-white font-bold text-base hover:underline">Home</a>
          <a href="/complaintform" className="text-white font-bold text-base hover:underline">Submit Complaint</a>
        </>
      );
    }
  };

  return (
    <nav className="bg-[#57cc99] p-2 fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-12 h-12 mr-2" />
          <h1 className="text-white text-2xl font-bold">Resolvex</h1>
        </div>
        <div className="flex items-center gap-x-6 mr-10">
          {renderLinks()}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
