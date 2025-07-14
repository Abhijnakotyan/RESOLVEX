import React, { useState } from "react";
import axios from "axios";
import CustomButton from "../../Component/Button";


function RegistrationPage({ embedded = false }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email.";
    if (!form.password) newErrors.password = "Password is required.";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    if (!form.confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
    else if (form.confirmPassword !== form.password) newErrors.confirmPassword = "Passwords do not match.";
    return newErrors;
  };

  const handleRegister = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post("http://localhost:8000/auth/register", {
        username: form.name,
        email: form.email,
        password: form.password,
      });
      alert("Registered Successfully!");
      window.location.href = "/authCard"; // Redirect to login page
    } catch (err) {
      const errorMsg = err.response?.data?.detail?.[0]?.msg || "Registration Failed";
      alert(errorMsg);
    }
  };

  const content = (
    <>
      <h2 className="text-center text-2xl font-bold mb-6 text-teal-200">Create an Account</h2>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        className={`w-full p-3 text-white bg-white/10 border rounded-2xl mb-3 ${errors.name ? "border-red-500" : ""}`}
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className={`w-full p-3 text-white  bg-white/10 border rounded-2xl mb-3 ${errors.email ? "border-red-500" : ""}`}
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className={`w-full p-3 text-white bg-white/10 border rounded-2xl mb-3 ${errors.password ? "border-red-500" : ""}`}
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={handleChange}
        className={`w-full p-3 text-white bg-white/10 border rounded-2xl mb-3 ${errors.confirmPassword ? "border-red-500" : ""}`}
      />
      {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

      <CustomButton label="Register" onClick={handleRegister} />
    </>
  );

  return embedded ? content : (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-100 to-green-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        {content}
        <p className="mt-4 text-center text-sm">
          Already a user? <a href="/login" className="text-teal-600 underline">Sign in here</a>
        </p>
      </div>
    </div>
  );
}

export default RegistrationPage;
