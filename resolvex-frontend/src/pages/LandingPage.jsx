import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import background from "../assets/sjecmain.jpg";

const LandingPage = () => {
  const navigate = useNavigate();

  const goToDepartmentLogin = () => {
    navigate("/departmentlogin");
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center filter blur-sm"
        style={{ backgroundImage: `url(${background})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center text-white text-center px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <img src={logo} alt="ResolveX Logo" className="mx-auto h-24 mb-6" />
          <h1 className="text-4xl font-bold mb-4">Welcome to ResolveX</h1>
          <p className="text-xl mb-6">
            AI-powered Complaint Management System for Transparent Resolution
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to="/login">
              <button className="bg-white text-blue-900 px-6 py-3 rounded-xl shadow-md hover:bg-gray-100 font-semibold transition">
                Login
              </button>
            </Link>
            <Link to="/complaintform">
              <button className="bg-transparent border border-white text-white px-6 py-3 rounded-xl hover:bg-white hover:text-blue-900 font-semibold transition">
                Submit Anonymously
              </button>
            </Link>
            <button
              onClick={goToDepartmentLogin}
              className=" text-white px-6 py-3  rounded-xl font-semibold transition"
            >
              Department Login
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-white text-center py-6 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between px-4">
          <p className="text-sm">© 2025 ResolveX. All rights reserved.</p>
          <div className="flex gap-4 text-sm mt-2 md:mt-0">
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
            <Link to="/privacy" className="hover:underline">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
600