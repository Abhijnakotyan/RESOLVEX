import React, { useState } from "react";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
// import illustration from "../../assets/illustration.png"; // your laptop+plant image

const AuthCard = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex w-[90%] max-w-5xl shadow-2xl rounded-xl overflow-hidden">
        
        {/* Left: Form Section */}
        <div className="w-full md:w-1/2 bg-white p-10">
          <div className="flex space-x-10 mb-8 border-b border-gray-300">
            <button
              onClick={() => setActiveTab("login")}
              className={`pb-2 text-lg font-semibold ${
                activeTab === "login"
                  ? "border-b-4 border-teal-500 text-teal-600"
                  : "text-gray-400"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`pb-2 text-lg font-semibold ${
                activeTab === "register"
                  ? "border-b-4 border-teal-500 text-teal-600"
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
          {/* <img src={illustration} alt="Auth illustration" className="w-2/3 object-contain" /> */}
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
