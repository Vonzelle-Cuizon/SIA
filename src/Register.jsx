import React, { useState } from 'react';
import './Register.css';
import logo from './pic/logo.png';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, username } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const templateParams = {
        to_email: email,
        user_email: email,
        user_id: username
      };

      emailjs
        .send(
          "Email_JS",           // Your EmailJS service ID
          "template_isyqqqn",   // Your EmailJS template ID
          templateParams,
          "db8jEQegClQD8n29_"   // Your EmailJS public key
        )
        .then(
          (response) => {
            console.log("✅ Welcome email sent:", response.status, response.text);
          },
          (error) => {
            console.log("❌ Email sending failed:", error);
          }
        );

      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <img src={logo} alt="Luxury Palette Logo" className="register-logo" />
      <div className="register-box">
        <h2 className="register-title">User Registration</h2>
        {error && <p className="register-error">{error}</p>}
        <form onSubmit={handleRegister}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />

          <label>Password</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          <label>Confirm Password</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-type password"
              required
            />
          </div>

          <label style={{ display: "flex", alignItems: "center", fontSize: "0.9rem" }}>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={togglePasswordVisibility}
              style={{ marginRight: "0.5rem" }}
            />
            Show Passwords
          </label>

          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;