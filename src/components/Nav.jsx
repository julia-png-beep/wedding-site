// src/components/Nav.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();

  const goHomeTo = (section) => (e) => {
    e.preventDefault();
    // Use a query param so it survives navigation reliably under HashRouter
    navigate(`/?goto=${section}`);
  };

  return (
    <nav className="nav">
<NavLink
  to="/"
  end
  onClick={(e) => {
    e.preventDefault();
    window.location.hash = "";      // ensure you’re on home route
    window.scrollTo({ top: 0, behavior: "smooth" }); // scrolls to top
  }}
>
  Welcome
</NavLink>

      {/* These two scroll on the Home page */}
      <a href="/#/?goto=weekend" onClick={goHomeTo("weekend")}>The Weekend</a>
      <a href="/#/?goto=plan" onClick={goHomeTo("plan")}>Plan Your Trip</a>

      {/* These go to their own pages */}
      <NavLink to="/faq">Q&amp;A</NavLink>
      <NavLink to="/rsvp">RSVP</NavLink>
      <NavLink to="/moments">Moments</NavLink>
      <NavLink to="/gallery">Gallery</NavLink>
    </nav>
  );
}
