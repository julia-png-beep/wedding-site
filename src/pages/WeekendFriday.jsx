import React from "react";

export default function WeekendFriday() {
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
</button>        <h2 className="title">Friday · Welcome Drinks</h2>

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
          Rolling into Kangaroo Valley early?
Join us at the Friendly Inn on Friday night for a low-key welcome.

Grab a drink, order a parmi,
and enjoy that first breath of country air
as we settle in together before the weekend ahead.

We’ll keep it chill and wrap up early —
Saturday’s a big one!.
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
