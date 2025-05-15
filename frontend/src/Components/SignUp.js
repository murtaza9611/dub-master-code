import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/dubmaster-logo.png";
import Navbar from "./Navbar";
import "./SignUp.css";
import Footer from './Footer';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');

      // Make API call to sign up the user
      const response = await axios.post('http://localhost:5000/api/signup', {  name,
  email,
  password,
});
     

      console.log('User signed up:', response.data);

      // Clear form and redirect
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error signing up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="signup-banner-container">
          <div className="signup-bannerImage-container">
            <img src={BannerBackground} alt="Banner Background" />
          </div>

          <div className="signup-page-container">
            <div className="form-header">
              <img src={BannerImage} alt="DubMaster Logo" className="form-logo" />
            </div>

            <form onSubmit={handleSubmit} className="signup-form">
              <div className="input-container">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  required
                  className="signup-input"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="signup-input"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="signup-input"
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  required
                  className="signup-input"
                />
              </div>

              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <button
                type="submit"
                className="signup-submit-btn"
                disabled={loading || !name || !email || !password || !confirmPassword}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>

              <div className="login-link">
                <p>Already have an account? <a href="/login" className="login-btn">Login</a></p>
              </div>
            </form>
          </div>

          <div className="signup-image-section">
            <img src={BannerImage} alt="DubMaster Logo" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignupPage;
