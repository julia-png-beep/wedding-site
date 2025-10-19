import React from "react";

export default function WeekendSaturday() {
  return (
    <main className="container">
      <section className="block">
                <a className="btn-link" href="#/home">← Back</a>

        <h2 className="title">Saturday · 24 October 2026 · The Wedding Day</h2>

        {/* Timeline image */}
        <a href="/wedding-timeline.png" target="_blank" rel="noreferrer">
          <img
            src="/wedding-timeline.png"
            alt="Wedding Day Schedule"
            style={{
              width: "100%",
              borderRadius: "14px",
              marginTop: "1rem",
              boxShadow: "0 3px 16px rgb(0 0 0 / 0.1)"
            }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const msg = document.getElementById("timeline-fallback");
              if (msg) msg.style.display = "block";
            }}
          />
        </a>

        <p
          id="timeline-fallback"
          style={{ display: "none", color: "#6b7280", marginTop: "0.5rem" }}
        >
          Can’t load the timeline image. Make sure the file exists at{" "}
          <code>public/wedding-timeline.png</code>.
        </p>

        <p
          style={{
            textAlign: "center",
            fontStyle: "italic",
            marginTop: "0.5rem",
            color: "#6b7280"
          }}
        >
          Tap to view full size.
        </p>

        {/* Property map of Wildwood */}
        <h3
          className="subtitle"
          style={{ color: "var(--clay)", marginTop: "2rem" }}
        >
          🌸 Wildwood Property Map
        </h3>
        <p style={{ margin: ".25rem 0 0.75rem", color: "#6b7280" }}>
          Ceremony by the cliffs · Cocktails on the Picnic Lawn · Dinner and dancefloor in the Reception Hall.
        </p>

        <a
          href="/Wildwood-Map-Landscape.avif"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="/Wildwood-Map-Landscape.avif"
            alt="Wildwood property map showing ceremony, reception and paths"
            style={{
              width: "100%",
              borderRadius: "14px",
              boxShadow: "0 3px 16px rgb(0 0 0 / 0.1)"
            }}
          />
        </a>
        <p
          style={{
            textAlign: "center",
            fontStyle: "italic",
            marginTop: "0.5rem",
            color: "#6b7280"
          }}
        >
          Tap the map to view full size.
        </p>
      </section>
    </main>
  );
}
