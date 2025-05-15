import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();

  const [cartPlan, setCartPlan] = useState(null);

  useEffect(() => {
    // Retrieve the plan from localStorage using the correct key
    const storedPlan = localStorage.getItem("cart");
    if (storedPlan) {
      setCartPlan(JSON.parse(storedPlan)); // If there's a plan in the cart, set it in state
    }
  }, []);

  const handleCheckout = () => {
    if (cartPlan) {
      navigate("/checkout"); // Redirect to checkout page
    } else {
      alert("Your cart is empty. Please add a plan to the cart.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="cart-container">
        <h1 className="cart-title">Your Cart</h1>

        {cartPlan ? (
          <div className="cart-plan-details">
            <h2>{cartPlan.title}</h2>
            <p>{cartPlan.text}</p>
            <p className="price-text">Price: {cartPlan.price}</p>
            <button className="checkout-button" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        ) : (
          <p>Your cart is empty. Please add a plan to the cart.</p>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Cart;
