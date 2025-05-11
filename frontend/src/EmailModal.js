import React, { useState, useRef, useEffect } from "react";

const API_BASE = process.env.REACT_APP_BACKEND_URL;

function EmailModal({ eventUrl, onClose }) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef(null);

  // Focus the email input when modal opens
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();

    // Allow closing modal with Escape key
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    setError(null);
    fetch(`${API_BASE}/api/redirect`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, event_url: eventUrl })
    })
      .then(res => {
        if (!res.ok) throw new Error("Submission failed");
        return res.json();
      })
      .then(data => {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = data.redirect_url;
        }, 1000); // Show success for 1s before redirect
      })
      .catch(() => {
        setError("Submission failed. Please try again.");
        setSubmitting(false);
      });
  };

  return (
    <div className="modal-backdrop" tabIndex={-1} aria-modal="true" role="dialog">
      <div className="modal">
        <h3 id="modal-title">Enter your email to get tickets</h3>
        {success ? (
          <p style={{ color: "#1976d2", margin: "16px 0" }}>Success! Redirecting…</p>
        ) : (
          <form onSubmit={handleSubmit} aria-labelledby="modal-title">
            <label htmlFor="email-input" style={{ display: "block", marginBottom: 8 }}>
              Email address
            </label>
            <input
              ref={inputRef}
              id="email-input"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={submitting}
              aria-required="true"
              aria-invalid={!!error}
            />
            <button type="submit" disabled={submitting} style={{ marginTop: 12 }}>
              {submitting ? (
                <span className="spinner-btn" aria-label="Submitting…">
                  <svg width="16" height="16" viewBox="0 0 40 40">
                    <circle
                      cx="20"
                      cy="20"
                      r="16"
                      stroke="#1976d2"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="80"
                      strokeDashoffset="60"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 20 20"
                        to="360 20 20"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>
                </span>
              ) : (
                "Continue"
              )}
            </button>
          </form>
        )}
        <button
          className="close-modal"
          onClick={onClose}
          disabled={submitting}
          aria-label="Cancel and close"
        >
          Cancel
        </button>
        {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}
      </div>
    </div>
  );
}

export default EmailModal;
