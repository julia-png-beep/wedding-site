import React from "react";

export default function WeekendSunday() {
  return (
    <main className="container">
      <section className="block">
        <a className="btn-link" href="#/home">← Back</a>

        <h2 className="title">Sunday · 25 October 2026</h2>
        <h3 className="subtitle">Farewell Breakfast</h3>

        <p>
          <strong>
            <a
              href="https://wildwoodkangaroovalley.com.au/"
              target="_blank"
              rel="noreferrer"
            >
              Wildwood, Kangaroo Valley
            </a>
          </strong>
          <br />
          10:00 am – 2:00 pm
        </p>

        <p>
          Join us for a relaxed Sunday morning at Wildwood to unwind and say goodbye. 
          Drop in for coffee, a bite to eat, and a slow farewell in the bush. 
          We’ll be having breakfast — if you’d like to join us, please let us know in your RSVP.
        </p>

        {/* Google Maps Embed for Wildwood */}
        <div className="map" style={{ marginTop: "1.5rem" }}>
          <iframe
            title="Wildwood Kangaroo Valley Map"
            src="https://www.google.com/maps?output=embed&q=Wildwood%20Kangaroo%20Valley%20NSW"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </main>
  );
}
