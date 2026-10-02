import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const trustedLogos = [
  {
    alt: "CARE",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Logo_CARE_horizontal.svg",
  },
  {
    alt: "International Rescue Committee",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/International_Rescue_Committee_Logo.svg",
  },
  {
    alt: "Mercy Corps",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mercy_Corps_Logo.png",
  },
  {
    alt: "Dashen Bank",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dashen_Bank.png",
  },
  {
    alt: "World Vision",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/World_Vision_logo_2017.svg",
  },
  {
    alt: "Save the Children",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Save_the_Children_Logo.svg",
  },
  {
    alt: "Danish Refugee Council",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Drc-logo.png",
  },
];

const categories = [
  { name: "Accounting and Finance", count: 233 },
  { name: "Admin, Secretarial, and Clerical", count: 53 },
  { name: "Agriculture", count: 30 },
  { name: "Architecture and Construction", count: 14 },
  { name: "Automotive", count: 15 },
  { name: "Banking and Insurance", count: 30 },
  { name: "Business and Administration", count: 193 },
  { name: "Business Development", count: 34 },
  { name: "Communications, Media and Journalism", count: 27 },
  { name: "Consultancy and Training", count: 33 },
  { name: "Creative Arts", count: 19 },
  { name: "Education and Training", count: 20 },
];

const companies = [
  {
    name: "BEAEKA General Business PLC",
    short: "BEAEKA",
    jobs: 13,
    logo: "",
  },
  {
    name: "International Rescue Committee -IRC",
    short: "IRC",
    jobs: 0,
    logo: "",
  },
  {
    name: "Mercy Corps Ethiopia",
    short: "MERCY",
    jobs: 2,
    logo: "",
  },
  {
    name: "Dashen Bank S.C",
    short: "DASHEN",
    jobs: 8,
    logo: "",
  },
  {
    name: "World VisioN Ethiopia",
    short: "WORLD VISION",
    jobs: 3,
    logo: "",
  },
  {
    name: "GOAL Ethiopia",
    short: "GOAL",
    jobs: 1,
    logo: "",
  },
];

function Home() {
  const navigate = useNavigate();

  // When a footer link opens a new page, start from the top of that page
  const scrollToTop = () => window.scrollTo(0, 0);

  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="home-page">
      {/* ================= HERO ================= */}

      <section className="hero-section">
        {/* Decorative curves */}
        <div className="hero-decoration">
          <div className="curve curve-one"></div>
          <div className="curve curve-two"></div>
          <div className="curve curve-three"></div>
        </div>

        <div className="hero-content">
          <h1>
            <span>Ethiojobs</span>
            <br />
            <strong>Find the Latest Jobs in Ethiopia</strong>
          </h1>

          <button
            className="find-jobs-button"
            onClick={() => navigate("/Jobs")}
          >
            Find Jobs
          </button>
        </div>
      </section>

      {/* ================= TRUSTED BY ================= */}

      <section className="trusted-section">
        <h2>Trusted By</h2>

        <div className="trusted-logo-wrapper">
          <div className="trusted-logos">
            {/* FIRST SET + SECOND SET (duplicate for non-stop movement) */}
            {[...trustedLogos, ...trustedLogos].map((logo, index) => (
              <div className="trusted-logo" key={index}>
                <img src={logo.src} alt={logo.alt} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TOP CATEGORIES ================= */}

      <section className="top-categories-section">
        <h2>Top Categories</h2>

        <div className="categories-grid">
          {categories.map((category, index) => (
            <button
              key={category.name}
              className={`category-card ${
                index === 0 ? "active-category" : ""
              }`}
              onClick={() => navigate("/jobs")}
            >
              <span className="category-arrow">▶</span>
              <span className="category-name">{category.name}</span>
              <span className="category-count">{category.count}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ================= FEATURED COMPANIES ================= */}

      <section className="featured-section">
        <div className="featured-heading">
          <h2>Featured Companies</h2>

          <a href="#featured">All Featured Companies</a>
        </div>

        <div className="company-slider">
          {/* LEFT ARROW */}

          <button
            className="slider-arrow left-arrow"
            onClick={() =>
              setCurrentSlide(
                currentSlide === 0 ? companies.length - 3 : currentSlide - 1
              )
            }
          >
            &#8592;
          </button>

          {/* CARDS */}

          <div className="company-slider-window">
            <div
              className="company-slider-track"
              style={{
                transform: `translateX(-${currentSlide * 33.333}%)`,
              }}
            >
              {companies.map((company, index) => (
                <div className="company-slide" key={index}>
                  <div className="company-card">
                    {/* Company logo */}

                    <div className="company-logo-box">
                      {company.logo ? (
                        <img src={company.logo} alt={company.name} />
                      ) : (
                        <div className="logo-placeholder">{company.short}</div>
                      )}
                    </div>

                    {/* Company name */}

                    <h3>{company.name}</h3>

                    {/* Jobs */}

                    <p>
                      Jobs <span>({company.jobs})</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT ARROW */}

          <button
            className="slider-arrow right-arrow"
            onClick={() =>
              setCurrentSlide(
                currentSlide === companies.length - 3 ? 0 : currentSlide + 1
              )
            }
          >
            &#8594;
          </button>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}

      <section className="how-section" id="how-it-works">
        <h2>How Ethiojobs Works</h2>

        <div className="how-grid">
          <div className="how-card">
            <div className="how-number">01</div>

            <h3>Not sure where to start?</h3>

            <p>
              Create and manage your account in seconds. Sign up for Ethiojobs
              and discover personalized job alerts based on your skills and
              preferences.
            </p>
          </div>

          <div className="how-card">
            <div className="how-number">02</div>

            <h3>Need help finding the right jobs?</h3>

            <p>
              Find your dream job with powerful search filters. Narrow down open
              roles based on your skills and career goals.
            </p>
          </div>

          <div className="how-card">
            <div className="how-number">03</div>

            <h3>Overwhelmed by the application process?</h3>

            <p>
              Upload your CV, refine your profile and apply to open positions
              effortlessly.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="footer">
        <div className="footer-grid">
          <div>
            <h3>Job Seekers</h3>

            <Link to="/jobs" onClick={scrollToTop}>
              Find Jobs
            </Link>

            <Link to="/signup" onClick={scrollToTop}>
              Register
            </Link>

            <Link to="/cv-upload" onClick={scrollToTop}>
              Post CVs
            </Link>

            <Link to="/jobs" onClick={scrollToTop}>
              Job Alerts
            </Link>
          </div>

          <div>
            <h3>Employers</h3>

            <Link to="/login" onClick={scrollToTop}>
              Login
            </Link>

            <Link to="/signup" onClick={scrollToTop}>
              Register
            </Link>

            <Link to="/contact" onClick={scrollToTop}>
              Post Jobs
            </Link>

            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                const section = document.getElementById("how-it-works");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Features
            </a>
          </div>

          <div>
            <h3>Contact us</h3>

            <p>Meskel Flower Road</p>

            <p>Behind Nazra Hotel</p>

            <p>Addis Ababa, Ethiopia</p>

            <p>
              Phone: <a href="tel:0116198020">0116198020</a>
            </p>

            <p>
              <a href="mailto:candidates@ethiojobs.net">
                candidates@ethiojobs.net
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
