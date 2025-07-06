import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomButton from "../../Component/Button";
import logo from "../../../../assets/logo.png";

function LoginPage({ embedded = false }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Username or email is required";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
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

      setMessage("Login successful!");
      navigate("/userdashboard");
    } catch (error) {
      setMessage(error.response?.data?.detail || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <>
      <img src={logo} alt="Logo" className="w-16 mb-4 mx-auto" />
      <h2 className="text-teal-600 text-2xl font-semibold mb-2">Welcome Back</h2>
      <p className="text-gray-500 mb-6">Login to your account</p>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Email or Username"
        className="w-full p-3 border rounded-lg mb-4"
      />
      {errors.username && <p className="text-red-600 mb-2">{errors.username}</p>}

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-3 border rounded-lg mb-4"
      />
      {errors.password && <p className="text-red-600 mb-2">{errors.password}</p>}

      <CustomButton
        onClick={handleLogin}
        label={loading ? "Logging in..." : "Login"}
        disabled={loading}
      />

      {message && <p className={`mt-4 text-sm ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>{message}</p>}

      <p className="mt-4">
        <a href="/complaintform" className="text-teal-500">Forgot your password?</a>
      </p>
    </>
  );

  return embedded ? content : (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-100 to-green-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        {content}
        <p className="mt-4 text-sm">
          Don't have an account? <a href="/register" className="text-teal-600 underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
