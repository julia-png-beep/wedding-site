import React from "react";

export default function WeekendFriday() {
  return (
    <main className="container">
      <section className="block">
        <a className="btn-link" href="#/home">← Back</a>
        <h2 className="title">Friday · Welcome Drinks</h2>

        <p>
          <strong>
            <a
              href="https://www.thefriendlyinn.com.au/"
              target="_blank"
              rel="noreferrer"
            >
              The Friendly Inn Hotel, Kangaroo Valley
            </a>
          </strong>
          <br />
          6:00 – 9:00 pm
        </p>

        <p>
          Join us for a relaxed evening at the Friendly Inn in the heart of Kangaroo Valley to
          say hello and settle in before the big day. Grab a classic pub meal (you can’t go wrong
          with a parmi) and enjoy a casual night catching up with everyone. We’ll wrap up early
          so everyone’s fresh for Saturday.
        </p>

        {/* Google Map Embed with pinned location */}
        <div className="map" style={{ marginTop: "1.5rem" }}>
          <iframe
  title="The Friendly Inn Hotel Map"
  src="https://www.google.com/maps?output=embed&q=The%20Friendly%20Inn%20Hotel%2C%20159-165%20Main%20Rd%2C%20Kangaroo%20Valley%20NSW%202577"
  loading="lazy"
  allowFullScreen
  referrerPolicy="no-referrer-when-downgrade"
></iframe>

        </div>
      </section>
    </main>
  );
}
