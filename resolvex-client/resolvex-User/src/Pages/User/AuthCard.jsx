import React, { useState } from "react";
import LoginPage from "./LoginPage";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import RegistrationPage from "./RegistrationPage";
import illustration from "/loginimage.jpg"; // your laptop+plant image

const AuthCard = () => {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${'/bckg.jpg'})`}}>
      {/* <h1 className="absolute top-6 text-3xl md:text-4xl font-bold text-white text-center w-full">
        ResolveX
      </h1> */}
      <button
      className="absolute top-6 left-6 flex items-center text-teal-600 hover:text-teal-800 font-medium"
      onClick={() => navigate("/")}>
      <FaArrowLeft className="mr-2" />
     
      </button>
       
      <div className="flex lg:w-[60%] w-[90%] max-w-5xl shadow-2xl rounded-xl overflow-hidden">
       
        {/* Left: Form Section */}
        <div className="w-full md:w-1/2 bg-white/10 p-10 backdrop-blur-md rounded-xl shadow-lg">
          <div className="flex space-x-10 mb-8 border-b border-gray-300">
            <button
              onClick={() => setActiveTab("login")}
              className={`pb-2 text-lg font-semibold ${
                activeTab === "login"
                  ? "border-b-4 border-teal-500 text-gray-100"
                  : "text-gray-400"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`pb-2 text-lg font-semibold ${
                activeTab === "register"
                  ? "border-b-4 border-teal-500 text-gray-100"
                  : "text-gray-400"
              }`}
            >
              Sign up
            </button>
          </div>

          {/* Form Content */}
          {activeTab === "login" ? <LoginPage embedded /> : <RegistrationPage embedded />}
        </div>

        {/* Right: Illustration Section */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-teal-100 to-green-200 items-center justify-center">
        <img src={illustration} alt="Auth illustration" className="w-full h-full object-cover" />
      </div>

      </div>
    </div>
  );
};

export default AuthCard;