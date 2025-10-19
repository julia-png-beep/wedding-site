import React from "react";

export default function Weekend() {
  return (
    <main className="container">
      <section className="block">
                <a className="btn-link" href="#/home">← Back</a>
        <h2 className="title" style={{ textAlign: "center" }}>The Weekend</h2>
        <p className="lead" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 16px" }}>
          Pick a day to see the details.
        </p>

        <div className="home-grid">
          <a className="home-card" href="#/weekend/schedule/friday">
            <h3>Friday</h3>
            <p>Welcome drinks and dinner at The Friendly Inn</p>
            <span>→</span>
          </a>
          <a className="home-card" href="#/weekend/schedule/saturday">
            <h3>Saturday</h3>
            <p>Ceremony, reception & dancing — all the details</p>
            <span>→</span>
          </a>
          <a className="home-card" href="#/weekend/schedule/sunday">
            <h3>Sunday</h3>
            <p>Farewell breakfast at Wildwood · 10am–2pm</p>
            <span>→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
