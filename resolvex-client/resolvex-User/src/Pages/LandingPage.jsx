import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../../assets/logo.png";
import background from "../../../assets/sjecmain.jpg";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen relative w-full overflow-hidden">
      {/* Background Image (cropped on mobile) */}
      <div
        className="absolute inset-0 w-full h-full z-0 bg-cover bg-center filter blur-sm"
        style={{ backgroundImage: `url(${background})` }}
      ></div>


      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center text-white text-center px-3 sm:px-6 py-10 sm:py-20">
        <div className="w-full max-w-2xl mx-auto">
          {/* Logo */}
          <img
            src={logo}
            alt="ResolveX Logo"
            className="mx-auto h-14 xs:h-16 sm:h-20 md:h-24 mb-4 sm:mb-6"
          />

          {/* Heading */}
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 leading-tight">
            Welcome to ResolveX
          </h1>

          {/* Subtitle */}
          <p className="text-sm xs:text-base sm:text-lg md:text-xl mb-5 sm:mb-6">
            AI-powered Complaint Management System for Transparent Resolution
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full px-4">
          <Link to="/complaintform" state={{ anonymousMode: true }} className="w-full sm:w-auto">
            <button className="w-full sm:w-48 md:w-60 lg:w-72 text-white px-5 py-2.5 sm:px-6 sm:py-3 border border-white rounded-xl font-semibold hover:bg-white hover:text-black transition duration-300 text-sm sm:text-base">
              Submit Anonymously
            </button>
          </Link>

          <Link to="/authCard" className="w-full sm:w-auto">
            <button className="w-full sm:w-48 md:w-60 lg:w-72 text-white px-5 py-2.5 sm:px-6 sm:py-3 border border-white rounded-xl font-semibold hover:bg-white hover:text-black transition duration-300 text-sm sm:text-base">
              Login
            </button>
          </Link>
        </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="text-white text-center py-5 sm:py-6 relative z-10 text-xs xs:text-sm px-2 sm:px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between gap-2 items-center">
          <p className="mb-2 sm:mb-0">© 2025 ResolveX. All rights reserved.</p>
          <div className="flex gap-3 sm:gap-4 justify-center sm:justify-start">
            <Link to="/about" className="hover:underline">
              About
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
            <Link to="/privacy" className="hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
