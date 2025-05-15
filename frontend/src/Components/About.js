import React from "react";
import { useLocation } from "react-router-dom"; // Import to access the current route
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/about-background-image.png";
import { BsFillPlayCircleFill } from "react-icons/bs";
import Navbar from "./Navbar"; // Import Navbar component
import Footer from "./Footer";


const About = () => {
  const location = useLocation(); // Get the current route

  // Check if the current path is not the landing page, then show Navbar
  const showNavbar = location.pathname !== "/"; // Hide Navbar on landing page

  return (
    <>
      {showNavbar && <Navbar />} {/* Conditionally render the Navbar */}
      <div className="about-section-container">
        <div className="about-background-image-container">
          <img src={AboutBackground} alt="" />
        </div>
        <div className="about-section-image-container">
          <img src={AboutBackgroundImage} alt="" />
        </div>
        <div className="about-section-text-container">
          <p className="primary-subheading">About</p>
          <h1 className="primary-heading">
            DubMaster: Revolutionizing Movie Dubbing
          </h1>
          <p className="primary-text">
            DubMaster transforms English movies into Hindi with perfect lip-sync
            and authentic voiceovers. We blend technology and creativity for
            seamless dubbing.
          </p>
          <p className="primary-text">
            DubMaster transforms English movies into Hindi with perfect lip-sync
            and authentic voiceovers. We blend technology and creativity for
            seamless dubbing.
          </p>
          <div className="about-buttons-container">
            <button className="secondary-button">Learn More</button>
            <button className="watch-video-button">
              <BsFillPlayCircleFill /> Watch Video
            </button>
          </div>
        </div>
      </div>
      {showNavbar && <Footer />} {/* Conditionally render the Footer */}
    </>
  );
};

export default About;
