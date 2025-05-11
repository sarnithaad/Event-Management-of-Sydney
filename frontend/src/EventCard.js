import React, { useState } from "react";
import EmailModal from "./EmailModal";

function EventCard({ event }) {
  const [showModal, setShowModal] = useState(false);

  // Allow closing modal by clicking outside the modal content
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      setShowModal(false);
    }
  };

  return (
    <div className="event-card" tabIndex={0} aria-label={`Event: ${event.title}`}>
      <div>
        <h2 className="event-title">{event.title}</h2>
        <p className="event-date">{event.date}</p>
        <p className="event-location">{event.location}</p>
        {event.description && (
          <p className="event-description">{event.description}</p>
        )}
      </div>
      <button
        className="get-tickets"
        onClick={() => setShowModal(true)}
        aria-label={`Get tickets for ${event.title}`}
      >
        GET TICKETS
      </button>
      {showModal && (
        <div onClick={handleBackdropClick}>
          <EmailModal
            eventUrl={event.link}
            onClose={() => setShowModal(false)}
          />
        </div>
      )}
    </div>
  );
}

export default EventCard;
