import React from "react";

export default function Stay() {
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
 <h2 className="title">Where to Stay</h2>

        <p>
  There are plenty of places to stay in and around Kangaroo Valley — 
  from cosy cottages to holiday rentals.
  If you’re planning to use the shuttle bus, consider booking accommodation along the route for an easier trip to and from Wildwood.
  You can check the <a href="#/weekend/shuttle" className="btn-link">Bus Map</a> for details.
</p>


        <h3 className="subtitle">Our Top Recommendations</h3>
        <ul className="recommendations">
          <li>
            <strong>
              <a href="https://wildes.com.au" target="_blank" rel="noreferrer">
                Wildes Boutique Hotel
              </a>
            </strong>{" "}
            — a small boutique hotel in the heart of town
          </li>
          <li>
            <strong>
              <a href="https://kangaroovalleygetaways.com.au" target="_blank" rel="noreferrer">
                Kangaroo Valley Getaways
              </a>
            </strong>{" "}
            — Airbnb-style accommodation via a local agent
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
              <a href="https://kangaroovalleygolf.com.au/" target="_blank" rel="noreferrer">
                Kangaroo Valley Golf & Country Retreat
              </a>
            </strong>{" "}
            — One to three bedroom cottages in the middle of Kangaroo Valley's golf club
          </li>
          <li>
            <strong>
              <a href="https://www.kangaroovalleycountrywedding.com.au/place-for-guests" target="_blank" rel="noreferrer">
                Places to stay recommended by Wildwood
              </a>
            </strong>{" "}
            — a list of local popular places to stay
          </li>
        </ul>

        

        <p style={{ marginTop: "0.75rem" }}>
          Accommodation in Kangaroo Valley is popular and can book out quickly, especially on weekends.
          We recommend securing your stay early.
        </p>
      </section>
    </main>
  );
}
