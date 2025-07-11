import React, { useState } from 'react';
import axios from 'axios';

function AdminLogin() {
  const [step, setStep] = useState(1); // 1 = login, 2 = otp
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/admin/login', { email, password });
      setStep(2);
      setMessage('OTP sent to your email');
    } catch (err) {
      setMessage(err.response?.data?.detail || 'Login failed');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/admin/verify-otp', { otp });
      setToken(res.data.access_token);
      setMessage('Login successful!');
      localStorage.setItem('adminToken', res.data.access_token); // optional
    } catch (err) {
      setMessage(err.response?.data?.detail || 'OTP verification failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-center">
        {step === 1 ? 'Admin Login' : 'Enter OTP'}
      </h2>

      {message && (
        <div className="text-sm text-center text-red-600">{message}</div>
      )}

      {step === 1 && (
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            className="w-full px-3 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            Send OTP
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full px-3 py-2 border rounded"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Verify OTP
          </button>
        </form>
      )}
    </div>
  );
}

export default AdminLogin;
