import React from "react";

export default function Stay() {
  return (
    <main className="container">
      <section className="block">
        <a className="btn-link" href="#/home">← Back</a>
        <h2 className="title">Where to Stay</h2>

        <p>
          There are plenty of accommodation options in and around Kangaroo Valley —
          from boutique hotels to cottages and holiday rentals. For ease of transport
          on Saturday, we recommend choosing somewhere along the shuttle bus route.
          Please see the Bus Map for details.
        </p>

        <h3 className="subtitle">Our Top Recommendations</h3>
        <ul className="recommendations">
          <li>
            <strong>
              <a href="https://wildes.com.au" target="_blank" rel="noreferrer">
                Wildes Boutique Hotel
              </a>
            </strong>{" "}
            — a cosy boutique hotel in the heart of town
          </li>
          <li>
            <strong>
              <a href="https://kangaroovalleygetaways.com.au" target="_blank" rel="noreferrer">
                Kangaroo Valley Getaways
              </a>
            </strong>{" "}
            — Airbnb-style accommodation
          </li>
          <li>
            <strong>
              <a href="https://kangaroovalleyescapes.com" target="_blank" rel="noreferrer">
                Kangaroo Valley Escapes
              </a>
            </strong>{" "}
            — curated boutique holiday homes
          </li>
          <li>
            <strong>
              <a href="https://www.visitkangaroovalley.com.au/stay" target="_blank" rel="noreferrer">
                Visit Kangaroo Valley Listings
              </a>
            </strong>{" "}
            — the full local accommodation directory
          </li>
        </ul>

        <p>
          You can also explore Wildwood’s own recommendations here:{" "}
          <a
            href="https://wildwoodkangaroovalley.com.au/accommodation"
            target="_blank"
            rel="noreferrer"
          >
            Wildwood Accommodation Suggestions
          </a>.
        </p>

        <p style={{ marginTop: "0.75rem" }}>
          Accommodation in Kangaroo Valley is popular and can book out quickly — especially on weekends.
          We recommend securing your stay early.
        </p>
      </section>
    </main>
  );
}
