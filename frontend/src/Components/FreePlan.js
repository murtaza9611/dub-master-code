import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FreePlan.css"; // Keep the same CSS if it's reusable
import Navbar from "./Navbar";
import Footer from "./Footer";

const FreePlan = () => {
  console.log("FreePlan component loaded");

  const navigate = useNavigate();

  // Manage login status with local state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login if not logged in
    } else {
      alert("Item added to the cart! (Free plan, no payment required)");
    }
  };

  return (
    <>
      <Navbar />

      <div className="free-plan-container">
        <div className="free-plan-header">
          <h1 className="free-plan-title">Free Plan</h1>
          <p className="free-plan-subtitle">
            Enjoy the Free Plan with basic features at no cost.
          </p>
        </div>

        <div className="free-plan-content">
          <div className="free-plan-details">
            <h2>Features of the Free Plan:</h2>
            <ul>
              <li>Access to basic features</li>
              <li>Limited customer support</li>
              <li>Access to some content</li>
              <li>Basic settings and features</li>
              <li>No early access to new features</li>
              <li>No discounts or offers</li>
            </ul>
          </div>

          <div className="free-plan-price-section">
            <div className="free-plan-price-card">
              <h2>Price:</h2>
              <p className="price-text">Free</p>
              <button className="get-free-plan-button" onClick={handleAddToCart}>
                Get Free Plan
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FreePlan;
