import React from "react";

export default function WeekendSaturday() {
  const [open, setOpen] = React.useState(false);

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
      window.location.hash = "#/"; // fallback to home if no history
    }
  }}
>
  ← Back
</button>        <h2 className="title">Saturday · The Main Event</h2>

        <p>
          <strong style={{ color: "var(--clay)" }}>Wildwood, Kangaroo Valley</strong>
          <br />
          2:30 – 11:00 pm
        </p>

        <p>
          We can’t wait to celebrate with you at Wildwood. Arrive from 2:30&nbsp;pm for a welcome
          drink before wandering down to the Valley Lookout for our 3&nbsp;pm ceremony among the
          trees. After we say “I do,” join us for cocktails, canapés, and golden-hour views on
          the Picnic Lawn. Dinner, laughter, and dancing will follow from 6 pm under the gum trees.
        </p>
      </section>

      {/* Wildwood Map Image */}
      <section className="block">
        <figure className="map-card">
          <img
            src="/wildwood-map.jpg"
            alt="Wildwood property map"
            className="map-image"
            onClick={() => setOpen(true)}
          />
          <figcaption
            className="muted"
            style={{ textAlign: "center", marginTop: ".4rem", fontSize: "0.95rem" }}
          >
            Click to enlarge
          </figcaption>
        </figure>
      </section>

      {/* Lightbox for map enlargement */}
      {open && (
        <div className="lightbox" onClick={() => setOpen(false)} role="dialog" aria-modal="true">
          <img
            src="/wildwood-map.jpg"
            alt="Wildwood property map, full size"
            className="lightbox-img"
          />
          <button
            className="lightbox-close"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </main>
  );
}
