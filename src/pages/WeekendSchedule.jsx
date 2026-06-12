import React from "react";

export default function WeekendSchedule() {
  return (
    <main className="container">
      <section className="block">
        <a className="btn-link" href="#/weekend">← Back to The Weekend</a>
        <h2 className="title">Schedule</h2>
        <p className="lead">Your quick view of the weekend — tap a day for details.</p>

        <div className="home-grid">
          

          {/* Saturday */}
          <a className="home-card" href="#/weekend/saturday">
            <h3>Saturday · The Wedding Day</h3>
            <p>Ceremony, canapés, dinner & dancing</p>
            <span>→</span>
          </a>

          {/* Sunday */}
          <a className="home-card" href="#/weekend/sunday">
            <h3>Sunday · Recovery Brunch</h3>
            <p>A relaxed recovery brunch to ease into the day — location TBC</p>
            <span>→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
