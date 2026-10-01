import React, { useState } from "react";

const COMPANIES = [
  {
    name: "Summer Real Estate",
    industry: "Construction & Engineering",
    initials: "SR",
    featured: true,
  },
  {
    name: "Horra Corporate Group",
    industry: "Trading Companies & Distributors",
    initials: "HG",
    featured: true,
  },
  {
    name: "Dashen Bank S.C",
    industry: "Banking & Finance",
    initials: "DB",
    featured: true,
  },
  {
    name: "Mercy Corps Ethiopia",
    industry: "NGO & Development",
    initials: "MC",
    featured: false,
  },
  {
    name: "World Vision Ethiopia",
    industry: "NGO & Development",
    initials: "WV",
    featured: false,
  },
  {
    name: "GOAL Ethiopia",
    industry: "NGO & Development",
    initials: "GE",
    featured: false,
  },
];

function Companies() {
  const [tab, setTab] = useState("featured");
  const [search, setSearch] = useState("");

  const visibleCompanies = COMPANIES.filter((company) => {
    const matchesTab = tab === "all" || company.featured;
    const matchesSearch = company.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="companies-page">
      {/* HEADER */}
     
      
       

      {/* HERO */}
      <section className="companies-hero">
        <div className="hero-shape shape-purple"></div>
        <div className="hero-shape shape-blue"></div>
        <h1>Find a Company</h1>
      </section>
<br></br>
<br></br>
      {/* TABS + SEARCH */}
      <section className="companies-controls">
        <div className="companies-tabs">
          <button
            className={`companies-tab ${tab === "featured" ? "active" : ""}`}
            onClick={() => setTab("featured")}
          >
            Featured Companies
          </button>
          <button
            className={`companies-tab ${tab === "all" ? "active" : ""}`}
            onClick={() => setTab("all")}
          >
            All Companies
          </button>
        </div>

        <div className="companies-search-row">
          <div className="companies-search-box">
            <svg
              className="search-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7"></circle>
              <path d="M20 20l-4-4"></path>
            </svg>
            <input
              type="text"
              placeholder="Search Companies"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="filter-button" aria-label="Filter">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M7 12h10M10 18h4" />
            </svg>
          </button>
        </div>
      </section>

      {/* COMPANY GRID */}
      <section className="companies-grid">
        {visibleCompanies.map((company) => (
          <div className="company-card-item" key={company.name}>
            <div className="company-card-logo">{company.initials}</div>
            <div className="company-card-text">
              <h3>{company.name}</h3>
              <p>{company.industry}</p>
            </div>
          </div>
        ))}

        {visibleCompanies.length === 0 && (
          <p className="no-companies-text">No companies match your search.</p>
        )}
      </section>
    </div>
  );
}

export default Companies;