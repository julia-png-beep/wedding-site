import React from "react";

export default function Home() {
  return (
    <main className="container home">
      {/* Intro */}
      <section className="block intro" style={{ textAlign: "center"}}>
        <h2 className="title">Welcome</h2>
       
        <p className="lead" style={{ maxWidth: "720px", margin: "0 auto 16px" }}>
          We’ve shared plenty of wild adventures - from snowstorms and soggy tents to curious wombats, starry nights and getting lost in the wilderness (more than once).
          Join us in the bush for vows, food, music and a firepit with our favourite people. 
          Don’t worry, no hiking boots needed.
        </p>

        {/* Lake image */}
        <img
          className="home-photo"
          src="/Iceland1.jpg"
          alt="Evening by the lake"
        />
      </section>

      {/* The Weekend */}
      <section className="block">
        <h2 className="title" style={{ textAlign: "center" }}>The Weekend</h2>
        <p className="lead" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 16px" }}>
          Your at-a-glance guide to the celebrations · Pick a day to see the details.
        </p>

        <div className="home-grid">
          <a className="home-card" href="#/weekend/schedule/friday">
            <h3>Friday</h3>
            <p>Welcome drinks & dinner at The Friendly Inn</p>
            <span>→</span>
          </a>
          <a className="home-card" href="#/weekend/schedule/saturday">
            <h3>Saturday</h3>
            <p>Ceremony, reception & dancing under the gums</p>
            <span>→</span>
          </a>
          <a className="home-card" href="#/weekend/schedule/sunday">
            <h3>Sunday</h3>
            <p>Farewell breakfast at Wildwood</p>
            <span>→</span>
          </a>
        </div>
      </section>

      {/* Plan Your Trip */}
<section className="block">
  <h2 className="title" style={{ textAlign: "center" }}>Plan Your Trip</h2>
  <p className="lead" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 16px" }}>
    Everything you need to get here and get around.
  </p>

  <div className="home-grid two-by-two">  {/* ← Added class */}
    <a className="home-card" href="#/weekend/getting-there">
      <h3>Getting There</h3>
      <p>Maps, travel tips & scenic routes</p>
      <span>→</span>
    </a>
    <a className="home-card" href="#/stay">
      <h3>Accommodation</h3>
      <p>Our favourite stays in the Valley</p>
      <span>→</span>
    </a>
    <a className="home-card" href="#/weekend/shuttle">
      <h3>Shuttle Bus</h3>
      <p>Pickup points & timings for Saturday</p>
      <span>→</span>
    </a>
    <a className="home-card" href="#/things-to-do">
      <h3>Things to Do</h3>
      <p>Walks, waterfalls, wineries & great coffee</p>
      <span>→</span>
    </a>
  </div>
</section>

      {/* Essentials */}
<section className="block" aria-labelledby="essentials">
  <h2 id="essentials" className="title" style={{ textAlign: "center" }}>Essentials</h2>
  <div className="home-grid two-by-two">  {/* ← Added class */}
    <a className="home-card" href="#/faq">
      <h3>Q&amp;A</h3>
      <p>Dress code, kids, gifts, and other practical bits</p>
      <span>→</span>
    </a>
    <a className="home-card" href="#/rsvp">
      <h3>RSVP</h3>
      <p>Please let us know by 1 September 2026</p>
      <span>→</span>
    </a>
    <a className="home-card" href="#/gallery">
      <h3>Gallery</h3>
      <p>Photos after the wedding</p>
      <span>→</span>
    </a>
    <a className="home-card" href="#/moments">
      <h3>Moments</h3>
      <p>A little collage of ten years of adventures.</p>
      <span>→</span>
    </a>
  </div>
</section>
    </main>
  );
}
