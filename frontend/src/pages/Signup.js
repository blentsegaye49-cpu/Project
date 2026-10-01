import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.fullName.trim()) nextErrors.fullName = "Required";
    if (!form.email.trim()) {
      nextErrors.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address";
    }
    if (!form.phone.trim()) nextErrors.phone = "Required";
    if (!form.password.trim()) {
      nextErrors.password = "Required";
    } else if (form.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    }

    if (!form.confirmPassword.trim()) {
      nextErrors.confirmPassword = "Required";
    } else if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };
  const handleSubmit = async () => {
    const isValid = validate();
    if (!isValid) return;
    setSubmitting(true);
    setServerError(null);
    try {
      const response = await fetch("https://project-qxyh.onrender.com/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.message || "Signup failed. Please try again.");
        return;
      }

      navigate("/login");
    } catch (err) {
      setServerError(
        "Could not reach the server. Make sure your backend is running."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <h1 className="auth-heading uppercase">Signup</h1>

      <div className="auth-form">
        {/* Full Name */}
        <div className="form-group">
          <label>Full Name</label>
          <div className={`input-wrapper plain ${errors.fullName ? "input-error" : ""}`}>
            <input
              type="text"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange("fullName")}
            />
          </div>
          {errors.fullName && <p className="error-text">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <div className={`input-wrapper ${errors.email ? "input-error" : ""}`}>
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            <input
              type="email"
              placeholder="example@example.com"
              value={form.email}
              onChange={handleChange("email")}
            />
          </div>
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="form-group">
          <label>Phone</label>
          <div className={`input-wrapper phone-wrapper ${errors.phone ? "input-error" : ""}`}>
            <div className="country-code">
              <span className="flag-et" aria-hidden="true"></span>
              <span>+251</span>
              <span className="select-arrow">⌄</span>
            </div>
            <input
              type="tel"
              placeholder="9XX XXX XXX"
              value={form.phone}
              onChange={handleChange("phone")}
            />
          </div>
          {errors.phone && <p className="error-text">{errors.phone}</p>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password</label>
          <div className={`input-wrapper ${errors.password ? "input-error" : ""}`}>
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <rect x="4" y="10" width="16" height="10" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange("password")}
            />
            <button
              type="button"
              className="eye-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.6 21.6 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 5c7 0 11 7 11 7a21.6 21.6 0 0 1-2.16 3.19" />
                  <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                  <path d="M1 1l22 22" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label>Confirm Password</label>
          <div className={`input-wrapper ${errors.confirmPassword ? "input-error" : ""}`}>
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <rect x="4" y="10" width="16" height="10" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter Password"
              value={form.confirmPassword}
              onChange={handleChange("confirmPassword")}
            />
            <button
              type="button"
              className="eye-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.6 21.6 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 5c7 0 11 7 11 7a21.6 21.6 0 0 1-2.16 3.19" />
                  <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                  <path d="M1 1l22 22" />
                </svg>
              )}
            </button>
          </div>
          {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
        </div>

        {serverError && <p className="error-text submit-error">{serverError}</p>}

        <button className="submit-button" onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="switch-auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
