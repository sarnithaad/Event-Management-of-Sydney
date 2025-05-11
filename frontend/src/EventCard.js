import React, { useState } from "react";
import EmailModal from "./EmailModal";

function EventCard({ event }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="event-card">
      <div>
        <h2>{event.title}</h2>
        <p className="event-date">{event.date}</p>
        <p className="event-location">{event.location}</p>
        {event.description && (
          <p className="event-description">{event.description}</p>
        )}
      </div>
      <button className="get-tickets" onClick={() => setShowModal(true)}>
        GET TICKETS
      </button>
      {showModal && (
        <EmailModal
          eventUrl={event.link}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default EventCard;
