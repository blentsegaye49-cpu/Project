import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function CVUpload() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please choose a PDF, DOC, DOCX, JPG or PNG file.");
      setSelectedFile(null);
      return;
    }

    setError("");
    setSelectedFile(file);
  };

  const handleContinue = async () => {
    if (!selectedFile) {
      setError("Please upload your CV first.");
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("cv", selectedFile);

    try {
      const response = await fetch(
        "https://project-1-iwpz.onrender.com/api/cv",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "CV upload failed.");
        setUploading(false);
        return;
      }

      // Save uploaded CV information temporarily
      localStorage.setItem(
        "uploadedCV",
        JSON.stringify(data.cv)
      );

      navigate("/myprofile");

    } catch (error) {
      setError("Cannot connect to the backend server.");
    }

    setUploading(false);
  };

  return (
    <div className="cv-upload-page">
      <div className="cv-upload-container">

        <h1>Upload Your CV</h1>

        <p className="cv-upload-subtitle">
          Upload your CV to complete your profile
        </p>

        <div className="cv-green-box">

          <div className="cv-upload-icon">
            +
          </div>

          <h2>Add Your CV</h2>

          <p>
            Upload your CV from your device
          </p>

          <button
            type="button"
            className="choose-cv-button"
            onClick={handleChooseFile}
          >
            Choose File
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          {selectedFile && (
            <div className="selected-cv">
              <span>✓</span>
              <span>{selectedFile.name}</span>
            </div>
          )}

        </div>

        {error && (
          <p className="cv-error">
            {error}
          </p>
        )}

        <button
          type="button"
          className={`cv-continue-button ${
            selectedFile && !uploading
              ? "cv-continue-active"
              : ""
          }`}
          onClick={handleContinue}
          disabled={!selectedFile || uploading}
        >
          {uploading ? "UPLOADING..." : "CONTINUE"}
          {!uploading && <span>›</span>}
        </button>

      </div>
    </div>
  );
}

export default CVUpload;
