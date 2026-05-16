import React from "react";

export default function WeekendSunday() {
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
</button>
        <h2 className="title">Sunday · Farewell Breakfast</h2>

        <p>
           <strong>Wildwood, Kangaroo Valley</strong>
          <br />
          10:00 am – 2:00 pm
        </p>

        <p>
          Before you hit the road, join us at Wildwood for a relaxed Sunday morning.
Grab a coffee, a bite to eat, and enjoy a slow farewell in the bush
before we all head home.
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
