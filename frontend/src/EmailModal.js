import React, { useState } from "react";

function EmailModal({ eventUrl, onClose }) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitting(true);
    fetch("http://localhost:5000/api/redirect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, event_url: eventUrl })
    })
      .then(res => res.json())
      .then(data => {
        window.location.href = data.redirect_url;
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
      </div>
    </div>
  );
}

export default EmailModal;
