import React from "react";
import axios from "axios";


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

  const handleRegister = async() => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
   try{
    const response=await axios.post("http://localhost:8000/auth/register",{
        username:form.name,
        email:form.email,
        password:form.password
    });
    alert("Registered Successfully!");
    console.log(response.data);
    window.location.href="/";
   }
   catch(err){
    console.error("Registration failed",err.response?.data);
    alert(err.response?.data?.detail||"Registration Failed");
   }

  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(to right, #fbc2eb, #a6c1ee)'
    }}>
      <div style={{
        padding: '2rem',
        borderRadius: '12px',
        width: '400px',
        textAlign: 'center',
        backgroundColor: '#fff',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
      }}>
        <h2>Create an Account</h2>

        <input type="text" name="name" placeholder="Full Name"
          value={form.name} onChange={handleChange}
          style={inputStyle} /><br />

        <input type="email" name="email" placeholder="Email"
          value={form.email} onChange={handleChange}
          style={inputStyle} /><br />

        <input type="password" name="password" placeholder="Password"
          value={form.password} onChange={handleChange}
          style={inputStyle} /><br />

        <input type="password" name="confirmPassword" placeholder="Confirm Password"
          value={form.confirmPassword} onChange={handleChange}
          style={inputStyle} /><br />

        <button onClick={handleRegister} style={buttonStyle}>
          Register
        </button>
        <div style={{ marginTop: '1rem' }}>
          <span>Already a User?</span>{' '}
          <a href="/" style={{ color: '#57cc99', textDecoration: 'none' }}>
            Sign in here
          </a>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  margin: '0.5rem 0',
  padding: '0.6rem',
  width: '100%',
  borderRadius: '6px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  marginTop: '1rem',
  padding: '0.7rem',
  width: '100%',
  backgroundColor: '#6c63ff',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

export default RegistrationPage;
