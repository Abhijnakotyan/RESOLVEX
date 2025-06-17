import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // for redirect

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        username_or_email: username,
        password: password,
      });

      console.log("Login successful:", response.data);

 setMessage("Login successful!");
      navigate("/dashboard"); 
    } catch (error) {
      console.error("Login failed:", error.response?.data?.detail || error.message);
      setMessage(error.response?.data?.detail || "Login failed. Please try again.");
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(to right, #d4fc79, #96e6a1)'
    }}>
      <div style={{
        padding: '2rem',
        borderRadius: '12px',
        width: '400px',
        textAlign: 'center',
        backgroundColor: '#caffea',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
      }}>
        <img
          src="assets/logo.png"
          alt="College Logo"
          style={{ width: '80px', marginBottom: '1rem' }}
        />

        <div style={{ marginBottom: '1rem' }}>
          <label>Username or Email</label><br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: '0.5rem',
              width: '100%',
              borderRadius: '6px',
              border: '1px solid #ccc',
              marginTop: '0.5rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Password</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '0.5rem',
              width: '100%',
              borderRadius: '6px',
              border: '1px solid #ccc',
              marginTop: '0.5rem'
            }}
          />
        </div>

        <button
          onClick={handleLogin}
          style={{
            backgroundColor: '#57cc99',
            color: 'white',
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            marginBottom: '1rem'
          }}
        >
          Login
        </button>

        {message && (
          <div style={{ color: message.includes("success") ? "green" : "red", marginBottom: "1rem" }}>
            {message}
          </div>
        )}

        <div>
          <a href="/department" style={{ color: '#57cc99', textDecoration: 'none' }}>
            Submit Anonymously??
          </a>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <span>Didn't register?</span>{' '}
          <a href="/register" style={{ color: '#57cc99', textDecoration: 'none' }}>
            Sign up here
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;