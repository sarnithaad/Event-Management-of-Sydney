import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";

function App() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const today = new Date().toLocaleDateString("en-AU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  useEffect(() => {
    fetch("/api/events")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then(setEvents)
      .catch(() => setError("Failed to load events. Please try again later."));
  }, []);

  return (
    <div className="container">
      <h1>Louder World: Sydney Events</h1>
      <p className="date">{today}</p>
      <div className="events-list">
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : events.length === 0 ? (
          <p>Loading events...</p>
        ) : (
          events.map((event, idx) => <EventCard key={idx} event={event} />)
        )}
      </div>
    </div>
  );
}

export default App;
