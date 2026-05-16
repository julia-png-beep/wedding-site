// src/pages/ShuttleBus.jsx
import React from "react";

export default function ShuttleBus() {
  const [open, setOpen] = React.useState(false);
  const base = import.meta.env.BASE_URL;

  return (
    <main className="container">
      <section className="block">
        <button
          type="button"
          className="btn-link"
          onClick={() => {
            if (window.history.length > 1) {
              window.history.back();
            } else {
              window.location.hash = "#/";
            }
          }}
        >
          ← Back
        </button>

        <h2 className="title">Shuttle Bus Information</h2>

        <p>
          We'll have a shuttle bus running to and from Wildwood for anyone who'd
          rather not drive. There is some parking on-site if you prefer to drive
          yourself — just let us know in your RSVP if you'd like a spot on the
          bus. Please check the map below for the route and pick-up locations.
        </p>
      </section>

      <section className="block">
        <h3
          className="subtitle"
          style={{ color: "#7b1b1b", marginBottom: "0.5rem" }}
        >
          Shuttle Bus Route
        </h3>

        <figure className="map-card">
          <img
            src={`${base}Busmap.jpg`}
            alt="Shuttle bus route map"
            className="map-image"
            onClick={() => setOpen(true)}
          />

          <figcaption
            className="muted"
            style={{
              textAlign: "center",
              marginTop: ".4rem",
              fontSize: "0.95rem",
            }}
          >
            Click to enlarge
          </figcaption>
        </figure>
      </section>

      {open && (
        <div
          className="lightbox"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <img
            src={`${base}Busmap.jpg`}
            alt="Full-size shuttle bus route map"
            className="lightbox-img"
          />

          <button
            className="lightbox-close"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </main>
  );
}