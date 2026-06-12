// src/components/Nav.jsx
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function handleScroll() {
      const currentY = window.scrollY;
      const goingDown = currentY > lastScrollY.current;
      const pastThreshold = currentY > 80;

      setHidden(goingDown && pastThreshold);
      lastScrollY.current = currentY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goHomeTo = (section) => (e) => {
    e.preventDefault();
    navigate(`/?goto=${section}`);
  };

  const goHomeTop = (e) => {
    e.preventDefault();
    navigate("/");
    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  return (
    <nav className={`nav${hidden ? " nav-hidden" : ""}`}>
      <NavLink className="sparkle" to="/" end onClick={goHomeTop}>
        Welcome
      </NavLink>

      <a className="sparkle" href="#/?goto=weekend" onClick={goHomeTo("weekend")}>
        The Weekend
      </a>

      <a className="sparkle" href="#/?goto=plan" onClick={goHomeTo("plan")}>
        Plan Your Trip
      </a>

      <NavLink className="sparkle" to="/faq">Q&amp;A</NavLink>
      <NavLink className="sparkle" to="/rsvp">RSVP</NavLink>
      <NavLink className="sparkle" to="/moments">Moments</NavLink>
      <NavLink className="sparkle" to="/our-journey">Our Journey</NavLink>
      <NavLink className="sparkle" to="/gallery">Gallery</NavLink>
    </nav>
  );
}