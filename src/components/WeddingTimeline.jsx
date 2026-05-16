import React from "react";
import "./WeddingTimeline.css";

export default function WeddingTimeline() {
  return (
    <div className="timeline">
      <h2 className="title" style={{ textAlign: "center" }}>Wedding Timeline</h2>
      <div className="timeline-line" />

      <div className="timeline-row left">
        <div className="side">
          <span className="time">2:30 PM</span>
          <div className="label">Arrival &amp; Welcome Drinks</div>
        </div>
        <div className="dot"><span className="icon">🥂</span></div>
      </div>

      <div className="timeline-row right">
        <div className="side">
          <span className="time">3:00 PM</span>
          <div className="label">Wedding Ceremony</div>
        </div>
        <div className="dot"><span className="icon">💍</span></div>
      </div>

      <div className="timeline-row left">
        <div className="side">
          <span className="time">4:00 PM</span>
          <div className="label">Cocktail Hour</div>
        </div>
        <div className="dot"><span className="icon">🍸</span></div>
      </div>

      <div className="timeline-row right">
        <div className="side">
          <span className="time">6:00 PM</span>
          <div className="label">Dinner (cocktail-style)</div>
        </div>
        <div className="dot"><span className="icon">🍽️</span></div>
      </div>

      <div className="timeline-row left">
        <div className="side">
          <span className="time">7:00 PM</span>
          <div className="label">Cake Cutting</div>
        </div>
        <div className="dot"><span className="icon">🍰</span></div>
      </div>

      <div className="timeline-row right">
        <div className="side">
          <span className="time">8:00 PM</span>
          <div className="label">Evening Party &amp; Dancefloor</div>
        </div>
        <div className="dot"><span className="icon">🎵</span></div>
      </div>

      <div className="timeline-row left">
        <div className="side">
          <span className="time">11:00 PM</span>
          <div className="label">Closing</div>
        </div>
        <div className="dot"><span className="icon">🚗</span></div>
      </div>
    </div>
  );
}
