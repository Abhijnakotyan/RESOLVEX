import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomButton from "../components/Button";
import logo from "../assets/logo.png";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

 const handleLogin = async () => {
  if (!username || !password) {
    setMessage("Please fill in all fields.");
    return;
  }

  try {
    const response = await axios.post("http://localhost:8000/auth/login", {
      username_or_email: username,
      password: password,
    });

    const user = response.data.user; 

    
    localStorage.setItem("user", JSON.stringify(response.data));
    // After successful login:
    localStorage.setItem("token", response.data.access_token); // ✅
    console.log(localStorage.getItem("token"));


    console.log("Login successful:", user);
    setMessage("Login successful!");
    navigate("/userdashboard");
  } catch (error) {
    console.error("Login failed:", error.response?.data?.detail || error.message);
    setMessage(error.response?.data?.detail || "Login failed. Please try again.");
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img
          src={logo}
          alt="College Logo"
          style={styles.logo}
        />
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Login to your ResolveX account</p>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Username or Email</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username or email"
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={styles.input}
          />
        </div>

        <CustomButton
          onClick={handleLogin}
          label="Login"
        />

        {message && (
          <div style={{
            color: message.includes("success") ? "#2e7d32" : "#d32f2f",
            marginTop: "1rem"
          }}>
            {message}
          </div>
        )}

        <div style={styles.links}>
          <a href="/department" style={styles.link}>Submit Anonymously?</a>
        </div>
        <div style={styles.links}>
          <span>Didn't register? </span>
          <a href="/register" style={styles.link}>Sign up here</a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(120deg, #e0f7f1, #d2f6e9)',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '2.5rem',
    borderRadius: '20px',
    width: '400px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
    textAlign: 'center'
  },
  logo: {
    width: '60px',
    marginBottom: '1rem'
  },
  title: {
    marginBottom: '0.2rem',
    fontSize: '1.8rem',
    color: '#333'
  },
  subtitle: {
    color: '#666',
    marginBottom: '1.5rem'
  },
  inputGroup: {
    marginBottom: '1.2rem',
    textAlign: 'left'
  },
  label: {
    display: 'block',
    marginBottom: '0.4rem',
    fontWeight: '600',
    color: '#333'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem'
  },
  links: {
    marginTop: '1.2rem',
    fontSize: '0.95rem'
  },
  link: {
    color: '#57cc99',
    textDecoration: 'none',
    fontWeight: '600'
  }
};

export default LoginPage;
