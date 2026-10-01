import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// ---- PUT YOUR RENDER BACKEND LINK HERE (no slash at the end) ----
const API_URL = "https://project-qxyh.onrender.com";

// ---- CHANGE THESE TWO to match your backend upload route ----
const CV_UPLOAD_URL = `${API_URL}/api/upload-cv`;
const CV_FIELD_NAME = "cv"; // must match upload.single("cv") on the server

function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [cv, setCv] = useState(null);
  const [showCV, setShowCV] = useState(false);
  const [loading, setLoading] = useState(true);

  // CV change state
  const [editingCV, setEditingCV] = useState(false);
  const [newCvFile, setNewCvFile] = useState(null);
  const [uploadingCV, setUploadingCV] = useState(false);
  const [cvSaved, setCvSaved] = useState(false);
  const [cvError, setCvError] = useState("");
  const fileInputRef = useRef(null);

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
          `${API_URL}/api/profile-setup/${encodeURIComponent(
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

  // Called by each card when the user presses Confirm
  const saveSection = async (changes) => {
    const updatedProfile = { ...profile, ...changes };

    // 1. Show the new info immediately
    setProfile(updatedProfile);
    localStorage.setItem("profileData", JSON.stringify(updatedProfile));

    // 2. Save to the backend
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    const userEmail = storedUser ? storedUser.email : null;

    if (userEmail) {
      try {
        await fetch(
          `${API_URL}/api/profile-setup/${encodeURIComponent(
            userEmail
          )}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ profile: updatedProfile }),
          }
        );
      } catch (error) {
        console.error("Could not save profile:", error);
      }
    }
  };

  const MAX_CV_SIZE = 5 * 1024 * 1024; // 5 MB

  const startCvEdit = () => {
    setShowCV(false);
    setNewCvFile(null);
    setCvError("");
    setCvSaved(false);
    setEditingCV(true);
  };

  const cancelCvEdit = () => {
    setNewCvFile(null);
    setCvError("");
    setEditingCV(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCvPick = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (file.size > MAX_CV_SIZE) {
      setCvError("File is too large. Maximum size is 5 MB.");
      setNewCvFile(null);
      return;
    }
    setCvError("");
    setNewCvFile(file);
  };

  const confirmCvChange = async () => {
    if (!newCvFile || uploadingCV) return;
    setUploadingCV(true);
    setCvError("");

    try {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      const formData = new FormData();
      formData.append(CV_FIELD_NAME, newCvFile);
      if (storedUser && storedUser.email) {
        formData.append("email", storedUser.email);
      }

      const response = await fetch(CV_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            `Server responded with ${response.status} (${response.statusText})`
        );
      }

      const serverCv = data.cv || data.file || data.uploadedCV || {};
      if (!serverCv.fileName && (data.fileName || data.filename)) {
        serverCv.fileName = data.fileName || data.filename;
      }

      const updatedCv = {
        originalName: newCvFile.name,
        fileSize: newCvFile.size,
        fileType: newCvFile.type,
        ...serverCv,
      };

      setCv(updatedCv);
      localStorage.setItem("uploadedCV", JSON.stringify(updatedCv));
      setNewCvFile(null);
      setEditingCV(false);
      setCvSaved(true);
      setTimeout(() => setCvSaved(false), 2500);
    } catch (error) {
      console.error("Could not upload CV:", error);
      setCvError(
        error.message === "Failed to fetch"
          ? "Cannot reach the server. Please check that your backend is running and CORS is enabled."
          : `Could not upload your CV: ${error.message}`
      );
    }

    setUploadingCV(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getCVUrl = () => {
    if (!cv) return "";
    let fileName = cv.fileName;
    if (!fileName && cv.filePath) {
      fileName = cv.filePath.split(/[\\/]/).pop();
    }
    return `${API_URL}/uploads/cv/${encodeURIComponent(fileName)}`;
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
        <EditableCard
          title="Basic Information"
          profile={profile}
          onSave={saveSection}
          fields={[
            { key: "fullName", label: "Full Name" },
            { key: "country", label: "Country" },
            { key: "region", label: "Region" },
            { key: "city", label: "City" },
          ]}
        />

        <EditableCard
          title="Education"
          profile={profile}
          onSave={saveSection}
          fields={[
            { key: "educationLevel", label: "Education Level" },
            { key: "institution", label: "Institution" },
            { key: "fieldOfStudy", label: "Field of Study" },
            { key: "graduationYear", label: "Graduation Year" },
          ]}
        />

        <EditableCard
          title="Work Experience"
          profile={profile}
          onSave={saveSection}
          fields={[
            { key: "jobTitle", label: "Job Title" },
            { key: "company", label: "Company" },
            { key: "startDate", label: "Start Date" },
            { key: "endDate", label: "End Date" },
          ]}
        />

        <EditableCard
          title="Skills"
          profile={profile}
          onSave={saveSection}
          fields={[
            { key: "skill", label: "Skill" },
            { key: "skillLevel", label: "Skill Level" },
          ]}
        />

        <EditableCard
          title="Career Preferences"
          profile={profile}
          onSave={saveSection}
          fields={[
            { key: "industry", label: "Preferred Industry" },
            { key: "employmentType", label: "Employment Type" },
          ]}
        />

        {(
          <div className="profile-info-card cv-card">
            <h2>My CV</h2>

            {!cv ? (
              <p>No CV uploaded yet.</p>
            ) : !showCV ? (
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

            {/* hidden file picker */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,image/*"
              onChange={handleCvPick}
              style={{ display: "none" }}
            />

            {editingCV && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "14px",
                  border: "2px dashed #4fc3a1",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <span style={{ fontSize: "15px" }}>
                  {newCvFile
                    ? `📎 ${newCvFile.name} (${Math.round(
                        newCvFile.size / 1024
                      )} KB)`
                    : "No new file selected"}
                </span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  style={{
                    padding: "8px 20px",
                    border: "2px solid #4fc3a1",
                    borderRadius: "20px",
                    background: "#ffffff",
                    color: "#4fc3a1",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  {newCvFile ? "Choose another" : "Choose file"}
                </button>
              </div>
            )}

            {cvError && (
              <p style={{ color: "#d9534f", marginTop: "10px" }}>{cvError}</p>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "12px",
                marginTop: "20px",
              }}
            >
              {cvSaved && !editingCV && (
                <span style={{ color: "#4fc3a1", fontWeight: "bold" }}>
                  ✓ CV updated
                </span>
              )}

              {!editingCV ? (
                <button
                  type="button"
                  onClick={startCvEdit}
                  style={{
                    padding: "10px 28px",
                    borderRadius: "20px",
                    background: "#ffffff",
                    color: "#4fc3a1",
                    border: "2px solid #4fc3a1",
                    fontSize: "15px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  {cv ? "Change CV" : "Upload CV"}
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={cancelCvEdit}
                    style={{
                      padding: "10px 28px",
                      border: "none",
                      borderRadius: "20px",
                      background: "#e0e0e0",
                      color: "#333333",
                      fontSize: "15px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={confirmCvChange}
                    disabled={!newCvFile || uploadingCV}
                    style={{
                      padding: "10px 28px",
                      border: "none",
                      borderRadius: "20px",
                      background: newCvFile ? "#4fc3a1" : "#cfcfcf",
                      color: newCvFile ? "#ffffff" : "#8a8a8a",
                      fontSize: "15px",
                      fontWeight: "bold",
                      cursor:
                        newCvFile && !uploadingCV ? "pointer" : "not-allowed",
                    }}
                  >
                    {uploadingCV ? "Uploading..." : "Confirm"}
                  </button>
                </>
              )}
            </div>
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

/* ---------- Card with Edit / Cancel / Confirm ---------- */

function EditableCard({ title, fields, profile, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const startEdit = () => {
    const initial = {};
    fields.forEach((f) => {
      initial[f.key] = profile[f.key] ?? "";
    });
    setDraft(initial);
    setSaved(false);
    setEditing(true);
  };

  const cancelEdit = () => {
    setDraft({});
    setEditing(false);
  };

  // true only when something is different from the saved profile
  const hasChanged = fields.some(
    (f) => String(draft[f.key] ?? "") !== String(profile[f.key] ?? "")
  );

  const confirmEdit = async () => {
    if (!hasChanged || saving) return;
    setSaving(true);
    await onSave(draft);
    setSaving(false);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const baseBtn = {
    padding: "10px 28px",
    border: "none",
    borderRadius: "20px",
    fontSize: "15px",
    fontWeight: "bold",
  };

  return (
    <div className="profile-info-card">
      <h2>{title}</h2>

      {fields.map((f) =>
        editing ? (
          <div className="profile-row" key={f.key}>
            <span>{f.label}</span>
            <input
              type="text"
              value={draft[f.key] ?? ""}
              onChange={(e) =>
                setDraft({ ...draft, [f.key]: e.target.value })
              }
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #4fc3a1",
                fontSize: "15px",
                outline: "none",
                minWidth: "180px",
              }}
            />
          </div>
        ) : (
          <ProfileRow key={f.key} label={f.label} value={profile[f.key]} />
        )
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "12px",
          marginTop: "20px",
        }}
      >
        {saved && !editing && (
          <span style={{ color: "#4fc3a1", fontWeight: "bold" }}>
            ✓ Updated
          </span>
        )}

        {!editing ? (
          <button
            type="button"
            onClick={startEdit}
            style={{
              ...baseBtn,
              background: "#ffffff",
              color: "#4fc3a1",
              border: "2px solid #4fc3a1",
              cursor: "pointer",
            }}
          >
            Edit
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={cancelEdit}
              style={{
                ...baseBtn,
                background: "#e0e0e0",
                color: "#333333",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={confirmEdit}
              disabled={!hasChanged || saving}
              style={{
                ...baseBtn,
                background: hasChanged ? "#4fc3a1" : "#cfcfcf",
                color: hasChanged ? "#ffffff" : "#8a8a8a",
                cursor: hasChanged && !saving ? "pointer" : "not-allowed",
              }}
            >
              {saving ? "Saving..." : "Confirm"}
            </button>
          </>
        )}
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
