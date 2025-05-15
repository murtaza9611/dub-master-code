import React from "react";
import { useNavigate } from "react-router-dom";
import Free from "../Assets/Free.png";
import Premium from "../Assets/Premium.png";
import Pro from "../Assets/Pro.png";

const Work = () => {
  const navigate = useNavigate();

  const workInfoData = [
    {
      image: Free,
      title: "Free Plan",
      text: "Access basic dubbing features with limited tools and watermarked outputs.",
      redirectTo: "/freeplan",
    },
    {
      image: Premium,
      title: "Premium Plan",
      text: "Unlock advanced dubbing tools with high-quality lip sync and no watermark.",
      redirectTo: "/premiumplan", // Add a redirect path for Premium Plan
    },
    {
      image: Pro,
      title: "Pro Plan",
      text: "Gain full access to all features, priority support, and unlimited usage.",
      redirectTo: "/proplan",
    },
  ];

  // Handle redirection based on plan
  const handleRedirect = (redirectTo) => {
    navigate(redirectTo); // Navigate to the corresponding plan page
  };

  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        {/* <p className="primary-subheading">Work</p> */}
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
          "Dub Master brings seamless movie dubbing to life,
          ensuring perfect lip sync and immersive translations.
          Experience Hindi adaptations of English classics with unmatched precision and clarity."
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div
            className="work-section-info"
            key={data.title}
            onClick={() => handleRedirect(data.redirectTo)} // Navigate based on redirectTo
          >
            <div className="info-boxes-img-container">
              <img src={data.image} alt={data.title} />
            </div>
            <h2 className="clickable">{data.title}</h2> {/* Apply clickable class to all plans */}
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
