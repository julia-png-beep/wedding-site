import React from "react";

export default function WeekendGettingThere() {
  return (
    <main className="container">
      <section className="block">
        <a className="btn-link" href="#/home">← Back</a>
        <h2 className="title">Getting There</h2>

        <p>
          <strong>📍 Wildwood, Kangaroo Valley</strong><br />
          🚗 ≈ 2 hrs from Sydney · ≈ 2.5 hrs from Canberra
        </p>

        <p>
          Wildwood is tucked away in the lush hills of Kangaroo Valley — the drive is winding but beautiful,
          so allow a little extra time to take it slow and enjoy the scenery.
        </p>

        <h3 className="subtitle" style={{ color: "var(--clay)" }}>✈️ By Air + Car</h3>
        <p>
          The nearest airports are Sydney and Canberra. From either city, the easiest way to reach Wildwood
          is by car. 
        </p>

        <h3 className="subtitle" style={{ color: "var(--clay)" }}>🚌 Public Transport (limited)</h3>
        <p>
          Public transport options to Kangaroo Valley are very limited.
          From Sydney, you can take a train or coach to Moss Vale, then connect via a local bus — but services are infrequent
          and may not run on weekends.
        </p>
        <p>
          From Canberra, regional coach routes or trains can get you partway, though you’ll still need a car or taxi
          for the final stretch into the Valley.
        </p>

        <p><strong>💡 Tip:</strong> It’s best to drive if you can — the journey’s part of the adventure!</p>

        {/* Map embed (keeps your original Google Maps reference) */}
        <div className="map" style={{ marginTop: "1.5rem" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d47218.60034711542!2d150.4377229358053!3d-34.73477574920238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1swildwood!5e1!3m2!1sen!2sau!4v1748735900805!5m2!1sen!2sau"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="Wildwood Kangaroo Valley Map"
          ></iframe>
        </div>

         
      </section>
    </main>
  );
}
