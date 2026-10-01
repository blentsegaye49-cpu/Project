import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [cv, setCv] = useState(null);
  const [showCV, setShowCV] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      const userEmail = storedUser ? storedUser.email : null;

      if (!userEmail) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/profile-setup/${encodeURIComponent(
            userEmail
          )}`
        );

        if (response.ok) {
          const data = await response.json();
          setProfile(data.profile);
          localStorage.setItem("profileData", JSON.stringify(data.profile));
        }
      } catch (error) {
        console.error("Could not load profile:", error);
      }

      const savedCV = localStorage.getItem("uploadedCV");
      if (savedCV) {
        setCv(JSON.parse(savedCV));
      }

      setLoading(false);
    };

    loadProfile();
  }, []);

  const getCVUrl = () => {
    if (!cv) return "";
    let fileName = cv.fileName;
    if (!fileName && cv.filePath) {
      fileName = cv.filePath.split(/[\\/]/).pop();
    }
    return `http://localhost:5000/uploads/cv/${encodeURIComponent(fileName)}`;
  };

  if (loading) {
    return (
      <div className="my-profile-page">
        <h2>Loading your profile...</h2>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="my-profile-page">
        <h2>No profile information found.</h2>
      </div>
    );
  }

  return (
    <div className="my-profile-page">
      <div className="my-profile-header">
        <div className="profile-avatar">
          {profile.fullName ? profile.fullName.charAt(0).toUpperCase() : "U"}
        </div>
        <div>
          <h1>{profile.fullName}</h1>
          <p>Your Candidate Profile</p>
        </div>
      </div>

      <div className="profile-cards">
        <div className="profile-info-card">
          <h2>Basic Information</h2>
          <ProfileRow label="Full Name" value={profile.fullName} />
          <ProfileRow label="Country" value={profile.country} />
          <ProfileRow label="Region" value={profile.region} />
          <ProfileRow label="City" value={profile.city} />
        </div>

        <div className="profile-info-card">
          <h2>Education</h2>
          <ProfileRow label="Education Level" value={profile.educationLevel} />
          <ProfileRow label="Institution" value={profile.institution} />
          <ProfileRow label="Field of Study" value={profile.fieldOfStudy} />
          <ProfileRow label="Graduation Year" value={profile.graduationYear} />
        </div>

        <div className="profile-info-card">
          <h2>Work Experience</h2>
          <ProfileRow label="Job Title" value={profile.jobTitle} />
          <ProfileRow label="Company" value={profile.company} />
          <ProfileRow label="Start Date" value={profile.startDate} />
          <ProfileRow label="End Date" value={profile.endDate} />
        </div>

        <div className="profile-info-card">
          <h2>Skills</h2>
          <ProfileRow label="Skill" value={profile.skill} />
          <ProfileRow label="Skill Level" value={profile.skillLevel} />
        </div>

        <div className="profile-info-card">
          <h2>Career Preferences</h2>
          <ProfileRow label="Preferred Industry" value={profile.industry} />
          <ProfileRow label="Employment Type" value={profile.employmentType} />
        </div>

        {cv && (
          <div className="profile-info-card cv-card">
            <h2>My CV</h2>

            {!showCV ? (
              <div className="cv-file">
                <span className="cv-file-icon">📄</span>
                <div>
                  <button
                    type="button"
                    onClick={() => setShowCV(true)}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      color: "#4fc3a1",
                      fontWeight: "bold",
                      fontSize: "16px",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    {cv.originalName}
                  </button>
                  <p>{Math.round(cv.fileSize / 1024)} KB</p>
                </div>
              </div>
            ) : (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "700px",
                  background: "#f5f5f5",
                  borderRadius: "12px",
                  overflow: "hidden",
                  marginTop: "20px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowCV(false)}
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    zIndex: 10,
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    border: "none",
                    background: "#ffffff",
                    color: "#333333",
                    fontSize: "28px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
                  }}
                >
                  ×
                </button>

                {cv.fileType && cv.fileType.startsWith("image/") ? (
                  <img
                    src={getCVUrl()}
                    alt="Uploaded CV"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                ) : (
                  <iframe
                    src={getCVUrl()}
                    title="My CV"
                    style={{ width: "100%", height: "100%", border: "none" }}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <button
          type="button"
          onClick={() => navigate("/")}
          style={{
            padding: "16px 60px",
            border: "none",
            borderRadius: "30px",
            background: "#4fc3a1",
            color: "#ffffff",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          FINISH
        </button>
      </div>
    </div>
  );
}

function ProfileRow({ label, value }) {
  return (
    <div className="profile-row">
      <span>{label}</span>
      <strong>{value || "Not provided"}</strong>
    </div>
  );
}

export default MyProfile;