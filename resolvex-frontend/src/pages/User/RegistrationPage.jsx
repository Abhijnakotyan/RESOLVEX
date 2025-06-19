import React, { useState } from "react";
import axios from "axios";
import CustomButton from "../../components/Button";

function RegistrationPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!form.password) newErrors.password = "Password is required.";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    if (!form.confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
    else if (form.confirmPassword !== form.password)
      newErrors.confirmPassword = "Passwords do not match.";
    return newErrors;
  };

  const handleRegister = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/auth/register", {
        username: form.name,
        email: form.email,
        password: form.password,
      });
      alert("Registered Successfully!");
      console.log(response.data);
      window.location.href = "/login";
    } catch (err) {
      console.error("Registration failed", err.response?.data);
      const errorMsg = err.response?.data?.detail?.[0]?.msg || "Registration Failed";
      alert(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-teal-100 to-blue-100 font-sans">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create an Account</h2>

        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:outline-none`}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none`}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none`}
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password Field */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } focus:outline-none`}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Register Button */}
          <CustomButton label="Register" onClick={handleRegister} />
        </div>

        <div className="mt-6 text-center text-sm">
          Already a user?{" "}
          <a href="/login" className="text-green-600 font-semibold hover:underline">
            Sign in here
          </a>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
