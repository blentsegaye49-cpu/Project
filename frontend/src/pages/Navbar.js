import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="main-header">

      <div className="header-container">

        {/* ================= ETHIOJOBS LOGO ================= */}

        <Link to="/" className="ethio-logo">

          <div className="logo-symbol">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <span className="logo-text">
            ethiojobs
          </span>

        </Link>


        {/* ================= DESKTOP MENU ================= */}

        <nav className="desktop-nav">

          <Link to="/Jobs">
            Jobs
          </Link>

          <Link to="/Companies">
            Companies
          </Link>

        </nav>


        {/* ================= DESKTOP ACCOUNT ================= */}

        <div className="desktop-account">

          <Link to="/login">
            Log in
          </Link>

          <Link to="/signup">
            <button type="button">
              Sign up
            </button>
          </Link>

        </div>


        {/* ================= MOBILE MENU BUTTON ================= */}

        {!menuOpen ? (

          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

        ) : (

          <button
            className="mobile-close-button header-close-button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>

        )}

      </div>


      {/* ================= MOBILE MENU ================= */}

      {menuOpen && (

        <div className="mobile-menu">

          <nav className="mobile-menu-links">

            <Link
              to="/Companies"
              className="mobile3"
              onClick={() => setMenuOpen(false)}
            >
              Find Company
            </Link>


            <Link
              to="/Jobs"
              className="mobile3"
              onClick={() => setMenuOpen(false)}
            >
              Find a Job
            </Link>


            <Link
              to="/about"
              className="mobile2"
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>


            <Link
              to="/contact"
              className="mobile2"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>


            <Link
              to="/login"
              className="mobile3"
              onClick={() => setMenuOpen(false)}
            >
              Log in
            </Link>


            <Link
              to="/signup"
              className="mobile4"
              onClick={() => setMenuOpen(false)}
            >
              Sign up
            </Link>


            <Link
              to="/employ"
              className="mobile5"
              onClick={() => setMenuOpen(false)}
            >
              Employers, are you recruiting?
            </Link>

          </nav>

        </div>

      )}

    </header>
  );
}

export default Navbar;