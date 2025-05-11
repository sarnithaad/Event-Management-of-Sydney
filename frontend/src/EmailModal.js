import React, { useState } from "react";

function EmailModal({ eventUrl, onClose }) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    fetch("/api/redirect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, event_url: eventUrl })
    })
      .then(res => {
        if (!res.ok) throw new Error("Submission failed");
        return res.json();
      })
      .then(data => {
        window.location.href = data.redirect_url;
      })
      .catch(() => {
        setError("Submission failed. Please try again.");
        setSubmitting(false);
      });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Enter your email to get tickets</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={submitting}
          />
          <button type="submit" disabled={submitting}>
            Continue
          </button>
        </form>
        <button className="close-modal" onClick={onClose} disabled={submitting}>
          Cancel
        </button>
        {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}
      </div>
    </div>
  );
}

export default EmailModal;
