import React, { useState } from 'react';
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/dubmaster-logo.png";
import Navbar from "./Navbar";
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios for making API calls
import "./LoginPage.css";
import Footer from './Footer';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Function to validate email format (basic check for '@' and domain)
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error message on new submission
    setErrorMessage('');

    // Check if email is valid
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // Check if password length is greater than or equal to 6 characters
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    try {
      // Make API request to check if user exists and credentials are correct
      const response = await axios.post('http://localhost:5000/api/login', { email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        // If login is successful, store JWT token and navigate to the dashboard
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("jwtToken", response.data.token); // Store JWT token
        navigate('/dashboard');
      } else {
        // If credentials are wrong, show an error message
        setErrorMessage('Invalid email or password.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Error logging in. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="login-banner-container">
          {/* Background Image */}
          <div className="login-bannerImage-container">
            <img src={BannerBackground} alt="Banner Background" />
          </div>

          {/* Login Form Section with className */}
          <div className="login-page-container">
            <div className="form-header">
              <img src={BannerImage} alt="DubMaster Logo" className="form-logo" />
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-container">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="login-input"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="login-input"
                />
              </div>

              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <button type="submit" className="login-submit-btn">
                Login
              </button>

              <div className="signup-link">
                <p>Don't have an account? <Link to="/signup" className="signup-btn">Sign Up</Link></p>
              </div>
            </form>
          </div>

          <div className="login-image-section">
            <img src={BannerImage} alt="DubMaster Logo" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
