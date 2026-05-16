// src/pages/Home.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./home.css";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(location.search || "");
    const target =
      params.get("goto") || (location.hash ? location.hash.slice(1) : null);
    if (!target) return;

    const t = setTimeout(() => {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      navigate(".", { replace: true });
    }, 50);

    return () => clearTimeout(t);
  }, [location.search, location.hash, navigate]);

  function handleRelockForTesting() {
    try {
      localStorage.removeItem("weddingAccessGranted");
      localStorage.removeItem("weddingAccessCode");
    } catch {
      // ignore
    }
    window.location.reload();
  }

  return (
    <main className="container home">
      {/* Intro */}
      <section className="block intro" style={{ textAlign: "center" }}>
        <h2 className="title">Welcome</h2>
        <p
          className="lead"
          style={{ maxWidth: "720px", margin: "0 auto 16px" }}
        >
          Our journey has included snowstorms, soggy tents, long-haul trips and getting lost in the wilderness more times than we'll admit.<br />
          <br />
          Join us in the bush for vows, food, music and a firepit with our
          favourite people.<br />
          <br />
          Don’t worry, no hiking boots needed.
        </p>
        <img
  className="home-photo"
  src={`${import.meta.env.BASE_URL}Iceland1.jpg`}
  alt="Evening by the lake"
/>
      </section>

      {/* The Weekend */}
      <section id="weekend" className="block">
        <h2 className="title" style={{ textAlign: "center" }}>
          The Weekend
        </h2>
        <p
          className="lead"
          style={{
            textAlign: "center",
            maxWidth: 720,
            margin: "0 auto 16px",
          }}
        >
          Your quick guide to the celebrations · Pick a day to see the details.
        </p>
        <div className="home-grid weekend-grid">
          
          <a className="home-card" href="#/weekend/schedule/saturday">
            <h3>Saturday</h3>
            <p>Ceremony, reception &amp; dancing under the gums</p>
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
      <section id="plan" className="block">
        <h2 className="title" style={{ textAlign: "center" }}>
          Plan Your Trip
        </h2>
        <p
          className="lead"
          style={{
            textAlign: "center",
            maxWidth: 720,
            margin: "0 auto 16px",
          }}
        ></p>
        <div className="home-grid two-by-two">
          <a className="home-card" href="#/weekend/getting-there">
            <h3>Getting There</h3>
            <p>Maps, travel tips &amp; scenic routes</p>
            <span>→</span>
          </a>
          <a className="home-card" href="#/stay">
            <h3>Accommodation</h3>
            <p>Our favourite stays in the Valley</p>
            <span>→</span>
          </a>
          <a className="home-card" href="#/weekend/shuttle">
            <h3>Shuttle Bus</h3>
            <p>Pickup points &amp; timings for Saturday</p>
            <span>→</span>
          </a>
          <a className="home-card" href="#/things-to-do">
            <h3>Things to Do</h3>
            <p>Walks, waterfalls, wineries &amp; great coffee</p>
            <span>→</span>
          </a>
        </div>
      </section>

      {/* Essentials */}
      <section className="block" aria-labelledby="essentials">
        <h2
          id="essentials"
          className="title"
          style={{ textAlign: "center" }}
        >
          Essentials
        </h2>
        <div className="home-grid two-by-two">
          <a className="home-card" href="#/faq">
            <h3>Q&amp;A</h3>
            <p>Answers to all those pre-wedding questions.</p>
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

      {/* Testing-only relock link */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <button
          type="button"
          className="relock-link"
          onClick={handleRelockForTesting}
        >
          Re-lock website (testing)
        </button>
      </div>
    </main>
  );
}
