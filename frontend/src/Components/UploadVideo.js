import React, { useState } from "react";
import UploadBackground from "../Assets/about-background.png";
import UploadBackgroundImage from "../Assets/about-background-image.png";
import { FaUpload } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im"; // Spinner icon
import Navbar from "./Navbar";
import "./UploadVideo.css";
import Footer from "./Footer";

const UploadVideo = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return alert("Please select a file to upload.");
    
    setIsUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      alert("Video uploaded successfully!");
      // You can redirect or move to the processing page here
      // navigate("/processing");
    }, 3000); // Simulate 3s processing
  };

  return (
    <>
      <Navbar />
      <div className="upload-section-container">
        <div className="upload-background-image-container">
          <img src={UploadBackground} alt="" />
        </div>
        <div className="upload-section-image-container">
          <img src={UploadBackgroundImage} alt="" />
        </div>
        <div className="upload-section-text-container">
          <h1 className="upload-primary-heading">
            Upload Your Video for Dubbing
          </h1>

          <div className="upload-file-upload-card">
            <div className="upload-file-upload-box">
              <FaUpload size={50} />
              <p>Upload your video file</p>
              <input type="file" onChange={handleFileChange} />
            </div>

            <button
              className="upload-upload-button"
              onClick={handleUpload}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <ImSpinner2 className="spinner" size={20} />
                  &nbsp;Processing...
                </>
              ) : (
                "Upload file"
              )}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UploadVideo;
