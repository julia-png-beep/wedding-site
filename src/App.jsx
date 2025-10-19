// src/App.jsx
import React from "react";
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Moments from "./pages/Moments.jsx";
import Weekend from "./pages/Weekend.jsx";
import WeekendSchedule from "./pages/WeekendSchedule.jsx";
import WeekendShuttle from "./pages/WeekendShuttle.jsx";
import GettingThere from "./pages/GettingThere.jsx";
import Stay from "./pages/Stay.jsx";
import FAQ from "./pages/FAQ.jsx";
import Gallery from "./pages/Gallery.jsx";
import RSVP from "./pages/RSVP.jsx";
import ThingsToDo from "./pages/ThingsToDo.jsx";
import WeekendFriday from "./pages/WeekendFriday.jsx";
import WeekendSaturday from "./pages/WeekendSaturday.jsx";
import WeekendSunday from "./pages/WeekendSunday.jsx";

import "./App.css";

// 🖼 Wildwood slideshow images
const heroImages = [
  "/Wildwoodlook.jpg",
  "/Wildwoodwalk.jpg",
];

// Navigation component
const Nav = () => (
  <nav className="nav">
    <NavLink to="/" end>Welcome</NavLink>
    <NavLink to="/weekend">The Weekend</NavLink>
    <NavLink to="/moments">Moments</NavLink>
    <NavLink to="/faq">Q&amp;A</NavLink>
    <NavLink to="/rsvp">RSVP</NavLink>
    <NavLink to="/gallery">Gallery</NavLink>
  </nav>
);

export default function App() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // 5 seconds per image
    return () => clearInterval(timer);
  }, []);

  return (
    <HashRouter>
      {/* === HERO SLIDESHOW === */}
      <header className="hero">
        {heroImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`hero-slide ${i === index ? "is-active" : ""}`}
          />
        ))}
        <div className="hero-overlay" />
        <div className="hero-inner">
          <h1>Gerard &amp; Julia</h1>
<p>
  23–25 October, 2026 <span className="heart">♥</span> Kangaroo Valley, NSW
</p>
        </div>
      </header>

      <Nav />

      {/* === ROUTES === */}
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/moments" element={<Moments />} />

          {/* Weekend hub + sub-pages */}
          <Route path="/weekend" element={<Weekend />} />
          <Route path="/weekend/schedule" element={<WeekendSchedule />} />
          <Route path="/weekend/schedule/friday" element={<WeekendFriday />} />
          <Route path="/weekend/schedule/saturday" element={<WeekendSaturday />} />
          <Route path="/weekend/schedule/sunday" element={<WeekendSunday />} />
          <Route path="/weekend/shuttle" element={<WeekendShuttle />} />
          <Route path="/weekend/getting-there" element={<GettingThere />} />

          {/* Plan your trip */}
          <Route path="/stay" element={<Stay />} />
          <Route path="/travel" element={<GettingThere />} />
          <Route path="/things-to-do" element={<ThingsToDo />} />

          {/* Other pages */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/rsvp" element={<RSVP />} />

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <footer className="footer">
        Made with love in the bush · © Gerard &amp; Julia 2026
      </footer>
    </HashRouter>
  );
}
