import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomButton from "../../components/Button";
import logo from "../../assets/logo.png";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!username) {
      newErrors.username = "Username or email is required";
    } else if (username.includes("@")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(username)) {
        newErrors.username = "Enter a valid email address";
      }
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/auth/login", {
        username_or_email: username,
        password: password,
      });

      const user = res.data.user;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", "user");

      console.log("Login successful:", user);
      setMessage("Login successful!");
      navigate("/userdashboard");
    } catch (error) {
      console.log("Login failed:", error.response?.data || error.message);
      setMessage(error.response?.data?.detail || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-emerald-100 font-sans">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-md flex flex-col items-center text-center">

        <img src={logo} alt="College Logo" className="w-16 mb-4 self-center" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">Welcome Back</h2>
        <p className="text-gray-500 mb-6">Login to your ResolveX account</p>
        <div className="mb-4 text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username or Email
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrors({ ...errors, username: '' });
            }}
            placeholder="Enter username or email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          {errors.username && (
            <p className="text-sm text-red-600 mt-1">{errors.username}</p>
          )}
        </div>

        <div className="mb-4 text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({ ...errors, password: '' });
            }}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">{errors.password}</p>
          )}
        </div>

        <CustomButton
          onClick={handleLogin}
          label={loading ? "Logging in..." : "Login"}
          disabled={loading}
        />

        {message && (
          <div
            className={`mt-4 text-sm font-medium ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <div className="mt-6 text-sm">
          <a href="/complaintform" className="text-emerald-500 font-semibold hover:underline">
            Submit Anonymously?
          </a>
        </div>
        <div className="mt-2 text-sm">
          <span>Didn't register? </span>
          <a href="/register" className="text-emerald-500 font-semibold hover:underline">
            Sign up here
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
