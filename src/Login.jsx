import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import logo from './pic/logo.png';
import { auth, signInWithEmailAndPassword } from './firebase';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 👈 NEW: State to toggle visibility
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Luxury Palette Logo" className="logo" />
      <div className="login-box">
        <h2 className="login-title">User Login</h2>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Enter email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />

          <label>Password</label>
          <input 
            type={showPassword ? 'text' : 'password'} // 👈 Toggle between text and password
            placeholder="Enter password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />

          {/* 👇 Toggle Password Visibility */}
          <div className="show-password-toggle">
            <input 
              type="checkbox" 
              id="showPassword" 
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)} 
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="btn login-button">Login</button>
        </form>
        <p className="register-text">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;