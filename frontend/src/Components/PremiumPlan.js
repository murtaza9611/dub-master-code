import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PremiumPlan.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PremiumPlan = () => {
  console.log("PremiumPlan component loaded");

  const navigate = useNavigate();

  // Define the Premium Plan details
  const premiumPlan = {
    title: "Premium Plan",
    text: "Get the best features with the Premium Plan.",
    price: "$29.99 / month",
    features: [
      "Access to all exclusive features",
      "Priority customer support",
      "Unlimited access to content",
      "Customizable settings and features",
      "Early access to new features",
      "Exclusive discounts and offers"
    ]
  };

  // Handle Add to Cart action
  const handleAddToCart = () => {
    // Store the Premium Plan in the cart (using localStorage for this example)
    localStorage.setItem("cart", JSON.stringify([premiumPlan])); // Store plan details in localStorage

    // Redirect to the Cart page
    navigate("/cart"); // Navigate to the Cart page
  };

  return (
    <>
      <Navbar />

      <div className="premium-plan-container">
        <div className="premium-plan-header">
          <h1 className="premium-plan-title">Premium Plan</h1>
          <p className="premium-plan-subtitle">Get the best features with the Premium Plan</p>
        </div>

        <div className="premium-plan-content">
          <div className="premium-plan-details">
            <h2>Features of the Premium Plan:</h2>
            <ul>
              {premiumPlan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="premium-plan-price-section">
            <div className="premium-plan-price-card">
              <h2>Price:</h2>
              <p className="price-text">{premiumPlan.price}</p>
              <button className="add-to-cart-button" onClick={handleAddToCart}>
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

export default PremiumPlan;
