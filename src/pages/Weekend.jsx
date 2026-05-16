import React from "react";
import { Link } from "react-router-dom";

export default function Weekend() {
  return (
    <main className="container">
      <h2 className="title" style={{ textAlign: "center" }}>The Weekend</h2>
      <p className="lead" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 16px" }}>
        Pick a day to see the details.
      </p>

      <div className="home-grid">
        <Link className="home-card" to="/weekend/schedule/friday">
          <h3>Friday</h3>
          <p>Welcome drinks & dinner at The Friendly Inn</p>
          <span>→</span>
        </Link>
        <Link className="home-card" to="/weekend/schedule/saturday">
          <h3>Saturday</h3>
          <p>Ceremony, reception & dancing under the gums</p>
          <span>→</span>
        </Link>
        <Link className="home-card" to="/weekend/schedule/sunday">
          <h3>Sunday</h3>
          <p>Farewell breakfast at Wildwood</p>
          <span>→</span>
        </Link>
      </div>

      <div className="home-grid two-by-two" style={{ marginTop: 24 }}>
        <Link className="home-card" to="/weekend/getting-there">
          <h3>Getting There</h3>
          <p>Maps, travel tips & scenic routes</p>
          <span>→</span>
        </Link>
        <Link className="home-card" to="/weekend/shuttle">
          <h3>Shuttle Bus</h3>
          <p>Pickup points & timings for Saturday</p>
          <span>→</span>
        </Link>
      </div>
    </main>
  );
}
