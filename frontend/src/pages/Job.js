import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Jobs() {
  const [searchParams] = useSearchParams();

  // Get the search text sent from the Home page
  const searchFromHome = searchParams.get("search") || "";

  const [search, setSearch] = useState(searchFromHome);
  const [searchText, setSearchText] = useState(searchFromHome);

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

  /*
   * Make sure that if the user comes from the Home page,
   * the search word appears automatically in the Jobs search box.
   */
  useEffect(() => {
    setSearch(searchFromHome);
    setSearchText(searchFromHome);
  }, [searchFromHome]);

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

          <button onClick={handleSearch}>
            Search
          </button>

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

          <button className="active-tab">
            All Jobs
          </button>

          <button>
            Featured Jobs
          </button>

        </div>


        <div className="jobs-heading">

          <h2>
            {searchText
              ? `Jobs matching "${searchText}"`
              : "Available Jobs"}
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

            <p>
              We couldn't find a job matching "{searchText}".
            </p>

            <p>
              Try another job title, keyword or industry.
            </p>

          </div>

        ) : (


          /* ================= JOB LIST ================= */

          <div className="job-list">

            {filteredJobs.map((job, index) => (

              <div
                className="job-card"
                key={index}
              >

                <div className="job-card-left">

                  <div className="company-logo">
                    {job.company.charAt(0)}
                  </div>


                  <div className="job-information">

                    <h3>
                      {job.title}
                    </h3>

                    <p className="company-name">
                      {job.company}
                    </p>

                    <p className="job-details">
                      📍 {job.location}

                      <span> • </span>

                      💼 {job.type}
                    </p>

                    <p className="job-description">
                      {job.description}
                    </p>

                  </div>

                </div>


                <button className="view-job-button">
                  View Job
                </button>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default Jobs;