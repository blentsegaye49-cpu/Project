import React, { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: null });
    setServerError("");
    setSuccess("");
  };

  const validate = () => {
    const next = {};
    if (!form.companyName.trim()) next.companyName = "Required";
    if (!form.contactName.trim()) next.contactName = "Required";
    if (!form.email.trim()) {
      next.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address";
    }
    if (!form.phone.trim()) next.phone = "Required";
    if (!form.message.trim()) next.message = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setSubmitting(true);
    setServerError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.message || "Could not send your message.");
        return;
      }

      setSuccess("Thank you! Your message has been sent.");
      setForm({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      setServerError("Cannot connect to the backend server.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* HEADER */}
    
        

      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-arc arc-lavender"></div>
        <div className="contact-arc arc-mint"></div>

        <div className="contact-hero-text">
          <h1>Contact Us</h1>
          <p>
            Employers, get in touch with us today. Fill out the form or use the
            contact information below.
          </p>
        </div>
      </section>

         

      {/* SUPPORT PANEL */}
      <section className="support-section">
        <div className="support-panel">
          <div className="support-left">
            <h2>Employer Support</h2>

            <div className="support-row">
              <span className="support-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
                </svg>
              </span>
              <span>Phone: 0000000000</span>
            </div>

            <div className="support-row">
              <span className="support-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </span>
              <span>Email: support@yourbrand.com</span>
            </div>

            <div className="support-row">
              <span className="support-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </span>
              <span>Business Hours Monday - Friday 8:30 AM to 5:30 PM - EAT</span>
            </div>
          </div>

          <div className="support-right">
            <div className="support-brand">
              <div className="contact-logo-mark light">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="support-brand-text">yourbrand</span>
            </div>

            <p>
              Write a short description of your platform here: who you help,
              what services you offer, and why employers should reach out to
              your team.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;