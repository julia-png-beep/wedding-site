// src/App.jsx
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Nav from "./components/Nav.jsx";

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
import WeekendSaturday from "./pages/WeekendSaturday.jsx";
import WeekendSunday from "./pages/WeekendSunday.jsx";
import EntryGate from "./pages/EntryGate.jsx";

import "./App.css";

const base = import.meta.env.BASE_URL;

const heroImages = [
  `${base}Wildwoodlook.jpg`,
  `${base}Wildwoodwalk.jpg`,
];
export default function App() {
  const [index, setIndex] = React.useState(0);
  const [unlocked, setUnlocked] = React.useState(false);

  // Slideshow
  React.useEffect(() => {
    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  // Check localStorage for prior unlock
  React.useEffect(() => {
    try {
      const flag = localStorage.getItem("weddingAccessGranted");
      if (flag === "true") {
        setUnlocked(true);
      }
    } catch {
      // ignore
    }
  }, []);

  function handleUnlock(code) {
    setUnlocked(true);
    try {
      localStorage.setItem("weddingAccessGranted", "true");
      if (code) {
        localStorage.setItem("weddingAccessCode", code);
      }
    } catch {
      // ignore
    }
  }

  return (
    <HashRouter>
      {/* HERO: always show images, but only show title/date once unlocked */}
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
        {unlocked && (
          <div className="hero-inner">
            <h1>Gerard &amp; Julia</h1>
            <p>
              24 October 2026 <span className="heart">♥</span> Kangaroo
              Valley, NSW
            </p>
          </div>
        )}
      </header>

      {/* Nav only once inside site */}
      {unlocked && <Nav />}

      <main className="container">
        <Routes>
          {!unlocked ? (
            // Locked: always show entry gate regardless of hash
            <Route path="*" element={<EntryGate onUnlock={handleUnlock} />} />
          ) : (
            // Unlocked: normal site routes
            <>
              <Route path="/" element={<Home />} />
              <Route path="/moments" element={<Moments />} />
              <Route path="/weekend" element={<Weekend />} />
              <Route path="/weekend/schedule" element={<WeekendSchedule />} />
              
              <Route
                path="/weekend/schedule/saturday"
                element={<WeekendSaturday />}
              />
              <Route
                path="/weekend/schedule/sunday"
                element={<WeekendSunday />}
              />
              <Route path="/weekend/shuttle" element={<WeekendShuttle />} />
              <Route
                path="/weekend/getting-there"
                element={<GettingThere />}
              />
              <Route path="/stay" element={<Stay />} />
              <Route path="/travel" element={<GettingThere />} />
              <Route path="/things-to-do" element={<ThingsToDo />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/rsvp" element={<RSVP />} />
              <Route path="*" element={<Home />} />
            </>
          )}
        </Routes>
      </main>

      {unlocked && (
        <footer className="footer">
          Made with love in the bush · © Gerard &amp; Julia 2026
        </footer>
      )}
    </HashRouter>
  );
}
