import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const jobs = [
  {
    title: "Accountant",
    company: "ABC Ethiopia",
    location: "Addis Ababa",
    type: "Full Time",
    category: "Accounting",
    description:
      "We are looking for an accountant to manage financial records, prepare reports and support our finance team.",
  },
  {
    title: "Senior Accountant",
    company: "Ethiopian Business Group",
    location: "Addis Ababa",
    type: "Full Time",
    category: "Accounting",
    description:
      "A qualified accountant is needed to handle accounting operations and financial reporting.",
  },
  {
    title: "Software Developer",
    company: "QIDAME Technology",
    location: "Addis Ababa",
    type: "Full Time",
    category: "Technology",
    description:
      "Join our technology team and develop modern web applications and software solutions.",
  },
  {
    title: "Frontend Developer",
    company: "Digital Ethiopia",
    location: "Addis Ababa",
    type: "Full Time",
    category: "Technology",
    description:
      "We are looking for a frontend developer with experience in React and modern web development.",
  },
  {
    title: "Teacher",
    company: "Bright Future School",
    location: "Addis Ababa",
    type: "Full Time",
    category: "Education",
    description:
      "A qualified teacher is needed to teach students and prepare educational activities.",
  },
  {
    title: "Nurse",
    company: "Ethiopian Medical Center",
    location: "Addis Ababa",
    type: "Full Time",
    category: "Healthcare",
    description:
      "We are looking for a professional nurse to provide quality patient care.",
  },
  {
    title: "Civil Engineer",
    company: "Ethiopian Construction PLC",
    location: "Addis Ababa",
    type: "Full Time",
    category: "Engineering",
    description:
      "Join our engineering team and work on construction and infrastructure projects.",
  },
  {
    title: "Marketing Officer",
    company: "Ethiopian Marketing Solutions",
    location: "Addis Ababa",
    type: "Full Time",
    category: "Marketing",
    description:
      "We are looking for a creative marketing officer to join our team.",
  },
  {
    title: "Graphic Designer",
    company: "Creative Ethiopia",
    location: "Addis Ababa",
    type: "Part Time",
    category: "Design",
    description:
      "Create attractive visual content and designs for our company and clients.",
  },
  {
    title: "Human Resources Officer",
    company: "Ethiopian Business Group",
    location: "Addis Ababa",
    type: "Full Time",
    category: "Human Resources",
    description:
      "Manage recruitment, employee relations and human resources activities.",
  },
  {
    title: "Sales Officer",
    company: "Ethiopian Trading Company",
    location: "Addis Ababa",
    type: "Full Time",
    category: "Sales",
    description:
      "Join our sales team and help us develop relationships with customers.",
  },
  {
    title: "Driver",
    company: "Ethiopian Logistics",
    location: "Addis Ababa",
    type: "Full Time",
    category: "Transport",
    description:
      "Experienced drivers are needed to support our transportation operations.",
  },
  {
    title: "Project Manager",
    company: "Development Solutions Ethiopia",
    location: "Addis Ababa",
    type: "Full Time",
    category: "Management",
    description:
      "Manage projects, coordinate teams and ensure successful project delivery.",
  },
  {
    title: "Data Analyst",
    company: "Technology Solutions Ethiopia",
    location: "Addis Ababa",
    type: "Full Time",
    category: "Technology",
    description:
      "Analyze business data and create reports to support decision making.",
  },
  {
    title: "Electrical Engineer",
    company: "Ethiopian Engineering PLC",
    location: "Addis Ababa",
    type: "Full Time",
    category: "Engineering",
    description:
      "Work on electrical engineering projects and provide technical solutions.",
  },
];

function Jobs() {
  const [searchParams] = useSearchParams();

  // Get the search text sent from the Home page
  const searchFromHome = searchParams.get("search") || "";

  const [search, setSearch] = useState(searchFromHome);
  const [searchText, setSearchText] = useState(searchFromHome);

  // The job whose details window is open (null = closed)
  const [selectedJob, setSelectedJob] = useState(null);

  /*
   * Make sure that if the user comes from the Home page,
   * the search word appears automatically in the Jobs search box.
   */
  useEffect(() => {
    setSearch(searchFromHome);
    setSearchText(searchFromHome);
  }, [searchFromHome]);

  /*
   * Close the details window with the Escape key
   */
  useEffect(() => {
    if (!selectedJob) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setSelectedJob(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedJob]);

  /*
   * Search jobs
   */
  const filteredJobs = jobs.filter((job) => {
    const text = searchText.toLowerCase().trim();

    // If there is no search text, show all jobs
    if (!text) {
      return true;
    }

    return (
      job.title.toLowerCase().includes(text) ||
      job.company.toLowerCase().includes(text) ||
      job.category.toLowerCase().includes(text) ||
      job.description.toLowerCase().includes(text) ||
      job.location.toLowerCase().includes(text) ||
      job.type.toLowerCase().includes(text)
    );
  });

  const handleSearch = () => {
    setSearchText(search.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="jobs-page">
      {/* ================= SEARCH AREA ================= */}

      <section className="jobs-hero">
        <h1>Find Your Dream Job in Ethiopia</h1>

        <div className="jobs-search-box">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Job title, Keywords or industry"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button onClick={handleSearch}>Search</button>
        </div>

        {/* ================= FILTERS ================= */}

        <div className="job-filters">
          <select>
            <option value="">Category</option>
            <option value="Accounting">Accounting</option>
            <option value="Technology">Technology</option>
            <option value="Education">Education</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Design">Design</option>
            <option value="Sales">Sales</option>
            <option value="Management">Management</option>
          </select>

          <select>
            <option value="">Location</option>
            <option value="Addis Ababa">Addis Ababa</option>
            <option value="Mekelle">Mekelle</option>
            <option value="Bahir Dar">Bahir Dar</option>
            <option value="Hawassa">Hawassa</option>
          </select>

          <select>
            <option value="">Career</option>
            <option value="Entry Level">Entry Level</option>
            <option value="Mid Level">Mid Level</option>
            <option value="Senior Level">Senior Level</option>
          </select>

          <select>
            <option value="">Employment Type</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Contract">Contract</option>
          </select>

          <select>
            <option value="">Posted Within</option>
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
          </select>
        </div>
      </section>

      {/* ================= JOB RESULTS ================= */}

      <section className="jobs-results">
        <div className="jobs-tabs">
          <button className="active-tab">All Jobs</button>

          <button>Featured Jobs</button>
        </div>

        <div className="jobs-heading">
          <h2>
            {searchText ? `Jobs matching "${searchText}"` : "Available Jobs"}
          </h2>

          <span>
            {filteredJobs.length} job
            {filteredJobs.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* ================= NO RESULTS ================= */}

        {filteredJobs.length === 0 ? (
          <div className="no-jobs">
            <h3>No jobs found</h3>

            <p>We couldn't find a job matching "{searchText}".</p>

            <p>Try another job title, keyword or industry.</p>
          </div>
        ) : (
          /* ================= JOB LIST ================= */

          <div className="job-list">
            {filteredJobs.map((job) => (
              <div className="job-card" key={job.title + job.company}>
                <div className="job-card-left">
                  <div className="company-logo">{job.company.charAt(0)}</div>

                  <div className="job-information">
                    <h3>{job.title}</h3>

                    <p className="company-name">{job.company}</p>

                    <p className="job-details">
                      📍 {job.location}
                      <span> • </span>
                      💼 {job.type}
                    </p>

                    <p className="job-description">{job.description}</p>
                  </div>
                </div>

                <button
                  className="view-job-button"
                  onClick={() => setSelectedJob(job)}
                >
                  View Job
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= JOB DETAILS WINDOW ================= */}

      {selectedJob && (
        <div
          onClick={() => setSelectedJob(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "650px",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "#ffffff",
              borderRadius: "20px",
              padding: "35px",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedJob(null)}
              aria-label="Close"
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                border: "none",
                background: "#f0f0f0",
                color: "#333333",
                fontSize: "26px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              ×
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              <div
                className="company-logo"
                style={{ flexShrink: 0 }}
              >
                {selectedJob.company.charAt(0)}
              </div>

              <div>
                <h2 style={{ margin: 0 }}>{selectedJob.title}</h2>
                <p style={{ margin: "4px 0 0", color: "#4fc3a1", fontWeight: "bold" }}>
                  {selectedJob.company}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginBottom: "24px",
              }}
            >
              {[
                `📍 ${selectedJob.location}`,
                `💼 ${selectedJob.type}`,
                `🏷️ ${selectedJob.category}`,
              ].map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "20px",
                    background: "#e9f8f3",
                    color: "#2a7f66",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 style={{ marginBottom: "8px" }}>Job Description</h3>

            <p style={{ lineHeight: 1.7, color: "#444444" }}>
              {selectedJob.description}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "30px",
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                style={{
                  padding: "12px 34px",
                  border: "none",
                  borderRadius: "25px",
                  background: "#4fc3a1",
                  color: "#ffffff",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Jobs;
