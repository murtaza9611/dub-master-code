import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // To navigate to the login page if not logged in
import "./Dashboard.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Dashboard = () => {
  const navigate = useNavigate();

  // Check if the user is logged in using localStorage
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const [dubbedVideos, setDubbedVideos] = useState([]);

  // Redirect to login page if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login if the user is not logged in
    } else {
      fetchDubbedVideos(); // Fetch the dubbed video count if logged in
    }
  }, [isLoggedIn, navigate]);

  // Simulate an API call to fetch the number of dubbed videos
  const fetchDubbedVideos = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/videos", {
      method: "GET",
      credentials: "include", // Send cookies
    });

    if (response.ok) {
      const data = await response.json();
      setDubbedVideos(data.videos);
    } else {
      console.error("Failed to fetch videos");
    }
  } catch (error) {
    console.error("Error fetching videos:", error);
  }
};


  const handleUploadVideo = () => {
    navigate("/uploadvideo"); // Redirect to the upload video page
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1 className="dashboard-title">Your Dashboard</h1>

        <div className="dashboard-content">
          {/* Total Videos Section */}
          <div className="total-videos-section">
            <h2>Total Videos Dubbed</h2>
            <p className="dubbed-video-count">{dubbedVideos.length} Videos</p>
          </div>

          {/* Dubbed Videos Listing */}
          <div className="video-listing-section">
            <h2>Dubbed Video Titles</h2>
            <div className="dubbed-video-list">
              {dubbedVideos.length > 0 ? (
                <ul>
                  {dubbedVideos.map((video) => (
                    <li key={video.id} className="dubbed-video-item">
                      {video.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No videos dubbed yet.</p>
              )}
            </div>
          </div>

          {/* Upload Button */}
          <div className="upload-video-section">
            <button className="upload-video-btn" onClick={handleUploadVideo}>
              Upload New Video
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
