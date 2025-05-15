import React from "react";
import { useLocation } from "react-router-dom"; // Import to access the current route
import Navbar from "./Navbar"; // Import Navbar component
import Footer from "./Footer"; // Import Footer component

const Contact = () => {
  const location = useLocation(); // Get the current route

  // Check if the current path is not the landing page, then show Navbar
  const showNavbar = location.pathname !== "/"; // Hide Navbar on landing page

  return (
    <>
      {showNavbar && <Navbar />} {/* Conditionally render the Navbar */}
      <div className="contact-page-wrapper">
        <h1 className="primary-heading">Have Question In Mind?</h1>
        <h1 className="primary-heading">Let Us Help You</h1>
        <div className="contact-form-container">
          <input type="text" placeholder="yourmail@gmail.com" />
          <button className="secondary-button">Submit</button>
        </div>
      </div>
      {showNavbar && <Footer />} {/* Conditionally render the Footer */}
    </>
  );
};

export default Contact;
