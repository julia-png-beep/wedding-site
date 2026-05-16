// src/components/Nav.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();

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
    <nav className="nav">
      <NavLink to="/" end onClick={goHomeTop}>
        Welcome
      </NavLink>

      <a href="#/?goto=weekend" onClick={goHomeTo("weekend")}>
        The Weekend
      </a>

      <a href="#/?goto=plan" onClick={goHomeTo("plan")}>
        Plan Your Trip
      </a>

      <NavLink to="/faq">Q&amp;A</NavLink>
      <NavLink to="/rsvp">RSVP</NavLink>
      <NavLink to="/moments">Moments</NavLink>
      <NavLink to="/gallery">Gallery</NavLink>
    </nav>
  );
}