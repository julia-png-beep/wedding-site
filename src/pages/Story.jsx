// src/pages/Story.jsx
import React from "react";

const items = [
  {
    year: "2015 – Sydney",
    label: "Sydney",
    icon: "📍",
    text:
      "Julia came to Sydney for a six-month exchange — and somehow never left. A few months later, we met, and everything got wonderfully off-course.",
    img: "/story-1.jpg", // replace with your image (public/story-1.jpg)
  },
  {
    year: "First date",
    label: "Coffee date",
    icon: "☕",
    text:
      "A quick coffee turned into hours about travel, German lit, languages — and the joys (and confusion) of Austrian dialects. That’s when the ‘we’ began.",
    img: "/story-2.jpg",
  },
  {
    year: "2016–2019 – On the trail",
    label: "Hiking",
    icon: "⛰️",
    text:
      "Weekend walks became multi-day hikes through the Budawangs and the Walls of Jerusalem. We got rained on, lost the track, and once watched our tent fold in a summer snowstorm — and loved it anyway.",
    img: "/story-3.jpg",
  },
  {
    year: "2020–2023 – Near & far",
    label: "Travels",
    icon: "📷",
    text:
      "Between lockdowns, we chased coastlines, mountains and quiet forests — always with a camera (or three). Tasmania kept calling us back.",
    img: "/story-4.jpg",
  },
  {
    year: "2023 – The proposal (Tarkine)",
    label: "Proposal",
    icon: "❤️",
    text:
      "Back at a hidden waterfall in the Tarkine — creek on our boots, forest hush all around — Gerard asked, and Julia said yes.",
    img: "/story-5.jpg",
  },
  {
    year: "2026 – Kangaroo Valley",
    label: "Wildwood",
    icon: "✨",
    text:
      "Now we get to celebrate with you, in a place that feels like us: green hills, winding roads, and room to breathe.",
    img: "/story-6.jpg",
  },
];

export default function Story() {
  return (
    <main className="container">
      <section className="block">
        <h2 className="title">Our Story</h2>
        <p className="lead" style={{ maxWidth: 760 }}>
          Travel is our thread. These are a few of the places and moments that stitched us together.
        </p>
      </section>

      <section className="block">
        <div className="timeline">
          {/* center line desktop */}
          <div className="timeline-line" aria-hidden />
          <ol className="timeline-list">
            {items.map((it, i) => {
              const left = i % 2 === 0;
              return (
                <li key={it.year} className={`timeline-row ${left ? "left" : "right"}`}>
                  {/* Card */}
                  <article className="timeline-card">
                    <div className="timeline-meta">
                      <span className="timeline-icon" aria-hidden>{it.icon}</span>
                      <span className="timeline-year">{it.year}</span>
                    </div>
                    <h3 className="timeline-title">
                      {it.year.includes("–") ? it.year.split("–")[1].trim() : it.year}
                    </h3>
                    <p className="timeline-text">{it.text}</p>
                  </article>

                  {/* Image */}
                  <figure className="timeline-image">
                    {/* Put your images in /public and update the paths above */}
                    <img
                      src={it.img}
                      alt={it.label}
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    <figcaption>{it.label}</figcaption>
                  </figure>

                  {/* Dot that sits on the center line */}
                  <span className={`timeline-dot ${left ? "left" : "right"}`} aria-hidden />
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </main>
  );
}
