import React, { useState } from "react";
import axios from "axios";

import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const departments = [
  "MCA", "MBA", "CSE", "CSBS", "EEE", "ECE", "ISBS", "Hostel", "CCC", "Administration"
];

const DepartmentLogin = () => {
  const [department, setDepartment] = useState("MCA");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }

    if (!department) {
      newErrors.department = "Department must be selected.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      const res = await axios.post("http://localhost:8000/auth/department/login", {
        email,
        password,
        department_name: department
      });

      alert("Login Successful!");
      console.log(res.data);

    
      navigate(`/department/${department.toLowerCase()}`);
    } catch (err) {
      console.error("Login failed:", err.response?.data);
      alert(err.response?.data?.detail || "Login failed. Please try again.");
    }
    localStorage.setItem("role", "department");
localStorage.setItem("department_name", department); // Also set dept name

  };

  return (
   
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#57cc99] to-[#d4fc79]">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="College Logo" className="h-16" />
        </div>

        <h2 className="text-3xl font-bold text-center text-[#57cc99] mb-6">
          Department Login
        </h2>

        {/* Department Dropdown */}
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Select Department
        </label>
        <select
          className={`w-full px-4 py-2 border ${
            errors.department ? "border-red-500" : "border-gray-300"
          } rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#57cc99]`}
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        {errors.department && <p className="text-red-500 text-sm mb-2">{errors.department}</p>}

        {/* Email Input */}
        <label className="block mb-2 text-sm font-medium text-gray-700">Department Email</label>
        <input
          type="email"
          placeholder="e.g. cse@sjec.ac.in"
          className={`w-full px-4 py-2 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded-md mb-1 focus:outline-none focus:ring-2 focus:ring-[#57cc99]`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

        {/* Password Input */}
        <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          className={`w-full px-4 py-2 border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } rounded-md mb-1 focus:outline-none focus:ring-2 focus:ring-[#57cc99]`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password}</p>}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-[#57cc99] text-white py-2 rounded-md hover:bg-[#45b87e] transition duration-200 font-semibold"
        >
          Login
        </button>
      </div>
    </div>
    
  );
};

export default DepartmentLogin;
