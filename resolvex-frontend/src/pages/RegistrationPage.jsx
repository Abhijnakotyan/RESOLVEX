import React from "react";
import axios from "axios";
import CustomButton from "../components/Button";

function RegistrationPage() {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      alert("Please fill in all the fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/auth/register", {
        username: form.name,
        email: form.email,
        password: form.password
      });
      alert("Registered Successfully!");
      console.log(response.data);
      window.location.href = "/";
    } catch (err) {
      console.error("Registration failed", err.response?.data);
      const errorMsg = err.response?.data?.detail?.[0]?.msg || "Registration Failed";
      alert(errorMsg);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create an Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          style={styles.input}
        />

        <CustomButton label="Register" onClick={handleRegister} />

        <div style={{ marginTop: '1rem' }}>
          <span>Already a User?</span>{' '}
          <a href="/" style={styles.link}>
            Sign in here
          </a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(120deg, #e0f7f1, #d2f6e9)',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
  },
  card: {
    padding: '2rem',
    borderRadius: '20px',
    width: '400px',
    textAlign: 'center',
    backgroundColor: '#ffffff',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
  },
  title: {
    marginBottom: '1.5rem',
    fontSize: '1.8rem',
    color: '#333'
  },
  input: {
    margin: '0.6rem 0',
    padding: '0.75rem',
    width: '100%',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem'
  },
  link: {
    color: '#57cc99',
    textDecoration: 'none',
    fontWeight: '600'
  }
};

export default RegistrationPage;
