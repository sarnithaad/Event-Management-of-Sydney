import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";

// You can use a spinner SVG or a CSS spinner for better UX
function Spinner() {
  return (
    <div className="spinner" aria-label="Loading events">
      <svg width="40" height="40" viewBox="0 0 40 40">
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="#1976d2"
          strokeWidth="4"
          fill="none"
          strokeDasharray="90"
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
    </div>
  );
}

const API_BASE = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const today = new Date().toLocaleDateString("en-AU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const fetchEvents = () => {
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/api/events`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load events. Please try again later.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <h1 tabIndex={0}>What's On in Sydney !?</h1>
    <p> Check out the latest events that are happening in and around Sydney</p>
    <p>Follow for more information!</p>
      <p className="date">{today}</p>

      {error && (
        <div className="alert" role="alert">
          <span>{error}</span>
          <button
            className="retry-btn"
            onClick={fetchEvents}
            aria-label="Retry loading events"
          >
            Retry
          </button>
          <button
            className="close-alert"
            onClick={() => setError(null)}
            aria-label="Dismiss error"
          >
            ×
          </button>
        </div>
      )}

      <div className="events-list">
        {loading ? (
          <Spinner />
        ) : events.length === 0 ? (
          <p>No events found. Please check back later!</p>
        ) : (
          events.map((event, idx) => <EventCard key={idx} event={event} />)
        )}
      </div>
    </div>
  );
}

export default App;
