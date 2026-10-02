import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Profilesetup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
const navigate=useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    country: "",
    region: "",
    city: "",
    phoneNumber: "",

    educationLevel: "",
    institution: "",
    fieldOfStudy: "",
    graduationYear: "",

    jobTitle: "",
    company: "",
    startDate: "",
    endDate: "",

    skill: "",
    skillLevel: "",

    industry: "",

    employmentType: "",
  });

  const handleChange = (field) => (event) => {
    setForm({
      ...form,
      [field]: event.target.value,
    });

    setError("");
  };

  const isStepComplete = () => {
    if (currentStep === 1) {
      return (
        form.fullName.trim() !== "" &&
        form.country.trim() !== "" &&
        form.region.trim() !== "" &&
        form.city.trim() !== "" &&
        form.phoneNumber.trim() !== ""
      );
    }

    if (currentStep === 2) {
      return (
        form.educationLevel.trim() !== "" &&
        form.institution.trim() !== "" &&
        form.fieldOfStudy.trim() !== "" &&
        form.graduationYear.trim() !== ""
      );
    }

    if (currentStep === 3) {
      return (
        form.jobTitle.trim() !== "" &&
        form.company.trim() !== "" &&
        form.startDate.trim() !== "" &&
        form.endDate.trim() !== ""
      );
    }

    if (currentStep === 4) {
      return (
        form.skill.trim() !== "" &&
        form.skillLevel.trim() !== ""
      );
    }

    if (currentStep === 5) {
      return form.industry.trim() !== "";
    }

    if (currentStep === 6) {
      return form.employmentType.trim() !== "";
    }

    return false;
  };

  const handleNext = async () => {
    if (!isStepComplete()) {
      setError("Please complete all required fields.");
      return;
    }

    setError("");

    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
      return;
    }
    try {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");

      const response = await fetch(
        "https://project-qxyh.onrender.com/api/profile-setup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            email: storedUser?.email || "",
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(
          data.message ||
            `Profile submission failed (status ${response.status}).`
        );
        return;
      }

      setSuccess("Profile completed and saved successfully!");

      localStorage.setItem("profileData", JSON.stringify(form));

      setTimeout(() => {
        navigate("/cv-upload");
      }, 1500);
    } catch (err) {
      console.error("Profile submit error:", err);
      setError(`Cannot connect to the backend server. (${err.message})`);
    }
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError("");
      setSuccess("");
      window.scrollTo(0, 0);
    }
  };

  const steps = [
    "Basic Information",
    "Education",
    "Work Experience",
    "Skills",
    "Preferred Industry",
    "Desired Employment",
  ];

  return (
    <div className="profile-setup-page">
      <aside className="steps-sidebar">
        {steps.map((title, index) => {
          const stepNumber = index + 1;
          const completed = stepNumber < currentStep;
          const active = stepNumber === currentStep;

          return (
            <React.Fragment key={title}>
              <div
                className={`step-item ${
                  completed ? "completed" : ""
                } ${
                  active ? "in-progress" : ""
                }`}
              >
                <div className="step-icon">
                  {completed ? "✓" : ""}
                </div>

                <div className="step-information">
                  <div className="step-number">
                    STEP {stepNumber}
                  </div>

                  <div className="step-title">
                    {title}
                  </div>

                  <div className="step-status">
                    {completed
                      ? "Completed"
                      : active
                      ? "In Progress"
                      : "Pending"}
                  </div>
                </div>
              </div>

              {stepNumber < 6 && (
                <div className="step-line"></div>
              )}
            </React.Fragment>
          );
        })}
      </aside>

      <main className="profile-form-area">
        {currentStep === 1 && (
          <div className="profile-form">

            <div className="profile-form-group">
              <label>
                Full Name{" "}
                <span className="required-star">
                  *
                </span>
              </label>

              <input
                type="text"
                placeholder="Enter Full Name"
                value={form.fullName}
                onChange={handleChange("fullName")}
              />
            </div>

            <div className="profile-form-group">
              <label>
                Country{" "}
                <span className="required-star">
                  *
                </span>
              </label>

              <input
                type="text"
                placeholder="Enter Country"
                value={form.country}
                onChange={handleChange("country")}
              />
            </div>

            <div className="profile-form-group">
              <label>
                Region{" "}
                <span className="required-star">
                  *
                </span>
              </label>

              <select
                value={form.region}
                onChange={handleChange("region")}
              >
                <option value="">
                  Select Region
                </option>
                <option>Addis Ababa</option>
                <option>Afar</option>
                <option>Amhara</option>
                <option>Benishangul-Gumuz</option>
                <option>Central Ethiopia</option>
                <option>Dire Dawa</option>
                <option>Gambela</option>
                <option>Harari</option>
                <option>Oromia</option>
                <option>Sidama</option>
                <option>Somali</option>
                <option>South Ethiopia</option>
                <option>Tigray</option>
              </select>
            </div>

            <div className="profile-form-group">
              <label>
                City{" "}
                <span className="required-star">
                  *
                </span>
              </label>

              <input
                type="text"
                placeholder="Enter City"
                value={form.city}
                onChange={handleChange("city")}
              />
            </div>

            {/* Phone Number */}
            <div className="profile-form-group">
              <label>
                Phone Number{" "}
                <span className="required-star">
                  *
                </span>
              </label>

              <input
                type="tel"
                placeholder="Enter Phone Number"
                value={form.phoneNumber}
                onChange={handleChange(
                  "phoneNumber"
                )}
              />
            </div>

            <NavigationButtons
              currentStep={currentStep}
              canContinue={isStepComplete()}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="profile-form">
            <div className="profile-form-group">
              <label>
                Education Level{" "}
                <span className="required-star">
                  *
                </span>
              </label>

              <select
                value={form.educationLevel}
                onChange={handleChange(
                  "educationLevel"
                )}
              >
                <option value="">
                  Select Education Level
                </option>
                <option>High School</option>
                <option>Certificate</option>
                <option>Diploma</option>
                <option>
                  Bachelor's Degree
                </option>
                <option>
                  Master's Degree
                </option>
                <option>PhD</option>
              </select>
            </div>

            <div className="profile-form-group">
              <label>
                Institution{" "}
                <span className="required-star">
                  *
                </span>
              </label>

              <input
                type="text"
                placeholder="Enter Institution"
                value={form.institution}
                onChange={handleChange(
                  "institution"
                )}
              />
            </div>

            <div className="profile-form-group">
              <label>
                Field of Study{" "}
                <span className="required-star">
                  *
                </span>
              </label>

              <input
                type="text"
                placeholder="Enter Field of Study"
                value={form.fieldOfStudy}
                onChange={handleChange(
                  "fieldOfStudy"
                )}
              />
            </div>

            <div className="profile-form-group">
              <label>
                Graduation Year{" "}
                <span className="required-star">
                  *
                </span>
              </label>

              <input
                type="text"
                placeholder="Enter Graduation Year"
                value={form.graduationYear}
                onChange={handleChange(
                  "graduationYear"
                )}
              />
            </div>

            <NavigationButtons
              currentStep={currentStep}
              canContinue={isStepComplete()}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          </div>
        )}

        {currentStep === 3 && (
          <div className="profile-form">
            <div className="profile-form-group">
              <label>
                Job Title{" "}
                <span className="required-star">
                  *
                </span>
              </label>

              <input
                type="text"
                placeholder="Enter Job Title"
                value={form.jobTitle}
                onChange={handleChange(
                  "jobTitle"
                )}
              />
            </div>

            <div className="profile-form-group">
              <label>
                Company{" "}
                <span className="required-star">
                  *
                </span>
              </label>

              <input
                type="text"
                placeholder="Enter Company"
                value={form.company}
                onChange={handleChange(
                  "company"
                )}
              />
            </div>

            <div className="profile-form-group">
              <label>
                Start Date{" "}
                <span className="required-star">
                  *
                </span>
              </label>

              <input
                type="date"
                value={form.startDate}
                onChange={handleChange(
                  "startDate"
                )}
              />
            </div>

            <div className="profile-form-group">
              <label>
                End Date{" "}
                <span className="required-star">
                  *
                </span>
              </label>

              <input
                type="date"
                value={form.endDate}
                onChange={handleChange(
                  "endDate"
                )}
              />
            </div>

            <NavigationButtons
              currentStep={currentStep}
              canContinue={isStepComplete()}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          </div>
        )}

        {currentStep === 4 && (
          <div className="profile-form">
            <div className="profile-form-group">
              <label>
                Skill{" "}
                <span className="required-star">
                  *
                </span>
              </label>

              <input
                type="text"
                placeholder="Enter Skill"
                value={form.skill}
                onChange={handleChange("skill")}
              />
            </div>

            <div className="profile-form-group">
              <label>
                Skill Level{" "}
                <span className="required-star">
                  *
                </span>
              </label>

              <select
                value={form.skillLevel}
                onChange={handleChange(
                  "skillLevel"
                )}
              >
                <option value="">
                  Select Skill Level
                </option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Expert</option>
              </select>
            </div>

            <NavigationButtons
              currentStep={currentStep}
              canContinue={isStepComplete()}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          </div>
        )}

        {currentStep === 5 && (
          <div className="profile-form">
            <div className="profile-form-group">
              <label>
                Preferred Industry{" "}
                <span className="required-star">
                  *
                </span>
              </label>

              <select
                value={form.industry}
                onChange={handleChange(
                  "industry"
                )}
              >
                <option value="">
                  Select Preferred Industry
                </option>
                <option>
                  Information Technology
                </option>
                <option>
                  Banking and Finance
                </option>
                <option>
                  Health Care
                </option>
                <option>Education</option>
                <option>Engineering</option>
                <option>Construction</option>
                <option>
                  Marketing and Sales
                </option>
                <option>Manufacturing</option>
                <option>
                  Hospitality and Tourism
                </option>
                <option>NGO</option>
                <option>Other</option>
              </select>
            </div>

            <NavigationButtons
              currentStep={currentStep}
              canContinue={isStepComplete()}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          </div>
        )}

        {currentStep === 6 && (
          <div className="profile-form">
            <div className="profile-form-group">
              <label>
                Employment Type{" "}
                <span className="required-star">
                  *
                </span>
              </label>

              <select
                value={form.employmentType}
                onChange={handleChange(
                  "employmentType"
                )}
              >
                <option value="">
                  Select Employment Type
                </option>
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Contract</option>
                <option>Temporary</option>
                <option>Internship</option>
              </select>
            </div>

            <NavigationButtons
              currentStep={currentStep}
              canContinue={isStepComplete()}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          </div>
        )}

        {error && (
          <p className="profile-error">
            {error}
          </p>
        )}

        {success && (
          <p className="profile-success">
            {success}
          </p>
        )}
      </main>
    </div>
  );
}

function NavigationButtons({
  currentStep,
  canContinue,
  onPrevious,
  onNext,
}) {
  return (
    <div className="profile-buttons">
      <button
        type="button"
        className="profile-prev-button"
        disabled={currentStep === 1}
        onClick={onPrevious}
      >
        <span>‹</span>
        PREV
      </button>

      <button
        type="button"
        className={`profile-next-button ${
          canContinue
            ? "profile-next-active"
            : ""
        }`}
        disabled={!canContinue}
        onClick={onNext}
      >
        {currentStep === 6
          ? "SUBMIT"
          : "NEXT"}
        <span>›</span>
      </button>
    </div>
  );
}

export default Profilesetup;
