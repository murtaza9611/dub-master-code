import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./ProPlan.css"; // Pro Plan styling

const ProPlan = () => {
  const navigate = useNavigate();

  // Define the Pro Plan details
  const proPlan = {
    title: "Pro Plan",
    text: "Unlock all premium features with the Pro Plan.",
    price: "$49.99 / month",
    features: [
      "Full access to all dubbing tools",
      "Priority customer support",
      "Unlimited video dubbing",
      "Customizable voice and AI features",
      "Early access to new AI dubbing features",
      "Exclusive discounts on future updates"
    ]
  };

  // Handle Add to Cart action
  const handleAddToCart = () => {
    // Store the Pro Plan in the cart (using localStorage for this example)
    localStorage.setItem("cart", JSON.stringify(proPlan)); // Store plan details in localStorage

    // Redirect to the Cart page
    navigate("/cart"); // Navigate to the Cart page
  };

  return (
    <>
      <Navbar />

      <div className="pro-plan-container">
        <div className="pro-plan-header">
          <h1 className="pro-plan-title">Pro Plan</h1>
          <p className="pro-plan-subtitle">Unlock all premium features with the Pro Plan.</p>
        </div>

        <div className="pro-plan-content">
          <div className="pro-plan-details">
            <h2>Features of the Pro Plan:</h2>
            <ul>
              {proPlan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="pro-plan-price-section">
            <div className="pro-plan-price-card">
              <h2>Price:</h2>
              <p className="price-text">{proPlan.price}</p>
              <button className="get-pro-plan-button" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProPlan;
