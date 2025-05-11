import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";

function App() {
  const [events, setEvents] = useState([]);
  const today = new Date().toLocaleDateString("en-AU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then(res => res.json())
      .then(setEvents);
  }, []);

  return (
    <div className="container">
      <h1>Louder World: Sydney Events</h1>
      <p className="date">{today}</p>
      <div className="events-list">
        {events.length === 0 ? (
          <p>Loading events...</p>
        ) : (
          events.map((event, idx) => <EventCard key={idx} event={event} />)
        )}
      </div>
    </div>
  );
}

export default App;
